<script lang="ts">
	import '../app.css';
	import '$lib/i18n/index';
	import { _ } from 'svelte-i18n';
	import { getBrowserName } from '$lib/utils';
	import { Button, Icon } from 'm3-svelte';
	import { icons } from '$lib/assets/iconify.json';
	import favicon from '$lib/assets/favicon.ico';
	import icon from '$lib/assets/icon-512.png';
	import { onMount } from 'svelte';

	let { children } = $props();

	let userAgent: string | undefined = $state();
	onMount(() => {
		userAgent = window.navigator.userAgent;
	});
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
		<Button iconType="left">
			<Icon viewBox="0 0 24 24" icon={icons['add']} />
			{$_('install', { values: { browser: getBrowserName(userAgent) } })}
		</Button>
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

	@media (min-width: 560px) {
		.logo > h1 {
			display: block;
		}
	}
</style>
