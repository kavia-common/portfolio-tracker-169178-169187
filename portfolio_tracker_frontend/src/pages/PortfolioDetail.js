import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loading from '../components/common/Loading';
import ErrorState from '../components/common/ErrorState';
import AllocationPie from '../components/charts/AllocationPie';
import PerformanceLine from '../components/charts/PerformanceLine';
import AssetTable from '../components/tables/AssetTable';
import TransactionTable from '../components/tables/TransactionTable';
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
export default function PortfolioDetail() {
  /** Detailed portfolio page with allocation, performance, assets, transactions */
  const { id } = useParams();
  const api = useApi();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    Promise.all([
      api.getPortfolio(id),
      api.listTransactions({ portfolioId: id })
    ])
      .then(([p, tx]) => { if (active) { setPortfolio(p); setTransactions(tx); setErr(null); } })
      .catch(e => { if (active) setErr(e.message || String(e)); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [api, id]);

  if (loading) return <Loading label="Loading portfolio..." />;
  if (err) return <ErrorState message={err} onRetry={() => window.location.reload()} />;
  if (!portfolio) return <ErrorState message="Portfolio not found" />;

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <div className="card-title">{portfolio.name}</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Tag tone={portfolio.dayChangePct >= 0 ? 'up' : 'down'}>
              {portfolio.dayChangePct >= 0 ? '▲' : '▼'} {Math.abs(portfolio.dayChangePct).toFixed(2)}%
            </Tag>
            <Link to="/portfolios" className="btn btn-ghost">Back</Link>
          </div>
        </div>
        <div className="kpi">
          <div className="kpi-number">{formatCurrency(portfolio.totalValue, portfolio.currency)}</div>
        </div>
        <div className="kpi-sub">Currency: {portfolio.currency}</div>
      </div>

      <div className="grid grid-2" style={{ marginTop: 16 }}>
        <AllocationPie data={portfolio.allocation || []} />
        <PerformanceLine data={portfolio.performance || []} />
      </div>

      <div style={{ marginTop: 16 }}>
        <AssetTable assets={portfolio.assets || []} currency={portfolio.currency} />
      </div>

      <div style={{ marginTop: 16 }}>
        <TransactionTable rows={transactions} currency={portfolio.currency} />
      </div>
    </div>
  );
}
