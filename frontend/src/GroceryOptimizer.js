import { useState, useEffect } from "react";

import ProductList from "./components/ProductList.js";
import SideBar from "./components/SideBar.js";
import "./GroceryOptimizer.css";




export default function GroceryOptimizer({ onAdd }) {

    const [groceryList, setGroceryList] = useState([]);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [optimizationResult, setOptimizationResult] = useState(null);
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

    async function handleOptimize() {
        const res = await fetch("/api/optimize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(groceryList),
        })

        const data = await res.json();
        setOptimizationResult(data);
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
                    <button onClick={handleOptimize}>
                        Test Optimize
                    </button>
                    {optimizationResult && (
                        <div>
                            <p>Cheapest Store: {optimizationResult.cheapestStore}</p>
                            {Object.entries(optimizationResult.stores).map(([store, data]) => (
                                <div key={store}>
                                    <p>{store} - ${data.total}</p>
                                    <ul>
                                        {data.breakdown.map(item => (
                                            <li key={item.name}>
                                                {item.name} x{item.quantity} - ${item.price}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}
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