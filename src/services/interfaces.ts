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
  adult: boolean;
  backdrop_path: string;
}


export interface Movie {
  genres: any;
  vote_average: any;
  vote_count: any;
  overview: any;
  // [x: string]: any;
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

export interface Genre {
  id: number;
  name: string;
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
  onSearch: (searchParams: SearchParams) => void;
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
// Movie details

export interface GenreData {
  id: number;
  name: string;
}

export interface  Companie {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface Language {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MovieInfo {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: GenreData[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Companie[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Language[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Start {
  start: number;
  status: boolean;
}