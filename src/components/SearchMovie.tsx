/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface SearchMovieProps {
  onSearch: (genre: string) => void;
}

interface Genre {
  id: number;
  name: string;
}

const SearchMovie: React.FC<SearchMovieProps> = ({ onSearch }) => {
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    // Obtener la lista de géneros al cargar el componente
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/genre/movie/list?api_key=480128c3202788f17d08d104b8f5c03c&language=en-US'
      );
      setGenres(response.data.genres);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  return (
    <div className="search-movie">
      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="" disabled>
          Select a genre
        </option>
        {genres.map((genreOption) => (
          <option key={genreOption.id} value={genreOption.id.toString()}>
            {genreOption.name}
          </option>
        ))}
      </select>
      
    </div>
  );
};

export default SearchMovie;
