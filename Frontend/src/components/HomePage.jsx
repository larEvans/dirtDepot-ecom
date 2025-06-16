import React from 'react';
import IntroSection from './IntroSection';
import HowItWorks from './HowItWorks';
import OrderPage from './OrderPage';
import {Link} from 'react-router-dom'
export default function HomePage() {
  const loadOptions = [1, 2, 3, 4, 5]; // Example options
  const pricePerLoad = 100; // Example price per load


  return (
    <>
      <IntroSection />
      <HowItWorks />      
      {/* Order CTA */}
      <div className="home-order-cta container">
        <Link to="/order" className="btn-primary"> Order
          Order Now
        </Link>
      </div>

      {/* Pricing Table */}
      <section className="price-table container">
        <h2>Pricing</h2>
        <table>
          <thead>
            <tr>
              <th>Loads</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {loadOptions.map(n => (
              <tr key={n}>
                <td>{n}</td>
                <td>${n * pricePerLoad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
