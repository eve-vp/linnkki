import { useState, useEffect } from 'react';
import axios from 'axios';


const API_KEY = '480128c3202788f17d08d104b8f5c03c';
const BASE_URL = 'https://api.themoviedb.org/3/discover/movie';

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

  const itemsPerRow = 4; // Número de películas por fila
  const totalRows = Math.ceil(movies.length / itemsPerRow); // Total de filas
  const itemsPerPage = itemsPerRow * 2; // Número de películas por página
  const totalPages = Math.ceil(movies.length / itemsPerPage); // Total de páginas
  
  const renderMovies = (start, end) => {
    return movies.slice(start, end).map((movie) => (
      <div key={movie.id} style={{ margin: '10px', textAlign: 'center', flex: '0 0 25%' }}>
        <img
          className="movie-poster"
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
        />
        <div style={{ marginTop: '10px' }}>
          <p style={{ marginBottom: '5px' }}>{movie.title}</p>
          <p>{movie.release_date.substring(0, 4)}</p>
        </div>
      </div>
    ));
  };
  
  return (
    <div style={{ maxWidth: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden' }}>
      <div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'scroll', width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {renderMovies(0, movies.length)}
      </div>
      <div style={{ marginTop: '20px', marginBottom: '20px', maxWidth: '800px', display: 'flex', justifyContent: 'center' }}>
        <button onClick={handlePrevPage} disabled={page === 1}>
          Previous Page
        </button>
        {Array.from({ length: Math.min(totalPages, 10) }, (_, index) => (
          <button key={index + 1} onClick={() => setPage(index + 1)}>
            {index + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next Page
        </button>
      </div>
    </div>
  );
  
};

const getMovies = async (page) => {
  const params = {
    api_key: API_KEY,
    page: page,
    language: 'en-US',
    sort_by: 'popularity.desc',
    include_adult: false,
    include_video: false,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    // Manejo de errores
    console.error('Error fetching movies:', error);
    return [];
  }
};

export default MovieTable;
