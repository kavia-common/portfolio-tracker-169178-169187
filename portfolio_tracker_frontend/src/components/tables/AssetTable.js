import React from 'react';
import Tag from '../common/Tag';

function formatCurrency(value, currency = 'USD') {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
  } catch {
    return `$${value.toFixed(2)}`;
  }
}

// PUBLIC_INTERFACE
export default function AssetTable({ assets = [], currency = 'USD' }) {
  /** Detailed asset table */
  return (
    <div className="card">
      <div className="card-header"><div className="card-title">Assets</div></div>
      <div style={{ overflowX: 'auto' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Name</th>
              <th>Sector</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Value</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {assets.map(a => (
              <tr key={a.symbol}>
                <td><strong>{a.symbol}</strong></td>
                <td>{a.name}</td>
                <td><Tag tone="amber">{a.sector}</Tag></td>
                <td>{a.quantity}</td>
                <td>{formatCurrency(a.price, currency)}</td>
                <td>{formatCurrency(a.value, currency)}</td>
                <td>
                  <Tag tone={a.changePct >= 0 ? 'up' : 'down'}>
                    {a.changePct >= 0 ? '▲' : '▼'} {Math.abs(a.changePct).toFixed(2)}%
                  </Tag>
                </td>
              </tr>
            ))}
            {assets.length === 0 && (
              <tr><td colSpan="7" style={{ color: '#6b7280' }}>No assets</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
