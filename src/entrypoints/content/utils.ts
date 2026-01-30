import { currentlyPressed } from "./state";

export function typeInInput(input: HTMLTextAreaElement | HTMLInputElement, value: string) {
	console.log('[QRM] Typing message in input.');
	input.value = value;
	input.dispatchEvent(new Event('input', { bubbles: true }));
}

export function waitForClear(input: HTMLTextAreaElement | HTMLInputElement): Promise<void> {
	return new Promise((resolve) => {
		const observer = new MutationObserver(() => {
			if (input.value === '') {
				observer.disconnect();
				resolve();
			}
		});

		observer.observe(input, {
			attributes: true,
			childList: true,
			subtree: true
		});
	});
}

export function sendMessage(message: Message, input: HTMLTextAreaElement) {
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
	currentlyPressed.clear();

	waitForClear(input).then(() => typeInInput(input, previouslyTypedInputContent));
}
