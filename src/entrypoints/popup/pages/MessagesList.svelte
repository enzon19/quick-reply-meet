<script lang="ts">
	import { FAB, Icon, ListItem } from 'm3-svelte';
	import { tooltip } from 'svooltip';
	import 'svooltip/styles.css';
	import { flip } from 'svelte/animate';
	import { dragHandleZone, dragHandle } from 'svelte-dnd-action';

	import { icons as materialSymbols } from '@/assets/material-symbols-subset.json';
	const newIcon = materialSymbols['add'];
	const dragIcon = materialSymbols['drag-handle'];

	let {
		messages,
		currentMessage = $bindable(),
		page = $bindable(),
		onreorder
	}: {
		messages: Message[];
		currentMessage: Partial<Message> | undefined;
		page: MessagesSubpages;
		onreorder: (e: Message[]) => void;
	} = $props();

	const flipDurationMs = 200;
	async function handleSort(e: any) {
		messages = e.detail.items;
		onreorder(messages);
	}
</script>

<div
	use:dragHandleZone={{ items: messages, flipDurationMs, dropTargetStyle: {} }}
	onconsider={handleSort}
	onfinalize={handleSort}
	class="list-wrapper">
	{#each messages as message (message.id)}
		<div animate:flip={{ duration: flipDurationMs }}>
			<ListItem
				style="width: 100%"
				headline={message.content.substring(0, 40) + (message.content.length > 40 ? '...' : '')}
				onclick={() => {
					currentMessage = message;
					page = 'edit';
				}}>
				{#snippet trailing()}
					<div
						class="drag-handle"
						style="z-index: 100;"
						use:dragHandle
						aria-label="drag-handle for {message.content}">
						<Icon icon={dragIcon} />
					</div>
				{/snippet}
			</ListItem>
		</div>
	{:else}
		<div class="fallback">{@html browser.i18n.getMessage('noMessagesFallback')}</div>
	{/each}
</div>
<div class="fab-wrapper">
	<div
		use:tooltip={{
			content: browser.i18n.getMessage('newMessageButton'),
			offset: 12,
			placement: 'top-end',
			delay: [500, 0]
		}}>
		<FAB
			color="primary"
			icon={newIcon}
			onclick={() => {
				currentMessage = { content: undefined, sendRightAway: true };
				page = 'new';
			}} />
	</div>
</div>

<style>
	.fab-wrapper {
		position: fixed;
		bottom: 80px;
		right: 16px;
		z-index: 100;
	}

	.list-wrapper {
		position: relative;
		z-index: 1;
	}

	.list-wrapper > * + * {
		border-top: solid 1px var(--m3c-outline-variant);
	}

	.drag-handle {
		width: 25px;
		height: 25px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.drag-handle :global(svg) {
		width: 100%;
		height: 100%;
	}

	.fallback {
		font-family: 'Google Sans Flex', sans-serif;
		font-size: 12pt;
		margin: 16px auto;
		text-align: center;
	}

	:global(.svooltip-arrow) {
		display: none;
	}
	:global(.svooltip) {
		font-family:
			'Google Sans Flex',
			system-ui,
			-apple-system,
			sans-serif;
		letter-spacing: 0.5px;
		line-height: 16px;
		max-width: 200px;
		word-wrap: break-word;
	}
</style>
