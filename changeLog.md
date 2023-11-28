## <version 0> - <11/22/2023>

### Sprint learnings

Estoy profundizado @testing-library/jest-dom' para poder pasar los test

### Added

 const [currentOrder, setCurrentOrder] = useState<string>(''); // Nuevo estado para almacenar la ordenación actual.

### Changed
Traia películas de clasififación de adultos
 const result = await axios.get(
        `https://api.themoviedb.org/3/discover/movie`,
        {
          params: {
            api_key: '480128c3202788f17d08d104b8f5c03c',
            language: 'en-US',
            sort_by: orderTerm,
            include_adult: false,
            include_video: false,
            page: 500,
            'primary_release_date.gte': '1960-01-01',
            'primary_release_date.lte': '1990-12-31',
          },
        }
      );.

### Fixed

Se resuelve bug UX de paginación donde en el modo dark no se veian los números.

### Removed

Eliminine la carpeta de los test para colocarlos con las funciones, sino lo los encontraba y los test no corrian.
