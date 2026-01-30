chrome.runtime.onInstalled.addListener(async (details) => {
	if (details.reason == 'install') {
		try {
			const settings: Settings = {
				buttons: {
					position: 'top',
					roundness: 20
				}
			};

			await chrome.storage.sync.set({ settings });
			await chrome.storage.local.set({ messages: [] });
		} catch (e) {
			console.error(e);
		}

		chrome.tabs.create({
			url: 'src/pages/welcome/index.html'
		});
		chrome.runtime.setUninstallURL('https://quickreplymeet.enzon19.com/uninstall');
	} else if (details.reason == 'update') {
		try {
			await migrateOldData();
		} catch (e) {
			console.error(e);
		}

		chrome.tabs.create({
			url: 'src/pages/updated/index.html'
		});
	}
});

async function migrateOldData() {
	const { settings: newDataSettings } = (await chrome.storage.sync.get('settings')) as Record<
		'settings',
		Settings
	>;
	const { messages: newDataMessages } = (await chrome.storage.local.get('messages')) as Record<
		'messages',
		Message[]
	>;

	const settings: Settings = {
		buttons: {
			position: newDataSettings?.buttons?.position || 'top',
			roundness: newDataSettings?.buttons?.roundness ?? 20
		}
	};
	let messages: Message[] = newDataMessages || [];

	const oldData = await chrome.storage.sync.get([
		'ButtonsRoundness',
		'buttonsPosition',
		'messageList'
	]);
	if (oldData.ButtonsRoundness != null && !isNaN(Number(oldData.ButtonsRoundness)))
		settings.buttons.roundness = Number(oldData.ButtonsRoundness);
	if (oldData.buttonsPosition != null && typeof oldData.buttonsPosition == 'object')
		settings.buttons.position =
			(oldData.buttonsPosition as Record<string, string>).value == 'beforebegin' ? 'top' : 'bottom';
	if (
		oldData.messageList != null &&
		Array.isArray(oldData.messageList) &&
		oldData.messageList.length > 0
	)
		messages = oldData.messageList.map((e) => ({
			id: crypto.randomUUID(),
			content: e,
			sendRightAway: true
		}));

	await chrome.storage.sync.set({ settings });
	chrome.storage.sync.remove(['ButtonsRoundness', 'buttonsPosition', 'messageList']);
	await chrome.storage.local.set({ messages });
}
