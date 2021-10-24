
async function windowFunctions() {
    const endpoint ="https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json";
    const request = await fetch(endpoint)
    const restaurant = await request.json();
    const mymap = L.map('mapid').setView([38.989, -76.938], 12);
    const searchInput = document.querySelector(".input");
    const suggestions = document.querySelector(".suggestions");
    const token = 'pk.eyJ1IjoiamF5aWQwNyIsImEiOiJja3VycWtzbDg1OHoyMzJuenl3YTBrZ3piIn0._AtDIQVdV3BnDGihF3xusw';
    let matchedRest = [];

    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${token}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

// Finds the matched zipcode
    function findMatches(wordToMatch, restaurant) {
      return restaurant.filter((place) => {
        const regex = new RegExp(wordToMatch, "gi");
        return place.zip.match(regex);
      });
    }
  
  // Displays the matched zipcodes as a list
    function displayMatches(e) {
      let matchArray = findMatches(e.target.value, restaurant);
      matchArray = matchArray.slice(0, 5);
      const html = matchArray.map((place) => {
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
      matchedRest = matchArray;
    }
  
   
    function map(matchArray) {

      let count = 0;
      mymap.eachLayer(Layer => {
        if (Layer._latlng !== undefined) {
          Layer.remove();
        }
      });


      matchArray.forEach(element => {
        const long = element.geocoded_column_1.coordinates[0];
        const lat = element.geocoded_column_1.coordinates[1];
        
        if (count === 0) {
          mymap.panTo([lat, long]);
        }
        count++;
        L.marker([lat, long]).addTo(mymap);
      });
    }
  

    searchInput.addEventListener("keyup", (evt) => { displayMatches(evt), map(matchedRest) });
  }
  
  
  window.onload = windowFunctions;