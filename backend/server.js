const express = require("express");
const cors = require("cors");
const productsRoute = require("./routes/products.js");


const app = express();
app.use(cors());
app.use(express.json());




// test
app.get("/", (req, res) => {
    res.json({ message: "Backend running!" });
});

// api call to get product data
app.use("/api/products", productsRoute);


// Starts server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});