<script lang="ts">
	import '../app.css';
	import '$lib/i18n/index';
	import { _ } from 'svelte-i18n';
	import { resolve } from '$app/paths';
	import { Button, Icon } from 'm3-svelte';
	import InstallButton from '$lib/components/InstallButton.svelte';
	import { icons } from '$lib/assets/iconify.json';

	let { children } = $props();
</script>

<svelte:head>
</svelte:head>

<header>
	<div class="container">
		<a href={resolve('/')} class="logo">
			<img src="icon-512.png" alt="Quick Reply Meet Logo" />
			<h1>Quick Reply Meet</h1>
		</a>
		<InstallButton />
	</div>
</header>

<main class="container">{@render children()}</main>

<footer>
	<div class="container">
		<span>{@html $_('footer.credits')}</span>
		<div class="buttons">
			<Button href="https://enzon19.com/donate" target="_blank" variant="text" iconType="left">
				<Icon viewBox="0 0 24 24" icon={icons['favorite']} />
				{$_('footer.donate')}
			</Button>
			<Button
				href="https://github.com/enzon19/quick-reply-meet"
				target="_blank"
				variant="text"
				iconType="left"
			>
				<Icon viewBox="0 0 512 512" icon={icons['github']} />
				{$_('footer.sourceCode')}
			</Button>
		</div>
	</div>
</footer>

<style>
	header {
		background-color: var(--m3c-surface-container);
		padding: 0.8rem;
		position: sticky;
		top: 0;
		z-index: 5;
	}

	main.container {
		padding: 1rem;
	}

	header > div {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 1rem;
		text-decoration: none;
		color: var(--m3c-on-surface);
	}

	.logo > img {
		height: 3.25rem;
		filter: invert(0.15);
	}

	@media (prefers-color-scheme: dark) {
		.logo > img {
			filter: invert(0);
		}
	}

	.logo > h1 {
		display: none;
		margin: 0;
		font-weight: 600;
		font-size: 1.5rem;
	}

	footer {
		background-color: var(--m3c-surface-container);
		padding: 1.5rem 0.8rem;
	}

	footer > div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column-reverse;
		gap: 1.5rem;
	}

	.buttons {
		display: flex;
		gap: 0.5rem;
	}

	@media (min-width: 560px) {
		.logo > h1 {
			display: block;
		}

		footer > div {
			flex-direction: row;
		}
	}
</style>
