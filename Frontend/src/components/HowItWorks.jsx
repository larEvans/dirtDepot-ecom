import React from 'react';
import '../styles.css';

export default function HowItWorks() {
  const steps = [
    {
      icon: '🗺️',
      title: 'Measure Area',
      desc: 'Calculate length × width in feet.',
    },
    {
      icon: '📦',
      title: 'Choose Quantity',
      desc: 'Use our calculator to determine loads.',
    },
    {
      icon: '🚚',
      title: 'Schedule Delivery',
      desc: 'Pick a date that works for you.',
    },
  ];

  return (
    <section className="how-it-works container">
      <h2 className="hiw-title">How It Works</h2>
      <div className="hiw-steps">
        {steps.map((step, i) => (
          <div key={i} className="hiw-step">
            <div className="hiw-icon">{step.icon}</div>
            <h3 className="hiw-step-title">{step.title}</h3>
            <p className="hiw-step-desc">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
