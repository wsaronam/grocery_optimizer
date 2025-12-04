import logo from './logo.svg';
import './App.css';

import { useState } from "react";




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
            <li>
              {p.name} - {p.brand}
              <img src={p.image} alt="" width={50} />
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
