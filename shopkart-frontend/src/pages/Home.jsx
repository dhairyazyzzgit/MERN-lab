import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function Home({ user, setUser }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get('/me');
        setUser(res.data);
        setLoading(false);
      } catch (err) {
        setUser(null);
        navigate('/login');
      }
    };
    fetchUser();
  }, [navigate, setUser]);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '3rem' }}>Loading...</div>;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '400px', padding: '2rem', border: '1px solid #cbd5e1', borderRadius: '8px', background: '#f8fafc' }}>
        <h1>Welcome, {user?.fullName}!</h1>
        <hr />
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Phone:</strong> {user?.phone}</p>
      </div>
    </div>
  );
}