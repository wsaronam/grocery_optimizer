import { useState } from "react";

import ProductList from "./components/ProductList.js";
import SideBar from "./components/SideBar.js";
import "./GroceryOptimizer.css";




export default function GroceryOptimizer({ onAdd }) {

    const [groceryList, setGroceryList] = useState([]);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


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

    function addToList(item) {
        setGroceryList(prev => [...prev, item]);
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
                <SideBar items={groceryList} />
            </div>
        </div>
    )
}