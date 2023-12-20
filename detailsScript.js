window.onload = function () {
    initJson();
}

function getUrlParamter() {
    var url_string = window.location;
    var url = new URL(url_string);
    var skinId = url.searchParams.get("id");
    return skinId;
}

function initJson() {
    // fetching the json from the api
    let urlId = getUrlParamter()
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
        initilaziedJson.weapon.name,
        initilaziedJson.category.name,
        initilaziedJson.rarity.name,
        initilaziedJson.collections.length == 0 ? "Hat keine Kollektion" : initilaziedJson.collections[0].name, // skins only have on collection. The api models the collection as a list, even there is only one entry.
        initilaziedJson.id,
        initilaziedJson.rarity.color
}