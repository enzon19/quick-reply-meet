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
		permissions: ['storage'],
		key: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvpcwM3kmJAqf700yPwaHZ669LDZuXTGZfAzfJHEzAPNcPkVCsdn7jtB+G980WEKu/46mg3UlI1VpE1O0QFgO1lc37ZlIOCKNRRduJixaZEOaQ+kt1j60TZz9Z8PCYc0i/ofo7nwSPPS/i5mjQWv1TldTiSk5NUNkRUL5rByOb92q82oSxEVuWXafazcJX9SvgwBjL6V8CS//LTpArJ6hsXY6zFy9RpnOUxfTFhCH0o+vX6TemSlBKa7vWkpbeY2gQpQMgxMO2i4+4Myt4iqqRuZe/3k6o118GwsZ/e2FLChdImwckqKKxgHkNskPx9wMIXq0wRp9nEDk72o8QD3UAwIDAQAB',
		browser_specific_settings: {
			gecko: {
				id: 'qrm@bolhastudios.com',
				strict_min_version: '58.0'
			}
		}
	}
});
