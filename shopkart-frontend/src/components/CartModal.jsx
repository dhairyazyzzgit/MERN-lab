import React from 'react';

export default function CartModal({ isOpen, onClose, cart = [], setCart }) {
  if (!isOpen) return null;

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item._id === id) {
            const newQty = (item.quantity || 1) + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2>Shopping Cart</h2>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>

        {cart.length === 0 ? (
          <p style={{ textAlign: 'center', margin: '2rem 0', color: '#64748b' }}>Your cart is empty.</p>
        ) : (
          <>
            <div style={styles.itemList}>
              {cart.map((item) => (
                <div key={item._id} style={styles.item}>
                  <img 
                    src={item.image || 'https://via.placeholder.com/60'} 
                    alt={item.title || item.name} 
                    style={styles.img} 
                  />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.95rem' }}>{item.title || item.name}</h4>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem' }}>₹{item.price}</p>
                  </div>
                  <div style={styles.qtyContainer}>
                    <button onClick={() => updateQuantity(item._id, -1)} style={styles.qtyBtn}>-</button>
                    <span style={{ fontSize: '0.9rem' }}>{item.quantity || 1}</span>
                    <button onClick={() => updateQuantity(item._id, 1)} style={styles.qtyBtn}>+</button>
                  </div>
                  <button onClick={() => removeItem(item._id)} style={styles.removeBtn}>🗑️</button>
                </div>
              ))}
            </div>

            <div style={styles.footer}>
              <h3>Total: ₹{totalAmount.toFixed(2)}</h3>
              <button onClick={() => alert('Order Placed Successfully!')} style={styles.checkoutBtn}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'flex-end' },
  modal: { width: '380px', height: '100%', background: '#fff', padding: '1.5rem', display: 'flex', flexDirection: 'column', boxShadow: '-2px 0 10px rgba(0,0,0,0.1)' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' },
  closeBtn: { background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' },
  itemList: { flex: 1, overflowY: 'auto', margin: '1rem 0' },
  item: { display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.8rem' },
  img: { width: '50px', height: '50px', objectFit: 'contain', borderRadius: '4px' },
  qtyContainer: { display: 'flex', alignItems: 'center', gap: '0.4rem' },
  qtyBtn: { width: '24px', height: '24px', border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer', borderRadius: '4px' },
  removeBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' },
  footer: { borderTop: '1px solid #e2e8f0', paddingTop: '1rem' },
  checkoutBtn: { width: '100%', padding: '0.75rem', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem', marginTop: '0.5rem' }
};