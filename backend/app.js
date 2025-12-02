const express = require("express");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());




// test
app.get("/", (req, res) => {
    res.json({ message: "Backend running!" });
});


// Starts server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});