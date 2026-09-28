import React, { useEffect, useState } from 'react';
import { wishlistAPI } from '../services/api';

export default function Wishlist({ addToCart }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchWishlist = async () => {
    try {
      const res = await wishlistAPI.get();
      setItems(res.data.wishlist || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Please log in to view your wishlist.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await wishlistAPI.remove(productId);
      setItems((prev) => prev.filter((item) => item._id !== productId));
    } catch (err) {
      alert('Could not remove item from wishlist.');
    }
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading Wishlist...</div>;
  if (error) return <div style={{ padding: '2rem', color: '#dc2626', textAlign: 'center' }}>{error}</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>My Wishlist</h2>
      {items.length === 0 ? (
        <p>No products saved in your wishlist yet.</p>
      ) : (
        <div style={styles.grid}>
          {items.map((product) => (
            <div key={product._id} style={styles.card}>
              <img src={product.image || 'https://via.placeholder.com/200'} alt={product.title} style={styles.img} />
              <h3>{product.title}</h3>
              <p style={{ fontWeight: 'bold' }}>₹{product.price}</p>
              <div style={styles.btnGroup}>
                <button onClick={() => addToCart(product)} style={styles.cartBtn}>Add to Cart</button>
                <button onClick={() => handleRemove(product._id)} style={styles.removeBtn}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' },
  card: { border: '1px solid #cbd5e1', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
  img: { width: '100%', height: '180px', objectFit: 'contain' },
  btnGroup: { display: 'flex', gap: '0.5rem', marginTop: '1rem' },
  cartBtn: { flex: 1, padding: '0.5rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  removeBtn: { padding: '0.5rem', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};