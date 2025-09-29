import React from 'react';

// PUBLIC_INTERFACE
export default function Loading({ label = 'Loading...' }) {
  /** Subtle loading indicator */
  return (
    <div className="card" role="status" aria-live="polite" style={{ textAlign: 'center' }}>
      <div className="kpi-sub">{label}</div>
    </div>
  );
}
