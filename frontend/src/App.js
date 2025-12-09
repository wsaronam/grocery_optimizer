import logo from './logo.svg';
import './App.css';

import { useState } from "react";

import ProductCard from "./components/ProductCard";




function App() {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);


  async function handleSearch() {
    const res = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data);
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Grocery Optimizer</h1>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for grocery items..."
        />
        <button onClick={handleSearch}>Search</button>
        <ul>
          {results.map(p => (
            <ProductCard product={p} />
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
