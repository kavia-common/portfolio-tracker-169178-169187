import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app without crashing', () => {
  render(<App />);
  const header = screen.getByText(/Investment Overview/i);
  expect(header).toBeInTheDocument();
});
