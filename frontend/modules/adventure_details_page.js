import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const adventureUrlParams = new URLSearchParams(search);
  let adventureId = adventureUrlParams.get("adventure");
  return adventureId;
  // Place holder for functionality to work in the Stubs
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let adventure_url =
      config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`;
    let res = await fetch(adventure_url);

    let adventure_data = await res.json();
    console.log(adventure_data);
    return adventure_data;
  } catch (err) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  // File: pages/adventures/resort/index.html
  console.log(adventure);
  let headEle = document.getElementById("adventure-name");
  headEle.textContent = adventure.name;
  let pEle = document.getElementById("adventure-subtitle");
  pEle.textContent = adventure.subtitle;
  let imgEle = document.getElementById("photo-gallery");
  let imgLen = adventure.images.length;
  for (let i = 0; i < imgLen; i++) {
    var imgDiv = document.createElement("img");
    imgDiv.setAttribute("class", "activity-card-image");
    imgDiv.src = adventure.images[i];
    imgEle.append(imgDiv);
  }
  let contentEle = document.getElementById("adventure-content");
  contentEle.textContent = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photoGallery = document.getElementById("photo-gallery");
  let carouselItems = "";
  let carouselIndicators = "";
  for (let i = 0; i < images.length; i++) {
    carouselIndicators += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" ${
      i === 0
        ? 'class="active" aria-current="true"'
        : 'aria-label="Slide ' + (i + 1) + '"'
    }></button>
  `;
    carouselItems += `<div class="carousel-item ${i === 0 ? "active" : ""}">
  <img src="${images[i]}" class="d-block activity-card-image" alt="...">
  </div>
  `;
  }
  photoGallery.innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
      ${carouselIndicators}
      </div>
      <div class="carousel-inner">
      ${carouselItems}
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true">
      </span><span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true">
      </span><span class="visually-hidden">Next</span>
      </button>
      </div>`;
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  let availableReservation = document.getElementById("reservation-panel-available");
  let soldReservation = document.getElementById("reservation-panel-sold-out");
  if(adventure.available){
     availableReservation.style.display = 'block';
    let costPerHead = document.getElementById("reservation-person-cost");
    costPerHead.innerHTML = adventure.costPerHead;
    soldReservation.style.display = 'none'
   } 
   else {
     availableReservation.style.display = 'none';
      soldReservation.style.display = 'block';
}
}
//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let totalCost = document.getElementById("reservation-cost");
  totalCost.innerHTML = adventure.costPerHead * persons;
}

//Implementation of reservation form submission
function captureFormSubmit(presentAdventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById("myForm");
  form.addEventListener("submit", async (event) => {
     event.preventDefault();
     const name = form.elements["name"].value;
     const date = form.elements["date"].value;
     const person = form.elements["person"].value;
     const adventure = presentAdventure.id;
     const data = { name, date, person, adventure };
     const jsonData = JSON.stringify(data);
     const url = config.backendEndpoint + "/reservations/new";
     console.log(url);
     try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",},
          body: jsonData,});
          console.log(response);
    if (response.ok) {
      alert("Success!");
      location.reload();
    } else {
      alert("Failed!");
    }}catch (error) {
      console.error(error);
      alert("Failed!");
    } 
  });
}
//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  console.log(adventure);
  let backendBanner = document.getElementById("reserved-banner");
  if(adventure.reserved){
    backendBanner.style.display = 'block';
  } else {
    backendBanner.style.display = 'none';
  }
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
}


export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
