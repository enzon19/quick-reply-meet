export {};

declare global {
	interface Message {
		id: string;
		content: string;
		sendRightAway: boolean;
		chatRegex?: string;
		keyboardShortcut?: string[];
	}
	type MessagesSubpages = 'list' | 'new' | 'edit';

	interface Settings {
		buttons: {
			roundness: number;
			position: 'top' | 'bottom';
		};
	}
	type SettingsSubpages = 'buttonRoundness' | 'buttonPosition' | 'about' | undefined;
}
