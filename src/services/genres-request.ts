import { Genre } from './types';
import { API_KEY} from "./movie-request";

export const getGenres = (genre:number): Promise<Genre[]> =>
    new Promise((resolve, reject) => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: API_KEY
            }
        };
        //To do: add genres to the url int a better way
        fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en-US&with_genres=${genre}`, options)
            .then(response => response.json())
            .then(response => resolve(response.genres))
            .catch(err => reject(err));
    });