import { getIcons } from '@iconify/utils';
import type { IconifyJSON } from '@iconify/types';
import { promises as fs } from 'fs';

const iconsToInclude: string[] = [
	'arrow-back',
	'arrow-forward',
	'send-outline',
	'settings',
	'android-messages',
	'settings-outline',
	'android-messages-outline',
	'delete-forever',
	'check',
	'add',
	'drag-handle',
	'rounded-corner',
	'position-bottom-left',
	'swap-vert',
	'upload',
	'download',
	'info',
	'favorite',
	'code',
	'update',
	'star',
	'waving-hand',
	'brush',
	'chat-bubble'
];

async function buildIconSubset() {
	const materialSymbols: IconifyJSON = JSON.parse(
		await fs.readFile('./node_modules/@iconify-json/material-symbols/icons.json', 'utf8')
	);

	// getIcons extrai apenas os ícones especificados
	const subset = getIcons(materialSymbols, iconsToInclude);

	if (!subset) {
		throw new Error('Nenhum ícone encontrado');
	}

	await fs.writeFile('./src/assets/material-symbols-subset.json', JSON.stringify(subset, null, 2));

	console.log(`✅ Exported subset with ${iconsToInclude.length} icons.`);
}

buildIconSubset().catch(console.error);
