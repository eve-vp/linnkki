import React, { useState } from 'react';
import axios from 'axios';

const OrderMovie: React.FC = () => {
const [orderTerm, setOrderTerm] = useState('');
const [movies, setMovies] = useState([]);

const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await axios(
      `https://api.themoviedb.org/3/discover/movie?api_key=480128c3202788f17d08d104b8f5c03c&language=en-US&sort_by=${orderTerm}&include_adult=false&include_video=false&page=20&primary_release_date.gte=1960-01-01&primary_release_date.lte=1990-12-31`,
    );
    setMovies(result.data.results);
};

return (
    <form onSubmit={handleOrder}>
      <input type="text" placeholder="Order movie" onChange={(e) => setOrderTerm(e.target.value)} />
      <button type="submit">Order</button>
    </form>
);
};

export default OrderMovie;