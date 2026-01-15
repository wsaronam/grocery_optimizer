const axios = require("axios");




async function searchProducts(query) {
    const url = "https://world.openfoodfacts.org/cgi/search.pl";

    const params = {
        search_terms: query,
        json: 1,
        page_size: 20
    };

    const res = await axios.get(url, {params});

    return res.data.products.map(p => ({
        id: p.id,
        barcode: p.code,
        name: p.product_name,
        brand: p.brands,
        quantity: p.quantity,
        image: p.image_front_thumb_url,
    }));
}

async function getProductByBarcode(barcode) {
    const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
    const res = await axios.get(url);

    if (!res.data.product) return null;

    const p = res.data.product;

    return {
        id: p.id,
        barcode: p.code,
        name: p.product_name,
        brand: p.brands,
        quantity: p.quantity,
        image: p.image_front_thumb_url,
    };
}


module.exports = {searchProducts, getProductByBarcode};