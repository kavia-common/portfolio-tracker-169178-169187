import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/common/Loading';
import ErrorState from '../components/common/ErrorState';
import Tag from '../components/common/Tag';
import { useApi } from '../context/ApiContext';

function formatCurrency(value, currency = 'USD') {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
  } catch {
    return `$${(value || 0).toFixed(2)}`;
  }
}

// PUBLIC_INTERFACE
export default function PortfolioList() {
  /** Lists all portfolios as cards */
  const api = useApi();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [portfolios, setPortfolios] = useState([]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.listPortfolios()
      .then(d => { if (mounted) { setPortfolios(d); setErr(null); } })
      .catch(e => { if (mounted) setErr(e.message || String(e)); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [api]);

  if (loading) return <Loading label="Loading portfolios..." />;
  if (err) return <ErrorState message={err} />;

  return (
    <div className="container">
      <div className="grid grid-3">
        {portfolios.map(p => (
          <div key={p.id} className="card">
            <div className="card-header">
              <div className="card-title">{p.name}</div>
              <Tag tone={p.dayChangePct >= 0 ? 'up' : 'down'}>
                {p.dayChangePct >= 0 ? '▲' : '▼'} {Math.abs(p.dayChangePct).toFixed(2)}%
              </Tag>
            </div>
            <div className="kpi">
              <div className="kpi-number">{formatCurrency(p.totalValue, p.currency)}</div>
            </div>
            <div className="divider"></div>
            <div className="kpi-sub">Currency: {p.currency}</div>
            <div style={{ marginTop: 12 }}>
              <Link to={`/portfolios/${p.id}`} className="btn">Open</Link>
            </div>
          </div>
        ))}
        {portfolios.length === 0 && <div className="kpi-sub">No portfolios.</div>}
      </div>
    </div>
  );
}
