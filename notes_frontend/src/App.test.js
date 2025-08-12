import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header Notemaster', () => {
  render(<App />);
  const titleEl = screen.getByText(/Notemaster/i);
  expect(titleEl).toBeInTheDocument();
});
