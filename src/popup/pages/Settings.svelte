<script lang="ts">
	import { ListItem, Divider, Icon } from 'm3-svelte';
	import { icons as materialSymbols } from '@iconify-json/material-symbols/icons.json';

	const roundnessIcon = materialSymbols['rounded-corner'];
	const positionIcon = materialSymbols['position-bottom-left'];

	let {
		page = $bindable()
	}: {
		page?: 'buttonRoundness' | 'buttonPosition';
	} = $props();
</script>

{#if page == 'buttonRoundness'}
	buttonRoundness
{:else if page == 'buttonPosition'}
	buttonPosition
{:else}
	<ListItem headline={chrome.i18n.getMessage('settingsButtonsRoundness')} onclick={() => {}}>
		{#snippet leading()}
			<Icon icon={roundnessIcon} />
		{/snippet}
	</ListItem>
	<Divider />
	<ListItem headline={chrome.i18n.getMessage('settingsButtonsPosition')} onclick={() => {}}>
		{#snippet leading()}
			<Icon icon={positionIcon} />
		{/snippet}
	</ListItem>
{/if}
