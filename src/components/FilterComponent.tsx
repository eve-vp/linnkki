// ... (import statement remains the same)
import React, { useState } from 'react';
import { FilterComponentProps } from '../types.tsx';


const FilterComponent: React.FC<FilterComponentProps> = ({ onFilter }) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<string>('');

  const handleFilter = () => {
    const genreParam = selectedGenre ? `with_genres=${selectedGenre}` : '';
    const sortParam = selectedSort ? `&sort_by=${selectedSort}` : '';
  
    console.log('Selected Genre:', selectedGenre);
    console.log('Selected Sort:', selectedSort);
  
    onFilter(genreParam, sortParam);
  };
  
  return (
    <div style={{ backgroundColor: '#E2AE48', padding: '10px', marginBottom: '10px' }}>
      <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
        <option value="">Select genre</option>
        <option value="14">📽️ All</option>
        <option value="28">😎 Action</option>
        <option value="35">🤣​ Comedy</option>
        <option value="18">😭 Drama</option>
        <option value="27">🎃​ Horror</option>
        <option value="24">👽​ Science Fiction</option>
        {/* Add more genre options */}
      </select>
      <select value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)}>
        <option value="">Select order</option>
        <option value="popularity.desc">⬇️ Descending Popularity</option>
        <option value="popularity.asc">⬆️ Ascending Popularity</option>
        <option value="release_date.desc">⬇️ Descending Release Date</option>
        <option value="release_date.asc">⬆️ Ascending Release Date</option>
        <option value="vote_average.desc">⬇️ Descending Rating</option>
        <option value="vote_average.asc">⬆️ Ascending Rating</option>
        {/* Add more sorting options */}
      </select>
      <button onClick={handleFilter}>🔍​</button>
    </div>
  );
};

export default FilterComponent;
