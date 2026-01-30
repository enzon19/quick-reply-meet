<script lang="ts">
	import { Chip } from 'm3-svelte';

	type MessageKey =
		| 'hello'
		| 'hi'
		| 'ok'
		| 'yes'
		| 'no'
		| 'thanks'
		| 'thankYou'
		| 'youReWelcome'
		| 'bye'
		| 'canYouRepeat';

	let messages: Record<MessageKey, boolean> = $state({
		hello: true,
		hi: false,
		ok: false,
		yes: false,
		no: false,
		thanks: false,
		thankYou: false,
		youReWelcome: false,
		bye: false,
		canYouRepeat: false
	});

	let {
		onSelectedMessagesChanged
	}: { onSelectedMessagesChanged: (messages: Record<MessageKey, boolean>) => void } = $props();
</script>

<div class="wrapper">
	{#each Object.keys(messages) as message}
		<Chip
			variant="general"
			selected={messages[message as MessageKey]}
			onclick={() => {
				messages[message as MessageKey] = !messages[message as MessageKey];
				onSelectedMessagesChanged(messages);
			}}>{browser.i18n.getMessage('defaultMessage_' + message)}</Chip>
	{/each}
</div>

<style>
	:global(.m3-container.general.m3-layer) {
		font-size: 0.875rem;
		font-weight: 400;
		letter-spacing: 0;
		line-height: 1.25rem;
		padding: 0.85rem 1.2rem;
		cursor: pointer;
		border-radius: 20px;
		height: max-content;
		min-width: 5rem;
		text-align: center;
	}

	:global(.m3-container.general.m3-layer > span) {
		width: 100%;
	}

	.wrapper {
		height: 25rem;
		display: flex;
		flex-wrap: wrap;
		align-content: start;
		gap: 0.75rem;
	}
</style>
