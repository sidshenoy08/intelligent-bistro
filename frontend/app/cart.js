import { useRouter } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CartItemRow from "../src/components/CartItemRow";
import { useCartStore } from "../src/store/cartStore";
import {
    formatCurrency,
    getCartSubtotal,
    getCartTax,
    getCartTotal
} from "../src/utils/priceUtils";

export default function CartScreen() {
    const router = useRouter();

    const cart = useCartStore((state) => state.cart);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const removeItem = useCartStore((state) => state.removeItem);
    const clearCart = useCartStore((state) => state.clearCart);

    const subtotal = getCartSubtotal(cart);
    const tax = getCartTax(cart);
    const total = getCartTotal(cart);

    if (cart.length === 0) {
        return (
            <SafeAreaView className="flex-1 bg-gray-50">
                <View className="flex-1 items-center justify-center px-7">
                    <View className="w-full max-w-sm items-center">
                        <Text className="text-center text-3xl font-black text-bistro-dark">
                            Your cart is empty
                        </Text>

                        <Text className="mt-3 text-center text-base leading-6 text-gray-500">
                            Add items from the menu or ask the AI assistant to build your order.
                        </Text>

                        <Pressable
                            className="mt-8 w-56 rounded-2xl bg-bistro-dark py-3.5 active:scale-95"
                            onPress={() => router.push("/")}
                        >
                            <Text className="text-center text-base font-black text-white">
                                Browse Menu
                            </Text>
                        </Pressable>

                        <Pressable
                            className="mt-3 w-56 rounded-2xl bg-gray-100 py-3.5 active:scale-95"
                            onPress={() => router.push("/assistant")}
                        >
                            <Text className="text-center text-base font-black text-bistro-dark">
                                Ask AI Assistant
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <FlatList
                data={cart}
                keyExtractor={(item) => item.cartItemId}
                contentContainerStyle={{
                    padding: 18,
                    paddingBottom: 40,
                }}
                ListHeaderComponent={
                    <View className="mb-5 flex-row items-center justify-between">
                        <Text className="text-3xl font-black text-bistro-dark">
                            Your Order
                        </Text>

                        <Pressable onPress={clearCart}>
                            <Text className="font-black text-red-500">Clear cart</Text>
                        </Pressable>
                    </View>
                }
                renderItem={({ item }) => (
                    <CartItemRow
                        item={item}
                        onIncrease={() =>
                            updateQuantity(item.cartItemId, item.quantity + 1)
                        }
                        onDecrease={() =>
                            updateQuantity(item.cartItemId, item.quantity - 1)
                        }
                        onRemove={() => removeItem(item.cartItemId)}
                    />
                )}
                ListFooterComponent={
                    <View className="mt-2 rounded-3xl bg-white p-5 shadow-sm">
                        <View className="mb-3 flex-row justify-between">
                            <Text className="text-gray-500">Subtotal</Text>
                            <Text className="font-bold text-bistro-dark">
                                {formatCurrency(subtotal)}
                            </Text>
                        </View>

                        <View className="mb-3 flex-row justify-between">
                            <Text className="text-gray-500">Tax</Text>
                            <Text className="font-bold text-bistro-dark">
                                {formatCurrency(tax)}
                            </Text>
                        </View>

                        <View className="my-2 h-px bg-gray-200" />

                        <View className="mb-4 flex-row justify-between">
                            <Text className="text-lg font-black text-bistro-dark">Total</Text>
                            <Text className="text-lg font-black text-bistro-dark">
                                {formatCurrency(total)}
                            </Text>
                        </View>

                        <Pressable className="rounded-2xl bg-bistro-dark py-4 active:scale-95">
                            <Text className="text-center text-base font-black text-white">
                                Checkout
                            </Text>
                        </Pressable>

                        <Pressable
                            className="mt-3 rounded-2xl bg-gray-100 py-4 active:scale-95"
                            onPress={() => router.push("/assistant")}
                        >
                            <Text className="text-center text-base font-black text-bistro-dark">
                                Modify order with AI
                            </Text>
                        </Pressable>
                    </View>
                }
            />
        </SafeAreaView>
    );
}