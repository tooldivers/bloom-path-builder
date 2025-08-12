import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const creators = pgTable("creators", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  username: text("username"),
  niche: text("niche").notNull(),
  platform: text("platform").notNull(),
  audienceSize: integer("audience_size").default(0),
  audienceSizeRange: text("audience_size_range").notNull(), // "none", "micro", "1k", "5k+"
  goal: text("goal").notNull(), // "followers", "engagement", "sales", "exposure"
  bio: text("bio"),
  profileImage: text("profile_image"),
  isActive: boolean("is_active").default(true),
  joinedAt: timestamp("joined_at").defaultNow(),
});

export const collaborations = pgTable("collaborations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  requesterId: varchar("requester_id").references(() => creators.id).notNull(),
  recipientId: varchar("recipient_id").references(() => creators.id).notNull(),
  status: text("status").default("pending"), // "pending", "accepted", "declined", "completed"
  type: text("type").notNull(), // "shoutout", "reel_swap", "joint_content"
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const messages = pgTable("messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  senderId: varchar("sender_id").references(() => creators.id).notNull(),
  recipientId: varchar("recipient_id").references(() => creators.id).notNull(),
  content: text("content").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const matches = pgTable("matches", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  creatorId: varchar("creator_id").references(() => creators.id).notNull(),
  matchedCreatorId: varchar("matched_creator_id").references(() => creators.id).notNull(),
  score: integer("score").notNull(), // matching score 0-100
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCreatorSchema = createInsertSchema(creators).omit({
  id: true,
  joinedAt: true,
});

export const insertCollaborationSchema = createInsertSchema(collaborations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
});

export const insertMatchSchema = createInsertSchema(matches).omit({
  id: true,
  createdAt: true,
});

export type Creator = typeof creators.$inferSelect;
export type InsertCreator = z.infer<typeof insertCreatorSchema>;
export type Collaboration = typeof collaborations.$inferSelect;
export type InsertCollaboration = z.infer<typeof insertCollaborationSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Match = typeof matches.$inferSelect;
export type InsertMatch = z.infer<typeof insertMatchSchema>;
