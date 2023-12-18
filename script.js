// TODO
// start fetching json, when html-website is fully loaded  https://www.steamwebapi.com/steam/api/items?key=TRGUYRPZZGZX8EA8&page=1&max=10
window.onload = function () {
    initJson();
}

function initJson(pageNumber = 1) {

    fetch(`https://bymykel.github.io/CSGO-API/api/de/skins.json`)
        .then(res => res.json())
        .then(data => {
            jsonValueMapping(data, pageNumber);
        });
}

function jsonValueMapping(initilaziedJson, pageNumber) {
    console.log(initilaziedJson)
    console.log(initilaziedJson[1].length)
    let contentContainer = document.getElementById("api-content")
    contentContainer.innerHTML = getTableHeader() // clear data and set Header when next page is generated 
    for (let i = (0 + pageNumber * 10 - 10); i < ((pageNumber * 10 < initilaziedJson.length) ? pageNumber * 10 : initilaziedJson.length); i++) {
        let tempRow = entryConstructor(
            initilaziedJson[i].image,
            initilaziedJson[i].weapon.name,
            initilaziedJson[i].name,
            initilaziedJson[i].category.name,
            initilaziedJson[i].rarity.name,
            initilaziedJson[i].pricelatest,
            initilaziedJson[i].detailUrl,
            initilaziedJson[i].rarity.color
        );
        contentContainer.appendChild(tempRow);
    }
    let pageDisplay = document.getElementById("currentSiteNumber");
    pageDisplay.setAttribute("placeholder", pageNumber);
    console.log(contentContainer);
}

function previousPage() {
    let currentPage = document.getElementById("currentSiteNumber").getAttribute("placeholder");
    currentPage = inputValidation(currentPage);
    console.log(currentPage);
    if (currentPage != 1) {
        initJson(currentPage - 1)
    }
}

function nextPage() {
    let currentPage = document.getElementById("currentSiteNumber").getAttribute("placeholder");
    currentPage = inputValidation(currentPage);;
    initJson(currentPage + 1)
}

function inputValidation(input) {
    try {
        input = parseInt(input);
        if(Math.abs(input) != input) {
            throw new Error("nur positive Zahlen eingeben");
        }
        return input
    }
    catch(err) {
        alert("Bitte nur positive Zahlen eingeben");
    }
}


function entryConstructor(pictureUrl, weaponName, skinName, category, rarityClass, price, detailUrl, rarityColor) { // detailUrl oder Id

    // creating rows, that can be filled later with data
    let row = document.createElement("div");
    row.setAttribute("class", "row border-top border-light border-2");

    // creating all elements one by one 
    // starting with the first column the picture of the skin/weapon
    let pictureImg = document.createElement("img");
    pictureImg.setAttribute("src", pictureUrl);
    pictureImg.setAttribute("alt", `picture of the weapon ${weaponName} with the Skin ${skinName}`);
    pictureImg.setAttribute("height", "auto");
    pictureImg.setAttribute("width", "100%");
    pictureImg.setAttribute("style", `border: 3px solid ${rarityColor}`)
    let pictureDiv = document.createElement("div");
    pictureDiv.setAttribute("class", "col-1");
    pictureDiv.appendChild(pictureImg);

    // 2nd column is the weapon name
    let nameDiv = document.createElement("div");
    nameDiv.setAttribute("class", "col-2");
    nameDiv.innerHTML = `<h6>${weaponName}</h6>`

    // 3rd column is the skin name
    let skinDiv = document.createElement("div");
    skinDiv.setAttribute("class", "col-3");
    skinDiv.innerHTML = `<h6>${skinName}</h6>`

    // 4th column is the space between skin name and the float
    let spaceDiv = document.createElement("div");
    spaceDiv.setAttribute("class", "col-1");

    // 5th column is the skin condition
    let categoryDiv = document.createElement("div");
    categoryDiv.setAttribute("class", "col-1");
    categoryDiv.innerHTML = `<h6>${category}</h6>`

    // 6th column is the skin condition
    let rarityClassDiv = document.createElement("div");
    rarityClassDiv.setAttribute("class", "col-2");
    rarityClassDiv.innerHTML = `<h6>${rarityClass}</h6>`

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
    row.appendChild(categoryDiv);
    row.appendChild(rarityClassDiv);
    row.appendChild(priceDiv);
    row.appendChild(detailsDiv);

    return row


    // TODO: refactormöglichkeit create element set attribute zusammenfassen
}

function getTableHeader() {
    let tempHeader = '<div class="row"><div class="col-1">picture</div><div class="col-2">Name</div><div class="col-3">Skin</div><div class="col-1"></div><div class="col-1">type</div><div class="col-2">rarity class</div><div class="col-1">Price</div><div class="col-1">Details</div></div>'
    return tempHeader
}