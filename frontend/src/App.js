import logo from './logo.svg';
import './App.css';

import GroceryOptimizer from './GroceryOptimizer.js';




function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <GroceryOptimizer />
      </header>
    </div>
  );
}

export default App;
