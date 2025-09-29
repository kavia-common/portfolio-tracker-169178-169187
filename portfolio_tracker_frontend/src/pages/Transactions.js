import React, { useEffect, useState } from 'react';
import Loading from '../components/common/Loading';
import ErrorState from '../components/common/ErrorState';
import TransactionTable from '../components/tables/TransactionTable';
import { useApi } from '../context/ApiContext';

// PUBLIC_INTERFACE
export default function Transactions() {
  /** Global transactions page */
  const api = useApi();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let mounted = true;
    api.listTransactions()
      .then(d => { if (mounted) { setRows(d); setErr(null); } })
      .catch(e => { if (mounted) setErr(e.message || String(e)); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [api]);

  if (loading) return <Loading label="Loading transactions..." />;
  if (err) return <ErrorState message={err} />;

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <div className="card-title">Filters</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input className="input" placeholder="Search symbol (e.g., AAPL)" aria-label="Search transactions" />
          <button className="btn btn-outline">Apply</button>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <TransactionTable rows={rows} />
      </div>
    </div>
  );
}
