import path from 'node:path';
import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: false,
			strict: true
		}),
		alias: {
			$utils: path.resolve('./src/lib/utils'),
			// $components: path.resolve('./src/lib/components'),
			// $layout: path.resolve('./src/lib/components/layout'),
			// $layouts: path.resolve('./src/lib/layouts'),
			// $styles: path.resolve('./src/lib/styles'),
			// $stores: path.resolve('./src/lib/stores')
		}
	},

	preprocess: [
		preprocess({
			postcss: true
		})
	]
};

export default config;
