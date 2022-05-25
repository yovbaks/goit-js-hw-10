import './css/styles.css';
import debounce from 'lodash.debounce';
import fetchCountry from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import countryListTpl from './templates/countryList.hbs';
import countryInfoTpl from './templates/countryInfo.hbs';

const DEBOUNCE_DELAY = 300;

// const refs = {
//     inputCountrySearch: document.querySelector('#search-box'),
//     countryList: document.querySelector('.countryList'),
//     countryInfo: document.querySelector('.country-info'),
// }
const inputCountrySearchRef = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

inputCountrySearchRef.addEventListener('input', debounce(onFetchCountry, DEBOUNCE_DELAY));

function onFetchCountry(event) {
  event.preventDefault();

  const inputValue = event.target.value.trim();
  console.log(inputValue);

  countryListRef.innerHTML = '';
  countryInfoRef.innerHTML = '';

  fetchCountry(inputValue)
    .then(response => {
      console.log(response);
      console.log(response.length);
      if (response.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
      } else if (response.length >= 2 && response.length <= 10) {
        // console.log(response);
        // countryListRef.innerHTML =`Hello`
        renderCountryList(response);
      } else if (response.length === 1) {
        renderCountryInfo(response);
      }
      // renderCountryList(response);
    })
    .catch(error => Notify.failure('Oops, there is no country with that name'));
}

function renderCountryList(country) {
  countryListRef.innerHTML = countryListTpl(country);
}

function renderCountryInfo(country) {
  countryInfoRef.innerHTML = countryInfoTpl(country);
}
