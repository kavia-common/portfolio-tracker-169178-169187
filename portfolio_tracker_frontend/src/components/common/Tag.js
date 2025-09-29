import React from 'react';

// PUBLIC_INTERFACE
export default function Tag({ children, tone = 'neutral' }) {
  /** Small pill tag */
  const tones = {
    neutral: { bg: 'rgba(107,114,128,0.12)', color: '#374151' },
    up: { bg: 'rgba(37,99,235,0.10)', color: '#1d4ed8' },
    down: { bg: 'rgba(239,68,68,0.10)', color: '#b91c1c' },
    amber: { bg: 'rgba(245,158,11,0.12)', color: '#92400e' }
  };
  const style = tones[tone] || tones.neutral;
  return (
    <span className="badge" style={{ background: style.bg, color: style.color }}>
      {children}
    </span>
  );
}
