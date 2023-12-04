
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

export interface Genre {
  id: number;
  name: string;
}

export interface SearchMovieProps {
  onSearch: (genre: string) => void;
  className?: string; // Propiedad opcional
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}