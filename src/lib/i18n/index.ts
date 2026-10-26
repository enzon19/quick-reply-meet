import { addMessages, getLocaleFromNavigator, init } from 'svelte-i18n';
import type en from './en.json';

const catalogs = import.meta.glob<{ default: typeof en }>('./*.json', { eager: true });

for (const [path, catalog] of Object.entries(catalogs)) {
	const language = path.replace('./', '').replace('.json', '');
	addMessages(language, catalog.default);
}

init({ fallbackLocale: 'en', initialLocale: getLocaleFromNavigator() });
