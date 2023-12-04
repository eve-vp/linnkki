/* eslint-disable @typescript-eslint/no-unused-vars */
// En tu archivo de pruebas (MovieGrid.spec.tsx)

import { render, screen, waitFor } from '@testing-library/react';
import MovieGrid from './MovieGrid';
// import { MovieResponse } from './interfaces';
import { fetchMovies } from './dataBase';
import { Movie } from './interfaces';

jest.mock('./dataBase', () => ({
  ...jest.requireActual('./dataBase'), // Mantiene la implementación real de fetchMovies
  fetchMovies: jest.fn() as jest.Mock<Promise<{ results: Movie[]; total_pages: number }>>,
}));

describe('MovieGrid Component', () => {
  it('fetches movies and updates state on mount', async () => {
    const mockedMovies: Movie[] = [
      { id: 1, title: 'Movie 1', poster_path: '/poster1.jpg', release_date: '2022-01-01' },
      { id: 2, title: 'Movie 2', poster_path: '/poster2.jpg', release_date: '2022-02-01' },
    ];

    // Define el tipo de objeto que se espera de fetchMovies
    (fetchMovies as jest.Mock).mockResolvedValueOnce({ results: mockedMovies, total_pages: 2 });

    render(<MovieGrid />);

    // Wait for the data to be fetched
    await waitFor(() => {
      expect(screen.getByAltText('Movie 1')).toBeInTheDocument();
      expect(screen.getByAltText('Movie 2')).toBeInTheDocument();
    });
  });
});
