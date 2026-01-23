import { defineManifest } from '@crxjs/vite-plugin';
import pkg from './package.json';

const icons = {
	16: 'public/logo16.png',
	32: 'public/logo32.png',
	48: 'public/logo48.png',
	128: 'public/logo128.png',
	512: 'public/logo512.png'
};

export default defineManifest({
	manifest_version: 3,
	name: 'Quick Reply Meet',
	version: pkg.version,
	description: '__MSG_extensionDescription__',
	icons,
	default_locale: 'pt_BR',
	homepage_url: 'https://quickreplymeet.enzon19.com',
	options_page: 'src/options/index.html',
	permissions: [
		'storage'
		// "contentSettings",
	],
	action: {
		default_icon: icons,
		default_popup: 'src/popup/index.html'
	}
	// content_scripts: [
	//   {
	//     js: ["src/content/main.ts"],
	//     matches: ["https://*/*"],
	//   },
	// ]
});
