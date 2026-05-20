import { create } from "zustand";

function makeCartItemId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export const useCartStore = create((set, get) => ({
    cart: [],

    addItem: ({ item, quantity = 1, modifiers = {} }) => {
        set((state) => ({
            cart: [
                ...state.cart,
                {
                    cartItemId: makeCartItemId(),
                    itemId: item.id,
                    name: item.name,
                    basePrice: item.basePrice,
                    quantity,
                    modifiers,
                },
            ],
        }));
    },

    removeItem: (cartItemId) => {
        set((state) => ({
            cart: state.cart.filter((item) => item.cartItemId !== cartItemId),
        }));
    },

    updateQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
            get().removeItem(cartItemId);
            return;
        }

        set((state) => ({
            cart: state.cart.map((item) =>
                item.cartItemId === cartItemId ? { ...item, quantity } : item
            ),
        }));
    },

    updateModifiers: (cartItemId, modifiers) => {
        set((state) => ({
            cart: state.cart.map((item) =>
                item.cartItemId === cartItemId
                    ? {
                        ...item,
                        modifiers: {
                            ...item.modifiers,
                            ...modifiers,
                        },
                    }
                    : item
            ),
        }));
    },

    clearCart: () => {
        set({ cart: [] });
    },

    applyActions: (actions, menuItems) => {
        const {
            addItem,
            removeItem,
            updateQuantity,
            updateModifiers,
            clearCart,
        } = get();

        for (const action of actions) {
            switch (action.type) {
                case "ADD_ITEM": {
                    const menuItem = menuItems.find((item) => item.id === action.itemId);

                    if (!menuItem) break;

                    addItem({
                        item: menuItem,
                        quantity: action.quantity || 1,
                        modifiers: action.modifiers || {},
                    });

                    break;
                }

                case "REMOVE_ITEM": {
                    if (action.targetCartItemId) {
                        removeItem(action.targetCartItemId);
                    } else if (action.itemId) {
                        const matchingItem = get().cart.find(
                            (item) => item.itemId === action.itemId
                        );

                        if (matchingItem) {
                            removeItem(matchingItem.cartItemId);
                        }
                    }

                    break;
                }

                case "UPDATE_QUANTITY": {
                    if (action.targetCartItemId) {
                        updateQuantity(action.targetCartItemId, action.quantity);
                    } else if (action.itemId) {
                        const matchingItem = get().cart.find(
                            (item) => item.itemId === action.itemId
                        );

                        if (matchingItem) {
                            updateQuantity(matchingItem.cartItemId, action.quantity);
                        }
                    }

                    break;
                }

                case "UPDATE_MODIFIERS": {
                    if (action.targetCartItemId) {
                        updateModifiers(action.targetCartItemId, action.modifiers || {});
                    } else if (action.itemId) {
                        const matchingItem = get().cart.find(
                            (item) => item.itemId === action.itemId
                        );

                        if (matchingItem) {
                            updateModifiers(matchingItem.cartItemId, action.modifiers || {});
                        }
                    }

                    break;
                }

                case "CLEAR_CART": {
                    clearCart();
                    break;
                }

                default:
                    break;
            }
        }
    },
}));