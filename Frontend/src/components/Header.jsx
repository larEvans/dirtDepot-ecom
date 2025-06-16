import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCart } from '../../api';

export default function Header() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    fetchCart().then(data => setCount(data.length));
  }, []);

  return (
    <header className="header container">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/order">Order</Link>
        <Link to="/cart" className="cart-link">
          🛒 Cart ({count})
        </Link>
      </nav>
    </header>
  );
}