const API_URL = "http://127.0.0.1:3000/api";

// If testing on a physical phone, replace localhost with your laptop IP.
// Example:
// const API_URL = "http://192.168.1.25:3000/api";

export async function fetchMenu() {
    const response = await fetch(`${API_URL}/menu`);
    if (!response.ok) {
        throw new Error("Failed to fetch menu");
    }
    return response.json();
}

export async function sendOrderMessage({ message, cart }) {
    const response = await fetch(`${API_URL}/chat/order`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            message,
            cart,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to parse order message");
    }

    return response.json();
}