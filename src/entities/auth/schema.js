import { z } from "zod";

export const adminSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
}).passthrough();

export const loginResponseSchema = z.object({
  token: z.string(),
}).passthrough();
