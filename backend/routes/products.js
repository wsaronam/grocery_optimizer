const express = require("express");
const router = express.Router();

const {searchProducts} = require("../services/openFoodFacts.js");




router.get("/search", async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({error: "Missing query"});

    try {
        const results = await searchProducts(query);
        res.json(results);
    }
    catch (err) {
        res.status(500).json({error: "Failed to fetch products"});
    }
});


module.exports = router;