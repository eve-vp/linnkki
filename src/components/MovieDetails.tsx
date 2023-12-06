// MovieDetails.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MovieDetails as MovieDetailsType } from './interfaces'; // Asegúrate de tener el tipo de datos correcto

const MovieDetails: React.FC = () => {
  const { movie_id } = useParams<{ movie_id: string }>();
  const [movieDetails, setMovieDetails] = useState<MovieDetailsType | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // Utiliza el endpoint específico para obtener los detalles de la película
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=480128c3202788f17d08d104b8f5c03c&language=en-US`);
        const movieDetailsData = response.data;

        // Destructuring y asignación condicional de propiedades
        const { id, title, poster_path, release_date, genres, vote_average, vote_count, overview } = movieDetailsData;

        const transformedMovieDetails: MovieDetailsType = {
          id,
          title,
          poster_path,
          release_date,
          genres,
          vote_average,
          vote_count,
          overview,
          poster: `https://image.tmdb.org/t/p/w500/${poster_path}` // Asumiendo que poster_path está disponible
        };

        setMovieDetails(transformedMovieDetails);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        // Maneja los errores, por ejemplo, redirigiendo a una página de error
      }
    };

    fetchMovieDetails();
  }, [movie_id]);

  if (!movieDetails) {
    return <div>Loading...</div>; // Puedes personalizar el componente de carga según tus necesidades
  }

  return (
    <div className="movie-details-container">
      <img src={movieDetails.poster} alt={movieDetails.title} />
      <h2>{movieDetails.title}</h2>
      <p>{`Year of Release: ${movieDetails.release_date.split('-')[0]}`}</p>
      <p>{`Genres: ${movieDetails.genres.map((genre) => genre.name).join(', ')}`}</p>
      <p>{`Average Vote: ${movieDetails.vote_average} (${movieDetails.vote_count} votes)`}</p>
      <p>{`Overview: ${movieDetails.overview}`}</p>
      {/* Otros detalles que desees mostrar */}
    </div>
  );
};

export default MovieDetails;
