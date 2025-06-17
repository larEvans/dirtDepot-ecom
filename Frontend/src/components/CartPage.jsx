import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCart, removeFromCart } from '../../api';
import '../styles.css';

export default function CartPage() {
  const [cart, setCart] = useState([]);

  // Load cart items
  const loadCart = () => fetchCart().then(setCart);
  useEffect(() => { loadCart(); }, []);

  const handleRemove = async (id) => {
    await removeFromCart(id);
    loadCart();
  };

  const unitPrice = 50; // $50 per load (or derive dynamically)

  // Compute total
  const total = cart.reduce((sum, item) => sum + item.quantity * unitPrice, 0);

  return (
    <section className="cart-page container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id}>
                  <td>{item.productName}</td>
                  <td>${unitPrice.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>${(unitPrice * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="remove-button"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" style={{ textAlign: 'right', fontWeight: 600 }}>
                  Total:
                </td>
                <td colSpan="2" style={{ fontWeight: 600 }}>
                  ${total.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>

          <a href="/checkout" className="proceed-button">
            Proceed to Checkout
          </a>
        </>
      )}
    </section>
  );
}