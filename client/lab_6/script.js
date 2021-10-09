const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'
//const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'

const restaurant = [];

 fetch(endpoint)
    .then(blob => blob.json())
    .then(data => restaurant.push(...data))

function findMatches(wordToMatch, restaurant) {
    return restaurant.filter(place => {

        const regex = new RegExp(wordToMatch, 'gi');
        return place.zip.match(regex) || place.type.match(regex)
    });

}


function displayMatches() {
    const matchArray = findMatches(this.value, restaurant)
    console.log(matchArray)
}

const searchInput = document.querySelector('.input')
const suggestions = document.querySelector('.suggestions')

searchInput.addEventListener('change', displayMatches)
searchInput.addEventListener('keyup', displayMatches)
