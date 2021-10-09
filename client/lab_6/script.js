async function windowFunctions() {
  const endpoint ="https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json";
  
  const request = await fetch(endpoint)

  const restaurant = await request.json();

//   fetch(endpoint)
//     .then((blob) => blob.json())
//     .then((data) => restaurant.push(...data));

  function findMatches(wordToMatch, restaurant) {
    return restaurant.filter((place) => {
      const regex = new RegExp(wordToMatch, "gi");
      return place.zip.match(regex) || place.category.match(regex);
    });
  }

  function displayMatches(e) {
    const matchArray = findMatches(e.target.value, restaurant);
    const html = matchArray
      .map((place) => {
        return `
        <li><div>${place.name}</div></li>
            <div>${place.category}</div>
            <div>${place.address_line_1}</div>
            <div>${place.city}</div>
            <div>${place.zip}</div>
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