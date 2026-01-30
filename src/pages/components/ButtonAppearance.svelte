<script lang="ts">
	import ChatIllustration from '@/components/ChatIllustration.svelte';
	import { Button, ConnectedButtons, Slider } from 'm3-svelte';

	let borderRadius = $state(20);
	let buttonsPosition: 'top' | 'bottom' = $state('top');

	function syncSettings() {
		const settings: Settings = {
			buttons: {
				position: buttonsPosition || 'top',
				roundness: borderRadius ?? 20
			}
		};

		chrome.storage.sync.set({ settings });
	}
	$effect(() => {
		if (buttonsPosition) syncSettings();
	});
</script>

<div class="wrapper">
	<ChatIllustration {borderRadius} {buttonsPosition} />
	<ConnectedButtons>
		<Button square label
			><input
				name="position"
				type="radio"
				value="top"
				bind:group={buttonsPosition} />{chrome.i18n.getMessage('topButtonsPositionShort')}</Button>
		<Button square label
			><input
				name="position"
				type="radio"
				value="bottom"
				bind:group={buttonsPosition} />{chrome.i18n.getMessage(
				'bottomButtonsPositionShort'
			)}</Button>
	</ConnectedButtons>
	<label for="roundness">
		{chrome.i18n.getMessage('settingsButtonsRoundness')}
		<Slider
			bind:value={borderRadius}
			endStops={false}
			max={25}
			step={1}
			id="roundness"
			onchange={() => syncSettings()} />
	</label>
</div>

<style>
	.wrapper {
		height: 25rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: 100%;
		font-size: 12pt;
	}
</style>
