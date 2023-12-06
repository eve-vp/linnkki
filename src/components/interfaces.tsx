/* eslint-disable @typescript-eslint/no-explicit-any */

import { SetStateAction } from "react";

// interfaces.ts
export interface MovieDetails {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  // genres: any;
  genres: Genre[];
  vote_average: number;
  vote_count: number;
  poster: string; 
  overview: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  [x: string]: any;
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
  onSearch: (searchParams: SearchParams) => Promise<void>;
  genres: string[];
}

export interface SearchParams {
  currentOrder(currentOrder: any): unknown;
  selectedGenre: SetStateAction<string>;
  genre: string;
  }

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

