
import { render, fireEvent } from '@testing-library/react';
import OrderMovie from '../components/OrderMovie';

describe('OrderMovie', () => {
  const currentOrder = 'title.asc';
  const onOrderChange = jest.fn();
  const availableOrders = ['title.asc', 'title.desc', 'release_date.asc', 'release_date.desc'];

  it('should render a select element with available order options', () => {
    const { getByLabelText } = render(
      <OrderMovie currentOrder={currentOrder} onOrderChange={onOrderChange} availableOrders={availableOrders} />
    );

    const selectElement = getByLabelText('Order by');
    expect(selectElement).toBeInTheDocument();

    availableOrders.forEach((order) => {
      const optionElement = getByLabelText(order);
      expect(optionElement).toBeInTheDocument();
    });
  });

  it('should call onOrderChange when a new order is selected', () => {
    const { getByLabelText } = render(
      <OrderMovie currentOrder={currentOrder} onOrderChange={onOrderChange} availableOrders={availableOrders} />
    );

    const selectElement = getByLabelText('Order by');
    fireEvent.change(selectElement, { target: { value: 'release_date.asc' } });

    expect(onOrderChange).toHaveBeenCalledTimes(1);
    expect(onOrderChange).toHaveBeenCalledWith('release_date.asc');
  });
});
