import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function WishlistCard({ product, onRemove }) {
  const navigate = useNavigate();

  return (
    <div style={styles.card}>
      <img src={product.image} alt={product.name} style={styles.image} />
      <div style={styles.details}>
        <span style={styles.category}>{product.category}</span>
        <h3 style={styles.title}>{product.name}</h3>
        <p style={styles.price}>₹{product.price.toLocaleString('en-IN')}</p>
        <p style={styles.stock}>{product.stock > 0 ? `${product.stock} units left` : 'Out of Stock'}</p>
        <div style={styles.actions}>
          <button onClick={() => navigate(`/products/${product._id}`)} style={styles.viewBtn}>
            View Details
          </button>
          <button onClick={() => onRemove(product._id)} style={styles.removeBtn}>
            Remove ♥
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: { border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#fff' },
  image: { width: '100%', height: '180px', objectFit: 'cover' },
  details: { padding: '1rem', display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '0.5rem' },
  category: { fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 'bold' },
  title: { margin: 0, fontSize: '1.1rem', color: '#0f172a' },
  price: { fontSize: '1.2rem', fontWeight: 'bold', color: '#16a34a', margin: 0 },
  stock: { fontSize: '0.85rem', color: '#64748b', margin: 0 },
  actions: { marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  viewBtn: { padding: '0.5rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  removeBtn: { padding: '0.5rem', background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }
};