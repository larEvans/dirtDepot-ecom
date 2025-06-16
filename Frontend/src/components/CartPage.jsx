import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCart, removeFromCart } from '../../api';
import '../styles.css';

export default function CartPage() {
  const [cart, setCart] = useState([]);

  const loadCart = () => fetchCart().then(setCart);
  useEffect(() => { loadCart(); }, []);

  return (
    <section className="cart-page container">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map(item => (
              <li key={item.id} className="cart-item">
                {item.productName} — {item.quantity} load{item.quantity > 1 ? 's' : ''}
                <button onClick={() => { removeFromCart(item.id).then(loadCart); }}>
                  Remove
                </button>
              </li>
            ))}
          </ul>

          {/* Proceed to checkout button */}
          <Link to="/pay" className="proceed-button">
            Proceed to Checkout
          </Link>
        </>
      )}
    </section>
  );
}