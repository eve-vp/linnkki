/* eslint-disable @typescript-eslint/no-unused-vars */

import MovieDetails from './MovieDetails';
import { Queries, render, RenderOptions, screen } from '@testing-library/react';
import { ReactElement, JSXElementConstructor } from 'react';

interface CustomRenderOptions<Q extends Queries = typeof import('@testing-library/dom/types/queries')>
  extends Omit<RenderOptions<Q>, 'queries'> {
  initialState?: any;
}

function customRender(
  ui: ReactElement<any, string | JSXElementConstructor<any>>,
  options?: CustomRenderOptions
) {
  return render(ui, options as RenderOptions);
}

describe('MovieDetails component', () => {
  describe('Initial Rendering and Loading', () => {
    test('renders loading message', () => {
      render(<MovieDetails />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('Rendering with Movie Details', () => {
    test('renders movie details', () => {
      const movieDetailsMock = {
        id: 1,
        title: 'Sample Movie',
        poster: 'sample.jpg',
        release_date: '2022-01-01',
        genres: [{ id: 1, name: 'Action' }],
        vote_average: 7.5,
        vote_count: 100,
        overview: 'A sample movie overview.',
      };

      render(<MovieDetails />, { initialState: { movieDetails: movieDetailsMock } });

      expect(screen.getByAltText('Sample Movie')).toBeInTheDocument();
      expect(screen.getByText('Sample Movie')).toBeInTheDocument();
      // ... agregar más expectativas para otros detalles de la película
    });
  });

  describe('Rendering Movie Not Found', () => {
    test('renders movie not found message', () => {
      const movieDetailsMock = {
        id: 1,
        title: null, // Película no encontrada
        poster: 'sample.jpg',
        release_date: '2022-01-01',
        genres: [{ id: 1, name: 'Action' }],
        vote_average: 7.5,
        vote_count: 100,
        overview: 'A sample movie overview.',
      };

      render(<MovieDetails />, { initialState: { movieDetails: movieDetailsMock } });

      expect(screen.getByText('Movie not found')).toBeInTheDocument();
    });
  });
});
