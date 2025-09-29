import React from 'react';

function formatCurrency(value, currency = 'USD') {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
  } catch {
    return `$${value.toFixed(2)}`;
  }
}

// PUBLIC_INTERFACE
export default function TransactionTable({ rows = [], currency = 'USD' }) {
  /** Transaction history table */
  return (
    <div className="card">
      <div className="card-header"><div className="card-title">Transactions</div></div>
      <div style={{ overflowX: 'auto' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Symbol</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td>{r.date}</td>
                <td>{r.type}</td>
                <td><strong>{r.symbol}</strong></td>
                <td>{r.quantity}</td>
                <td>{formatCurrency(r.price, currency)}</td>
                <td>{formatCurrency(r.total, currency)}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan="6" style={{ color: '#6b7280' }}>No transactions</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
