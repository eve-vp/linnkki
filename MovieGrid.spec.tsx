import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import MovieGrid from './MovieGrid';

// Mock de Axios para simular las llamadas a la API
const mockAxios = new MockAdapter(axios);

// Datos de prueba
const mockMovieResponse = {
  page: 1,
  results: [
    { id: 1, title: 'Movie 1', poster_path: '/poster1.jpg', release_date: '2023-01-01' },
    { id: 2, title: 'Movie 2', poster_path: '/poster2.jpg', release_date: '2023-02-01' },
  ],
  total_pages: 1,
};

describe('MovieGrid', () => {
  beforeEach(() => {
    // Restaurar la implementación original de Axios antes de cada prueba
    mockAxios.reset();
  });

  test('fetches and displays movies on render', async () => {
    // Configurar Axios para devolver los datos de prueba cuando se hace la solicitud
    mockAxios.onGet(/\/discover\/movie/).reply(200, mockMovieResponse);

    render(<MovieGrid />);

    const loading = screen.getByAltText(/loading/i);
    expect(loading).toBeInTheDocument();

    // Esperar a que se carguen las películas
    await waitFor(() => {
      expect(screen.getAllByRole('img', { name: /movie poster/i })).toHaveLength(2);
    });

    expect(loading).not.toBeInTheDocument();
  });

  test('changes page when pagination clicked', async () => {
    // Configurar Axios para devolver los datos de prueba cuando se hace la solicitud
    mockAxios.onGet(/\/discover\/movie/).reply(200, mockMovieResponse);

    render(<MovieGrid />);

    // Esperar a que se carguen las películas
    await waitFor(() => expect(screen.getAllByRole('img', { name: /movie poster/i })).toHaveLength(2));

    // Simular clic en la paginación
    userEvent.click(screen.getByText('2'));

    // Esperar a que se carguen las películas de la segunda página
    await waitFor(() => expect(screen.getAllByRole('img', { name: /movie poster/i })).toHaveLength(2));

    expect(screen.getByText('Page 2')).toBeInTheDocument();
  });

  test('searches movies by genre', async () => {
    // Configurar Axios para devolver los datos de prueba cuando se hace la solicitud
    mockAxios.onGet(/\/discover\/movie/).reply(200, mockMovieResponse);

    render(<MovieGrid />);

    // Simular búsqueda por género
    const search = screen.getByLabelText('Search by genre');
    userEvent.type(search, 'action');
    userEvent.click(screen.getByRole('button'));

    // Esperar a que se carguen las películas
    await waitFor(() => expect(screen.getAllByRole('img', { name: /movie poster/i })).toHaveLength(2));

    const titles = screen.getAllByRole('heading');
    expect(titles[0]).toHaveTextContent(/Movie 1/i); // Ajustar según tus datos de prueba
  });
});
