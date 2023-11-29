// OrderMovie.tsx
import React from 'react';
import { OrderMovieProps } from './interfaces';
// import { fetchMovies } from './dataBase';

const OrderMovie: React.FC<OrderMovieProps> = ({ currentOrder, onOrderChange }) => {
  // const [orderTerm, setOrderTerm] = useState('');
  // const [orderedMovies, setOrderedMovies] = useState<any[]>([]);

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentOrder) {
      alert('Please provide a valid order term');
      return;
    }

    try {
      // const movies = await fetchMovies(orderTerm);
      // setOrderedMovies(movies);
      onOrderChange(currentOrder);
    } catch (error) {
      console.error('Error handling order:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleOrder}>
      <button type="submit">Order</button>
      </form>
    </div>
  );
};

export default OrderMovie;
