export let hasToCheckChat = false;
export let messages: messagesWithRegex = [];
export let messageInput: HTMLTextAreaElement | undefined;
export let currentlyPressed = new Set<string>();

export type messagesWithRegex = (Message & {
	_compiledRegex?: RegExp;
})[];

export function setHasToCheckChat(v: boolean) {
	hasToCheckChat = v;
}

export function setMessages(v: messagesWithRegex) {
	messages = v;
}

export function setMessageInput(v?: HTMLTextAreaElement) {
	messageInput = v;
}
