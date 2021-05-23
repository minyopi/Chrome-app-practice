const weather = document.querySelector(".js-weather");

const coords = "coords";
const API_KEY = "0aca5757415f4695b698090678620b09";
// Open Weather map 에서 가져오기 (https://openweathermap.org/)


function getWeather(lat, lon){
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function(response){
        return (response.json());
    }).then(function (json){
        const temparature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temparature}°C @${place}`;
    });
}


function saveCoords(coordsObj){
    localStorage.setItem(coords, JSON.stringify(coordsObj));
}


function handleSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}


function handleError(){
    console.log("Can't access geolocation");
}


function askCoords() {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
}

function loadcoords(){
    const loadedcoords = localStorage.getItem(coords);
    if (loadedcoords === null) {
        askCoords();
    } else {
        const parsedCoords = JSON.parse(loadedcoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadcoords();
}

init();