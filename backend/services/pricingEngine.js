const STORE_MULTIPLIERS = {
    walmart: 1.0,
    target: 1.1,
    costco: 0.9,
    sams_club: 0.95,
};

const BASE_CATEGORY_PRICES = {
    beverages: 2.5,
    dairy: 3.0,
    snacks: 2.2,
    produce: 1.5,
    meat: 5.0,
    pantry: 2.0,
    default: 2.5,
};



function estimatePrice(product, quantity, store) {
    const category = product.category?.toLowerCase() || "default";
    const basePrice = BASE_CATEGORY_PRICES[category] || BASE_CATEGORY_PRICES.default;
    const multiplier = STORE_MULTIPLIERS[store];
    const price = basePrice * multiplier * quantity;
    return Number(price.toFixed(2));
}




module.exports = {
    STORE_MULTIPLIERS,
    estimatePrice
}