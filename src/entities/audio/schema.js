import { z } from "zod";

export const audioSchema = z.object({
  audio_id: z.number(),
  title: z.string(),
  artist: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  file_path: z.string().nullable().optional(),
  duration: z.number().optional(),
  status: z.string().optional(),
  category_id: z.number(),
  thumbnail: z.string().nullable().optional(),
  dominant_color: z.string().nullable().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
}).passthrough();

export const audioListSchema = z.array(audioSchema);
