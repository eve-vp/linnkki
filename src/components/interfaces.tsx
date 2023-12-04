// interfaces.ts
export interface MovieDetails {
  id: number;
  title: string;
  poster: string;
  overview: string;
  poster_path: string;
  release_date: string;
  genres: Genre[];
  vote_average: number;
  vote_count: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

export interface MovieResponse {
  page?: number;
  results: Movie[];
  total_pages: number;
}

export interface OrderMovieProps {
  currentOrder: string;
  onOrderChange: (order: string) => void;
  availableOrders: string[]; // Agrega un arreglo de órdenes disponibles
  // className?: string; // Propiedad opcional
}

export interface FilterComponentProps {
  onFilter: (selectedGenre: string, selectedSort: string) => void;
}

export interface SearchMovieProps {
  onSearch: (genre: string) => void;
  className?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
