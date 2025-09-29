import React, { useEffect, useMemo, useState } from 'react';
import SummaryCard from '../components/common/SummaryCard';
import AllocationPie from '../components/charts/AllocationPie';
import PerformanceLine from '../components/charts/PerformanceLine';
import Loading from '../components/common/Loading';
import ErrorState from '../components/common/ErrorState';
import { useApi } from '../context/ApiContext';

function formatCurrency(value, currency = 'USD') {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
  } catch {
    return `$${(value || 0).toFixed(2)}`;
  }
}

// PUBLIC_INTERFACE
export default function Dashboard() {
  /** Main dashboard showing portfolio summaries, allocation and performance */
  const api = useApi();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [portfolios, setPortfolios] = useState([]);

  const totals = useMemo(() => {
    const totalValue = portfolios.reduce((s, p) => s + (p.totalValue || 0), 0);
    const avgChange = portfolios.length
      ? portfolios.reduce((s, p) => s + (p.dayChangePct || 0), 0) / portfolios.length
      : 0;
    return { totalValue, avgChange };
  }, [portfolios]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    api.listPortfolios()
      .then(data => { if (active) { setPortfolios(data); setErr(null); } })
      .catch(e => { if (active) setErr(e.message || String(e)); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [api]);

  if (loading) return <Loading label="Loading dashboard..." />;
  if (err) return <ErrorState message={err} onRetry={() => window.location.reload()} />;

  // Build aggregate mock charts across first portfolio for demo
  const primary = portfolios[0];
  const allocation = primary?.allocation || [
    { name: 'Stocks', value: 60 },
    { name: 'Bonds', value: 25 },
    { name: 'Cash', value: 15 }
  ];
  const performance = primary?.performance || [
    { date: '2024-05', value: totals.totalValue * 0.85 },
    { date: '2024-06', value: totals.totalValue * 0.9 },
    { date: '2024-07', value: totals.totalValue * 0.93 },
    { date: '2024-08', value: totals.totalValue * 0.96 },
    { date: '2024-09', value: totals.totalValue }
  ];

  return (
    <div className="container">
      <div className="grid grid-3">
        <SummaryCard
          title="Total Value"
          value={formatCurrency(totals.totalValue)}
          subtitle="Across all portfolios"
          accent="amber"
          icon="💰"
        />
        <SummaryCard
          title="Average Day Change"
          value={`${(totals.avgChange >= 0 ? '+' : '-')}${Math.abs(totals.avgChange).toFixed(2)}%`}
          subtitle="Daily movement"
          icon={totals.avgChange >= 0 ? '📈' : '📉'}
        />
        <SummaryCard
          title="Portfolios"
          value={portfolios.length}
          subtitle="Active"
          icon="📦"
        />
      </div>

      <div className="grid grid-2" style={{ marginTop: 16 }}>
        <AllocationPie data={allocation} />
        <PerformanceLine data={performance} />
      </div>
    </div>
  );
}
