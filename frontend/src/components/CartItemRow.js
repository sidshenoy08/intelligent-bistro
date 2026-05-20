import { Pressable, Text, View } from "react-native";
import { formatCurrency } from "../utils/priceUtils";

export default function CartItemRow({
    item,
    onIncrease,
    onDecrease,
    onRemove,
}) {
    const modifierText =
        item.modifiers && Object.keys(item.modifiers).length > 0
            ? Object.entries(item.modifiers)
                // .filter(([key, value]) => {
                //     if ((key === "addOns" || key === "removals") && Array.isArray(value)) {
                //         return value.length > 0;
                //     }

                //     return value !== null && value !== undefined && value !== "";
                // })
                .map(([key, value]) => {
                    if (Array.isArray(value)) {
                        return `${key}: ${value.join(", ")}`;
                    }
                    return `${key}: ${value}`;
                })
                .join(" • ")
            : "";

    return (
        <View className="mb-4 flex-row gap-3 rounded-3xl bg-white p-4 shadow-sm">
            <View className="flex-1">
                <Text className="text-base font-black text-bistro-dark">
                    {item.name}
                </Text>

                {modifierText ? (
                    <Text className="mt-1 text-sm leading-5 text-gray-500" numberOfLines={2}>
                        {modifierText}
                    </Text>
                ) : null}

                <Text className="mt-2 font-extrabold text-bistro-dark">
                    {formatCurrency(item.basePrice)}
                </Text>
            </View>

            <View className="items-end justify-between">
                <View className="flex-row items-center">
                    <Pressable
                        className="h-8 w-8 items-center justify-center rounded-full bg-gray-100"
                        onPress={onDecrease}
                    >
                        <Text className="text-lg font-black text-bistro-dark">−</Text>
                    </Pressable>

                    <Text className="mx-3 font-black text-bistro-dark">
                        {item.quantity}
                    </Text>

                    <Pressable
                        className="h-8 w-8 items-center justify-center rounded-full bg-gray-100"
                        onPress={onIncrease}
                    >
                        <Text className="text-lg font-black text-bistro-dark">+</Text>
                    </Pressable>
                </View>

                <Pressable onPress={onRemove}>
                    <Text className="text-sm font-bold text-red-500">Remove</Text>
                </Pressable>
            </View>
        </View>
    );
}