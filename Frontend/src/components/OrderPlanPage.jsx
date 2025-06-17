import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

export default function OrderPlanPage() {
  const [address, setAddress] = useState('');
  const [distance, setDistance] = useState('');
  const navigate = useNavigate();

  const calculate = async e => {
    e.preventDefault();
    const res = await fetch(`/api/distance?address=${encodeURIComponent(address)}`);
    const data = await res.json();
    setDistance(data.distance);
  };

  const proceed = () => {
    navigate('/order', { state: { address, distance } });
  };

  return (
    <section className="container">
      <h2>Plan Your Delivery</h2>
      <form onSubmit={calculate} className="order-form">
        <label>
          Address
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            required
            className="order-input"
            placeholder="Enter delivery address"
          />
        </label>
        <button type="submit" className="order-button">Calculate Distance</button>
      </form>

      {distance && (
        <div className="order-plan-result">
          <p>Distance: <strong>{distance}</strong></p>
          <button onClick={proceed} className="order-button">Proceed to Order</button>
        </div>
      )}
    </section>
  );
}