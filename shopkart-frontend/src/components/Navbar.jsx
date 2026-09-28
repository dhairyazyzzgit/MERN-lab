import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { customerAPI } from '../services/api';
import CartModal from './CartModal';

export default function Navbar({ user, setUser, cart = [], setCart }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const handleLogout = async () => {
    try {
      await customerAPI.logout();
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem('shopkart_user');
      if (setUser) setUser(null);
      navigate('/login');
    }
  };

  return (
    <>
      <nav style={styles.nav}>
        <Link to="/products" style={{ ...styles.link, fontSize: '1.4rem', fontWeight: 'bold' }}>
          🛒 ShopKart
        </Link>

        <div style={styles.links}>
          <Link to="/products" style={styles.link}>Products</Link>
          <Link to="/wishlist" style={styles.link}>❤️ Wishlist</Link>

          {/* Clickable Cart Button with Live Badge */}
          <div 
            style={styles.cartContainer} 
            onClick={() => setIsCartOpen(true)} 
            title="View Cart"
          >
            <span style={{ fontSize: '1.3rem', cursor: 'pointer' }}>🛍️</span>
            {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
          </div>

          {user ? (
            <>
              <span style={styles.welcome}>Hi, {user.fullName || 'Customer'}</span>
              <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link}>Login</Link>
              <Link to="/register" style={styles.link}>Register</Link>
            </>
          )}
        </div>
      </nav>

      {/* Cart Side Drawer */}
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
        setCart={setCart} 
      />
    </>
  );
}

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 2rem', background: '#0f172a', color: '#fff' },
  links: { display: 'flex', gap: '1.2rem', alignItems: 'center' },
  link: { color: '#f8fafc', textDecoration: 'none', fontSize: '0.95rem' },
  cartContainer: { position: 'relative', display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '0.3rem' },
  badge: { position: 'absolute', top: '-4px', right: '-8px', background: '#ef4444', color: '#fff', fontSize: '0.75rem', fontWeight: 'bold', borderRadius: '50%', padding: '2px 6px' },
  welcome: { color: '#94a3b8', fontSize: '0.9rem', marginLeft: '0.5rem' },
  logoutBtn: { padding: '0.4rem 0.8rem', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }
};