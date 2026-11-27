import { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [showProducts, setShowProducts] = useState(false);
  return (
    <div className="app-container">
      <div className={`landing-page ${showProducts ? 'fade-out' : ''}`}>
        <div className="landing-content">
          <h1>Paradise Nursery</h1>
          <AboutUs />
          <button className="get-started-button" onClick={() => setShowProducts(true)}>
            Get Started
          </button>
        </div>
      </div>
      {showProducts && <ProductList />}
    </div>
  );
}

export default App;
