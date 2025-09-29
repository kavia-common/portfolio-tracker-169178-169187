import React, { createContext, useContext, useMemo } from 'react';
import { apiClient } from '../services/apiClient';

const ApiContext = createContext(null);

// PUBLIC_INTERFACE
export function ApiProvider({ children }) {
  /**
   * Provides API client to components.
   * Switches to mock mode based on REACT_APP_USE_MOCKS env flag.
   */
  const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';
  const useMocks = String(process.env.REACT_APP_USE_MOCKS || 'true') === 'true';

  const client = useMemo(() => apiClient({ baseUrl, useMocks }), [baseUrl, useMocks]);

  return <ApiContext.Provider value={client}>{children}</ApiContext.Provider>;
}

// PUBLIC_INTERFACE
export function useApi() {
  /** Returns the API client with methods for portfolios and transactions */
  const ctx = useContext(ApiContext);
  if (!ctx) throw new Error('useApi must be used within ApiProvider');
  return ctx;
}
