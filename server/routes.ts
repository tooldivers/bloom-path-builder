import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { insertCreatorSchema, insertCollaborationSchema, insertMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // WebSocket server for real-time messaging
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  const clients = new Map<string, WebSocket>();

  wss.on('connection', (ws, req) => {
    console.log('WebSocket connection established');
    
    ws.on('message', async (data) => {
      try {
        const message = JSON.parse(data.toString());
        
        if (message.type === 'join') {
          clients.set(message.creatorId, ws);
        } else if (message.type === 'message') {
          // Save message to storage
          const newMessage = await storage.createMessage({
            senderId: message.senderId,
            recipientId: message.recipientId,
            content: message.content,
          });
          
          // Send to recipient if online
          const recipientWs = clients.get(message.recipientId);
          if (recipientWs && recipientWs.readyState === WebSocket.OPEN) {
            recipientWs.send(JSON.stringify({
              type: 'message',
              message: newMessage,
            }));
          }
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });

    ws.on('close', () => {
      // Remove client from map
      for (const [creatorId, client] of Array.from(clients.entries())) {
        if (client === ws) {
          clients.delete(creatorId);
          break;
        }
      }
    });
  });

  // Creator routes
  app.post("/api/creators", async (req, res) => {
    try {
      const validatedData = insertCreatorSchema.parse(req.body);
      const creator = await storage.createCreator(validatedData);
      
      // Generate matches for the new creator
      await generateMatches(creator.id);
      
      res.json(creator);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid creator data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create creator" });
      }
    }
  });

  app.get("/api/creators", async (req, res) => {
    try {
      const creators = await storage.getAllCreators();
      res.json(creators);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch creators" });
    }
  });

  app.get("/api/creators/:id", async (req, res) => {
    try {
      const creator = await storage.getCreator(req.params.id);
      if (!creator) {
        return res.status(404).json({ message: "Creator not found" });
      }
      res.json(creator);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch creator" });
    }
  });

  app.get("/api/creators/:id/matches", async (req, res) => {
    try {
      const { limit = '10' } = req.query;
      const matches = await storage.getTopMatchesForCreator(req.params.id, parseInt(limit as string));
      res.json(matches);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch matches" });
    }
  });

  // Collaboration routes
  app.post("/api/collaborations", async (req, res) => {
    try {
      const validatedData = insertCollaborationSchema.parse(req.body);
      const collaboration = await storage.createCollaboration(validatedData);
      res.json(collaboration);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid collaboration data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create collaboration" });
      }
    }
  });

  app.get("/api/collaborations/creator/:id", async (req, res) => {
    try {
      const collaborations = await storage.getCollaborationsByCreator(req.params.id);
      res.json(collaborations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch collaborations" });
    }
  });

  app.patch("/api/collaborations/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      const collaboration = await storage.updateCollaborationStatus(req.params.id, status);
      if (!collaboration) {
        return res.status(404).json({ message: "Collaboration not found" });
      }
      res.json(collaboration);
    } catch (error) {
      res.status(500).json({ message: "Failed to update collaboration" });
    }
  });

  // Message routes
  app.get("/api/messages/:creator1Id/:creator2Id", async (req, res) => {
    try {
      const messages = await storage.getMessagesBetweenCreators(
        req.params.creator1Id,
        req.params.creator2Id
      );
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  // Generate matches for creator based on niche and audience size
  async function generateMatches(creatorId: string) {
    const creator = await storage.getCreator(creatorId);
    if (!creator) return;

    const allCreators = await storage.getAllCreators();
    const potentialMatches = allCreators.filter(c => 
      c.id !== creatorId && 
      c.niche === creator.niche
    );

    for (const match of potentialMatches) {
      // Calculate match score based on audience size similarity and niche
      let score = 70; // Base score for same niche
      
      // Audience size compatibility bonus
      if (creator.audienceSizeRange === match.audienceSizeRange) {
        score += 20;
      } else if (
        (creator.audienceSizeRange === "micro" && match.audienceSizeRange === "1k") ||
        (creator.audienceSizeRange === "1k" && match.audienceSizeRange === "micro") ||
        (creator.audienceSizeRange === "1k" && match.audienceSizeRange === "5k+") ||
        (creator.audienceSizeRange === "5k+" && match.audienceSizeRange === "1k")
      ) {
        score += 10;
      }

      // Platform diversity bonus
      if (creator.platform !== match.platform) {
        score += 5;
      }

      // Goal compatibility
      if (creator.goal === match.goal) {
        score += 5;
      }

      await storage.createMatch({
        creatorId,
        matchedCreatorId: match.id,
        score,
      });
    }
  }

  return httpServer;
}
