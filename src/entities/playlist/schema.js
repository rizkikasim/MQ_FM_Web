import { z } from "zod";

export const playlistSchema = z.object({
  id: z.number(),
  name: z.string(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
}).passthrough();

export const playlistListSchema = z.array(playlistSchema);
