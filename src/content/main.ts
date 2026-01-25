import './style.css';
import { typeInInput, waitForClear } from './utils';

const chatBubbleID = 'dTKtvb';
const inputWrapperID = 'pob9Hc';

let messages: (Message & {
	_compiledRegex?: RegExp;
})[] = [];
let hasToCheckChat = false;
let messageInput: HTMLTextAreaElement | undefined;

const generalUIObserver = new MutationObserver(() => {
	console.log('[QRM] Change detected in the page.');

	const textarea = document.querySelector('textarea');
	if (!textarea) return;

	if (hasToCheckChat)
		checkChat(Array.from(document.querySelectorAll(`[jsname="${chatBubbleID}"]`)));

	const alreadyAddedButtons = document.querySelector('#qrm-buttons-container');
	if (messageInput && alreadyAddedButtons) return;

	messageInput = textarea;

	console.log("[QRM] Trying to add buttons because of page's changes...");
	addButtons(messageInput);
});

generalUIObserver.observe(document.body, {
	childList: true,
	subtree: true
});

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
	if (message === 'update') {
		console.log('[QRM] Updated settings.');

		const alreadyAddedButtons = document.querySelector('#qrm-buttons-container');
		if (!alreadyAddedButtons) return;

		const textarea = document.querySelector('textarea');
		if (!textarea) return;

		alreadyAddedButtons.remove();
		sendResponse(true);
	}
});

async function addButtons(input: HTMLTextAreaElement) {
	const root = input.closest(`[jsname="${inputWrapperID}"]`);
	if (!root) {
		// fetch() - informar dev que não achou pob9Hc
		return;
	}

	if (root.querySelector('#qrm-buttons-container')) return;
	console.log('[QRM] Allowed to add buttons.');

	const { settings } = (await chrome.storage.sync.get('settings')) as { settings: Settings };
	const roundness = settings?.buttons?.roundness ?? 20;
	const position = settings?.buttons?.position ?? 'top';

	const { messages: messagesFromStorage } = (await chrome.storage.local.get('messages')) as {
		messages: Message[];
	};
	messages = messagesFromStorage ?? [];
	hasToCheckChat = false;
	for (const message of messages) {
		if (message.chatRegex) {
			try {
				message._compiledRegex = new RegExp(message.chatRegex, 'i');
				hasToCheckChat = true;
			} catch (e) {
				console.error('[QRM] Error parsing RegExp:', e);
			}
		}
	}

	const buttonContainer = document.createElement('div');
	buttonContainer.id = 'qrm-buttons-container';
	buttonContainer.style.setProperty('--qrm-radius', `${roundness}px`);
	buttonContainer.classList.add('qrm-' + position);

	for (const message of messages) {
		const messageBtn = document.createElement('button');
		messageBtn.textContent =
			message.content.substring(0, 20) + (message.content.length > 20 ? '...' : '');
		messageBtn.title = message.content;
		messageBtn.classList.add('qrm-button');
		messageBtn.addEventListener('click', (e) => sendMessage(message, input));

		buttonContainer.append(messageBtn);
	}

	root.insertAdjacentElement(position == 'bottom' ? 'beforeend' : 'afterbegin', buttonContainer);
}

function sendMessage(message: Message, input: HTMLTextAreaElement) {
	const previouslyTypedInputContent = input.value;

	typeInInput(input, message.content);

	if (!message.sendRightAway) return;

	console.log('[QRM] Automatically sending.');
	input.dispatchEvent(
		new KeyboardEvent('keydown', {
			bubbles: true,
			cancelable: true,
			key: 'Enter',
			code: 'Enter',
			keyCode: 13,
			which: 13
		})
	);

	waitForClear(input).then(() => typeInInput(input, previouslyTypedInputContent));
}

let lastProcessedMessageID: string | null = null;
function checkChat(chatMessages: Element[]) {
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
