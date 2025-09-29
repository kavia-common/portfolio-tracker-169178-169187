import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Sidebar from './components/layout/Sidebar';
import HeaderBar from './components/layout/HeaderBar';
import Dashboard from './pages/Dashboard';
import PortfolioList from './pages/PortfolioList';
import PortfolioDetail from './pages/PortfolioDetail';
import Transactions from './pages/Transactions';
import { ThemeProvider } from './context/ThemeContext';
import { ApiProvider } from './context/ApiContext';

function AppLayout() {
  return (
    <div className="layout">
      <Sidebar />
      <main className="main">
        <HeaderBar />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/portfolios" element={<PortfolioList />} />
          <Route path="/portfolios/:id" element={<PortfolioDetail />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function App() {
  /** Root app with providers and router */
  return (
    <ThemeProvider>
      <ApiProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </ApiProvider>
    </ThemeProvider>
  );
}
