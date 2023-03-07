import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  
  try{
    let url=config.backendEndpoint+"/cities";
    let res = await fetch(url);


  let data = await res.json();

  return data;
  }
  catch(err){
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let city_div=document.getElementById("data");
  let divElement=document.createElement("div");
  divElement.setAttribute("class","col-6 col-lg-3 mb-4");
  divElement.innerHTML=(` <a href="./pages/adventures/?city=${id}" id="${id}"> <div class="card tile d-flex align-items-center"> <img src=${image}/> <h5 class="tile-text pb-4">${city}</h5> <h6 class=tile-text fw-normal pt-8>${description}</h6> </div> </a>`);
  city_div.append(divElement);
  return city_div;
}

export { init, fetchCities, addCityToDOM };
