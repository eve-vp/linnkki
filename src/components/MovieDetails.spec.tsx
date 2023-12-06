/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { screen, render, RenderOptions } from '@testing-library/react';
import { ReactElement, JSXElementConstructor } from 'react';
import MovieDetails from './MovieDetails';

interface CustomRenderOptions extends Omit<RenderOptions, 'queries'> {
  extendOptions?: (options: RenderOptions) => RenderOptions;
  initialState?: any;
}

function customRender(
  ui: ReactElement<any, string | JSXElementConstructor<any>>,
  options?: CustomRenderOptions
) {
  const { extendOptions, initialState, ...renderOptions } = options || {};
  const finalOptions = extendOptions ? extendOptions(renderOptions) : renderOptions;
  return render(ui, finalOptions);
}

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

    customRender(<MovieDetails />, { initialState: movieDetailsMock });


    // Nuevas expectativas
    expect(screen.getByAltText('Sample Movie')).toBeInTheDocument();
    expect(screen.getByText('Sample Movie')).toBeInTheDocument();
    // Puedes agregar más expectativas para otros detalles de la película
    // expect(screen.getByText('Release Date: 2022-01-01')).toBeInTheDocument();
    // ...

    // Expectativas eliminadas
    // expect(screen.getByAltText('Sample Movie')).toBeInTheDocument();
    // expect(screen.getByText('Sample Movie')).toBeInTheDocument();
    // ...
  });
});

