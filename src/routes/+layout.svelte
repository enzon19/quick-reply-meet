<script lang="ts">
	import '../app.css';
	import '$lib/i18n/index';
	import { _ } from 'svelte-i18n';
	import { Button } from 'm3-svelte';
	import favicon from '$lib/assets/favicon.ico';
	import icon from '$lib/assets/icon-512.png';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
	<div class="container">
		<div class="logo">
			<img src={icon} alt="Quick Reply Meet Logo" />
			<h1>Quick Reply Meet</h1>
		</div>
		<Button>{$_('install')}</Button>
	</div>
</header>

<main class="container">{@render children()}</main>

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
	}

	.logo > img {
		height: 3.25rem;
	}

	.logo > h1 {
		display: none;
		margin: 0;
		font-weight: 600;
		font-size: 1.5rem;
	}

	@media (min-width: 480px) {
		.logo > h1 {
			display: block;
		}
	}
</style>
