<script lang="ts">
	import { Icon } from 'm3-svelte';
	import { flip } from 'svelte/animate';

	import { icons as materialSymbols } from '@iconify-json/material-symbols/icons.json';
	const sendIcon = materialSymbols['send-outline'];

	let {
		borderRadius = 20,
		buttonsPosition = 'top'
	}: {
		borderRadius?: number;
		buttonsPosition?: 'top' | 'bottom';
	} = $props();

	const illustrationItems = [
		{ component: messagesButtons, id: 'messagesButtons' },
		{ component: illustrationInput, id: 'input' }
	];
</script>

{#snippet illustrationInput()}
	<div class="illustrationInput">
		<div>
			<Icon
				style="min-height: 24px; min-width: 24px; display: block;"
				icon={sendIcon}
				viewBox="0 0 24 24" />
		</div>
	</div>
{/snippet}

{#snippet messagesButtons()}
	<div class="messageGrid">
		<div class="message" style="border-radius: {borderRadius}px">Hello!</div>
		<div class="message" style="border-radius: {borderRadius}px">Olá!</div>
		<div class="message" style="border-radius: {borderRadius}px">¡Hola!</div>
	</div>
{/snippet}

<div class="illustrationContainer">
	{#each buttonsPosition == 'top' ? illustrationItems : illustrationItems.toReversed() as { component, id } (id)}
		<div animate:flip={{ duration: 400 }}>
			{@render component()}
		</div>
	{/each}
</div>

<style>
	* {
		font-family: 'Google Sans Flex', sans-serif;
	}

	.message {
		padding: 0.75rem;
		background-color: var(--m3c-surface-container-highest);
		font-size: 0.8rem;
	}

	.messageGrid {
		display: grid;
		grid-template-columns: auto auto auto;
		gap: 5px;
	}

	.illustrationContainer {
		background-color: var(--m3c-surface-container-low);
		padding: 2rem;
		border-radius: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.illustrationInput {
		border: 1px solid var(--m3c-outline-variant);
		border-radius: 25px;
		display: flex;
		min-height: 2.25rem;
		position: relative;
	}

	.illustrationInput > div {
		color: var(--m3c-outline-variant);
		margin-left: auto;
		padding: 12px;
	}
</style>
