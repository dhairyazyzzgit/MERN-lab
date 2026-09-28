import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

export default function Register() {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', phone: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName || !formData.email || !formData.password || !formData.phone) {
      return setError('All fields are required.');
    }
    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters long.');
    }

    setLoading(true);
    try {
      // Endpoint updated to /customers/register
      await API.post('/customers/register', formData);
      navigate('/login');
    } catch (err) {
      // Displays explicit error message from backend (e.g. "An account with this Email already exists.")
      setError(err.response?.data?.message || 'Registration failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2>Register</h2>
        {error && <div style={styles.error}>{error}</div>}
        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} style={styles.input} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={styles.input} />
        <input type="password" name="password" placeholder="Password (min 6 chars)" value={formData.password} onChange={handleChange} style={styles.input} />
        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} style={styles.input} />
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
        <p style={styles.text}>Already have an account? <Link to="/login">Login</Link></p>
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