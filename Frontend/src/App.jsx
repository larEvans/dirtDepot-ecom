import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import OrderPage from './components/OrderPage';
import CartPage from './components/CartPage';
import Footer from './components/Footer';
import PaymentPage from './components/PaymentPage';
import PayPage from './components/PayPage';
import CheckoutPage from './components/CheckoutPage';
export default function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/PaymentPage" element={<PaymentPage />} />
          <Route path="/CheckoutPage" element ={<CheckoutPage/>}/>
        </Routes>
      </main>
      <Footer />
    </>
  );
}