// OrderMovie.tsx
import React, { useState } from 'react';
import { OrderMovieProps } from './interfaces';
import { fetchMovies } from './dataBase';

const OrderMovie: React.FC<OrderMovieProps> = ({ currentOrder, onOrderChange, availableOrders }) => {
  const [orderTerm, setOrderTerm] = useState<string>(currentOrder);

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderTerm(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!orderTerm) {
      alert('Please select a valid order term');
      return;
    }
  
    const normalizedOrderTerm = orderTerm.endsWith('.asc') || orderTerm.endsWith('.desc')
      ? orderTerm
      : `${orderTerm}.desc`;
  
    try {
      await fetchMovies({
        page: 1,
        selectedGenre: '', 
        currentOrder: '',
        orderTerm: normalizedOrderTerm,
      });
  
      onOrderChange(normalizedOrderTerm);
    } catch (error) {
      console.error('Error handling order:', error);
    }
  };

  return (
    <div>
  <form onSubmit={handleSubmit}>
    <label>
      <select value={orderTerm} onChange={handleOrderChange}>
        {availableOrders.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
    <button type="submit" className="search-button">
      Order Movies
    </button>
  </form>
</div>

  );
};

export default OrderMovie;
