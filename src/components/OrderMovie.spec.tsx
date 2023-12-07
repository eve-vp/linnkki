// OrderMovie.spec.tsx
import { render, fireEvent } from '@testing-library/react';
import OrderMovie from './OrderMovie';

describe('OrderMovie', () => {
  it('should call onOrderChange with the expected order term', () => {
    
    const mockOnOrderChange = jest.fn();
    const { getByText } = render(<OrderMovie onOrderChange={mockOnOrderChange} currentOrder={''} availableOrders={[]} />);


    fireEvent.click(getByText('Release Date')); // Assuming this triggers the order change


    const expectedOrderTerm = 'release_date.asc.desc';
    expect(mockOnOrderChange).toHaveBeenCalledWith(expectedOrderTerm);
  });
});
