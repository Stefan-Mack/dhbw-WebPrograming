// TODO
// start fetching json, when html-website is fully loaded
window.onload = function(){
    initJson()
}

function initJson(pageNumber = 1){
    fetch("output.json") // pageNumber
        .then(res => res.json())
        .then(data => {
            jsonValueMapping(data, pageNumber);
        });
}

function jsonValueMapping(initilaziedJson , pageNumber){
    console.log(initilaziedJson)
    console.log(initilaziedJson[1].length)
    let contentContainer = document.getElementById("api-content")
    for (let i = 0; i < initilaziedJson.length; i++) {
        let tempRow = entryConstructor(
            initilaziedJson[i].itemimage,
            initilaziedJson[i].itemtype,
            initilaziedJson[i].marketname,
            initilaziedJson[i].wear,
            initilaziedJson[i].offervolume,
            initilaziedJson[i].pricelatest,
            initilaziedJson[i].detailUrl,
            initilaziedJson[i].rarity
            );
            contentContainer.appendChild(tempRow);
      }
    let pageDisplay = document.getElementById("currentSiteNumber");
    pageDisplay.setAttribute("placeholder", pageNumber)
    console.log(contentContainer)
}

function previousPage(){
    let currentPage = document.getElementById("currentSiteNumber").getAttribute("placeholder")
    currentPage = parseInt(currentPage)
    if (currentPage != 1) {
        initJson(currentPage - 1)
    }
}

function nextPage(){
    let currentPage = document.getElementById("currentSiteNumber").getAttribute("placeholder")
    currentPage = parseInt(currentPage)
    initJson(currentPage + 1)
}


function entryConstructor(pictureUrl, weaponName, skinName, wear, avgSold, price, detailUrl, rarity) { // detailUrl oder Id

    // creating rows, that can be filled later with data
    let row = document.createElement("div");
    row.setAttribute("class", "row border-top border-light border-");

    // creating all elements one by one 
    // starting with the first column the picture of the skin/weapon
    let pictureImg = document.createElement("img");
    pictureImg.setAttribute("src", pictureUrl);
    pictureImg.setAttribute("alt", `picture of the weapon ${weaponName} with the Skin ${skinName}`);
    pictureImg.setAttribute("height", "auto");
    pictureImg.setAttribute("width", "100%");
    pictureImg.setAttribute("class", rarity)
    let pictureDiv = document.createElement("div");
    pictureDiv.setAttribute("class", "col-1");
    pictureDiv.appendChild(pictureImg);

    // 2nd column is the weapon name
    let nameDiv = document.createElement("div");
    nameDiv.setAttribute("class", "col-1");
    nameDiv.innerHTML = `<h6>${weaponName}</h6>`

    // 3rd column is the skin name
    let skinDiv = document.createElement("div");
    skinDiv.setAttribute("class", "col-3");
    skinDiv.innerHTML = `<h6>${skinName}</h6>`

    // 4th column is the space between skin name and the float
    let spaceDiv = document.createElement("div");
    spaceDiv.setAttribute("class", "col-3");

    // 5th column is the skin condition
    let wearDiv = document.createElement("div");
    wearDiv.setAttribute("class", "col-1");
    wearDiv.innerHTML = `<h6>${wear}</h6>`

    // 6th column is the skin condition
    let offerVolDiv = document.createElement("div");
    offerVolDiv.setAttribute("class", "col-1");
    offerVolDiv.innerHTML = `<h6>${avgSold} St</h6>`

    // 7th column is the skin condition
    let priceDiv = document.createElement("div");
    priceDiv.setAttribute("class", "col-1");
    priceDiv.innerHTML = `<h6>${price} €</h6>`

    // 8th column is the skin condition
    let detailsDiv = document.createElement("div");
    detailsDiv.setAttribute("class", "col-1");
    detailsDiv.innerHTML = `<a src="${detailUrl}">Details</a>`


    // now all elements get attached to the row
   row.appendChild(pictureDiv);
   row.appendChild(nameDiv);
   row.appendChild(skinDiv);
   row.appendChild(spaceDiv);
   row.appendChild(wearDiv);
   row.appendChild(offerVolDiv);
   row.appendChild(priceDiv);
   row.appendChild(detailsDiv);

    return row


    // TODO: refactormöglichkeit create element set attribute zusammenfassen
}