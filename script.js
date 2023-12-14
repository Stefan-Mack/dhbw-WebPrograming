// TODO
// start fetching json, when html-website is fully loaded
window.onload = function(){
    initJson()
}

function initJson(){
    fetch("test.json")
        .then(res => res.json())
        .then(data => {
            jsonValueMapping(data);
        });
}

function jsonValueMapping(initilaziedJson){
    console.log(initilaziedJson)
    console.log(initilaziedJson.entries[1].avgSold)
    let contentContainer = document.getElementById("api-content")
    for (let i = 0; i < initilaziedJson.entries.length; i++) {
        let tempRow = entryConstructor(
            initilaziedJson.entries[i].pictureUrl,
            initilaziedJson.entries[i].weaponName,
            initilaziedJson.entries[i].skinName,
            initilaziedJson.entries[i].condition,
            initilaziedJson.entries[i].avgSold,
            initilaziedJson.entries[i].price,
            initilaziedJson.entries[i].detailUrl
            );
            contentContainer.appendChild(tempRow);
      }
    console.log(contentContainer)
}


function entryConstructor(pictureUrl, weaponName, skinName, condition, avgSold, price, detailUrl) { // detailUrl oder Id

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
    let conditionDiv = document.createElement("div");
    conditionDiv.setAttribute("class", "col-1");
    conditionDiv.innerHTML = `<h6>${condition}</h6>`

    // 6th column is the skin condition
    let avgSoldDiv = document.createElement("div");
    avgSoldDiv.setAttribute("class", "col-1");
    avgSoldDiv.innerHTML = `<h6>${avgSold}</h6>`

    // 7th column is the skin condition
    let priceDiv = document.createElement("div");
    priceDiv.setAttribute("class", "col-1");
    priceDiv.innerHTML = `<h6>${price}</h6>`

    // 8th column is the skin condition
    let detailsDiv = document.createElement("div");
    detailsDiv.setAttribute("class", "col-1");
    detailsDiv.innerHTML = `<a src="${detailUrl}">Details</a>`


    // now all elements get attached to the row
   row.appendChild(pictureDiv);
   row.appendChild(nameDiv);
   row.appendChild(skinDiv);
   row.appendChild(spaceDiv);
   row.appendChild(conditionDiv);
   row.appendChild(avgSoldDiv);
   row.appendChild(priceDiv);
   row.appendChild(detailsDiv);

    return row


    // TODO: refactormöglichkeit create element set attribute zusammenfassen
}