import React from 'react';
import { useTheme } from '../../context/ThemeContext';

// PUBLIC_INTERFACE
export default function HeaderBar() {
  /** Top header with actions and theme toggle */
  const { theme, toggle } = useTheme();

  return (
    <div className="header">
      <div className="title">Investment Overview</div>
      <div className="actions">
        <button className="btn btn-ghost" onClick={toggle} aria-label="Toggle theme">
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <button className="btn btn-outline">Export</button>
        <button className="btn">Add Transaction</button>
      </div>
    </div>
  );
}
