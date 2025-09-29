import React from 'react';

// PUBLIC_INTERFACE
export default function ErrorState({ message = 'Something went wrong.', onRetry }) {
  /** Error banner with retry */
  return (
    <div className="card" style={{ borderColor: '#fecaca', background: '#fff1f2' }}>
      <div className="card-header">
        <div className="card-title" style={{ color: '#b91c1c' }}>Error</div>
        {onRetry ? <button className="btn btn-outline" onClick={onRetry}>Retry</button> : null}
      </div>
      <div className="kpi-sub" style={{ color: '#7f1d1d' }}>{message}</div>
    </div>
  );
}
