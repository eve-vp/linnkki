import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GenreData, MovieInfo } from '../services/interfaces';
import { getMovieInfo } from '../services/data';
import Notfound from '../public/Notfound.gif';

export default function MovieDetails() {
  const [movie, setMovie] = useState<MovieInfo>();
  const { movieId } = useParams();

  useEffect(() => {
    getMovieInfo(Number(movieId))
      .then((data) => {
        setMovie(data);
      })
      .catch((error) => console.log('ERROR: ', error));
  }, [movieId]);

  return (
    <div className="movie-detail-container">
      {/* Resto del código... */}

      <div className='movie-container'>
        <div className='img-container'>
          <img
            className='img-detail'
            src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
            onError={(e) => {
              e.currentTarget.src = Notfound;
            }}
            alt=''
          />
        </div>

        <div className='movie-detail-text'>
          <div className='section-title'>
            <p className='title-info'>{movie?.title}</p>
            <p className='yearP'>{new Date(movie?.release_date || '').getFullYear()}</p>
          </div>
          <p className='infoMovie'>{movie?.overview}</p>
          <p className='category'> {movie?.genres
            .filter((genre) => genre.id === 27 || genre.id === 53)
            .map((genre: GenreData) => genre.name).join(', ')}</p>
        </div>
      </div>

      <Link to='/Movies'>
        <button className='back-btn'>Back</button>
      </Link>
    </div>
  );
}