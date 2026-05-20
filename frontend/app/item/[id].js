import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
import { fetchMenu } from "../../src/api/bistroApi";
import { useCartStore } from "../../src/store/cartStore";
import { formatCurrency } from "../../src/utils/priceUtils";

export default function ItemDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const addItem = useCartStore((state) => state.addItem);

    const [menu, setMenu] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedModifiers, setSelectedModifiers] = useState({});

    useEffect(() => {
        async function loadMenu() {
            const data = await fetchMenu();
            setMenu(data);
        }

        loadMenu();
    }, []);

    const item = useMemo(() => {
        return menu?.items?.find((menuItem) => menuItem.id === id);
    }, [menu, id]);

    useEffect(() => {
        if (!item) return;

        const defaults = item.defaultModifiers || {};
        setSelectedModifiers(defaults);
    }, [item]);

    if (!menu || !item) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    function selectSingleModifier(groupId, optionId) {
        setSelectedModifiers((current) => ({
            ...current,
            [groupId]: optionId,
        }));
    }

    function toggleMultiModifier(groupId, optionId) {
        setSelectedModifiers((current) => {
            const currentValues = Array.isArray(current[groupId])
                ? current[groupId]
                : [];

            const exists = currentValues.includes(optionId);

            return {
                ...current,
                [groupId]: exists
                    ? currentValues.filter((value) => value !== optionId)
                    : [...currentValues, optionId],
            };
        });
    }

    function handleAddToCart() {
        addItem({
            item,
            quantity,
            modifiers: selectedModifiers,
        });

        router.push("/cart");
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {item.image ? (
                <Image source={{ uri: item.image }} style={styles.image} />
            ) : (
                <View style={styles.placeholder}>
                    <Text style={styles.placeholderText}>🍽️</Text>
                </View>
            )}

            <View style={styles.card}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>
                    {item.description || "Freshly prepared and made to order."}
                </Text>
                <Text style={styles.price}>{formatCurrency(item.basePrice)}</Text>

                <View style={styles.quantityBox}>
                    <Text style={styles.sectionTitle}>Quantity</Text>

                    <View style={styles.quantityControls}>
                        <Pressable
                            style={styles.quantityButton}
                            onPress={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                            <Text style={styles.quantityButtonText}>−</Text>
                        </Pressable>

                        <Text style={styles.quantityText}>{quantity}</Text>

                        <Pressable
                            style={styles.quantityButton}
                            onPress={() => setQuantity(quantity + 1)}
                        >
                            <Text style={styles.quantityButtonText}>+</Text>
                        </Pressable>
                    </View>
                </View>

                {item.modifierGroups?.map((group) => (
                    <View key={group.id} style={styles.modifierGroup}>
                        <Text style={styles.sectionTitle}>{group.name}</Text>

                        <View style={styles.options}>
                            {group.options.map((option) => {
                                const selected =
                                    group.type === "single"
                                        ? selectedModifiers[group.id] === option.id
                                        : Array.isArray(selectedModifiers[group.id]) &&
                                        selectedModifiers[group.id].includes(option.id);

                                return (
                                    <Pressable
                                        key={option.id}
                                        style={[styles.optionChip, selected && styles.optionActive]}
                                        onPress={() => {
                                            if (group.type === "single") {
                                                selectSingleModifier(group.id, option.id);
                                            } else {
                                                toggleMultiModifier(group.id, option.id);
                                            }
                                        }}
                                    >
                                        <Text
                                            style={[
                                                styles.optionText,
                                                selected && styles.optionTextActive,
                                            ]}
                                        >
                                            {option.name}
                                        </Text>
                                    </Pressable>
                                );
                            })}
                        </View>
                    </View>
                ))}

                <Pressable style={styles.addButton} onPress={handleAddToCart}>
                    <Text style={styles.addButtonText}>Add to Cart</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        paddingBottom: 40,
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: "100%",
        height: 280,
        backgroundColor: "#E5E7EB",
    },
    placeholder: {
        height: 280,
        backgroundColor: "#E5E7EB",
        alignItems: "center",
        justifyContent: "center",
    },
    placeholderText: {
        fontSize: 60,
    },
    card: {
        backgroundColor: "#FFFFFF",
        marginTop: -24,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        padding: 22,
    },
    name: {
        fontSize: 28,
        fontWeight: "900",
        color: "#111827",
    },
    description: {
        marginTop: 10,
        color: "#6B7280",
        fontSize: 15,
        lineHeight: 22,
    },
    price: {
        marginTop: 14,
        fontSize: 22,
        fontWeight: "900",
        color: "#111827",
    },
    quantityBox: {
        marginTop: 26,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "800",
        color: "#111827",
        marginBottom: 12,
    },
    quantityControls: {
        flexDirection: "row",
        alignItems: "center",
    },
    quantityButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#111827",
        alignItems: "center",
        justifyContent: "center",
    },
    quantityButtonText: {
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: "800",
    },
    quantityText: {
        fontSize: 20,
        fontWeight: "800",
        marginHorizontal: 20,
    },
    modifierGroup: {
        marginTop: 26,
    },
    options: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    optionChip: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 999,
        backgroundColor: "#F3F4F6",
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    optionActive: {
        backgroundColor: "#111827",
        borderColor: "#111827",
    },
    optionText: {
        color: "#374151",
        fontWeight: "700",
    },
    optionTextActive: {
        color: "#FFFFFF",
    },
    addButton: {
        backgroundColor: "#111827",
        paddingVertical: 16,
        borderRadius: 18,
        marginTop: 34,
        alignItems: "center",
    },
    addButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "900",
    },
});