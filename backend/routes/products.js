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


router.get("/:barcode", async (req, res) => {
    try {
        const product = await getProductByBarcode(req.params.barcode);
        if (!product) return res.status(404).json({error: "Not found"});
        res.json(product);
    } 
    catch {
        res.status(500).json({error: "Failed to fetch product"});
    }
});


module.exports = router;