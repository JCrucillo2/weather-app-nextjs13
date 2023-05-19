"use client";
import { data } from "autoprefixer";
import axios from "axios";
import { useState } from "react";

export default function Home() {
	const [weatherData, setWeatherData] = useState([]);
	const [location, setLocation] = useState("");

	const handleLocation = (e) => {
		setLocation(e.target.value);
	};

	const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=metric`;

	const searchLocation = (e) => {
		if (e.key === "Enter") {
			axios
				.get(url)
				.then((res) => {
					setWeatherData(res.data);
				})
				.catch((err) => console.log(err));
			setLocation("");
		}
	};

	return (
		<div className="bg-app-background bg-cover bg-center min-h-screen">
			<div className="p-4 max-w-[48rem] mx-auto backdrop-brightness-50 min-h-screen">
				<input type="text" name="searchbar" className="w-full rounded-md mb-8" onKeyPress={searchLocation} value={location} onChange={handleLocation} placeholder="Enter a location" />
				<div className="text-white">
					<div className="">
						<h1 className="text-3xl font-bold mb-4">{weatherData.name}</h1>
						{weatherData.main ? <p className="text-6xl">{weatherData.main.temp} &deg;C</p> : null}
					</div>
				</div>
			</div>
		</div>
	);
}
