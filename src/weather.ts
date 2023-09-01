const form = document.getElementsByTagName("form")[0] as HTMLFormElement;
const temperature = document.getElementById("temperature") as HTMLSpanElement;
const city = document.getElementById("city") as HTMLSpanElement;
const date = document.getElementById("date") as HTMLSpanElement;
const time = document.getElementById("time") as HTMLSpanElement;
const weatherIcon = document.getElementById("imageIcon") as HTMLImageElement;
const weatherContainer = document.getElementById(
	"weatherContainer",
) as HTMLDivElement;
const errorContainer = document.getElementById("error") as HTMLSpanElement;

const CITY = "Sydney";

interface MyError {
	errorMessage: string;
}

interface CurrentWeather {
	location: {
		name: string;
		region: string;
		country: string;
		lat: number;
		lon: number;
		tz_id: string;
		localtime_epoch: number;
		localtime: string;
	};
	current: {
		last_updated_epoch: number;
		last_updated: string;
		temp_c: number;
		temp_f: number;
		is_day: number;
		condition: {
			text: string;
			icon: string;
			code: number;
		};
		wind_mph: number;
		wind_kph: number;
		wind_degree: number;
		wind_dir: string;
		pressure_mb: number;
		pressure_in: number;
		precip_mm: number;
		precip_in: number;
		humidity: number;
		cloud: number;
		feelslike_c: number;
		feelslike_f: number;
		vis_km: number;
		vis_miles: number;
		uv: number;
		gust_mph: number;
		gust_kph: number;
	};
}

async function fetchWeather(
	APIKey: string,
	city: string,
): Promise<CurrentWeather | MyError> {
	if (!APIKey) {
		console.error("No API Key provided");
		return { errorMessage: "No API Key provided" };
	}

	try {
		const response = await fetch(
			`https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}&aqi=no
			`,
		);
		if (response.ok) {
			const data: CurrentWeather = await response.json();
			return data;
		}
		return {
			errorMessage: `Error, code ${response.status}`,
		};
	} catch (error) {
		console.error("Error: ", error);
		return { errorMessage: (error as Error).message };
	}
}

form.addEventListener("submit", (e) => {
	e.preventDefault();
	if (!form.checkValidity()) return;
	const formData = new FormData(form);

	const handleWeatherData = async () => {
		const data = await fetchWeather(formData.get("apiKey") as string, CITY);

		if ("errorMessage" in data) {
			errorContainer.classList.remove("hidden", "invisible");
			return;
		}

		temperature.textContent = `${data.current.temp_c.toString()}°C`;
		city.textContent = data.location.name;
		date.textContent = data.location.localtime.split(" ")[0];
		time.textContent = data.location.localtime.split(" ")[1];
		weatherIcon.src = data.current.condition.icon;
		weatherContainer.classList.remove("hidden", "invisible");
	};

	handleWeatherData();
});
