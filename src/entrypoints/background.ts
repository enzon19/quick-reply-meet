export default defineBackground(() => {
	browser.runtime.onInstalled.addListener(async (details) => {
		if (details.reason == 'install') {
			try {
				const settings: Settings = {
					buttons: {
						position: 'top',
						roundness: 20
					}
				};

				await browser.storage.sync.set({ settings });
				await browser.storage.local.set({ messages: [] });
			} catch (e) {
				console.error(e);
			}

			browser.tabs.create({
				url: 'welcome.html'
			});
			browser.runtime.setUninstallURL('https://quickreplymeet.enzon19.com/uninstalled');
		} else if (details.reason == 'update') {
			try {
				await migrateOldData();
			} catch (e) {
				console.error(e);
			}

			browser.tabs.create({
				url: 'updated.html'
			});
			browser.runtime.setUninstallURL('https://quickreplymeet.enzon19.com/uninstalled');
		}
	});
});

async function migrateOldData() {
	const { settings: newDataSettings } = (await browser.storage.sync.get('settings')) as Record<
		'settings',
		Settings
	>;
	const { messages: newDataMessages } = (await browser.storage.local.get('messages')) as Record<
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

	const oldData = await browser.storage.sync.get([
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

	await browser.storage.sync.set({ settings });
	browser.storage.sync.remove(['ButtonsRoundness', 'buttonsPosition', 'messageList']);
	await browser.storage.local.set({ messages });
}
