<script lang="ts">
	import { Button, Dialog, Icon, Switch, Tabs, TextFieldOutlined } from 'm3-svelte';
	import 'svooltip/styles.css';

	import ShortcutRecorder from '@/components/ShortcutRecorder.svelte';
	import AppBar from '@/components/AppBar.svelte';
	import TextFieldOutlinedSecretMultiline from '@/components/TextFieldOutlinedSecretMultiline.svelte';

	import { icons as materialSymbols } from '@/assets/material-symbols-subset.json';
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

	let currentTab: 'details' | 'triggers' = $state('details');

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
		currentTab = 'details';
	}
</script>

<Dialog bind:open={deleteDialogOpen} headline={browser.i18n.getMessage('deleteMessageDialogTitle')}>
	{browser.i18n.getMessage(
		'deleteMessageDialogDescription',
		message.content?.substring(0, 40) +
			(message.content && message.content.length > 40 ? '...' : '')
	)}
	{#snippet buttons()}
		<Button variant="text" onclick={() => (deleteDialogOpen = false)}
			>{browser.i18n.getMessage('cancelButton')}</Button>
		<Button variant="text" onclick={deleteMessage}
			>{browser.i18n.getMessage('deleteMessageButton')}</Button>
	{/snippet}
</Dialog>

<AppBar title={browser.i18n.getMessage((managementType + 'MessageTitle') as any)} {goBack} />
<div class="flex-gap">
	<Tabs
		bind:tab={currentTab}
		items={[
			{ name: browser.i18n.getMessage('detailsTab'), value: 'details' },
			{ name: browser.i18n.getMessage('triggersTab'), value: 'triggers' }
		]} />

	{#if currentTab === 'details'}
		<TextFieldOutlinedSecretMultiline
			bind:value={message.content}
			id="messageContentInput"
			label={browser.i18n.getMessage('messageContentField')}
			maxlength={2000} />
		<label class="switch-label">
			<div>
				<div>{browser.i18n.getMessage('sendRightAwayToggleLabel')}</div>
				<p style="font-size: 9.5pt; margin: 4px 0px 0px; color: var(--m3c-on-surface-variant)">
					{browser.i18n.getMessage('sendRightAwayToggleDescription')}
				</p>
			</div>
			<Switch bind:checked={message.sendRightAway} />
		</label>
	{:else if currentTab === 'triggers'}
		<TextFieldOutlined
			label={browser.i18n.getMessage('chatRegexField')}
			bind:value={message.chatRegex} />
		<ShortcutRecorder bind:shortcut={message.keyboardShortcut} />
	{/if}
</div>
<div class="buttons-end">
	{#if managementType == 'edit'}
		<Button variant="tonal" onclick={() => (deleteDialogOpen = true)}>
			<Icon icon={deleteIcon} viewBox="0 0 24 24" />{browser.i18n.getMessage('deleteMessageButton')}
		</Button>
	{/if}
	<Button style="width: 100%" onclick={goBack}>
		<Icon icon={checkIcon} viewBox="0 0 24 24" />{browser.i18n.getMessage('saveMessageButton')}
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
		gap: 16px;
	}

	label {
		margin: 0;
		font-size: 12pt;
		font-family: 'Google Sans Flex', sans-serif;
	}

	.flex-gap {
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin-bottom: 16px;
	}

	.buttons-end {
		width: 100%;
		display: flex;
		gap: 8px;
		margin-top: auto;
	}
</style>
