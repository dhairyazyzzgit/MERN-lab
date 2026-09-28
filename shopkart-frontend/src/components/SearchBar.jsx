import React from 'react';

export default function SearchBar({ search, setSearch, category, setCategory, sort, setSort }) {
  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.input}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)} style={styles.select}>
        <option value="All">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Fashion">Fashion</option>
        <option value="Books">Books</option>
      </select>

      <select value={sort} onChange={(e) => setSort(e.target.value)} style={styles.select}>
        <option value="">Sort By</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>
    </div>
  );
}

const styles = {
  container: { display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' },
  input: { flex: '1 1 250px', padding: '0.6rem 1rem', borderRadius: '6px', border: '1px solid #cbd5e1' },
  select: { padding: '0.6rem 1rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff' }
};