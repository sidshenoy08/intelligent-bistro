import { menu } from "../menu.js";

export function getCompactMenuForLLM() {
    return menu.items
        .filter((item) => item.available)
        .map((item) => ({
            id: item.id,
            name: item.name,
            categoryId: item.categoryId,
            basePrice: item.basePrice,
            dietaryTags: item.dietaryTags || [],
            defaultModifiers: item.defaultModifiers || {},
            modifiers:
                item.modifierGroups?.map((group) => ({
                    id: group.id,
                    name: group.name,
                    type: group.type,
                    required: Boolean(group.required),
                    options: group.options.map((option) => ({
                        id: option.id,
                        name: option.name,
                    })),
                })) || [],
        }));
}