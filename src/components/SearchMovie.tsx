/* eslint-disable no-irregular-whitespace */
import React, { useState, useEffect } from 'react';

interface Genre {
  id: number;
  name: string;
}

interface SearchMovieProps {
  onSearch: (genre: string) => void;
}

const SearchMovie: React.FC<SearchMovieProps> = ({ onSearch }) => {
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const apiKey = '480128c3202788f17d08d104b8f5c03c';
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);

        if (response.ok) {
          const data = await response.json();
          setGenres(data.genres);
        } else {
          console.error('Error en la respuesta de la API:', response.statusText);
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };

    fetchGenres();
  }, []);

  const handleSearch = () => {
    onSearch(genre);
  };

  return (
    <div>
      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="" disabled>
          Select a genre
        </option>
        {genres.map((genreOption) => (
          <option key={genreOption.id} value={genreOption.name}>
            {genreOption.name}
          </option>
        ))}
      </select>
      <button onClick={handleSearch} className="search-button">
        🔍
      </button>
    </div>
  );

};

export default SearchMovie;
