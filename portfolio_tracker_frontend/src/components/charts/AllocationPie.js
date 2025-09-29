import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#2563EB', '#F59E0B', '#60A5FA', '#93C5FD', '#FDE68A', '#EF4444'];

// PUBLIC_INTERFACE
export default function AllocationPie({ data }) {
  /** Pie chart for asset allocation */
  return (
    <div className="card">
      <div className="card-header"><div className="card-title">Asset Allocation</div></div>
      <div style={{ width: '100%', height: 280 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={90}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
