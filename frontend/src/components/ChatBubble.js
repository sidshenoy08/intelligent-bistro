import { Text, View } from "react-native";

export default function ChatBubble({ role, content }) {
    const isUser = role === "user";

    return (
        <View
            className={
                isUser
                    ? "mb-3 flex-row justify-end"
                    : "mb-3 flex-row justify-start"
            }
        >
            <View
                className={
                    isUser
                        ? "max-w-[82%] rounded-3xl rounded-br-md bg-bistro-dark px-4 py-3"
                        : "max-w-[82%] rounded-3xl rounded-bl-md bg-white px-4 py-3 shadow-sm"
                }
            >
                <Text
                    className={
                        isUser
                            ? "text-[15px] leading-6 text-white"
                            : "text-[15px] leading-6 text-bistro-dark"
                    }
                >
                    {content}
                </Text>
            </View>
        </View>
    );
}