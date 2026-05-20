import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { fetchMenu, sendOrderMessage } from "../src/api/bistroApi";
import ChatBubble from "../src/components/ChatBubble";
import { useCartStore } from "../src/store/cartStore";

const starterPrompts = [
    "Add two spicy chicken sandwiches and a large sparkling water",
    "Add fries with ranch",
    "What is in my cart?",
    "Clear my cart",
];

export default function AssistantScreen() {
    const router = useRouter();
    const listRef = useRef(null);

    const cart = useCartStore((state) => state.cart);
    const applyActions = useCartStore((state) => state.applyActions);

    const [menu, setMenu] = useState(null);
    const [messages, setMessages] = useState([
        {
            id: "welcome",
            role: "assistant",
            content:
                "Hi, I’m your AI ordering assistant. Tell me what you’d like, and I’ll update your cart.",
        },
    ]);
    const [input, setInput] = useState("");
    const [sending, setSending] = useState(false);

    useEffect(() => {
        async function loadMenu() {
            const data = await fetchMenu();
            setMenu(data);
        }

        loadMenu();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            listRef.current?.scrollToEnd({ animated: true });
        }, 100);
    }, [messages]);

    async function handleSend(customMessage) {
        const messageText = customMessage || input.trim();

        if (!messageText || sending) return;

        setInput("");

        const userMessage = {
            id: `${Date.now()}-user`,
            role: "user",
            content: messageText,
        };

        setMessages((current) => [...current, userMessage]);
        setSending(true);

        try {
            const result = await sendOrderMessage({
                message: messageText,
                cart,
            });

            const assistantMessage = {
                id: `${Date.now()}-assistant`,
                role: "assistant",
                content: result.assistantMessage,
            };

            setMessages((current) => [...current, assistantMessage]);

            if (!result.needsClarification && menu?.items) {
                applyActions(result.actions, menu.items);
            }
        } catch (error) {
            console.error("Assistant error:", error);

            setMessages((current) => [
                ...current,
                {
                    id: `${Date.now()}-error`,
                    role: "assistant",
                    content:
                        "Sorry, I had trouble processing that. Could you try again?",
                },
            ]);
        } finally {
            setSending(false);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                keyboardVerticalOffset={90}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>AI Order Assistant</Text>
                    <Text style={styles.subtitle}>
                        Add, remove, or modify items using natural language.
                    </Text>
                </View>

                <FlatList
                    ref={listRef}
                    data={messages}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.chatContent}
                    renderItem={({ item }) => (
                        <ChatBubble role={item.role} content={item.content} />
                    )}
                    ListFooterComponent={
                        sending ? (
                            <View style={styles.typingRow}>
                                <ActivityIndicator size="small" />
                                <Text style={styles.typingText}>Thinking...</Text>
                            </View>
                        ) : null
                    }
                />

                <View style={styles.prompts}>
                    <FlatList
                        horizontal
                        data={starterPrompts}
                        keyExtractor={(item) => item}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Pressable
                                style={styles.promptChip}
                                onPress={() => handleSend(item)}
                            >
                                <Text style={styles.promptText}>{item}</Text>
                            </Pressable>
                        )}
                    />
                </View>

                <View style={styles.inputBar}>
                    <TextInput
                        style={styles.input}
                        value={input}
                        onChangeText={setInput}
                        placeholder="Tell the AI what to order..."
                        placeholderTextColor="#9CA3AF"
                        multiline
                    />

                    <Pressable
                        style={[styles.sendButton, sending && styles.sendButtonDisabled]}
                        onPress={() => handleSend()}
                        disabled={sending}
                    >
                        <Text style={styles.sendButtonText}>Send</Text>
                    </Pressable>
                </View>

                <Pressable style={styles.cartButton} onPress={() => router.push("/cart")}>
                    <Text style={styles.cartButtonText}>View Cart</Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    header: {
        padding: 18,
        backgroundColor: "#111827",
    },
    title: {
        color: "#FFFFFF",
        fontSize: 26,
        fontWeight: "900",
    },
    subtitle: {
        color: "#D1D5DB",
        marginTop: 6,
        lineHeight: 20,
    },
    chatContent: {
        padding: 16,
        paddingBottom: 20,
    },
    typingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
        marginLeft: 4,
    },
    typingText: {
        marginLeft: 8,
        color: "#6B7280",
    },
    prompts: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
    },
    promptChip: {
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 999,
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    promptText: {
        color: "#374151",
        fontWeight: "700",
        fontSize: 13,
    },
    inputBar: {
        flexDirection: "row",
        alignItems: "flex-end",
        padding: 12,
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
    },
    input: {
        flex: 1,
        minHeight: 46,
        maxHeight: 110,
        backgroundColor: "#F3F4F6",
        borderRadius: 18,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 15,
        color: "#111827",
    },
    sendButton: {
        backgroundColor: "#111827",
        paddingHorizontal: 18,
        paddingVertical: 13,
        borderRadius: 16,
        marginLeft: 10,
    },
    sendButtonDisabled: {
        opacity: 0.5,
    },
    sendButtonText: {
        color: "#FFFFFF",
        fontWeight: "900",
    },
    cartButton: {
        backgroundColor: "#FBBF24",
        marginHorizontal: 12,
        marginBottom: 12,
        borderRadius: 16,
        paddingVertical: 14,
        alignItems: "center",
    },
    cartButtonText: {
        color: "#111827",
        fontWeight: "900",
        fontSize: 15,
    },
});