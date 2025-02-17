import { render, screen } from '@testing-library/react';
import MapEditor from './MapEditor';

test('renders learn react link', () => {
  render(<MapEditor />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
