import './style.css';
import { typeInInput, waitForClear } from './utils';

let messageInput: HTMLTextAreaElement | undefined;

const observer = new MutationObserver(() => {
	if (messageInput) return;

	const textarea = document.querySelector('textarea');
	if (!textarea) return;

	messageInput = textarea;
	observer.disconnect();

	addButtons(messageInput);
});

observer.observe(document.body, {
	childList: true,
	subtree: true
});

async function addButtons(input: HTMLTextAreaElement) {
	const root = input.closest('[jsname="pob9Hc"]');
	if (!root) {
		// fetch() - informar dev que não achou pob9Hc
		return;
	}

	const { settings } = (await chrome.storage.sync.get('settings')) as { settings: Settings };
	const roundness = settings?.buttons?.roundness ?? 20;
	const position = settings?.buttons?.position ?? 'top';

	const { messages } = (await chrome.storage.local.get('messages')) as { messages: Message[] };

	if (root.querySelector('#qrm-buttons-container')) return;

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
		messageBtn.addEventListener('click', (e) => sendMessage(e, message, input));

		buttonContainer.append(messageBtn);
	}

	root.insertAdjacentElement(position == 'bottom' ? 'beforeend' : 'afterbegin', buttonContainer);
}

function sendMessage(event: Event, message: Message, input: HTMLTextAreaElement) {
	const previouslyTypedInputContent = input.value;

	typeInInput(input, message.content);

	if (!message.sendRightAway) return;

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
