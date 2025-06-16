import React, { useState, useEffect } from 'react';
import { fetchCart } from '../../api';
import { loadStripe } from '@stripe/stripe-js';
import '../styles.css';

const stripePromise = loadStripe('<YOUR_PUBLISHABLE_KEY>');

export default function CheckoutPage() {
  const [cart, setCart]     = useState([]);
  const [totalCents, setTotal] = useState(0);

  useEffect(() => {
    fetchCart().then(items => {
      setCart(items);
      // assume $50/load → 5000¢; you could also include price on each item
      const subtotal = items.reduce(
        (sum, i) => sum + i.quantity * 5000, 
        0
      );
      setTotal(subtotal);
    });
  }, []);

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    // call your backend to create a Stripe session
    const res = await fetch('http://localhost:5000/api/payment/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ProductName: 'Bulk Dirt',
        UnitAmountCents: totalCents,
        Quantity: 1,
        SuccessUrl: window.location.origin + '/success',
        CancelUrl:  window.location.origin + '/cart'
      }),
    });
    const { sessionId } = await res.json();
    await stripe.redirectToCheckout({ sessionId });
  };

  return (
    <section className="checkout-page container">
      <h2>Your Order</h2>
      <table className="checkout-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td>{item.productName}</td>
              <td>{item.quantity}</td>
              <td>${(5000/100).toFixed(2)}</td>
              <td>${((item.quantity * 5000) / 100).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" style={{ textAlign: 'right', fontWeight: 600 }}>
              Total:
            </td>
            <td style={{ fontWeight: 600 }}>
              ${(totalCents / 100).toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>

      <button 
        className="checkout-button"
        onClick={handleCheckout}
        disabled={cart.length === 0}
      >
        Pay Now
      </button>
    </section>
  );
}
