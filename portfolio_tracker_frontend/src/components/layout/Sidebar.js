import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `shadow-subtle ${isActive ? 'active' : ''}`}
  >
    {label}
  </NavLink>
);

// PUBLIC_INTERFACE
export default function Sidebar() {
  /** Sidebar navigation per Ocean Professional theme */
  return (
    <aside className="sidebar">
      <div className="brand">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#2563EB" aria-hidden="true">
          <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z" opacity="0.2"></path>
          <path d="M12 2l7 4-7 4-7-4 7-4zm0 8l7-4v6c0 5-3.5 9-7 10V10z" fill="#2563EB"></path>
        </svg>
        Portfolio
      </div>
      <nav className="nav">
        <NavItem to="/dashboard" label="Dashboard" />
        <NavItem to="/portfolios" label="Portfolios" />
        <NavItem to="/transactions" label="Transactions" />
      </nav>
    </aside>
  );
}
