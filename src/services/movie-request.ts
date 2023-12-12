
export const API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ODAxMjhjMzIwMjc4OGYxN2QwOGQxMDRiOGY1YzAzYyIsInN1YiI6IjY1NDRmN2E0OWNjNjdiMDBhYjQ2MTliZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g26zetBWTfwG0AExfsbqojjNGbfjjpN5z50YOy_oJOg';


export const buildApiUrl = (page: number, genre: number, sortBy:string) => {
    return `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sortBy}&with_genres=${genre > 0 ? genre : ''}`

};