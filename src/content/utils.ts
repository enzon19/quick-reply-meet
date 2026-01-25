export function typeInInput(input: HTMLTextAreaElement | HTMLInputElement, value: string) {
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
