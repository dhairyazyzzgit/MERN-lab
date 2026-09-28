import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';

export default function ProductDetails({ addToCart }) { // 1. Accept addToCart prop
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await productAPI.getById(id);
        setProduct(res.data.product);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div style={styles.centerText}>Loading product details...</div>;
  if (error) return <div style={styles.errorText}>{error}</div>;

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/products')} style={styles.backBtn}>&larr; Back to Products</button>
      <div style={styles.layout}>
        <img src={product.image} alt={product.name || product.title} style={styles.image} />
        <div style={styles.info}>
          <span style={styles.category}>{product.category}</span>
          <h1 style={styles.title}>{product.name || product.title}</h1>
          <p style={styles.description}>{product.description}</p>
          <p style={styles.price}>₹{product.price.toLocaleString('en-IN')}</p>
          <p style={styles.stock}>In Stock: {product.stock} units</p>
          
          {/* 2. Call addToCart with the product object */}
          <button 
            style={styles.cartBtn} 
            onClick={() => addToCart && addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '2rem', maxWidth: '1000px', margin: '0 auto' },
  backBtn: { background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontSize: '1rem', marginBottom: '1.5rem' },
  layout: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' },
  image: { width: '100%', borderRadius: '8px', maxHeight: '400px', objectFit: 'cover' },
  info: { display: 'flex', flexDirection: 'column', gap: '0.8rem' },
  category: { fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 'bold' },
  title: { margin: 0, fontSize: '2rem' },
  description: { color: '#334155', lineHeight: '1.5' },
  price: { fontSize: '1.8rem', fontWeight: 'bold', color: '#16a34a', margin: 0 },
  stock: { color: '#64748b' },
  cartBtn: { padding: '0.8rem 1.5rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold', marginTop: '1rem' },
  centerText: { textAlign: 'center', fontSize: '1.2rem', padding: '3rem 0', color: '#64748b' },
  errorText: { textAlign: 'center', fontSize: '1.2rem', padding: '3rem 0', color: '#ef4444' }
};