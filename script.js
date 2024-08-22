const apiKey = "312abfd953c970ceaf81f671079f6e22";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const unsplashAccessKey = "THvNapEroQxNP14mp--6TaYVSrDqayZETFA_WPRJ_Y0";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const backgroundImg = document.querySelector(".background-img"); 

async function checkWeather(city){
const weatherResponse = await fetch(apiUrl + city + `&appid=${apiKey}`);

if(weatherResponse.status == 404){
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
} else {
    const weatherData = await weatherResponse.json();

    document.querySelector(".city").innerHTML = weatherData.name;
    document.querySelector(".temp").innerHTML = Math.round(weatherData.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = weatherData.main.humidity + "%";
    document.querySelector(".wind").innerHTML = weatherData.wind.speed + "km/h";

    if(weatherData.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
    } else if(weatherData.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
    } else if(weatherData.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
    } else if(weatherData.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    } else if(weatherData.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
    } else if(weatherData.weather[0].main == "Snow") {
        weatherIcon.src = "images/snow.png";
    } else {
        weatherIcon.src = "images/wind.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    
    fetchUnsplashImage(city);
    }
}

async function fetchUnsplashImage(query) {
    const unsplashUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${unsplashAccessKey}`;
    const response = await fetch(unsplashUrl);
    const data = await response.json();

    if (data.results.length > 0) {
        const imgUrl = data.results[0].urls.regular;
        const backgroundImg = document.querySelector(".background-img");

        backgroundImg.classList.remove("loaded");

        const tempImg = new Image();
        tempImg.src = imgUrl;
        tempImg.onload = function() {
        backgroundImg.src = imgUrl;
        
        setTimeout(() => {
            backgroundImg.classList.add("loaded"); 
        }, 50); 
        };
    } else {
        console.log("No image found for this location.");
    }
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
});
