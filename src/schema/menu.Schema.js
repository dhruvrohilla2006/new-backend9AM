import * as z from "zod";

export const menuSchema = z.strictObject({
  name: z
    .string()
    .trim()
    .min(6, "MinLennght is 6")
    .max(50, "Max Lenght is 50 Character"),
  description: z
    .string()
    .trim()
    .min(50, "min 50 Character Required")
    .max(500, "Max 500 Character"),
  price: z.number(),
  isAvaiable: z.boolean().optional(),
  category: z.string().optional(),
});
