/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/**/*.svelte"
	],
	future: {
		purgeLayersByDefault: true,
		removeDeprecatedGapUtilities: true,
	  },
	theme: {
		extend: {
			fontFamily: {
				'default': ['Outfit'],
				'secondary': ['Zen Maru Gothic'],
			},
			colors: {
				blue: '#4870FF',
				red: '#FF857B',
				yellow: '#FFDD83',
				green: '#51FFBC',
				cyan: '#77E7FF',
				purple: '#9F86FF',
				pink: '#FFB5CD',
				gray: '#B7B7B7'
			},
			screens: {
				xsm: '500px',
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1536px'
			},
			rotate : {
				'20' : '20deg',
			},
			keyframes : {
				wobble : {
					'0%' :  { transform: 'rotate(0deg)' },
					'25%' : { transform: 'rotate(3deg)' },
					'50%' : { transform: 'rotate(0deg)' },
					'75%' : { transform: 'rotate(-3deg)' },
				   '100%' : { transform: 'rotate(0deg)' }
				}
			}, 
			animation : {
				wobble : 'wobble .2s'
			}
		}
	},
	plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
}

