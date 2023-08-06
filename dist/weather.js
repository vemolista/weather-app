"use strict";
const inputAPIKey = document.getElementById("apiKey");
const buttonGetWeather = document.getElementById("getWeather");
const city = "Sydney";
async function fetchWeather() {
    const APIKey = inputAPIKey.value;
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}&aqi=no
			`);
        const data = await response.json();
        console.log(data);
    }
    catch {
        console.error("Error: ", Error);
    }
}
buttonGetWeather.addEventListener("click", () => {
    fetchWeather();
});
