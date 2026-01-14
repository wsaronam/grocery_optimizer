const express = require("express");
const router = express.Router();

const {STORE_MULTIPLIERS, estimatePrice} = require("../services/pricingEngine.js");




router.post("/", (req, res) => {
    const groceryList = req.body;

    const storeTotals = {};

    for (const store of Object.keys(STORE_MULTIPLIERS)) {
        let total = 0;
        const breakdown = [];

        for (const item of groceryList) {
            const itemPrice = estimatePrice(item.product, item.quantity, store);
            total += itemPrice;
            breakdown.push({
                name: item.product.name,
                quantity: item.quantity,
                price: itemPrice,
            });
        }

        storeTotals[store] = {
            total: Number(total.toFixed(2)),
            breakdown
        };
    }

    const cheapestStore = Object.entries(storeTotals).sort((a, b) => a[1].total - b[1].total)[0][0];

    res.json({
        cheapestStore,
        stores: storeTotals
    });
});



module.exports = router;