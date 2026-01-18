<script lang="ts">
	import { ListItem, Divider, Icon } from 'm3-svelte';
	import { icons as materialSymbols } from '@iconify-json/material-symbols/icons.json';

	const roundnessIcon = materialSymbols['rounded-corner'];
	const positionIcon = materialSymbols['position-bottom-left'];
	const infoIcon = materialSymbols['info'];

	let {
		page = $bindable()
	}: {
		page: SettingsSubpages;
	} = $props();
</script>

{#if page == 'buttonRoundness'}
	buttonRoundness
{:else if page == 'buttonPosition'}
	buttonPosition
{:else if page == 'about'}
	about
{:else}
	<ListItem
		headline={chrome.i18n.getMessage('settingsButtonsRoundness')}
		onclick={() => (page = 'buttonRoundness')}>
		{#snippet leading()}
			<Icon icon={roundnessIcon} />
		{/snippet}
	</ListItem>
	<Divider />
	<ListItem
		headline={chrome.i18n.getMessage('settingsButtonsPosition')}
		onclick={() => (page = 'buttonPosition')}>
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
