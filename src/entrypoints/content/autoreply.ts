import { messageInput, messages } from './state';
import { sendMessage } from './utils';

let lastProcessedMessageID: string | null = null;

export function checkChat(chatMessages: Element[]) {
	console.log('[QRM] Checking chat...');

	const lastChatMessage = chatMessages.at(-1);
	if (!lastChatMessage) return;

	const text = lastChatMessage.textContent?.trim() || null;
	if (!text) return;

	if (messages.some((m) => m.content === text)) return;

	const lastChatMessageID = lastChatMessage
		.closest('[data-message-id]')
		?.getAttribute('data-message-id');
	if (
		!lastChatMessageID ||
		!lastChatMessageID.startsWith('spaces') || // o Meet gera um ID temporário e depois um ID final que começa com "spaces"
		lastChatMessageID === lastProcessedMessageID
	)
		return;
	lastProcessedMessageID = lastChatMessageID;

	const matchedMessages = messages.filter(({ _compiledRegex }) => {
		if (_compiledRegex) {
			return _compiledRegex.test(text);
		}
	});
	if (matchedMessages.length === 0) return;

	for (const matchedMessage of matchedMessages) {
		console.log('[QRM] Message chat matched:', matchedMessage);
		if (messageInput) sendMessage(matchedMessage, messageInput);
	}
}
