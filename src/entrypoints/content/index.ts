import './style.css';
import { messageInput, setMessageInput, hasToCheckChat, messages } from './state';
import { addButtons } from './buttons';
import { checkChat } from './autoreply';
import { onBlur, onKeyDown, onKeyUp } from './keyboard';

const chatBubbleID = 'dTKtvb';
const inputWrapperID = 'pob9Hc';

// CHECK FOR UI CHANGES
function handleUITick() {
	console.log('[QRM] Change detected in the page.');

	if (messageInput && !document.contains(messageInput)) setMessageInput(undefined);
	const textarea = document.querySelector('textarea');
	if (!textarea) return;

	if (hasToCheckChat)
		checkChat(Array.from(document.querySelectorAll(`[jsname="${chatBubbleID}"]`)));

	const alreadyAddedButtons = document.querySelector('#qrm-buttons-container');
	if (messageInput && alreadyAddedButtons) return;

	console.log("[QRM] Trying to add buttons because of page's changes...");
	setMessageInput(textarea);
	addButtons(textarea, inputWrapperID);
}

let scheduled = false;
const generalUIObserver = new MutationObserver(() => {
	if (scheduled) return;
	scheduled = true;

	queueMicrotask(() => {
		scheduled = false;
		handleUITick();
	});
});

// FORCE UPDATE WHEN SETTINGS CHANGE
function onRuntimeMessage(
	message: any,
	sender: globalThis.Browser.runtime.MessageSender,
	sendResponse: (response: any) => void
) {
	if (message === 'update') {
		console.log('[QRM] Updated settings, removing buttons to force update...');

		const buttonsContainer = document.querySelector('#qrm-buttons-container');
		if (!buttonsContainer) {
			if (messages.length == 0) {
				handleUITick();
				sendResponse(true);
			}
			return;
		}

		buttonsContainer.remove();
		sendResponse(true);
	}
}

// REGISTER CONTENT SCRIPT
export default defineContentScript({
	matches: ['https://meet.google.com/*'],

	main(ctx) {
		document.addEventListener('keydown', onKeyDown);
		document.addEventListener('keyup', onKeyUp);
		window.addEventListener('blur', onBlur);

		generalUIObserver.observe(document.body, {
			childList: true,
			subtree: true
		});

		browser.runtime.onMessage.addListener(onRuntimeMessage);

		ctx.onInvalidated(() => {
			document.removeEventListener('keydown', onKeyDown);
			document.removeEventListener('keyup', onKeyUp);
			window.removeEventListener('blur', onBlur);

			generalUIObserver.disconnect();

			browser.runtime.onMessage.removeListener(onRuntimeMessage);
		});
	}
});
