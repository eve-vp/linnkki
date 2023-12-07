import { render, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import MovieDetails from './MovieDetails';
import axios from 'axios';

jest.mock('axios');

describe('MovieDetails', () => {
  const mockMovieDetails = {
    id: 123,
    title: 'Test movie',
    poster_path: '/test-poster.jpg',
    release_date: '2023-10-26',
    genres: [{ id: 1, name: 'Comedy' }],
    vote_average: 7.5,
    vote_count: 100,
    overview: 'This is a test movie overview.',
  };

  it('renders movie details correctly', async () => {
    // Mock axios response
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockMovieDetails });

    // Render the component within a router, since it uses useParams
    const { getByText, queryByText } = render(
      <MemoryRouter initialEntries={['/movies/123']}>
        <Route path="/movies/:movie_id">
          <MovieDetails />
        </Route>
      </MemoryRouter>
    );

    // Wait for the component to update with the movie details
    await waitFor(() => expect(getByText('Loading...')).toBeVisible());
    await waitFor(() => expect(queryByText('Loading...')).toBeNull());

    // Assert that the movie details are rendered correctly
    expect(getByText('Test movie')).toBeInTheDocument();
    expect(getByText('Year of Release: 2023')).toBeInTheDocument();
    expect(getByText('Genres: Comedy')).toBeInTheDocument();
    expect(getByText('Average Vote: 7.5 (100 votes)')).toBeInTheDocument();
    expect(getByText('Overview: This is a test movie overview.')).toBeInTheDocument();
  });
});
