import { API_KEY } from "./movie-request";
import {MovieDetails} from "./interfaces";


export const  getDetails = (movId: number):  Promise<MovieDetails> => 
    new Promise((resolve, reject) => {
        const  options = {
            method: 'GET', 
            headers: {
                accept: 'application/json',
                Authorization:  API_KEY,
            }
        };
        fetch(`https://api.themoviedb.org/3/movie/${movId}?language=en-US`, options)
        .then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    });