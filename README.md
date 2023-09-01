# weather-app

A simple project to refresh my knowledge of error handling.

## Tech used

-   Tailwind
-   Typescript

## How to run it

1. Clone
2. `npm i`
3. `npm run dev` to watch for changes
4. Get a local server going in the same directory as index.html (e.g. VS Code Live Server extension)

## What it does

Given a [WeatherAPI](https://www.weatherapi.com/) API key, it display the current weather. If there's an error, it shows the error.

## Notable

-   Handling errors in JS/TS is unfun. Why is there so many ways to do it and all of them... like... suck?
-   When I did
    ```javascript
        async func getData() {
            try {
                const data = await fetch('url')
            }
            catch {
                console.log("error")
            }
      }
    ```
    I thought I was golden - but no! It turns out `catch` doesn't go into play when you get an error response. You also have to check `response.ok`.
-   Also propagating what happened is so unwieldy? It seems that returning something like `Promise<CurrentWeather | MyError>` and then checking like
    ```javascript
    if ("errorMessage" in data) {
    	errorContainer.classList.remove("hidden", "invisible");
    	return;
    }
    ```
    is a good practice, but it just feels kinda yucky?
