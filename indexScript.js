window.onload = function () {
    initJson();
}

function initJson(pageNumber = 1) {
    // fetching the json from the api
    fetch(`https://bymykel.github.io/CSGO-API/api/de/skins.json`)
        .then(res => res.json())
        .then(data => {
            jsonValueMapping(data, pageNumber);
        });
}


// json mapping
function jsonValueMapping(initilaziedJson, pageNumber) {
    // generating the table for the page with looping over 10 elements
    let contentContainer = document.getElementById("api-content")
    contentContainer.innerHTML = getTableHeader(); // clear data and set Header when next page is generated 
    for (let i = (0 + pageNumber * 10 - 10); i < ((pageNumber * 10 < initilaziedJson.length) ? pageNumber * 10 : initilaziedJson.length); i++) {
        let tempRow = entryConstructor(
            initilaziedJson[i].image,
            initilaziedJson[i].weapon.name,
            initilaziedJson[i].name,
            initilaziedJson[i].category.name,
            initilaziedJson[i].rarity.name,
            initilaziedJson[i].collections.length == 0 ? "Hat keine Kollektion" : initilaziedJson[i].collections[0].name, // skins only have on collection. The api models the collection as a list, even there is only one entry.
            initilaziedJson[i].id,
            initilaziedJson[i].rarity.color
        );
        contentContainer.appendChild(tempRow);
    }
    let pageDisplay = document.getElementById("currentSiteNumber");
    pageDisplay.setAttribute("placeholder", pageNumber);
}


// buttons
function updatePage(pageChange = 0) {
    let currentPage = document.getElementById("currentSiteNumber").getAttribute("placeholder");
    currentPage = inputValidation(currentPage); 
    newPage = currentPage + pageChange
    if (newPage < 1) {
        newPage = 1 // negativ numbers and null will be set to the first page
    }
    initJson(newPage); // reloading the json with the new page
}

function inputValidation(input) {
    // validation, if the input is a positiv number 
    try {
        input = parseInt(input);
        if(Math.abs(input) != input) {
            throw new Error("nur positive Zahlen eingeben");
        }
        return input;
    }
    catch(err) {
        alert("Bitte nur positive Zahlen eingeben");
    }
}


// generator
function entryConstructor(pictureUrl, weaponName, skinName, category, rarityClass, collection, detailUrl, rarityColor) { // detailUrl oder Id
    // row constructor for the current iteration
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
    pictureImg.setAttribute("style", `border: 3px solid ${rarityColor}`);
    let pictureDiv = document.createElement("div");
    pictureDiv.setAttribute("class", "col-sm-2 col-lg-1");                   // asdfasdfasdfasdfasdf     +1
    pictureDiv.appendChild(pictureImg);

    // 2nd column is the weapon name
    let nameDiv = document.createElement("div");
    nameDiv.setAttribute("class", "col-lg-2 d-none d-lg-block");              // asdfasdfasdfasdfasdf     faellt raus +2
    nameDiv.innerHTML = `<h6>${weaponName}</h6>`;

    // 3rd column is the skin name
    let skinDiv = document.createElement("div");
    skinDiv.setAttribute("class", "col-sm-5 col-md-4 col-lg-3");              // asdfasdfasdfasdfasdf     +1
    skinDiv.innerHTML = `<h6>${skinName}</h6>`;

    // 4th column is the weapon category
    let categoryDiv = document.createElement("div");
    categoryDiv.setAttribute("class", "col-sm-2 col-lg-1 d-none d-md-block");          // asdfasdfasdfasdfasdf     +1 / +0
    categoryDiv.innerHTML = `<h6>${category}</h6>`;

    // 5th column is the skin rarity class
    let rarityClassDiv = document.createElement("div");
    rarityClassDiv.setAttribute("class", "col-lg-2 d-none d-lg-block");       // asdfasdfasdfasdfasdf     faellt raus +2
    rarityClassDiv.innerHTML = `<h6>${rarityClass}</h6>`;

    // 6th column is the skin collection of the current skin
    let collectionDiv = document.createElement("div");
    collectionDiv.setAttribute("class", "col-sm-3 col-lg-2");        // asdfasdfasdfasdfasdf     +1 / +2
    collectionDiv.innerHTML = `<h6>${collection}</h6>`;

    // 7th column is the url with the individual id of the element
    let detailsDiv = document.createElement("div");
    detailsDiv.setAttribute("class", "col-sm-1 col-lg-1");           // asdfasdfasdfasdfasdf
    detailsDiv.innerHTML = `<a href="/details.html?id=${detailUrl}">Details</a>`;


    // now all elements get attached to the row
    row.appendChild(pictureDiv);
    row.appendChild(nameDiv);
    row.appendChild(skinDiv);
    row.appendChild(categoryDiv);
    row.appendChild(rarityClassDiv);
    row.appendChild(collectionDiv);
    row.appendChild(detailsDiv);

    return row;


    // TODO: refactormöglichkeit create element set attribute zusammenfassen
}

function getTableHeader() {
    // fill the table header, when loading the next page, because the whole table gets cleared
    return '<div class="row"><div class="col-sm-2 col-lg-1 d-none d-sm-block">picture</div><div class="col-lg-2 d-none d-lg-block">name</div><div class="col-sm-5 col-md-4 col-lg-3 d-none d-sm-block">skin</div><div class="col-sm-2 col-lg-1 d-none d-md-block">type</div><div class="col-lg-2 d-none d-lg-block">rarity class</div><div class="col-sm-3 col-lg-2 d-none d-sm-block">collection</div><div class="col-sm-1 col-lg-1 d-none d-sm-block">Details</div></div>';
}