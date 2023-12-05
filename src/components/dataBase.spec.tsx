// dataBase.spec.tsx
import '@testing-library/jest-dom';
import axios, { AxiosResponse } from 'axios';
import { fetchMovies } from './dataBase';

jest.mock('axios');

describe('fetchMovies', () => {
  it('should fetch movies with the correct parameters', async () => {
    const movies = {};
    const axiosMock = jest.spyOn(axios, 'get');

    axiosMock.mockResolvedValue({ data: movies } as AxiosResponse);

    const options = {
      page: 1,
      selectedGenre: 'action',
      currentOrder: 'popularity.desc',
      orderTerm: 'someOrderTerm',
    };

    const result = await fetchMovies(options);

    expect(axiosMock).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/discover/movie?api_key=123&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=action&sort_by=someOrderTerm'
    );
    expect(result.results).toEqual(movies);
    expect(result.total_pages).toBeUndefined();
  });

  it('should handle errors', async () => {
    const errorMessage = 'Network Error';

    const axiosMock = jest.spyOn(axios, 'get');
    axiosMock.mockRejectedValueOnce(new Error(errorMessage) as unknown as AxiosResponse); // Cambia a 'unknown'

    await expect(fetchMovies({ page: 1, selectedGenre: 'action', currentOrder: 'popularity.desc', orderTerm: 'someOrderTerm' })).rejects.toThrow(errorMessage);
  });
});
