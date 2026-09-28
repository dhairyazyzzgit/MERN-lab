import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

export default function Login({ setUser }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      return setError('Please fill in all fields.');
    }

    setLoading(true);
    try {
      // Endpoint updated to /customers/login
      const res = await API.post('/customers/login', formData);
      if (setUser) setUser(res.data.user);
      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2>Login</h2>
        {error && <div style={styles.error}>{error}</div>}
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={styles.input} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} style={styles.input} />
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p style={styles.text}>Don't have an account? <Link to="/register">Register</Link></p>
      </form>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' },
  card: { width: '350px', padding: '2rem', border: '1px solid #cbd5e1', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '1rem' },
  input: { padding: '0.6rem', fontSize: '1rem', borderRadius: '4px', border: '1px solid #cbd5e1' },
  button: { padding: '0.6rem', fontSize: '1rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  error: { color: '#dc2626', background: '#fef2f2', border: '1px solid #fecaca', padding: '0.5rem', borderRadius: '4px', fontSize: '0.9rem' },
  text: { fontSize: '0.9rem', textAlign: 'center' }
};