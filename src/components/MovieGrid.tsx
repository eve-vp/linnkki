/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { fetchMovies } from './dataBase';
import Pagination from './Pagination';
import SearchMovie from './SearchMovie';
import OrderMovie from './OrderMovie';
import { Movie } from './interfaces';

const MovieGrid: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [currentOrder, setCurrentOrder] = useState<string>('');

  const fetchData = async (page: number = 1) => {
    try {
      setLoading(true);
      const { results, total_pages } = await fetchMovies(page, selectedGenre, currentOrder);
      setMovies(results);
      setTotalPages(total_pages);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, selectedGenre, currentOrder]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = async (genre: string) => {
    setCurrentPage(1);
    setSelectedGenre(genre);
    fetchData(1);
  };

  return (
    <div className="movie-2010-grid-container">
      <div className="section-with-bars">
        <SearchMovie onSearch={handleSearch} className="left-bar"/>
        <OrderMovie currentOrder={currentOrder} onOrderChange={setCurrentOrder} className="right-bar"/>
      </div>
      <div className="movie-grid">
        {movies.map((movie) => (
          movie.poster_path && (
          <div key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            <h4>{movie.title}</h4>
            <p>{movie.release_date.split('-')[0]}</p>
          </div>
          )
        ))}
      </div>
      <div className="pagination-container">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
      {loading && (
        <div className="loading-animation">
          <img src="/loading.gif" alt="Loading..." />
        </div>
      )}
    </div>
  );
};

export default MovieGrid;
