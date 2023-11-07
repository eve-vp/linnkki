import { useState, useEffect } from 'react';
import axios from 'axios';


const API_KEY = '480128c3202788f17d08d104b8f5c03c';
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieTable = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getMovies(page);
      setMovies(data.results);
    };

    fetchMovies();
  }, [page]);

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Poster</th>
            <th>Title</th>
            <th>Release Year</th>
          </tr>
        </thead>
        <tbody>
        {movies.map(movie => (
        <tr key={movie.id}>
        <td>
          <img 
            className="movie-poster"
            src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
            alt={movie.title} 
          />
        </td>
        <td>{movie.title}</td>
        <td>{movie.release_date.substring(0, 4)}</td>
        </tr> 

      ))}
      </tbody>

        </table>
          <button onClick={handlePrevPage} disabled={page === 1}>
          Previous Page
          </button>
          <button onClick={handleNextPage}>Next Page</button>
      </div>
  );
};

const getMovies = async (page: number) => {
  const response = await axios.get(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      page: page,
    },
  });

  return response.data;
};

export default MovieTable;
