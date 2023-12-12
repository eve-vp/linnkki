import { render, screen } from '@testing-library/react';
import SearchMovie from '../components/SearchMovie';

// Mocking genres data
const mockGenres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Comedy' },
  // Add more genres as needed
];

// Extracting genre names
const genreNames = mockGenres.map(genre => genre.name);

describe('SearchMovie component', () => {
  test('renders the component and fetches genres', async () => {
    render(<SearchMovie onSearch={jest.fn()} genres={genreNames} />);
    expect(screen.getByPlaceholderText('Select a genre')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Select a genre')).toBeVisible();

    const genreOptions = screen.getAllByText(/Genre/);
    expect(genreOptions).toHaveLength(mockGenres.length);

    const searchButton = screen.getByText('🔍');
    searchButton.click();

    // Verifica si se ha ejecutado la función onSearch con los parámetros correctos
    expect(jest.fn()).toHaveBeenCalledWith({ genre: 'Comedy', currentOrder: expect.any(Function), selectedGenre: '' });
  });
});
