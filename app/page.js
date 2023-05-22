"use client";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

// react icons
import { RiTempColdLine, RiWindyFill } from "react-icons/ri";
import { WiHumidity } from "react-icons/wi";

export default function Home() {
	const [weatherData, setWeatherData] = useState([]);
	const [location, setLocation] = useState("");

	const styles = {
		defaultFlexMid: `flex justify-center items-center`,
	};

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
				.catch(() =>
					toast.error("Country/City not found!", {
						position: toast.POSITION.BOTTOM_CENTER,
						pauseOnHover: false,
						autoClose: 2000,
						theme: "dark",
					})
				);
			setLocation("");
		}
	};

	return (
		<div className="bg-app-background bg-cover bg-center min-h-screen overflow-hidden">
			<div className="p-4 max-w-[48rem] mx-auto backdrop-brightness-50 min-h-screen">
				<h1 className="text-white text-4xl text-center my-4 font-bold">Weather.Zone</h1>
				<input type="text" name="searchbar" className="w-full rounded-md mb-8" onKeyPress={searchLocation} value={location} onChange={handleLocation} placeholder="Enter a location" />
				{weatherData.main || weatherData.weather || weatherData.wind ? (
					<AnimatePresence>
						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-white md:flex justify-between">
							<div>
								<h2 className="text-4xl font-bold mb-4">{weatherData.name}</h2>
								<p className="text-6xl">{weatherData.main.temp} &deg;C</p>
								<p className="font-bold text-2xl p-4 bg-white text-slate-800 rounded-md text-center mt-4">{weatherData.weather[0].main}</p>
							</div>
							<div className={`${styles.defaultFlexMid} gap-6 my-6 text-slate-800`}>
								<div className={`${styles.defaultFlexMid} flex-col p-4 bg-white rounded-md`}>
									<p className="font-bold">Feels like</p>
									<p>{weatherData.main.feels_like}</p>
									<RiTempColdLine size={40} />
								</div>
								<div className={`${styles.defaultFlexMid} flex-col p-4 bg-white rounded-md`}>
									<p className="font-bold">Humidity</p>
									<p>{weatherData.main.humidity}</p>
									<WiHumidity size={40} />
								</div>
								<div className={`${styles.defaultFlexMid} flex-col p-4 bg-white rounded-md`}>
									<p className="font-bold">Wind</p>
									<p>{weatherData.wind.speed}</p>
									<RiWindyFill size={40} />
								</div>
							</div>
						</motion.div>
					</AnimatePresence>
				) : null}
			</div>
			<ToastContainer />
		</div>
	);
}
