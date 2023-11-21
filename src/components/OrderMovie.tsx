/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';

interface OrderMovieProps {
  currentOrder: string;
  onOrderChange: (order: string) => void;
  className?: string; // Propiedad opcional
}

const OrderMovie: React.FC<OrderMovieProps> = ({ currentOrder, onOrderChange }) => {
  const [orderTerm, setOrderTerm] = useState('');
  const [, setOrderedMovies] = useState<any[]>([]);

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!orderTerm) {
      alert('Please provide a valid order term');
      return;
    }

    try {
      const result = await axios.get(
        `https://api.themoviedb.org/3/discover/movie`,
        {
          params: {
            api_key: '480128c3202788f17d08d104b8f5c03c',
            language: 'en-US',
            sort_by: orderTerm,
            include_adult: false,
            include_video: false,
            page: 500,
            'primary_release_date.gte': '1960-01-01',
            'primary_release_date.lte': '1990-12-31',
          },
        }
      );
      setOrderedMovies(result.data.results);
      onOrderChange(orderTerm);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleOrder}>
        <label>
          Order movie by:
          <select value={orderTerm} onChange={(e) => setOrderTerm(e.target.value)}>
            <option value="" disabled>
              Select an option
            </option>
            <option value="popularity.desc">Popularity Descending</option>
            <option value="popularity.asc">Popularity Ascending</option>
            <option value="release_date.desc">Release Date Descending</option>
            <option value="release_date.asc">Release Date Ascending</option>
            <option value="original_title.desc">A to Z</option>
            <option value="original_title.asc">Z to A</option>
          </select>
        </label>
        <button type="submit">Order</button>
      </form>

    </div>
  );
};

export default OrderMovie;
