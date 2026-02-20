import { z } from "zod";

export const insertContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  topic: z.string().min(1, "Please select a topic"),
  message: z.string().optional(),
});

export type InsertContact = z.infer<typeof insertContactSchema>;
