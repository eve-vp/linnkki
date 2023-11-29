import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from './dataBase';
import { MovieDetails } from './interfaces';

function MovieDetails() {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const { movieId } = useParams();

  useEffect(() => {
    async function getMovie() {
      try {
        // Validate that movieId is a number
        const id = parseInt(movieId as string, 10);
        if (isNaN(id)) {
          throw 'Invalid ID';
        }

        const movie = await fetchMovieDetails(id);
        setMovie(movie);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    }

    if (movieId) {
      getMovie();
    }
  }, [movieId]);

  return (
    <div>
      {movie && (
        <div>
          <h1>{movie.title}</h1>
          <img src={movie.poster} alt={movie.title} />
        </div>
      )}
      {/* Add loader or error handling if needed */}
    </div>
  );
}

export default MovieDetails;
