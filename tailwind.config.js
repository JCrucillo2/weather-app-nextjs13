/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			backgroundImage: {
				"app-background": "url('/img/mountains.webp')",
			},
			fontFamily: {
				poppins: ["var(--font-poppins)"],
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
