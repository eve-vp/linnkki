// MovieDetails.tsx
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MovieDetails } from '../services/types';
import { getDetails } from '../services/movie-details';


const MovieDetail = () => {
  const { movId } = useParams();
  const [movie, setMovie] = useState<MovieDetails | null>(null);

  useEffect(() => {
      getDetails(Number(movId))
          .then((movie) => { setMovie(movie) })
          .catch((error) => console.log(error));
  }, [movId]);

  if (!movie) {
      console.log('no movie');
      return <p>Loading movie details...</p>;
  }

  return (
        <div className="movie-detail-container">
      <header className="header">
        <div className="section-with-bars">
          <div className="images">
            <img src="../public/tv.png" className="image" alt="TV Icon" />
            <img src="../public/logoBK.png" className="image" alt="Logo" />
            
          </div>
        </div>
      </header>

      <div className='movie-container'>
        <section className='img-container'>
          {movie && (
            <>
              <img
                className='img-detail'
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.original_title}
              />

              <Link to='/Movies'>
                <button className='back-btn'>Back</button>
              </Link>
            </>
          )}
        </section>

        <section className='movie-detail-text'>
          {movie && (
            <>
              <h1>{movie.original_title}</h1>
              <section className='info'>
                <p className='p-detail'><strong>Release year:</strong> {new Date(movie.release_date).getFullYear()}</p>
                <p className='p-detail'><strong>Genre:</strong> {movie.genres ? movie.genres.map((genre) => genre.name).join(', ') : 'N/A'}</p>
                <p className='p-detail'><strong>Duration:</strong> {movie.runtime} minutes</p>
                <p className='p-detail'><strong>User Score:</strong> {movie?.vote_average?.toFixed(2)}% </p>
                <p className='p-detail'><strong>Total Votes:</strong> {movie.vote_count}</p>
              </section>
              <p className='p-detail'><strong>Overview:</strong></p>
              <p className='p-detail'>{movie.overview}</p>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default MovieDetail;