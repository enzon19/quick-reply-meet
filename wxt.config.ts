import { functionsMixins } from 'vite-plugin-functions-mixins';
import { defineConfig } from 'wxt';

export default defineConfig({
	srcDir: 'src',
	modules: ['@wxt-dev/module-svelte'],
	vite: () => ({
		plugins: [functionsMixins({ deps: ['m3-svelte'] })]
	}),
	manifest: {
		name: 'Quick Reply Meet',
		description: '__MSG_extensionDescription__',
		homepage_url: 'https://quickreplymeet.enzon19.com',
		default_locale: 'en',
		permissions: ['storage']
	}
});
