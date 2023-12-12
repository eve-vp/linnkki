/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../services/data';
import Pagination from './Pagination';
import SearchMovie from './SearchMovie';
import OrderMovie from './OrderMovie';
import { Movie, SearchParams } from '../services/interfaces';
import { Link } from 'react-router-dom';

const MovieGrid: React.FC = () => {
  // movie variable que inicia vacia movies []
  // setmovies es la funcion que cambia el estado de la variable movies
  /// React actualiza la vista al cambiar el estado
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [currentOrder, setCurrentOrder] = useState<string>("");

  const fetchData = async (page: number = 1) => {
    try {
      console.log(
        "Fetching data with Genre:",
        selectedGenre,
        "and Order:",
        currentOrder
      );
      setLoading(true);
      const { results, total_pages } = await fetchMovies({
        page: page,
        selectedGenre: selectedGenre,
        currentOrder: currentOrder,
        orderTerm: "",
      });
      // funcion que llama a los resultados de la api
      setMovies(results);
      setTotalPages(total_pages);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Add more specific error handling, e.g., show an error message to the user
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);
  // }, [currentPage, selectedGenre, currentOrder]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = async (searchParams: SearchParams) => {
    setCurrentPage(1);
    setSelectedGenre(searchParams.selectedGenre);
    setCurrentOrder(searchParams.currentOrder as React.SetStateAction<string>);
    fetchData(1);
  };

  useEffect(() => {
    if (selectedGenre || currentOrder) {
      console.log("Fetching data with Genre:", selectedGenre, "and Order:", currentOrder);
    }
    fetchData(currentPage);
  }, [currentPage, selectedGenre, currentOrder]);

  return (
    <div className="movie-grid-container">
      <div className="section-with-bars">
        <div className="images">
          <img src="tv.png" className="image" />
          <img src="logoBK.png" className="image" />
        </div>
        <div className="search-container">
          <SearchMovie onSearch={handleSearch} genres={[]} />
        </div>

        <div className="order-container">
          <OrderMovie
            currentOrder={currentOrder}
            onOrderChange={setCurrentOrder}
            availableOrders={[
              "popularity.desc",
              "release_date.asc",
              "release_date.desc",
              "vote_average.asc",
              "vote_average.desc",
            ]}
          />
        </div>
      </div>
      <div className="movie-grid">
        {movies.map(
          (movie) =>
            movie.poster_path && (
              <div key={movie.id}>
                <Link to={`/Movies/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                  />
                </Link>
                <h4>{movie.title}</h4>
                <p>{movie.release_date.split("-")[0]}</p>
              </div>
            )
        )}
      </div>
      <div className="pagination-container">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
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