window.onload = function () {
    let urlId = getUrlParamter()
    initJson(urlId);
}

function getUrlParamter() {
    var url_string = window.location;
    var url = new URL(url_string);
    var skinId = url.searchParams.get("id");
    return skinId;
}

function initJson(urlId) {
    // fetching the json from the api
    fetch(`https://cs2-api.vercel.app/api/items?id=${urlId}`)
        .then(res => res.json())
        .then(data => {
            jsonValueMappingDetails(data);
        });
}

function jsonValueMappingDetails(initilaziedJson) {
    // 
    let skinName = document.getElementById("detail-name");
    skinName.innerHTML = initilaziedJson.name;

    let imgElement = document.getElementById("detail-picture");
    imgElement.setAttribute("src", initilaziedJson.image);
    imgElement.setAttribute("height", "100%");
    imgElement.setAttribute("width", "auto");
    imgElement.setAttribute("style", `border: 5px solid ${initilaziedJson.rarity.color}`)

    // row 1
    let descriptionElement = document.getElementById("detail-description");
    descriptionElement.innerHTML = initilaziedJson.description;
    let minElement = document.getElementById("detail-min-flow");
    minElement.innerHTML = initilaziedJson.min_float;

    // row 2
    let collectionElement = document.getElementById("detail-collection");
    collectionElement.innerHTML = initilaziedJson.collections.length == 0 ? "keine Kollektion" : initilaziedJson.collections[0].name; // skins can only have one collection. The api models the collection as a list, even there is mostly only one entry.
    let maxElement = document.getElementById("detail-max-flow");
    maxElement.innerHTML = initilaziedJson.max_float;

    // row 3
    // col 1
    let hasStattrak = initilaziedJson.stattrak;
    let hasSouvenir = initilaziedJson.souvenir;
    let statSouvElement = document.getElementById("detail-stat-souv");
    if (hasStattrak == false && hasSouvenir == false) { // skins can only have stattrak or souvenir, but not both.
        statSouvElement.innerHTML = "keins";
    } else {
        hasStattrak == true ? statSouvElement.innerHTML = "stattrak" : statSouvElement.innerHTML = "souvenir";
    }

    // row 3
    // col 2
    let weaponDiv = document.getElementById("detail-weapon-div")
    let weaponName = document.createElement("h5");
    weaponName.innerHTML = `Name: ${initilaziedJson.weapon.name}`;
    let categoryName = document.createElement("h5");
    categoryName.innerHTML = `Art: ${initilaziedJson.category.name}`;
    weaponDiv.appendChild(weaponName);
    weaponDiv.appendChild(categoryName);

    // row 3
    // col 3
    let crateDiv = document.getElementById("detail-crate-div")
    let tempElement;
    if (initilaziedJson.crates.length > 0) {
        for (let j = 0; j < initilaziedJson.crates.length; j++) {
            tempElement = document.createElement("h5");
            tempElement.innerHTML = initilaziedJson.crates[j].name
            crateDiv.appendChild(tempElement);
        }
    } else {
        tempElement = document.createElement("h5");
            tempElement.innerHTML = "in keinen Crates vorhandens"
            crateDiv.appendChild(tempElement);
    }
}