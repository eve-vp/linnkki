/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import SearchMovie from './SearchMovie';
import OrderMovie from './OrderMovie'; // Importa el componente OrderMovie

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
}
const MovieGrid: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string>(''); // Nuevo estado para almacenar el género seleccionado
  const [currentOrder, setCurrentOrder] = useState<string>(''); // Nuevo estado para almacenar la ordenación actual

  const fetchData = async (page: number = 1) => {
    try {
      setLoading(true);
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=480128c3202788f17d08d104b8f5c03c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${selectedGenre}`;

      // Agregar lógica para manejar la ordenación
      if (currentOrder) {
        url += `&sort_by=${currentOrder}`;
      }

      const response = await axios.get<MovieResponse>(url);
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, selectedGenre, currentOrder]); // Agregar selectedGenre y currentOrder a las dependencias

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = async (genre: string) => {
    // Restablecer currentPage a 1 al realizar una búsqueda por género
    setCurrentPage(1);
    setSelectedGenre(genre);

    // Actualizar el género seleccionado y desencadenar la búsqueda
    fetchData(1);
  };

  return (
    <div className="movie-2010-grid-container">
      <div className="head-container">
        <SearchMovie onSearch={handleSearch} className="left-bar"/>
        <OrderMovie currentOrder={currentOrder} onOrderChange={setCurrentOrder} className="right-bar"/>
      </div>
      <div className="movie-grid">
        {movies.map((movie) => (
          movie.poster_path && (
          <div key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            <h4>{movie.title}</h4>
            <p>{movie.release_date}</p>
          </div>
          )
        ))}
      </div>
      <div className="pagination-container">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
      {loading && (
        <div className="loading-animation">
          <img src="/public/loading.gif" alt="Loading..." />
        </div>
      )}
    </div>
  );
};

export default MovieGrid;
