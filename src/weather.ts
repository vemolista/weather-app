const form = document.getElementsByTagName("form")[0];

const CITY = "Sydney";

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

async function fetchWeather(APIKey: string, city: string) {
	if (!APIKey) {
		console.error("No API Key provided");
		return;
	}

	try {
		const response = await fetch(
			`https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}&aqi=no
			`,
		);
		const data: CurrentWeather = await response.json();
		console.log(data);
	} catch {
		console.error("Error: ", Error);
	}
}

form.addEventListener("submit", (e) => {
	e.preventDefault();
	if (!form.checkValidity()) return;
	const formData = new FormData(form);

	fetchWeather(formData.get("apiKey") as string, CITY);
});
