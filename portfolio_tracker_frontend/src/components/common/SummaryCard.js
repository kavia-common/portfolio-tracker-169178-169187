import React from 'react';

// PUBLIC_INTERFACE
export default function SummaryCard({ title, value, subtitle, icon, accent = 'primary' }) {
  /**
   * Summary KPI Card with icon and subtitle
   */
  const accentStyle = accent === 'amber'
    ? { background: 'rgba(245,158,11,0.1)', color: '#B45309' }
    : { background: 'rgba(37,99,235,0.08)', color: '#1d4ed8' };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">{title}</div>
        {icon ? <div className="badge" style={accentStyle}>{icon}</div> : null}
      </div>
      <div className="kpi">
        <div className="kpi-number">{value}</div>
      </div>
      {subtitle ? <div className="kpi-sub">{subtitle}</div> : null}
    </div>
  );
}
