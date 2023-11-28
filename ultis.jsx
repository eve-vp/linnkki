/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
const response = await axios.get('https://api.themoviedb.org/3/movie', {
    params: {
        api_key: 'Y480128c3202788f17d08d104b8f5c03c'
    },
    headers: {
        'Authorization': 'Bearer ' + '480128c3202788f17d08d104b8f5c03c'
    }
});