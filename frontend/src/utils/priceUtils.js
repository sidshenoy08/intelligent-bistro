export function getCartSubtotal(cart) {
    return cart.reduce((total, item) => {
        return total + item.basePrice * item.quantity;
    }, 0);
}

export function getCartTax(cart, taxRate = 0.08) {
    return getCartSubtotal(cart) * taxRate;
}

export function getCartTotal(cart, taxRate = 0.08) {
    return getCartSubtotal(cart) + getCartTax(cart, taxRate);
}

export function formatCurrency(value) {
    return `$${value.toFixed(2)}`;
}