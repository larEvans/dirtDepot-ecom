import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import '../styles.css';

const stripePromise = loadStripe('<YOUR_PUBLISHABLE_KEY>');

function CheckoutForm({ sessionEndpoint, sessionData }) {
  const stripe = useStripe();
  const Elements = useElements();
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    fetch(sessionEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sessionData)
    })
      .then(res => res.json())
      .then(data => setSessionId(data.sessionId));
  }, [sessionData, sessionEndpoint]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !sessionId) return;
    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) console.error(error);
  };

  return (
    <form onSubmit={handleSubmit} className="order-form">
      <CardElement className="order-input" />
      <button type="submit" className="order-button" disabled={!stripe || !sessionId}>
        Pay Now
      </button>
    </form>
  );
}

export default function PaymentPage() {
  const sessionData = {
    ProductName: 'Bulk Dirt',
    UnitAmountCents: 5000,  // $50 per load
    Quantity: 1,
    SuccessUrl: window.location.origin + '/success',
    CancelUrl: window.location.origin + '/cart'
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h2>Complete Your Payment</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm
          sessionEndpoint="http://localhost:5000/api/payment/create-checkout-session"
          sessionData={sessionData}
        />
      </Elements>
    </div>
  );
}