/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html", // Include the Vite root HTML file
		"./src/**/*.{js,jsx,ts,tsx}", // Include all source files
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Open Sans", "sans-serif"],
				mono: ["Nova Mono", "monospace"],
				verdana: ["Verdana", "Geneva", "sans-serif"],
			},
		},
	},
	plugins: [],
};
