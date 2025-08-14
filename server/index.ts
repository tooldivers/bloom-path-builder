import express from "express";
import { createServer } from "vite";
import path from "path";
import { registerRoutes } from "./routes";

const app = express();
app.use(express.json());

async function startServer() {
  try {
    // Register API routes first
    const httpServer = await registerRoutes(app);
    
    // Create Vite server in middleware mode
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
      root: path.resolve(process.cwd()),
    });

    // Use vite's connect instance as middleware
    app.use(vite.middlewares);

    const port = parseInt(process.env.PORT || '8080', 10);
    
    httpServer.listen(port, '0.0.0.0', () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Server error:', error);
    process.exit(1);
  }
}

startServer();