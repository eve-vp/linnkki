import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route } from 'react-router-dom';
import MovieDetail from '../components/MovieDetails';
import { getDetails } from '../services/movie-details';
import { jest } from '@jest/globals';

// Declara el tipo para getDetails como una función jest mock
const mockGetDetails = jest.fn() as jest.MockedFunction<typeof getDetails>;

jest.mock('../services/movie-details', () => ({
  getDetails: mockGetDetails, // Hacer el mock de la función directamente
}));

describe('MovieDetail Component', () => {
  test('renders loading message while fetching movie details', async () => {
    // Mockear la función getDetails para que devuelva una promesa pendiente
    mockGetDetails.mockReturnValueOnce(new Promise(() => {}));

    render(
      <MemoryRouter initialEntries={['/movies/123']}>
        <Route path="/movies/:movId">
          <MovieDetail />
        </Route>
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading movie details/i)).toBeInTheDocument();

    await waitFor(() => {});

    expect(screen.queryByText(/Loading movie details/i)).toBeNull();
  });

  test('renders movie details after fetching', async () => {
    const mockMovieDetails = {
      original_title: 'Test Movie',
      release_date: '2023-01-01',
      genres: [{ name: 'Action' }],
      runtime: 120,
      vote_average: 8.5,
      vote_count: 100,
      overview: 'A test movie overview.',
      poster_path: '/test-poster.jpg',
      // Propiedades adicionales que no están en MovieDetails
      additionalProperty: 'additional',
    };

    render(
      <MemoryRouter initialEntries={['/movies/123']}>
        <Route path="/movies/:movId">
          <MovieDetail />
        </Route>
      </MemoryRouter>
    );

    await waitFor(() => {});

    expect(screen.getByText(mockMovieDetails.original_title)).toBeInTheDocument();
    expect(screen.getByText(/Release year:/i)).toHaveTextContent('2023');
    expect(screen.getByText(/Genre:/i)).toHaveTextContent('Action');
    
  });
});
