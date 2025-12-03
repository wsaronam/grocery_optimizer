import logo from './logo.svg';
import './App.css';




function App() {

  async function handleSearch() {
    const res = await fetch(`/api/products/search?q=milk`);
    const data = await res.json();
    console.log(data);
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Grocery Optimizer</h1>
        <button onClick={handleSearch}>Test</button>
      </header>
    </div>
  );
}

export default App;
