<script lang="ts">
	import { Button, Dialog, Icon, Switch, TextFieldOutlined } from 'm3-svelte';
	import 'svooltip/styles.css';

	import { icons as materialSymbols } from '@iconify-json/material-symbols/icons.json';
	import ShortcutRecorder from '@/components/ShortcutRecorder.svelte';
	const arrowBackIcon = materialSymbols['arrow-back'];
	const deleteIcon = materialSymbols['delete-forever'];
	const checkIcon = materialSymbols['check'];

	let {
		message,
		page = $bindable(),
		state: managementType,
		onchange,
		ondelete
	}: {
		message: Partial<Message>;
		page: MessagesSubpages;
		state: 'new' | 'edit';
		onchange: (updatedMessage: Partial<Message>) => void;
		ondelete: (updatedMessage: Partial<Message>) => void;
	} = $props();

	function saveMessage() {
		if (message.content && message.content != '') onchange(message);
	}

	let deleteDialogOpen = $state(false);
	function deleteMessage() {
		ondelete(message);
		goBack();
	}

	async function goBack() {
		page = 'list';
		deleteDialogOpen = false;
		saveMessage();
		message = {};
	}

</script>

<Dialog bind:open={deleteDialogOpen} headline={chrome.i18n.getMessage('deleteMessageDialogTitle')}>
	{chrome.i18n.getMessage('deleteMessageDialogDescription', message.content)}
	{#snippet buttons()}
		<Button variant="text" onclick={() => (deleteDialogOpen = false)}
			>{chrome.i18n.getMessage('cancelButton')}</Button>
		<Button variant="text" onclick={deleteMessage}
			>{chrome.i18n.getMessage('deleteMessageButton')}</Button>
	{/snippet}
</Dialog>

<div class="flex-center" style="justify-content: space-between; margin-bottom: 16px">
	<div class="flex-center">
		<button onclick={goBack}>
			<Icon icon={arrowBackIcon} />
		</button>
		<h1>{chrome.i18n.getMessage(managementType + 'MessageTitle')}</h1>
	</div>
</div>
<div class="flex-gap">
	<TextFieldOutlined
		bind:value={message.content}
		label={chrome.i18n.getMessage('messageContentField')} />
	<label class="switch-label">
		<div>
			<div>{chrome.i18n.getMessage('sendRightAwayToggleLabel')}</div>
			<p style="font-size: 8pt; margin: 4px 0px 0px; color: var(--m3c-on-surface-variant)">
				{chrome.i18n.getMessage('sendRightAwayToggleDescription')}
			</p>
		</div>
		<Switch bind:checked={message.sendRightAway} />
	</label>
	<TextFieldOutlined
		label={chrome.i18n.getMessage('chatRegexField')}
		bind:value={message.chatRegex} />
	<ShortcutRecorder bind:shortcut={message.keyboardShortcut} />
</div>
<div class="buttons-end">
	{#if managementType == 'edit'}
		<Button variant="tonal" onclick={() => (deleteDialogOpen = true)}>
			<Icon icon={deleteIcon} viewBox="0 0 24 24" />{chrome.i18n.getMessage('deleteMessageButton')}
		</Button>
	{/if}
	<Button style="width: 100%" onclick={saveMessage}>
		<Icon icon={checkIcon} viewBox="0 0 24 24" />{chrome.i18n.getMessage('saveMessageButton')}
	</Button>
</div>

<style>
	:global(.m3-container:has(> input)) {
		width: 100%;
	}

	.switch-label {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 8px;
	}

	button {
		all: unset;
		cursor: pointer;
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 100%;
		margin: 8px 14px 8px 3px;
	}

	button:hover {
		background-color: var(--m3c-surface-container-highest);
	}

	button :global(svg) {
		width: 24px;
		height: 24px;
	}

	h1 {
		margin: 0;
		font-family: 'Google Sans Flex', sans-serif;
		font-weight: 400;
		font-size: 22pt;
	}

	label {
		margin: 0;
		font-size: 12pt;
		font-family: 'Google Sans Flex', sans-serif;
	}

	.flex-center {
		display: flex;
		align-items: center;
	}

	.flex-gap {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.buttons-end {
		width: 100%;
		display: flex;
		gap: 8px;
		margin-top: auto;
	}
</style>
