// getUrlParamter(); ?id=asdf
// GET /items?id=skin-1049812

window.onload = function () {
    initJson();
}

function getUrlParamter() {
    var url_string = window.location;
    var url = new URL(url_string);
    var drinkID = url.searchParams.get("drinkID");
    return drinkID
}

function initJson() {
    // fetching the json from the api
    let urlId = getUrlParamter()
    fetch(`https://cs2-api.vercel.app/api/items?id=${urlId}`)
        .then(res => res.json())
        .then(data => {
            jsonValueMapping(data);
        });
}
