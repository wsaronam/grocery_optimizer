import { useState } from "react";

import ProductCard from "./components/ProductCard.js";




export default function GroceryOptimizer() {

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


    return (
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
            <div className="product-card">
                {loading && <p>Loading...</p>}

                {error && <p>{error}</p>}

                {!loading && !error && 
                    <ul>
                        {results.map(p => (
                            <ProductCard product={p} />
                        ))}
                    </ul>
                }
            </div>
        </div>
    )
}