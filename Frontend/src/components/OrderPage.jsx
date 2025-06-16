import React, { useState } from 'react';
import SwiperCore from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles.css';
import dirt_mound from '../assets/dirt_mound.jpg';

import { addToCart } from '../../api';

export default function OrderPage() {
  const [loads, setLoads] = useState(1);
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('');
  const [showCalc, setShowCalc] = useState(true);

  const assets = [dirt_mound];

  const calculatedLoads = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const dFeet = (parseFloat(depth) || 0) / 12;
    const yd3 = (l * w * dFeet) / 27;
    return Math.max(1, Math.ceil(yd3));
  };

  const handleAddToCart = async () => {
    try {
      await addToCart('Bulk Dirt', loads);
      alert(`Added ${loads} load${loads > 1 ? 's' : ''} to cart.`);
    } catch (err) {
      console.error(err);
      alert('Error adding to cart');
    }
  };

  return (
    <section id="order" className="order-fullwidth">
      <div className="container order-container">

        {/* Left column: slider */}
        <div className="order-gallery">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: false }}
            spaceBetween={10}
            slidesPerView={1}
            autoplay={false}  // ensure no auto-advance
          >
            {assets.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={dirt_mound}
                  alt={`Dirt load ${idx + 1}`}
                  className="order-slide-image"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Details Column */}
        <div className="order-details">
          <h2>How to Calculate Your Dirt Needs</h2>
          <button
            className="toggle-button"
            onClick={() => setShowCalc(v => !v)}
            aria-expanded={showCalc}
          >
            {showCalc ? 'Hide' : 'Show'} Calculator
          </button>

          {showCalc && (
            <div className="order-calculator">
              <p className="calculator-instructions">
                Enter Length (ft), Width (ft), and Depth (inches) below.
              </p>
              <label>Length
                <input
                  type="number"
                  min="0"
                  value={length}
                  onChange={e => setLength(e.target.value)}
                  className="order-input"
                />
              </label>
              <label>Width
                <input
                  type="number"
                  min="0"
                  value={width}
                  onChange={e => setWidth(e.target.value)}
                  className="order-input"
                />
              </label>
              <label>Depth
                <input
                  type="number"
                  min="0"
                  value={depth}
                  onChange={e => setDepth(e.target.value)}
                  className="order-input"
                />
              </label>
              <p className="calculator-result">
                You need <strong>{calculatedLoads()}</strong> load{calculatedLoads() !== 1 && 's'}.
              </p>
            </div>
          )}

          <form
            onSubmit={e => {
              e.preventDefault();
              handleAddToCart();
            }}
            className="order-form"
          >
            <label>Loads to Order
              <input
                type="number"
                min="1"
                value={loads}
                onChange={e => setLoads(Number(e.target.value))}
                className="order-input"
              />
            </label>
            <button type="submit" className="order-button">
              Add to Cart
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}