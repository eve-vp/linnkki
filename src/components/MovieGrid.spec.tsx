
import { render } from '@testing-library/react';
import MovieGrid from './MovieGrid';

test('renders movie grid', () => {
  const { getByText } = render(<MovieGrid />);
  const linkElement = getByText(/movie grid/i);
  expect(linkElement).toBeInTheDocument();
});

