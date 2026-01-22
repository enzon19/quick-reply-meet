<script lang="ts">
	import { ListItem, Divider, Icon, Button } from 'm3-svelte';
	import { icons as materialSymbols } from '@iconify-json/material-symbols/icons.json';
	import AppBar from '@/components/AppBar.svelte';

	const roundnessIcon = materialSymbols['rounded-corner'];
	const positionIcon = materialSymbols['position-bottom-left'];
	const infoIcon = materialSymbols['info'];
	const heartIcon = materialSymbols['favorite'];
	const ghIcon = materialSymbols['code'];

	let {
		page = $bindable()
	}: {
		page: SettingsSubpages;
	} = $props();
</script>

{#if page}
	<AppBar
		title={chrome.i18n.getMessage('settings' + page[0].toUpperCase() + page.substring(1))}
		goBack={() => (page = undefined)} />
{/if}

{#if page == 'buttonsRoundness'}
	buttonsRoundness
{:else if page == 'buttonsPosition'}
	buttonsPosition
{:else if page == 'about'}
	<img src="/logo512.png" class="logo" alt="Quick Reply Meet Logo" />
	<h1>Quick Reply Meet</h1>
	<p>2026 • v2.0.0</p>
	<p>{@html chrome.i18n.getMessage('credits')}</p>
	<div class="flex">
		<Button iconType="left" href="https://enzon19.com/donate" target="_blank">
			<Icon icon={heartIcon} viewBox="0 0 24 24" />
			{chrome.i18n.getMessage('donateButton')}
		</Button>
		<Button iconType="left" href="https://github.com/enzon19/quick-reply-meet" target="_blank">
			<Icon icon={ghIcon} viewBox="0 0 24 24" />
			GitHub
		</Button>
	</div>
{:else}
	<ListItem
		headline={chrome.i18n.getMessage('settingsButtonsRoundness')}
		onclick={() => (page = 'buttonsRoundness')}>
		{#snippet leading()}
			<Icon icon={roundnessIcon} />
		{/snippet}
	</ListItem>
	<Divider />
	<ListItem
		headline={chrome.i18n.getMessage('settingsButtonsPosition')}
		onclick={() => (page = 'buttonsPosition')}>
		{#snippet leading()}
			<Icon icon={positionIcon} />
		{/snippet}
	</ListItem>
	<Divider />
	<ListItem headline={chrome.i18n.getMessage('settingsAbout')} onclick={() => (page = 'about')}>
		{#snippet leading()}
			<Icon icon={infoIcon} />
		{/snippet}
	</ListItem>
{/if}

<style>
	* {
		font-family: 'Google Sans Flex', sans-serif;
	}

	.logo {
		height: 9rem;
		width: 9rem;
		margin: 0px auto;
	}

	h1 {
		margin: 18px auto 0px auto;
	}

	p {
		margin: 0px auto;
		font-size: 0.85rem;
	}

	.flex {
		display: flex;
		flex-direction: row;
		gap: 5px;
		margin: 18px auto 0px auto;
	}
</style>
