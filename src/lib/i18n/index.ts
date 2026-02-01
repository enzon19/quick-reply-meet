import { addMessages, getLocaleFromNavigator, init } from 'svelte-i18n';

import en from './en.json';
addMessages('en', en);

import ptBR from './pt-BR.json';
addMessages('pt-BR', ptBR);

import es from './es.json';
addMessages('es', es);

init({
	fallbackLocale: 'en',
	initialLocale: getLocaleFromNavigator()
});
