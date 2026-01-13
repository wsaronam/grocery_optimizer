const express = require("express");
const router = express.Router();

const {STORE_MULTIPLIERS, estimatePrice} = require("../services/pricingEngine.js");




router.post("/", (req, res) => {
    console.log("router test passed");
});



module.exports = router;