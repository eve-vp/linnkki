
// dataBase.tsx
import axios from 'axios';
import { MovieResponse } from './interfaces';

const MOVIE_DB_BASE_URL = 'https://api.themoviedb.org/3/discover/movie';
const MOVIE_DB_API_KEY = '480128c3202788f17d08d104b8f5c03c';

// dataBase.tsx
export const fetchMovies = async (options: {
  page: number;
  selectedGenre: string;
  currentOrder: string;
  orderTerm: string;
}) => {
  
  try {
    const { page, selectedGenre, currentOrder, orderTerm } = options;

    let url = `${MOVIE_DB_BASE_URL}?api_key=${MOVIE_DB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${selectedGenre}`;

    if (currentOrder) {
      url += `&sort_by=${currentOrder}`;
    }

    if (orderTerm) {
      url += `&sort_by=${orderTerm}`;
    }

    const response = await axios.get<MovieResponse>(url);
    return {
      results: response.data.results,
      total_pages: response.data.total_pages,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

