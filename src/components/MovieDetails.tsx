/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { MovieDetails } from './interfaces';

const MovieDetails: React.FC = () => {
  const { movieId } = useParams<{ movieId: string | undefined }>();
  const [movieDetails, setMovieDetails] = useState<any>(null);

  useEffect(() => {
    // Check if movieId is defined
    if (!movieId) {
      console.error('movieId is undefined');
      return;
    }
  
    // Log the received movieId
    console.log('Received movieId:', movieId);
  
    // Convert movieId to a number
    const id = parseInt(movieId, 10);
  
    // Check if id is a valid number
    if (isNaN(id)) {
      console.error('Invalid movieId:', movieId);
      return;
    }
  
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: '480128c3202788f17d08d104b8f5c03c',
            language: 'en-US',
          },
        });
        setMovieDetails(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
  
    fetchMovieDetails();
  }, [movieId]);
  

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{movieDetails.original_title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
        alt={movieDetails.original_title}
      />
      <p>Release Year: {new Date(movieDetails.release_date).getFullYear()}</p>
      <p>Genres: {movieDetails.genres.map((genre: { name: string }) => genre.name).join(', ')}</p>
      <p>Vote Average: {movieDetails.vote_average}</p>
      <p>Total Votes: {movieDetails.vote_count}</p>
      <Link to="/Movies">Back to Movies</Link>
    </div>
  );
};

export default MovieDetails;
