import { z } from "zod";

export const CartActionSchema = z.object({
    type: z.enum([
        "ADD_ITEM",
        "REMOVE_ITEM",
        "UPDATE_QUANTITY",
        "UPDATE_MODIFIERS",
        "CLEAR_CART",
        "SHOW_CART",
        "CHECKOUT",
        "ASK_CLARIFICATION",
    ]),
    itemId: z.string().nullable().optional(),
    quantity: z.number().int().positive().nullable().optional(),
    modifiers: z.record(z.any()).nullable().optional(),
    targetCartItemId: z.string().nullable().optional(),
});

export const OrderSchema = z.object({
    assistantMessage: z.string(),
    actions: z.array(CartActionSchema),
    needsClarification: z.boolean(),
    clarificationQuestion: z.string().nullable().optional(),
});