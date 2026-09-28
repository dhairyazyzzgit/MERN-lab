import React, { useEffect, useState } from 'react';
import { productAPI } from '../services/api';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';

export default function Products({ addToCart }) { // 1. Accept addToCart prop here
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await productAPI.getAll(search, category, sort);
        setProducts(res.data.products);
      } catch (err) {
        setError('Something went wrong while loading products.');
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timer);
  }, [search, category, sort]);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Explore Products</h1>
      <SearchBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />

      {loading && <div style={styles.centerText}>Loading products...</div>}
      {error && <div style={styles.errorText}>{error}</div>}
      {!loading && !error && products.length === 0 && (
        <div style={styles.centerText}>No products found.</div>
      )}

      {!loading && !error && products.length > 0 && (
        <div style={styles.grid}>
          {products.map((p) => (
            /* 2. Pass addToCart down to ProductCard */
            <ProductCard key={p._id} product={p} addToCart={addToCart} />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' },
  centerText: { textAlign: 'center', fontSize: '1.2rem', padding: '3rem 0', color: '#64748b' },
  errorText: { textAlign: 'center', fontSize: '1.2rem', padding: '3rem 0', color: '#ef4444' }
};