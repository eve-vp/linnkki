// verificar si la función onOrderChange se llama con el argumento correcto cuando se envía el formulario
import { render, screen, fireEvent } from '@testing-library/react';
import OrderMovie from './OrderMovie';

test('calls onOrderChange with the correct argument when the form is submitted', async () => {
  const mockAvailableOrders = ['rating.desc', 'release_date.asc'];
  const mockCurrentOrder = 'rating.desc';
  const mockOnOrderChange = jest.fn();

  render(
    <OrderMovie
      currentOrder={mockCurrentOrder}
      onOrderChange={mockOnOrderChange}
      availableOrders={mockAvailableOrders}
    />
  );

  const orderSelect = screen.getByRole('combobox');
  fireEvent.change(orderSelect, { target: { value: 'release_date.asc' } });

  const submitButton = screen.getByRole('button', { name: /Order Movies/i });
  fireEvent.click(submitButton);

  const expectedOrderTerm = 'release_date.asc.desc';
  expect(mockOnOrderChange).toHaveBeenCalledWith(expectedOrderTerm);
});
