<script lang="ts">
	import Settings from '@/popup/pages/Settings.svelte';

	let page = $state(undefined);
</script>

<div class="settings-container" class:home={!page}>
	{#if !page}
		<header>
			<h1>{chrome.i18n.getMessage('settings')}</h1>
		</header>
	{/if}
	<Settings bind:page />
</div>

<style>
	.settings-container {
		max-width: 42rem;
		margin: 0 auto;
		padding: 16px;
	}

	.home {
		padding-top: 0 !important;
	}

	header {
		min-height: 4rem;
		display: flex;
		align-items: center;
	}

	h1 {
		margin: 0;
		font-family: 'Google Sans Flex', sans-serif;
		font-weight: 400;
		font-size: 1.5rem;
		flex: 1;
	}
</style>
