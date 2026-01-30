<script lang="ts">
	import {
		ListItem,
		Divider,
		Icon,
		Button,
		Slider,
		RadioAnim1,
		snackbar,
		Snackbar
	} from 'm3-svelte';
	import AppBar from '@/components/AppBar.svelte';
	import ChatIllustration from '@/components/ChatIllustration.svelte';
	import { requestChangesOnPage, saveMessages } from '@/utils/sync';
	import { onMount } from 'svelte';

	import { icons as materialSymbols } from '@/assets/material-symbols-subset.json';
	const roundnessIcon = materialSymbols['rounded-corner'];
	const positionIcon = materialSymbols['position-bottom-left'];
	const swapIcon = materialSymbols['swap-vert'];
	const importIcon = materialSymbols['upload'];
	const exportIcon = materialSymbols['download'];
	const infoIcon = materialSymbols['info'];
	const heartIcon = materialSymbols['favorite'];
	const ghIcon = materialSymbols['code'];

	let {
		page = $bindable(),
		loadMessages
	}: {
		page: SettingsSubpages;
		loadMessages?: () => void;
	} = $props();

	let borderRadius: number | undefined = $state();
	let buttonsPosition: 'top' | 'bottom' | undefined = $state();

	onMount(async () => {
		const { settings } = (await browser.storage.sync.get('settings')) as { settings: Settings };
		let borderRadiusFromSync: any, buttonsPositionFromSync: any;

		if (settings) {
			borderRadiusFromSync = settings.buttons.roundness;
			buttonsPositionFromSync = settings.buttons.position;
		}

		if (borderRadiusFromSync != null) {
			borderRadius = Number(borderRadiusFromSync);
		} else {
			borderRadius = 20;
		}

		if (buttonsPositionFromSync && ['top', 'bottom'].includes(buttonsPositionFromSync.toString())) {
			buttonsPosition = buttonsPositionFromSync as 'top' | 'bottom';
		} else {
			buttonsPosition = 'top';
		}
	});

	function syncSettings() {
		const settings: Settings = {
			buttons: {
				position: buttonsPosition || 'top',
				roundness: borderRadius ?? 20
			}
		};

		browser.storage.sync.set({ settings });
		requestChangesOnPage();
	}
	$effect(() => {
		if (buttonsPosition) syncSettings();
	});

	async function exportMessages() {
		try {
			const { messages } = await browser.storage.local.get('messages');

			const blob = new Blob([JSON.stringify(messages)], {
				type: 'application/json'
			});
			const url = URL.createObjectURL(blob);

			const a = document.createElement('a');
			a.href = url;
			a.download = `qrm-export-${Number(new Date())}.json`;
			a.click();

			URL.revokeObjectURL(url);

			snackbar(browser.i18n.getMessage('successExport'));
		} catch (e) {
			console.error(e);
			snackbar('Error');
		}
	}

	function readFile(file: File): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();

			reader.onload = () => resolve(reader.result as string);
			reader.onerror = () => reject(reader.error);
			reader.readAsText(file);
		});
	}

	async function importMessages(e: Event) {
		try {
			const element = e.target as HTMLInputElement | null;
			if (!element || !element.files?.length) return;

			const file = element.files[0];
			if (!file.type.includes('/json')) throw 'Not a JSON file.';

			const importedMessages = JSON.parse(await readFile(file));
			if (!Array.isArray(importedMessages)) throw 'Not an array.';

			const { messages } = (await browser.storage.local.get('messages')) as Record<
				'messages',
				Message[]
			>;

			const newMessages: Message[] = [];
			for (const importedMessage of importedMessages) {
				if (importedMessage?.id && messages.some((e) => e.id == importedMessage.id)) continue; // se tem o mesmo id, skip

				let newMessage: Partial<Message> = {
					sendRightAway: importedMessage.sendRightAway ?? true,
					chatRegex: importedMessage.chatRegex,
					keyboardShortcut: importedMessage.keyboardShortcut
				};
				if (importedMessage.content && importedMessage.id) {
					newMessage.id = importedMessage.id;
					newMessage.content = importedMessage.content;
					newMessages.push(newMessage as Message);
				}
			}

			await saveMessages([...messages, ...newMessages]);

			if (newMessages.length > 0) {
				snackbar(browser.i18n.getMessage('successImport', newMessages.length.toString()));
				if (loadMessages) loadMessages();
			} else {
				snackbar(browser.i18n.getMessage('noImports'));
			}
		} catch (e) {
			console.error(e);
			snackbar('Error');
		}
	}
</script>

{#if page}
	<AppBar
		title={browser.i18n.getMessage('settings' + page[0].toUpperCase() + page.substring(1))}
		goBack={() => (page = undefined)} />
{/if}

{#if page == 'buttonsRoundness'}
	<ChatIllustration {borderRadius} {buttonsPosition} />
	<div style="margin-top: 16px">
		{#if borderRadius != null}
			<Slider
				bind:value={borderRadius}
				endStops={false}
				max={25}
				step={1}
				onchange={() => syncSettings()} />
		{/if}
	</div>
{:else if page == 'buttonsPosition'}
	<ChatIllustration {borderRadius} {buttonsPosition} />

	<ListItem label headline={browser.i18n.getMessage('topButtonsPosition')} style="margin-top: 16px">
		{#snippet leading()}
			<RadioAnim1>
				<input type="radio" name="buttonsPosition" value="top" bind:group={buttonsPosition} />
			</RadioAnim1>
		{/snippet}
	</ListItem>
	<ListItem label headline={browser.i18n.getMessage('bottomButtonsPosition')}>
		{#snippet leading()}
			<RadioAnim1>
				<input type="radio" name="buttonsPosition" value="bottom" bind:group={buttonsPosition} />
			</RadioAnim1>
		{/snippet}
	</ListItem>
{:else if page == 'exportAndImport'}
	<ListItem
		headline={browser.i18n.getMessage('importButton')}
		onclick={() => (document.querySelector('#import-messages-input') as HTMLInputElement)?.click()}>
		{#snippet leading()}
			<Icon icon={importIcon} />
		{/snippet}
	</ListItem>
	<Divider />
	<ListItem headline={browser.i18n.getMessage('exportButton')} onclick={exportMessages}>
		{#snippet leading()}
			<Icon icon={exportIcon} />
		{/snippet}
	</ListItem>
	<input
		type="file"
		id="import-messages-input"
		accept="application/json"
		hidden
		onchange={importMessages} />
	<div class="snackbarWrapper">
		<Snackbar />
	</div>
{:else if page == 'about'}
	<div class="about">
		<img src="/icon/512.png" class="logo" alt="Quick Reply Meet Logo" />
		<h1>Quick Reply Meet</h1>
		<p>2026 • v2.0.0</p>
		<p>{@html browser.i18n.getMessage('credits')}</p>
		<div class="flex">
			<Button iconType="left" href="https://enzon19.com/donate" target="_blank">
				<Icon icon={heartIcon} viewBox="0 0 24 24" />
				{browser.i18n.getMessage('donateButton')}
			</Button>
			<Button iconType="left" href="https://github.com/enzon19/quick-reply-meet" target="_blank">
				<Icon icon={ghIcon} viewBox="0 0 24 24" />
				GitHub
			</Button>
		</div>
	</div>
{:else}
	<ListItem
		headline={browser.i18n.getMessage('settingsButtonsRoundness')}
		onclick={() => (page = 'buttonsRoundness')}>
		{#snippet leading()}
			<Icon icon={roundnessIcon} />
		{/snippet}
	</ListItem>
	<Divider />
	<ListItem
		headline={browser.i18n.getMessage('settingsButtonsPosition')}
		onclick={() => (page = 'buttonsPosition')}>
		{#snippet leading()}
			<Icon icon={positionIcon} />
		{/snippet}
	</ListItem>
	<Divider />
	<ListItem
		headline={browser.i18n.getMessage('settingsExportAndImport')}
		onclick={() => (page = 'exportAndImport')}>
		{#snippet leading()}
			<Icon icon={swapIcon} />
		{/snippet}
	</ListItem>
	<Divider />
	<ListItem headline={browser.i18n.getMessage('settingsAbout')} onclick={() => (page = 'about')}>
		{#snippet leading()}
			<Icon icon={infoIcon} />
		{/snippet}
	</ListItem>
{/if}

<style>
	* {
		font-family: 'Google Sans Flex', sans-serif;
	}

	.logo {
		height: 9rem;
		width: 9rem;
		margin: 0px auto;
	}

	h1 {
		margin: 18px auto 0px auto;
	}

	p {
		margin: 0px auto;
		font-size: 0.85rem;
	}

	.flex {
		display: flex;
		flex-direction: row;
		gap: 10px;
		margin: 18px auto 0px auto;
	}

	.about {
		display: flex;
		flex-direction: column;
	}

	:global(.holder:has(> .m3-container)) {
		bottom: 64px !important;
	}

	:global(.m3-container input[type='range'] ~ .value) {
		inset-inline-start: clamp(0rem, var(--handle-center), calc(100% - 0.5rem));
	}
</style>
