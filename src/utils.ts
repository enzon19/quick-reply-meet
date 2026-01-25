export async function requestChangesOnPage() {
	const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
	if (tab && tab.id) {
		chrome.tabs.sendMessage(tab.id, 'update');
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
	await chrome.storage.local.set({
		messages: messages.map(normalizeMessage)
	});
	requestChangesOnPage();
}
