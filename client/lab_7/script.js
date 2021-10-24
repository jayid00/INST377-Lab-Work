
async function windowFunctions() {
    const endpoint ="https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json";
    const request = await fetch(endpoint)
    const restaurant = await request.json();
    const mymap = L.map('mapid').setView([51.505, -0.09], 12);
    const token = 'pk.eyJ1IjoiamF5aWQwNyIsImEiOiJja3VycWtzbDg1OHoyMzJuenl3YTBrZ3piIn0._AtDIQVdV3BnDGihF3xusw'
  

    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${token}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

    function findMatches(wordToMatch, restaurant) {
      return restaurant.filter((place) => {
        const regex = new RegExp(wordToMatch, "gi");
        return place.zip.match(regex);
      });
    }
  
    function displayMatches(e) {
      const matchArray = findMatches(e.target.value, restaurant);
      const html = matchArray
        .map((place) => {
          return `
          <li><div>${place.name}</div></li>
              <div>${place.address_line_1}</div>
              <div>${place.city} - ${place.zip}</div>
            <br>  `;
        })
        .join("");
  
  
        // clear the result when no input provided
        if (!e.target.value) {
          document.querySelector(".suggestions").innerHTML = "";
          return false;
        }
  
        //show the suggested result
      suggestions.innerHTML = html;
    }
  
    const searchInput = document.querySelector(".input");
    const suggestions = document.querySelector(".suggestions");
  
    searchInput.addEventListener("keyup", (evt) => { displayMatches(evt) });
  }
  
  
  window.onload = windowFunctions;