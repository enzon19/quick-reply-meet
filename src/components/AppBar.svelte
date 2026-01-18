<script lang="ts">
	import { icons as materialSymbols } from '@iconify-json/material-symbols/icons.json';
	import { Icon } from 'm3-svelte';
	const arrowBackIcon = materialSymbols['arrow-back'];

	let {
		title,
		goBack,
		color = 'surface'
	}: {
		title: string;
		goBack: () => void;
		color?: string;
	} = $props();
</script>

<header style="background-color: var(--m3c-{color})">
	<nav class="flex-center">
		<button class="back" onclick={goBack}>
			<Icon icon={arrowBackIcon} />
		</button>
		<h6>{title}</h6>
	</nav>
</header>

<style>
	header {
		position: sticky;
		top: -16px;
		left: 0;
		margin: -16px -16px 0px -16px;
		z-index: 1;
	}

	.flex-center {
		display: flex;
		align-items: center;
		min-height: 4rem;
		gap: 1rem;
		width: 100%;
		padding: 0px 16px;
		box-sizing: border-box;
	}

	.back {
		all: unset;
		cursor: pointer;
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 100%;
	}

	.back:hover {
		background-color: var(--m3c-surface-container-highest);
	}

	.back :global(svg) {
		width: 24px;
		height: 24px;
	}

	h6 {
		margin: 0;
		font-family: 'Google Sans Flex', sans-serif;
		font-weight: 400;
		font-size: 1.5rem;
		flex: 1;
	}
</style>
