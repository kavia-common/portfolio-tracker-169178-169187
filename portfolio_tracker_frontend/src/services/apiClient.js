const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const mockDB = {
  portfolios: [
    {
      id: 'p1',
      name: 'Core Long-Term',
      currency: 'USD',
      totalValue: 152430.23,
      dayChangePct: 0.84,
      allocation: [
        { name: 'Stocks', value: 60 },
        { name: 'Bonds', value: 25 },
        { name: 'Cash', value: 5 },
        { name: 'Real Estate', value: 10 }
      ],
      performance: [
        { date: '2024-04', value: 132000 },
        { date: '2024-05', value: 135400 },
        { date: '2024-06', value: 142300 },
        { date: '2024-07', value: 148900 },
        { date: '2024-08', value: 149200 },
        { date: '2024-09', value: 152430 }
      ],
      assets: [
        { symbol: 'AAPL', name: 'Apple Inc', quantity: 120, price: 190.12, value: 22814.4, changePct: 1.2, sector: 'Technology' },
        { symbol: 'MSFT', name: 'Microsoft Corp', quantity: 80, price: 410.33, value: 32826.4, changePct: -0.4, sector: 'Technology' },
        { symbol: 'BND', name: 'Vanguard Total Bond Market', quantity: 250, price: 75.40, value: 18850, changePct: 0.1, sector: 'Bonds' },
        { symbol: 'VNQ', name: 'Vanguard Real Estate ETF', quantity: 100, price: 85.12, value: 8512, changePct: 0.8, sector: 'REIT' }
      ]
    },
    {
      id: 'p2',
      name: 'Growth Strategy',
      currency: 'USD',
      totalValue: 80450.77,
      dayChangePct: -0.34,
      allocation: [
        { name: 'Stocks', value: 80 },
        { name: 'Bonds', value: 10 },
        { name: 'Cash', value: 10 }
      ],
      performance: [
        { date: '2024-04', value: 70000 },
        { date: '2024-05', value: 73500 },
        { date: '2024-06', value: 76000 },
        { date: '2024-07', value: 77550 },
        { date: '2024-08', value: 79500 },
        { date: '2024-09', value: 80450 }
      ],
      assets: [
        { symbol: 'NVDA', name: 'NVIDIA Corp', quantity: 30, price: 880.22, value: 26406.6, changePct: 2.3, sector: 'Technology' },
        { symbol: 'AMZN', name: 'Amazon.com, Inc.', quantity: 40, price: 180.22, value: 7208.8, changePct: -1.1, sector: 'Consumer Discretionary' }
      ]
    }
  ],
  transactions: [
    { id: 't1', portfolioId: 'p1', date: '2024-09-10', type: 'BUY', symbol: 'AAPL', quantity: 20, price: 185.10, total: 3702 },
    { id: 't2', portfolioId: 'p2', date: '2024-09-08', type: 'SELL', symbol: 'AMZN', quantity: 10, price: 178.40, total: 1784 },
    { id: 't3', portfolioId: 'p1', date: '2024-09-02', type: 'DIVIDEND', symbol: 'BND', quantity: 0, price: 50.00, total: 50 }
  ]
};

// PUBLIC_INTERFACE
export function apiClient({ baseUrl, useMocks = true }) {
  /**
   * Factory for API client. If useMocks true, returns mocked data with latency.
   * Otherwise, fetches from baseUrl endpoints.
   */
  const headers = { 'Content-Type': 'application/json' };

  async function httpGet(path) {
    const res = await fetch(`${baseUrl}${path}`, { headers });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
  }

  const mock = {
    async listPortfolios() {
      await delay(400);
      return mockDB.portfolios.map(p => ({
        id: p.id,
        name: p.name,
        currency: p.currency,
        totalValue: p.totalValue,
        dayChangePct: p.dayChangePct
      }));
    },
    async getPortfolio(id) {
      await delay(350);
      const p = mockDB.portfolios.find(x => x.id === id);
      if (!p) throw new Error('Not found');
      return p;
    },
    async listTransactions(params = {}) {
      await delay(300);
      const { portfolioId } = params;
      let data = mockDB.transactions.slice().sort((a,b) => b.date.localeCompare(a.date));
      if (portfolioId) data = data.filter(t => t.portfolioId === portfolioId);
      return data;
    }
  };

  const real = {
    async listPortfolios() {
      return httpGet('/api/portfolios');
    },
    async getPortfolio(id) {
      return httpGet(`/api/portfolios/${id}`);
    },
    async listTransactions(params = {}) {
      const query = new URLSearchParams(params).toString();
      return httpGet(`/api/transactions${query ? `?${query}` : ''}`);
    }
  };

  return useMocks ? mock : real;
}
