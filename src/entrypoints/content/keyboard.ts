import { messageInput, messages, currentlyPressed } from './state';
import { sendMessage } from './utils';

// <AIGenerated>
function normalizeCode(code: string): string {
	if (code === 'ControlLeft' || code === 'ControlRight') return 'Control';
	if (code === 'ShiftLeft' || code === 'ShiftRight') return 'Shift';
	if (code === 'AltLeft' || code === 'AltRight') return 'Alt';
	if (code === 'MetaLeft' || code === 'MetaRight') return 'Meta';
	return code;
}

function arraysEqual(a: string[], b: Set<string>): boolean {
	if (a.length !== b.size) return false;
	return a.every((item) => b.has(item));
}

export function onKeyDown(e: KeyboardEvent) {
	if (!messageInput) return;

	const normalized = normalizeCode(e.code);
	currentlyPressed.add(normalized);

	console.log('[QRM] Currently pressed:', Array.from(currentlyPressed));

	// Verificar se alguma combinação corresponde exatamente
	const matchedMessage = messages.find((m) => {
		if (!m.keyboardShortcut || m.keyboardShortcut.length === 0) return false;
		return arraysEqual(m.keyboardShortcut, currentlyPressed);
	});

	if (matchedMessage) {
		e.preventDefault();
		e.stopPropagation();
		console.log(
			'[QRM] Keyboard shortcut triggered:',
			matchedMessage.keyboardShortcut,
			matchedMessage
		);
		sendMessage(matchedMessage, messageInput);
	}
}

export function onKeyUp(e: KeyboardEvent) {
	const normalized = normalizeCode(e.code);
	currentlyPressed.delete(normalized);
}

export function onBlur() {
	currentlyPressed.clear();
}
// </AIGenerated>
