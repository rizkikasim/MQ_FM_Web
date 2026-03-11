import { z } from "zod";

export const seriesItemSchema = z.object({
  audio_id: z.number(),
  order_num: z.number().optional(),
  audio: z.object({
    audio_id: z.number(),
    title: z.string(),
    artist: z.string().nullable().optional(),
    file_path: z.string().nullable().optional(),
    duration: z.number().optional(),
    thumbnail: z.string().nullable().optional(),
  }).passthrough().optional(),
}).passthrough();

export const seriesSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable().optional(),
  artist: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  items: z.array(seriesItemSchema).optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
}).passthrough();

export const seriesListSchema = z.array(seriesSchema);
