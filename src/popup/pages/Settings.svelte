<script lang="ts">
	import { ListItem, Divider, Icon } from 'm3-svelte';
	import { icons as materialSymbols } from '@iconify-json/material-symbols/icons.json';
	import AppBar from '@/components/AppBar.svelte';

	const roundnessIcon = materialSymbols['rounded-corner'];
	const positionIcon = materialSymbols['position-bottom-left'];
	const infoIcon = materialSymbols['info'];

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
	about
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
