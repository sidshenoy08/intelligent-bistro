import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    View,
    StyleSheet
} from "react-native";
import { fetchMenu } from "../src/api/bistroApi";
import { useCartStore } from "../src/store/cartStore";
import MenuCard from "../src/components/MenuCard";

export default function MenuScreen() {
    const router = useRouter();
    const cart = useCartStore((state) => state.cart);

    const [menu, setMenu] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [loading, setLoading] = useState(true);

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        async function loadMenu() {
            try {
                const data = await fetchMenu();
                setMenu(data);
            } catch (error) {
                console.error("Menu load error:", error);
            } finally {
                setLoading(false);
            }
        }

        loadMenu();
    }, []);

    const menuItems = Array.isArray(menu?.items) ? menu.items : [];
    const categories = Array.isArray(menu?.categories) ? menu.categories : [];

    const filteredItems = useMemo(() => {
        if (selectedCategory === "all") {
            return menuItems;
        }

        return menuItems.filter((item) => item.categoryId === selectedCategory);
    }, [menuItems, selectedCategory]);

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center bg-gray-50">
                <ActivityIndicator size="large" />
                <Text className="mt-3 text-gray-500">Loading today’s menu...</Text>
            </View>
        );
    }

    if (!menu) {
        return (
            <View className="flex-1 items-center justify-center bg-gray-50">
                <Text className="font-bold text-bistro-dark">Could not load menu.</Text>
            </View>
        );
    }

    return (
        <>
            <View style={styles.hero}>
                <View>
                    <Text style={styles.eyebrow}>AI-powered ordering</Text>
                    <Text style={styles.title}>What are you craving?</Text>
                    <Text style={styles.subtitle}>
                        Browse the menu or ask the assistant to build your order.
                    </Text>
                </View>

                <Pressable style={styles.cartButton} onPress={() => router.push("/cart")}>
                    <Ionicons name="bag-outline" size={24} color="#111827" />
                    {cartCount > 0 ? (
                        <View style={styles.cartBadge}>
                            <Text style={styles.cartBadgeText}>{cartCount}</Text>
                        </View>
                    ) : null}
                </Pressable>
            </View>

            <View style={{ flex: 1, backgroundColor: "yellow" }}>
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{
                        padding: 20,
                        paddingBottom: 120,
                    }}
                >
                    {filteredItems.map((item) => (
                        <MenuCard
                            key={item.id}
                            item={item}
                            onPress={() => router.push(`/item/${item.id}`)}
                        />
                    ))}
                </ScrollView>
            </View>
            <Pressable
                style={styles.assistantButton}
                onPress={() => router.push("/assistant")}
            >
                <Ionicons name="sparkles" size={22} color="#FFFFFF" />
                <Text style={styles.assistantButtonText}>Ask AI</Text>
            </Pressable>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    loadingText: {
        marginTop: 12,
        color: "#6B7280",
    },
    hero: {
        backgroundColor: "#111827",
        padding: 22,
        paddingBottom: 28,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    eyebrow: {
        color: "#FBBF24",
        fontSize: 13,
        fontWeight: "800",
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    title: {
        color: "#FFFFFF",
        fontSize: 30,
        fontWeight: "900",
        marginTop: 8,
    },
    subtitle: {
        color: "#D1D5DB",
        fontSize: 14,
        marginTop: 8,
        maxWidth: 260,
        lineHeight: 20,
    },
    cartButton: {
        backgroundColor: "#FFFFFF",
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    cartBadge: {
        position: "absolute",
        top: -4,
        right: -4,
        backgroundColor: "#EF4444",
        width: 22,
        height: 22,
        borderRadius: 11,
        alignItems: "center",
        justifyContent: "center",
    },
    cartBadgeText: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "800",
    },
    categoryList: {
        backgroundColor: "#FFFFFF",
        paddingVertical: 12,
    },
    categoryContent: {
        paddingHorizontal: 16,
    },
    categoryChip: {
        paddingHorizontal: 16,
        paddingVertical: 9,
        borderRadius: 999,
        backgroundColor: "#F3F4F6",
        marginRight: 10,
    },
    categoryChipActive: {
        backgroundColor: "#111827",
    },
    categoryText: {
        color: "#4B5563",
        fontWeight: "700",
    },
    categoryTextActive: {
        color: "#FFFFFF",
    },
    listContent: {
        padding: 16,
        paddingBottom: 110,
    },
    assistantButton: {
        position: "absolute",
        bottom: 24,
        right: 20,
        backgroundColor: "#111827",
        borderRadius: 999,
        paddingHorizontal: 18,
        paddingVertical: 14,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 8 },
        elevation: 4,
    },
    assistantButtonText: {
        color: "#FFFFFF",
        fontWeight: "800",
        fontSize: 15,
    },
});