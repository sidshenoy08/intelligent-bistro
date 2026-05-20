import { GoogleGenAI } from "@google/genai";
import { zodToJsonSchema } from "zod-to-json-schema";
import { OrderSchema } from "../schemas/order.js";
import { getCompactMenuForLLM } from "./menuContext.js";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

function repairFlattenedActions(actions) {
    if (!Array.isArray(actions)) return actions;

    const hasObjects = actions.some(
        (action) => action && typeof action === "object" && !Array.isArray(action)
    );

    if (hasObjects) return actions;

    const repaired = [];
    let current = null;
    let i = 0;

    while (i < actions.length) {
        const key = actions[i];
        const value = actions[i + 1];

        if (key === "type") {
            if (current) repaired.push(current);

            current = {
                type: value,
                itemId: null,
                quantity: null,
                targetCartItemId: null,
                modifiers: {},
            };

            i += 2;
            continue;
        }

        if (!current) {
            i++;
            continue;
        }

        if (key === "itemId") {
            current.itemId = value;
            i += 2;
            continue;
        }

        if (key === "quantity") {
            current.quantity = value;
            i += 2;
            continue;
        }

        if (key === "targetCartItemId") {
            current.targetCartItemId = value;
            i += 2;
            continue;
        }

        if (key === "modifiers") {
            i += 1;

            while (
                i < actions.length &&
                actions[i] !== "type" &&
                actions[i] !== "itemId" &&
                actions[i] !== "quantity" &&
                actions[i] !== "targetCartItemId"
            ) {
                const modifierKey = actions[i];
                const modifierValue = actions[i + 1];

                if (typeof modifierKey === "string") {
                    current.modifiers[modifierKey] = modifierValue;
                }

                i += 2;
            }

            continue;
        }

        i++;
    }

    if (current) repaired.push(current);

    return repaired;
}

function normalizeGeminiOrderResponse(parsedJson) {
    let normalized = parsedJson;

    if (normalized?.orderIntent) {
        normalized = normalized.orderIntent;
    }

    if (Array.isArray(normalized) && normalized.length > 0) {
        normalized = normalized[0];
    }

    if (normalized?.action) {
        return {
            assistantMessage:
                normalized.clarificationQuestion || "Got it. I updated your cart.",
            actions: [
                {
                    type: normalized.action,
                    itemId: normalized.itemId ?? null,
                    quantity: normalized.quantity ?? null,
                    targetCartItemId: normalized.targetCartItemId ?? null,
                    modifiers: normalized.modifiers ?? {},
                },
            ],
            needsClarification: normalized.action === "ASK_CLARIFICATION",
            clarificationQuestion: normalized.clarificationQuestion ?? null,
        };
    }

    let actions = normalized?.actions;

    if (typeof actions === "string") {
        try {
            actions = JSON.parse(actions);
        } catch {
            actions = [];
        }
    }

    actions = repairFlattenedActions(actions);

    if (!Array.isArray(actions)) {
        actions = [];
    }

    actions = actions.filter(
        (action) =>
            action &&
            typeof action === "object" &&
            !Array.isArray(action) &&
            typeof action.type === "string"
    );

    return {
        assistantMessage:
            normalized?.assistantMessage || "Got it. I updated your cart.",
        actions,
        needsClarification: Boolean(normalized?.needsClarification),
        clarificationQuestion: normalized?.clarificationQuestion ?? null,
    };
}

export async function parseOrderWithGemini({ message, cart }) {
    const compactMenu = getCompactMenuForLLM();

    const prompt = `
        You are the ordering assistant for The Intelligent Bistro.

        Return only valid JSON.

        The response must have this exact shape:
            {
            "assistantMessage": "string",
            "actions": [{
                "type": "ADD_ITEM | REMOVE_ITEM | UPDATE_QUANTITY | UPDATE_MODIFIERS | CLEAR_CART | SHOW_CART | CHECKOUT | ASK_CLARIFICATION",
                "itemId": "string or null",
                "quantity": 1,
                "targetCartItemId": "string or null",
            "modifiers": {}}],
            "needsClarification": false,
            "clarificationQuestion": null
            }   

        Important formatting rules:
            - The "actions" field must be an array of objects.
            - Never flatten action objects into arrays.
            - Never return actions like ["type", "ADD_ITEM", "itemId", "..."].
            - Never stringify the actions array.
            - If there are no modifiers, use {}.
            - If clarification is not needed, clarificationQuestion must be null.

        Example correct response:
        {
            "assistantMessage": "Added 2 medium Spicy Chicken Sandwiches and 1 large plain Sparkling Water to your cart.",
            "actions": [{
                "type": "ADD_ITEM",
                "itemId": "spicy_chicken_sandwich",
                "quantity": 2,
                "targetCartItemId": null,
                "modifiers": {
                    "spiceLevel": "medium"
                }
            },
            {
                "type": "ADD_ITEM",
                "itemId": "sparkling_water",
                "quantity": 1,
                "targetCartItemId": null,
                "modifiers": {
                    "size": "large",
                    "flavor": "plain"
                }
            }
            ],
        "needsClarification": false,
        "clarificationQuestion": null
        }

        Rules:
            1. Only use itemIds from the provided menu.
            2. Do not invent menu items, modifiers, prices, or sizes.
            3. If a required modifier is missing, use defaultModifiers from the menu.
            4. Only ask clarification when the item itself is ambiguous or unavailable.
            5. Use modifier group IDs and option IDs exactly as shown in the menu.

        Available menu:
            ${JSON.stringify(compactMenu, null, 2)}

        Current cart:
            ${JSON.stringify(cart, null, 2)}

        User message:
            "${message}"
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json"
            // responseSchema: zodToJsonSchema(OrderSchema),
        },
    });

    if (!response.text) {
        throw new Error("No response text received from Gemini.");
    }

    const parsedJson = JSON.parse(response.text);
    const normalizedJson = normalizeGeminiOrderResponse(parsedJson);
    return OrderSchema.parse(normalizedJson);
}