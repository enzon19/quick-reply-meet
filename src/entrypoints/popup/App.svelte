<script lang="ts">
	import { LoadingIndicator, NavCMLX, NavCMLXItem } from 'm3-svelte';
	import 'svooltip/styles.css';
	import { onMount } from 'svelte';
	import { saveMessages } from '@/utils/sync';
	import MessagesList from './pages/MessagesList.svelte';
	import ManageMessage from './pages/ManageMessage.svelte';
	import Settings from './pages/Settings.svelte';

	import { icons as materialSymbols } from '@/assets/material-symbols-subset.json';
	const settingsIcon = materialSymbols['settings'];
	const messagesIcon = materialSymbols['android-messages'];
	const settingsIconOutline = materialSymbols['settings-outline'];
	const messagesIconOutline = materialSymbols['android-messages-outline'];

	let page: 'messages' | 'settings' = $state('messages');
	let messagesSubpage: MessagesSubpages = $state('list');
	let settingsSubpage: SettingsSubpages = $state();

	let messages: Message[] = $state([]);
	let loading = $state(true);
	async function loadMessages() {
		loading = true;
		const result = (await browser.storage.local.get('messages')) as Record<'messages', Message[]>;
		messages = result.messages ?? [];
		loading = false;
	}

	let currentMessage: Message | undefined = $state();

	async function onReorder(updatedMessages: Message[]) {
		messages = updatedMessages;
		await saveMessages(messages);
	}

	async function onMessageUpdate(updatedMessage: Partial<Message>) {
		if (updatedMessage) {
			if (!updatedMessage.id) {
				updatedMessage.id = crypto.randomUUID();
				messages.push(updatedMessage as Message);
			} else {
				const index = messages.findIndex((e) => e.id === updatedMessage.id);
				messages[index] = updatedMessage as Message;
			}

			await saveMessages(messages);
		}
	}

	async function onMessageDelete(updatedMessage: Partial<Message>) {
		messages = messages.filter((e) => e.id !== updatedMessage.id);
		await saveMessages(messages);
	}

	onMount(loadMessages);
</script>

<div class="page-container">
	{#if page == 'messages'}
		{#if messagesSubpage === 'list'}
			{#if loading}
				<div style="text-align: center">
					<LoadingIndicator />
				</div>
			{:else}
				<MessagesList
					{messages}
					onreorder={onReorder}
					bind:currentMessage
					bind:page={messagesSubpage} />
			{/if}
		{:else if (messagesSubpage === 'new' || messagesSubpage === 'edit') && currentMessage}
			<ManageMessage
				message={currentMessage}
				onchange={onMessageUpdate}
				ondelete={onMessageDelete}
				bind:page={messagesSubpage}
				state={messagesSubpage} />
		{/if}
	{:else if page === 'settings'}
		<Settings bind:page={settingsSubpage} {loadMessages} />
	{/if}
</div>

<NavCMLX variant="compact">
	<NavCMLXItem
		variant="compact"
		icon={page === 'messages' ? messagesIcon : messagesIconOutline}
		text={browser.i18n.getMessage('messages')}
		onclick={() => {
			if (page === 'messages') messagesSubpage = 'list';
			page = 'messages';
		}}
		selected={page === 'messages'}
		disabled={false} />
	<NavCMLXItem
		variant="compact"
		icon={page === 'settings' ? settingsIcon : settingsIconOutline}
		text={browser.i18n.getMessage('settings')}
		onclick={() => {
			if (page === 'settings') settingsSubpage = undefined;
			page = 'settings';
		}}
		selected={page === 'settings'}
		disabled={false} />
</NavCMLX>

<style>
	.page-container {
		position: relative;
		overflow-x: hidden;
		height: 400px;
		width: 450px;
		padding: 16px;
		display: flex;
		flex-direction: column;
	}
</style>
