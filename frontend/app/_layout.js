import "../global.css";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <View style={{ flex: 1, height: "100%", minHeight: 0 }}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#111827",
          },
          headerTintColor: "#fff",
          contentStyle: {
            backgroundColor: "#F9FAFB",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Menu",
          }}
        />

        <Stack.Screen
          name="item/[id]"
          options={{
            title: "Item Details",
          }}
        />

        <Stack.Screen
          name="cart"
          options={{
            title: "Your Cart",
          }}
        />

        <Stack.Screen
          name="assistant"
          options={{
            title: "AI Assistant",
          }}
        />
      </Stack>
    </View>
  );
}