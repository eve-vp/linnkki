/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import SearchMovie from './SearchMovie';

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
  const [movies, setMovies] = useState<Movie[]>([]); // Tipo explícito Movie[]
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/discover/movie?api_key=480128c3202788f17d08d104b8f5c03c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currentPage}`
      );
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const searchMoviesByGenre = async (genre: string): Promise<Movie[]> => {
    try {
      const response = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/discover/movie?api_key=480128c3202788f17d08d104b8f5c03c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currentPage}&with_genres=${genre}`
      );
      return response.data.results;
    } catch (error) {
      console.error('Error searching movies by genre:', error);
      throw error;
    }
  };

  const handleSearch = async (genre: string) => {
    try {
      setLoading(true);
      const movies = await searchMoviesByGenre(genre);
      setMovies(movies);
    } catch (error) {
      console.error('Error searching movies:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="movie-2010-grid-container">
      <SearchMovie onSearch={handleSearch} />
      <div className="movie-grid">
        {movies.map((movie: any) => (
          <div key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            <h4>{movie.title}</h4>
            <p>{movie.release_date}</p>
          </div>
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