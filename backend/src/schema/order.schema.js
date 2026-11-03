 import { z } from "zod";

export const createOrderSchema = z.object({
  cartItem: z
    .array(
      z.object({
        item_id: z.string().regex(/^[0-9a-fA-F]{24}$/, {
          message: "Invalid food item ID",
        }),
        quantity: z.coerce.number().int().positive(),
      })
    )
    .min(1, "Cart cannot be empty"),

 
});