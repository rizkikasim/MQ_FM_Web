import { z } from "zod";

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string().nullable().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
}).passthrough();

export const categoryListSchema = z.array(categorySchema);
