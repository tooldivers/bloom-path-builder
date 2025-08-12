import { type Creator, type InsertCreator, type Collaboration, type InsertCollaboration, type Message, type InsertMessage, type Match, type InsertMatch } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Creator methods
  getCreator(id: string): Promise<Creator | undefined>;
  getCreatorByEmail(email: string): Promise<Creator | undefined>;
  createCreator(creator: InsertCreator): Promise<Creator>;
  getAllCreators(): Promise<Creator[]>;
  getCreatorsByNiche(niche: string): Promise<Creator[]>;
  updateCreator(id: string, updates: Partial<Creator>): Promise<Creator | undefined>;

  // Collaboration methods
  createCollaboration(collaboration: InsertCollaboration): Promise<Collaboration>;
  getCollaborationsByCreator(creatorId: string): Promise<Collaboration[]>;
  updateCollaborationStatus(id: string, status: string): Promise<Collaboration | undefined>;

  // Message methods
  createMessage(message: InsertMessage): Promise<Message>;
  getMessagesBetweenCreators(creator1Id: string, creator2Id: string): Promise<Message[]>;
  markMessageAsRead(id: string): Promise<void>;

  // Match methods
  createMatch(match: InsertMatch): Promise<Match>;
  getMatchesForCreator(creatorId: string): Promise<Match[]>;
  getTopMatchesForCreator(creatorId: string, limit: number): Promise<(Match & { creator: Creator })[]>;
}

export class MemStorage implements IStorage {
  private creators: Map<string, Creator>;
  private collaborations: Map<string, Collaboration>;
  private messages: Map<string, Message>;
  private matches: Map<string, Match>;

  constructor() {
    this.creators = new Map();
    this.collaborations = new Map();
    this.messages = new Map();
    this.matches = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed with sample creators for demonstration
    const sampleCreators: Creator[] = [
      {
        id: "creator-1",
        name: "LinaFit",
        email: "lina@example.com",
        username: "LinaFit",
        niche: "Fitness & Health",
        platform: "Instagram",
        audienceSize: 5800,
        audienceSizeRange: "5k+",
        goal: "followers",
        bio: "Fitness enthusiast helping others achieve their health goals",
        profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        isActive: true,
        joinedAt: new Date(),
      },
      {
        id: "creator-2",
        name: "TechGuru",
        email: "tech@example.com",
        username: "TechGuru",
        niche: "Technology",
        platform: "YouTube",
        audienceSize: 5800,
        audienceSizeRange: "5k+",
        goal: "engagement",
        bio: "Tech reviews and tutorials for everyday users",
        profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        isActive: true,
        joinedAt: new Date(),
      },
      {
        id: "creator-3",
        name: "EmmaStyle",
        email: "emma@example.com",
        username: "EmmaStyle",
        niche: "Fashion & Style",
        platform: "Instagram",
        audienceSize: 1500,
        audienceSizeRange: "1k",
        goal: "followers",
        bio: "Affordable fashion and style tips for everyone",
        profileImage: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        isActive: true,
        joinedAt: new Date(),
      },
    ];

    sampleCreators.forEach(creator => {
      this.creators.set(creator.id, creator);
    });
  }

  // Creator methods
  async getCreator(id: string): Promise<Creator | undefined> {
    return this.creators.get(id);
  }

  async getCreatorByEmail(email: string): Promise<Creator | undefined> {
    return Array.from(this.creators.values()).find(creator => creator.email === email);
  }

  async createCreator(insertCreator: InsertCreator): Promise<Creator> {
    const id = randomUUID();
    const creator: Creator = {
      ...insertCreator,
      id,
      isActive: true,
      joinedAt: new Date(),
    };
    this.creators.set(id, creator);
    return creator;
  }

  async getAllCreators(): Promise<Creator[]> {
    return Array.from(this.creators.values()).filter(creator => creator.isActive);
  }

  async getCreatorsByNiche(niche: string): Promise<Creator[]> {
    return Array.from(this.creators.values()).filter(
      creator => creator.niche === niche && creator.isActive
    );
  }

  async updateCreator(id: string, updates: Partial<Creator>): Promise<Creator | undefined> {
    const creator = this.creators.get(id);
    if (!creator) return undefined;
    
    const updatedCreator = { ...creator, ...updates };
    this.creators.set(id, updatedCreator);
    return updatedCreator;
  }

  // Collaboration methods
  async createCollaboration(insertCollaboration: InsertCollaboration): Promise<Collaboration> {
    const id = randomUUID();
    const collaboration: Collaboration = {
      ...insertCollaboration,
      id,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.collaborations.set(id, collaboration);
    return collaboration;
  }

  async getCollaborationsByCreator(creatorId: string): Promise<Collaboration[]> {
    return Array.from(this.collaborations.values()).filter(
      collab => collab.requesterId === creatorId || collab.recipientId === creatorId
    );
  }

  async updateCollaborationStatus(id: string, status: string): Promise<Collaboration | undefined> {
    const collaboration = this.collaborations.get(id);
    if (!collaboration) return undefined;
    
    const updated = { ...collaboration, status, updatedAt: new Date() };
    this.collaborations.set(id, updated);
    return updated;
  }

  // Message methods
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = randomUUID();
    const message: Message = {
      ...insertMessage,
      id,
      isRead: false,
      createdAt: new Date(),
    };
    this.messages.set(id, message);
    return message;
  }

  async getMessagesBetweenCreators(creator1Id: string, creator2Id: string): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(message => 
        (message.senderId === creator1Id && message.recipientId === creator2Id) ||
        (message.senderId === creator2Id && message.recipientId === creator1Id)
      )
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async markMessageAsRead(id: string): Promise<void> {
    const message = this.messages.get(id);
    if (message) {
      this.messages.set(id, { ...message, isRead: true });
    }
  }

  // Match methods
  async createMatch(insertMatch: InsertMatch): Promise<Match> {
    const id = randomUUID();
    const match: Match = {
      ...insertMatch,
      id,
      createdAt: new Date(),
    };
    this.matches.set(id, match);
    return match;
  }

  async getMatchesForCreator(creatorId: string): Promise<Match[]> {
    return Array.from(this.matches.values()).filter(
      match => match.creatorId === creatorId
    );
  }

  async getTopMatchesForCreator(creatorId: string, limit: number): Promise<(Match & { creator: Creator })[]> {
    const matches = await this.getMatchesForCreator(creatorId);
    const matchesWithCreators = await Promise.all(
      matches.map(async match => {
        const creator = await this.getCreator(match.matchedCreatorId);
        return creator ? { ...match, creator } : null;
      })
    );
    
    return matchesWithCreators
      .filter((match): match is Match & { creator: Creator } => match !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }
}

export const storage = new MemStorage();
