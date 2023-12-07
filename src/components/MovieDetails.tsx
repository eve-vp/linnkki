// MovieDetails.tsx
import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import { MovieDetails as MovieDetailsType } from './interfaces'; // Asegúrate de tener el tipo de datos correcto

//setMovieDetails es el primer parámetro y es requerido
//movie_id es el segundo parámetro y es opcional
const fetchMovieDetails = async (
  setMovieDetails: React.Dispatch<React.SetStateAction<MovieDetailsType | null>>,
  movie_id?: string,
) => {
  try {
    if (movie_id) {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=480128c3202788f17d08d104b8f5c03c&language=en-US`);
    
      if (response.status === 404) {
      console.error('Movie not found');
      // TODO: Emitir un mensaje de error en tu aplicación o manejar de otra manera
    } else {
      const movieDetailsData = response.data;

      // Destructuring y asignación condicional de propiedades
      const { id, title, poster_path, release_date, genres, vote_average, vote_count, overview } = movieDetailsData;

      const transformedMovieDetails = {
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

    // Actualiza el estado con los detalles de la película
    setMovieDetails(transformedMovieDetails);
  }
} else {
  // El usuario no proporcionó un ID de película
  console.error('No movie ID provided');
}
} catch (error) {
console.error('Error fetching movie details:', (error as AxiosError).response);
}
};


const MovieDetails: React.FC = () => {
  const { movie_id } = useParams<{ movie_id: string }>();
  const [movieDetails, setMovieDetails] = useState<MovieDetailsType | null>(null);

  useEffect(() => {
    if (movie_id) {
    // Llamar a la función de obtención de detalles de la película
    fetchMovieDetails?.(setMovieDetails, movie_id);
  }
}, [movie_id]); // Asegúrate de que la dependencia sea correcta

  // Verificar si movieDetails es null o undefined antes de intentar acceder a sus propiedades
  if (!movieDetails) {
    return <div>Loading...</div>;
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
