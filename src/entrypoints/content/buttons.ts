import { messages, setHasToCheckChat, setMessages } from './state';
import { sendMessage } from './utils';

export async function addButtons(input: HTMLTextAreaElement, inputWrapperID: string) {
	const root = input.closest(`[jsname="${inputWrapperID}"]`);
	if (!root) {
		// fetch() - let dev know that no inputWrapperID was found
		return;
	}

	if (root.querySelector('#qrm-buttons-container')) return;
	console.log('[QRM] Allowed to add buttons.');

	const { settings } = (await browser.storage.sync.get('settings')) as { settings: Settings };
	const roundness = settings?.buttons?.roundness ?? 20;
	const position = settings?.buttons?.position ?? 'top';

	const { messages: messagesFromStorage } = (await browser.storage.local.get('messages')) as {
		messages: Message[];
	};

	setMessages(messagesFromStorage ?? []);
	setHasToCheckChat(false);
	if (messages.length == 0) return;

	for (const message of messages) {
		if (message.chatRegex) {
			try {
				message._compiledRegex = new RegExp(message.chatRegex, 'i');
				setHasToCheckChat(true);
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
