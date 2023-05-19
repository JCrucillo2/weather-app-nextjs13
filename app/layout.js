import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], display: "swap", variable: "--font-poppins", weight: ["400", "700"] });

export const metadata = {
	title: "Weather App",
	description: "A simple weather app",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${poppins.variable} font-poppins`}>{children}</body>
		</html>
	);
}
