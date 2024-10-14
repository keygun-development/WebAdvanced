import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ["class"],
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px"
			}
		},
		extend: {
			animation: {
				'fly-in': 'flyIn 0.5s forwards'
			},
			keyframes: {
				flyIn: {
					'0%': { opacity: '0', transform: 'translateX(-20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				}
			},
			colors: {
				background: "#102337",
				primary: "#f8c60d",
				secondary: "#41d702",
			},
			boxShadow: {
				'inset': 'inset -6px 4px 0px rgba(16, 35, 55, 0.4)',
			},
		}
	},
};

export default config;
