// Mock API service for Mention Mates
import type { Creator, InsertCreator, Collaboration, InsertCollaboration, Message, InsertMessage, Match } from "@shared/schema";

// Mock data store
class MockDataStore {
  private creators: Creator[] = [
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

  private collaborations: Collaboration[] = [];
  private messages: Message[] = [];
  private matches: Match[] = [];

  // Creator methods
  async getAllCreators(): Promise<Creator[]> {
    return this.creators.filter(creator => creator.isActive);
  }

  async getCreator(id: string): Promise<Creator | undefined> {
    return this.creators.find(creator => creator.id === id);
  }

  async createCreator(data: InsertCreator): Promise<Creator> {
    const creator: Creator = {
      ...data,
      id: `creator-${Date.now()}`,
      username: data.username || null,
      bio: data.bio || null,
      profileImage: data.profileImage || null,
      audienceSize: data.audienceSize || 0,
      isActive: true,
      joinedAt: new Date(),
    };
    this.creators.push(creator);
    return creator;
  }

  async getCreatorMatches(creatorId: string, limit: number = 10): Promise<(Match & { creator: Creator })[]> {
    // Generate mock matches
    const creator = this.creators.find(c => c.id === creatorId);
    if (!creator) return [];

    const potentialMatches = this.creators
      .filter(c => c.id !== creatorId && c.niche === creator.niche)
      .slice(0, limit)
      .map(matchedCreator => ({
        id: `match-${Date.now()}-${Math.random()}`,
        creatorId,
        matchedCreatorId: matchedCreator.id,
        score: Math.floor(Math.random() * 30) + 70, // Score between 70-100
        createdAt: new Date(),
        creator: matchedCreator,
      }));

    return potentialMatches;
  }
}

const mockStore = new MockDataStore();

// API functions
export const api = {
  creators: {
    getAll: () => mockStore.getAllCreators(),
    getById: (id: string) => mockStore.getCreator(id),
    create: (data: InsertCreator) => mockStore.createCreator(data),
    getMatches: (id: string, limit?: number) => mockStore.getCreatorMatches(id, limit),
  },
};