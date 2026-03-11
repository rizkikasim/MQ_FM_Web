import { z } from "zod";

export const eventSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable().optional(),
  event_date: z.string(),
  location: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  rsvp_count: z.number().optional(),
  has_rsvp: z.boolean().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
}).passthrough();

export const eventListSchema = z.array(eventSchema);
