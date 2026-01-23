<script lang="ts">
	import { ListItem, Divider, Icon, Button, Slider, RadioAnim1 } from 'm3-svelte';
	import AppBar from '@/components/AppBar.svelte';
	import ChatIllustration from '@/components/ChatIllustration.svelte';

	import { icons as materialSymbols } from '@iconify-json/material-symbols/icons.json';
	import { onMount } from 'svelte';
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

	let borderRadius: number | undefined = $state();
	let buttonsPosition: 'top' | 'bottom' | undefined = $state();

	onMount(async () => {
		const { borderRadius: borderRadiusFromSync } = await chrome.storage.sync.get('borderRadius');
		const { buttonsPosition: buttonsPositionFromSync } =
			await chrome.storage.sync.get('buttonsPosition');

		if (borderRadiusFromSync != null) {
			borderRadius = Number(borderRadiusFromSync);
		} else {
			borderRadius = 20;
		}

		if (buttonsPositionFromSync && ['top', 'bottom'].includes(buttonsPositionFromSync.toString()))
			buttonsPosition = buttonsPositionFromSync as 'top' | 'bottom';
	});

	$effect(() => {
		if (borderRadius != null) chrome.storage.sync.set({ borderRadius });
	});
	$effect(() => {
		if (buttonsPosition) chrome.storage.sync.set({ buttonsPosition });
	});
</script>

{#if page}
	<AppBar
		title={chrome.i18n.getMessage('settings' + page[0].toUpperCase() + page.substring(1))}
		goBack={() => (page = undefined)} />
{/if}

{#if page == 'buttonsRoundness'}
	<ChatIllustration {borderRadius} {buttonsPosition} />
	<div style="margin-top: 16px">
		{#if borderRadius != null}
			<Slider bind:value={borderRadius} endStops={false} max={25} />
		{/if}
	</div>
{:else if page == 'buttonsPosition'}
	<ChatIllustration {borderRadius} {buttonsPosition} />

	<ListItem label headline={chrome.i18n.getMessage('topButtonsPosition')} style="margin-top: 16px">
		{#snippet leading()}
			<RadioAnim1>
				<input type="radio" name="buttonsPosition" value="top" bind:group={buttonsPosition} />
			</RadioAnim1>
		{/snippet}
	</ListItem>
	<ListItem label headline={chrome.i18n.getMessage('bottomButtonsPosition')}>
		{#snippet leading()}
			<RadioAnim1>
				<input type="radio" name="buttonsPosition" value="bottom" bind:group={buttonsPosition} />
			</RadioAnim1>
		{/snippet}
	</ListItem>
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

	label {
		display: inline-flex;
		font-size: 0.875rem;
		gap: 1.5rem;
	}

	.radios {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	:global(.m3-container input[type='range'] ~ .value) {
		inset-inline-start: clamp(0rem, var(--handle-center), calc(100% - 0.5rem));
	}
</style>
