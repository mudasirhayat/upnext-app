import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
});
try {
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
  render(<App />);
} catch (error) {
  console.error(error);
}
const linkElement = screen.getByText(/learn react/i);
expect(linkElement).toBeInTheDocument();
});
