"use strict";
const SYDNEY = {
    latitude: "-33.88543635880696",
    longitude: "151.27049577010456",
};
const excludeEverythingButCurrent = "minutely,hourly,daily,alerts";
async function fetchWeather() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${SYDNEY.latitude}&lon=${SYDNEY.longitude}&exclude=${excludeEverythingButCurrent}&appid=${process.env.OPEN_WEATHER_API_KEY}`);
        const data = await response.json();
        console.log(data);
    }
    catch {
        console.error("Error: ", Error);
    }
}
fetchWeather();
