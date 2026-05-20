import express from "express";
import { z } from "zod";
import { parseOrderWithGemini } from "../services/orderParser.js";
import { menu } from "../menu.js";

export const orderRouter = express.Router();

const ParseOrderRequestSchema = z.object({
    message: z.string().min(1),
    cart: z
        .array(
            z.object({
                cartItemId: z.string(),
                itemId: z.string(),
                name: z.string(),
                quantity: z.number().int().positive(),
                modifiers: z.record(z.any()).optional(),
            })
        )
        .default([]),
});

orderRouter.get("/menu", (req, res) => {
    res.json(menu);
});

orderRouter.post("/chat/order", async (req, res) => {
    try {
        const body = ParseOrderRequestSchema.parse(req.body);

        const result = await parseOrderWithGemini({
            message: body.message,
            cart: body.cart,
        });

        return res.json(result);
    } catch (error) {
        console.error("Order parsing error:", error);

        return res.status(500).json({
            assistantMessage:
                "Sorry, I had trouble understanding that. Could you try again?",
            actions: [],
            needsClarification: true,
            clarificationQuestion: "Could you rephrase your order?",
        });
    }
});