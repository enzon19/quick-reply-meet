export async function requestChangesOnPage() {
	const [tab] = await browser.tabs.query({ active: true, lastFocusedWindow: true });
	if (tab && tab.id) {
		browser.tabs.sendMessage(tab.id, 'update');
	}
}

function normalizeMessage(m: Message): Message {
	return {
		...m,
		keyboardShortcut:
			m.keyboardShortcut && Array.isArray(m.keyboardShortcut) ? [...m.keyboardShortcut] : []
	};
}

export async function saveMessages(messages: Message[]) {
	await browser.storage.local.set({
		messages: messages.map(normalizeMessage)
	});
	requestChangesOnPage();
}
