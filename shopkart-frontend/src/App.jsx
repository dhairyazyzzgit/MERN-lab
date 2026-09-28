import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Wishlist from './pages/Wishlist';

export default function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('shopkart_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('shopkart_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('shopkart_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('shopkart_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('shopkart_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item._id === product._id);
      if (existing) {
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} cart={cart} setCart={setCart} />
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/home" element={<Home user={user} setUser={setUser} />} />
        <Route path="/products" element={<Products addToCart={addToCart} />} />
        <Route path="/products/:id" element={<ProductDetails addToCart={addToCart} />} />
        <Route path="/wishlist" element={<Wishlist addToCart={addToCart} />} />
      </Routes>
    </BrowserRouter>
  );
}