import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, addToCart }) {
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevents navigating if the card is wrapped in a Link
    if (addToCart && product) {
      addToCart(product);
    } else {
      console.error('addToCart function missing or invalid product:', { addToCart, product });
    }
  };

  return (
    <div style={styles.card}>
      <Link to={`/products/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img 
          src={product.image || 'https://via.placeholder.com/200'} 
          alt={product.title} 
          style={styles.img} 
        />
        <h3 style={styles.title}>{product.title}</h3>
      </Link>
      <div style={styles.footer}>
        <span style={styles.price}>₹{product.price}</span>
        <button type="button" onClick={handleAddToCart} style={styles.button}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: { border: '1px solid #cbd5e1', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#fff' },
  img: { width: '100%', height: '180px', objectFit: 'contain', marginBottom: '0.5rem' },
  title: { fontSize: '1rem', margin: '0.5rem 0', minHeight: '2.5rem' },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' },
  price: { fontWeight: 'bold', fontSize: '1.1rem' },
  button: { padding: '0.5rem 0.8rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }
};