import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('#breedSelect');
const catInfo = document.querySelector('.cat-info');
const loaderMessage = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');

breedSelect.style.display = 'none';
showLoader();
hideError();

fetchBreeds()
    .then(data => {
    data.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.text = breed.name;
    breedSelect.options.add(option)
    });
        breedSelect.style.display = 'block';
        hideLoader();
    }).catch(error => {
            hideLoader();
            showError(error);
    });

function onGetCardId(e) {
    catInfo.style.display = 'none';
    showLoader();
    hideError();
    const breedId = e.target.value;
    fetchCatByBreed(breedId)
        .then(catInfoCard => {
            const imgCat = catInfoCard[0].url;
            const infoCat = catInfoCard[0].breeds[0];
            const markup = `<img src="${imgCat}" alt="${infoCat.alt_names}" width ="300" /><div><h1>${infoCat.name}</h1><p>${infoCat.description}</p><p><strong>Temperament: </strong>${infoCat.temperament}</p></div>`
            catInfo.innerHTML = markup;
            
            catInfo.style.display = 'flex';
            hideLoader();
        }).catch(error => {
            hideLoader();
            showError(error);
        });
}
breedSelect.addEventListener('change', onGetCardId)

function showLoader() {
    loaderMessage.style.display = 'block';
 }

function hideLoader() {
    loaderMessage.style.display = 'none';
}

function showError() {
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    errorMessage.style.display = 'block';
}

function hideError() {
    errorMessage.style.display = 'none';
}


