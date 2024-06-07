/* eslint-disable prettier/prettier */
/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}"
	],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px"
			}
		},
		extend: {
			colors: {
				current: "currentColor",
				transparent: "transparent",
				neutral: {
					DEFAULT: "#737373",
					50: "#fafafa",
					100: "#f5f5f5",
					200: "#e5e5e5",
					300: "#d4d4d4",
					400: "#a3a3a3",
					500: "#737373",
					600: "#525252",
					700: "#404040",
					800: "#262626",
					900: "#171717",
					950: "#0a0a0a"
				},
				pink: {
					DEFAULT: "#e571a7",
					50: "#fbd7e5",
					100: "#f8c4d8",
					200: "#f4b0cc",
					300: "#ef9bbf",
					400: "#eb87b3",
					500: "#e571a7",
					600: "#c1618d",
					700: "#9e5174",
					800: "#7d415c",
					900: "#5d3245",
					950: "#3e242f"
				},
				red: {
					DEFAULT: "#ef4444",
					50: "#fef2f2",
					100: "#fee2e2",
					200: "#fecaca",
					300: "#fca5a5",
					400: "#f87171",
					500: "#ef4444",
					600: "#dc2626",
					700: "#b91c1c",
					800: "#991b1b",
					900: "#7f1d1d",
					950: "#450a0a"
				}
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" }
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" }
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out"
			},
			transitionDuration: {
				'2000': '2000ms',
				'3000': '3000ms',
				'4000': '4000ms',
				'5000': '5000ms',
				'6000': '6000ms',
				'7000': '7000ms',
				'8000': '8000ms',
				'9000': '9000ms',
				'10000': '10000ms'
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		require("tailwind-scrollbar"),
		require("@tailwindcss/typography")
	]
};
