// dataBase.spec.tsx
import '@testing-library/jest-dom';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'; // Importa AxiosResponse y AxiosRequestConfig
import { fetchMovies } from './dataBase';

jest.mock('axios');

describe('fetchMovies', () => {
  it('should fetch movies with the correct parameters', async () => {
    const movies = {};
    (axios.get as jest.Mock).mockResolvedValue({ data: movies } as AxiosResponse); // Ajusta el tipo

    const options = {
      page: 1,
      selectedGenre: 'action',
      currentOrder: 'popularity.desc',
      orderTerm: 'someOrderTerm', // Asegúrate de proporcionar un valor para orderTerm
    };

    const result = await fetchMovies(options);

    expect((axios.get as jest.Mock).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/discover/movie?api_key=123&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=action&sort_by=someOrderTerm' // Actualiza la URL
    ));
    expect(result.results).toEqual(movies);
    expect(result.total_pages).toBeUndefined();
  });

  it('should handle errors', async () => {
    const errorMessage = 'Network Error';

    (axios.get as jest.Mock).mockRejectedValueOnce(new Error(errorMessage) as AxiosResponse); // Ajusta el tipo

    await expect(fetchMovies({ page: 1, selectedGenre: 'action', currentOrder: 'popularity.desc', orderTerm: 'someOrderTerm' })).rejects.toThrow(errorMessage);
  });
});
