import { Image, Pressable, Text, View } from "react-native";
import { formatCurrency } from "../utils/priceUtils";

export default function MenuCard({ item, onPress }) {
    return (
        <Pressable
            onPress={onPress}
            className="mb-5 overflow-hidden rounded-3xl bg-white shadow-sm active:scale-[0.98]"
        >
            {item.image ? (
                <Image
                    source={{ uri: item.image }}
                    className="h-44 w-full bg-gray-200"
                    resizeMode="cover"
                />
            ) : (
                <View className="h-44 w-full items-center justify-center bg-gray-200">
                    <Text className="text-5xl">🍽️</Text>
                </View>
            )}

            <View className="p-4">
                <View className="flex-row items-start justify-between gap-3">
                    <Text className="flex-1 text-lg font-extrabold text-bistro-dark">
                        {item.name}
                    </Text>

                    {item.popular ? (
                        <View className="rounded-full bg-amber-100 px-3 py-1">
                            <Text className="text-xs font-bold text-amber-800">Popular</Text>
                        </View>
                    ) : null}
                </View>

                <Text className="mt-2 text-sm leading-5 text-gray-500" numberOfLines={2}>
                    {item.description || "Freshly prepared and made to order."}
                </Text>

                <View className="mt-4 flex-row items-center justify-between">
                    <Text className="text-lg font-black text-bistro-dark">
                        {formatCurrency(item.basePrice)}
                    </Text>

                    <View className="rounded-full bg-bistro-dark px-4 py-2">
                        <Text className="text-sm font-bold text-white">View</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}