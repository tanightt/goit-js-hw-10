const API_KEY = 'live_XjkJqRSVRKCitHj0JlNL46I9nUsIFOPRVUWdePF9ct724HjTgCpvhYtTYmhmbe6U';

export function fetchBreeds() {

    return fetch(`https://api.thecatapi.com/v1/breeds?api_key=${API_KEY}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
}

export function fetchCatByBreed(breedId) {
    return fetch(`https://api.thecatapi.com/v1/images/search?api_key=${API_KEY}&breed_ids=${breedId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
}