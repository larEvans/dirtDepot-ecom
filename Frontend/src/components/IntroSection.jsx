import React from 'react';
import '../styles.css';

export default function IntroSection() {
  return (
    <section className="intro-hero">
      <div className="intro-overlay" />
      <div className="intro-content">
        <h1>Dirt Depot</h1>
        <p>
          At Dirt Depot, we deliver premium-quality topsoil and fill dirt
          right to your job site—fast, affordably, and with unmatched customer
          service.
        </p>
      </div>
    </section>
  );
}