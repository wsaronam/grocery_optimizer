import { useState, useEffect } from "react";

import ProductList from "./components/ProductList.js";
import SideBar from "./components/SideBar.js";
import "./GroceryOptimizer.css";




export default function GroceryOptimizer({ onAdd }) {

    const [groceryList, setGroceryList] = useState([]);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    function incrementItem(barcode) {
        setGroceryList(prev =>
            prev.map(item =>
                item.product.barcode === barcode
                ? {...item, quantity: item.quantity + 1}
                : item
            )
        );
    }

    function decrementItem(barcode) {
        setGroceryList(prev =>
            prev.map(item =>
                item.product.barcode === barcode
                ? {...item, quantity: item.quantity - 1}
                : item
            )
            .filter(item => item.quantity > 0)
        );
    }

    function removeItem(barcode) {
        setGroceryList(prev => 
            prev.filter(item => item.product.barcode !== barcode)
        );
    }


    useEffect(() => {
        const savedList = localStorage.getItem("groceryList");
        if (savedList) {
            setGroceryList(JSON.parse(savedList));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("groceryList", JSON.stringify(groceryList));
    }, [groceryList]);


    async function handleSearch() {
        if (!query) return;

        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`);
            const data = await res.json();
            setResults(data);
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    }

    function addToList(product) {
        setGroceryList(prev => {
            const existing = prev.find(item => item.product.barcode === product.barcode);

            if (existing) {
                return prev.map(item =>
                    item.product.barcode === product.barcode
                    ? {...item, quantity: item.quantity + 1}
                    : item
                );
            }
            else {
                return [...prev, {product, quantity: 1}];
            }
        });
    }


    return (
        <div style={{display: "flex"}}>
            <div>
                <div className="search-container">
                    <h1 className="title">Grocery Optimizer</h1>
                    <input
                        className="search-bar"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for grocery items..."
                    />
                    <button className="search-button" onClick={handleSearch}>Search</button>
                </div>
                <div>
                    {loading && <p>Loading...</p>}

                    {error && <p>{error}</p>}

                    {!loading && !error && results.length > 0 &&
                        <ProductList items={results} onAdd={addToList} />
                    }
                </div>
            </div>
            <div>
                <SideBar 
                    items={groceryList}
                    onIncrement={incrementItem}
                    onDecrement={decrementItem}
                    onRemove={removeItem} 
                />
            </div>
        </div>
    )
}