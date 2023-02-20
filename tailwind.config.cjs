const defaultTheme = require('tailwindcss/defaultTheme')

const config = {
	content: [
		"./src/**/*.{html,js,svelte,ts}",
		"./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
	],

	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter var', ...defaultTheme.fontFamily.sans],
			},
		},
	},

	plugins: [
		require('flowbite/plugin'),
		require('flowbite-typography'),
	],
	darkMode: 'class',
};

module.exports = config;