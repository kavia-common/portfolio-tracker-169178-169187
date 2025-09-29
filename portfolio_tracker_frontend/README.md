# Portfolio Tracker Frontend (Ocean Professional)

Modern React frontend for an investment portfolio tracker. Uses a minimalist "Ocean Professional" theme with blue and amber accents, subtle shadows, rounded corners, and responsive layout.

## Features
- Sidebar navigation (Dashboard, Portfolios, Transactions)
- Dashboard with summary KPI cards and analytics charts (allocation pie, performance line)
- Portfolio list and detailed portfolio view
- Asset table and transaction history table
- REST API integration via a client with mock fallback
- Lightweight CSS, modern React with hooks

## Getting Started
- Install: npm install
- Start with mocks: npm run start:mock
- Start against a backend: 
  - Set REACT_APP_API_BASE_URL in .env
  - Set REACT_APP_USE_MOCKS=false
  - Run npm start

## Environment
Copy .env.example to .env and adjust values:
- REACT_APP_API_BASE_URL=http://localhost:8000
- REACT_APP_USE_MOCKS=true

## API Client
If REACT_APP_USE_MOCKS=true, the app serves data from an in-memory mock dataset. Otherwise it fetches from:
- GET /api/portfolios
- GET /api/portfolios/:id
- GET /api/transactions?portfolioId=...

## Styling
Theme variables live in src/App.css. 
- Primary: #2563EB
- Secondary/Amber: #F59E0B
- Text: #111827
- Background: #f9fafb
- Surface: #ffffff

Feel free to extend components in src/components and pages in src/pages.
