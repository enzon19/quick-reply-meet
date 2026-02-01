<script lang="ts">
	import { onMount } from 'svelte';
	import { Button, Icon, pathPill } from 'm3-svelte';
	import { icons } from '$lib/assets/iconify.json';
	import { _ } from 'svelte-i18n';
	import InstallButton from '$lib/components/InstallButton.svelte';
	import PreviewScreenshots from '$lib/components/ChatScreenshot.svelte';
	import Feature from '$lib/components/Feature.svelte';
	import { storeURLS } from '$lib/utils';

	import icon from '$lib/assets/icon-512.png';
	import Buttons from '$lib/components/svg/Buttons.svelte';
	import Keyboard from '$lib/components/svg/Keyboard.svelte';
	import AutoReply from '$lib/components/svg/AutoReply.svelte';
	import PopupScreenshots from '$lib/components/PopupScreenshots.svelte';

	function update() {
		const el = document.querySelector('#headline-install-button');
		if (!el) return;

		const isSm = window.matchMedia('(min-width: 640px)').matches;
		el.classList.toggle('l', isSm);
		el.classList.toggle('m', !isSm);
	}

	onMount(() => {
		update();
		window.addEventListener('resize', update);
		return () => window.removeEventListener('resize', update);
	});
</script>

<div class="preview">
	<div class="headline">
		<div>
			<img class="logo" src={icon} alt="Quick Reply Meet Logo" />
			<h2>{$_('headline')}</h2>
		</div>
		<InstallButton id="headline-install-button" size="l" />
	</div>
	<div class="main-image">
		<PreviewScreenshots />
		<svg width="24rem" height="24rem" style:margin="auto" viewBox="0 0 380 380">
			<path class="shape" d={pathPill} fill="var(--m3c-surface-container-low)" />
		</svg>
	</div>
</div>

<h3>{$_('features.title')}</h3>

<div class="feature-gallery features">
	<Feature title={$_('features.click.title')} description={$_('features.click.description')}>
		<Buttons
			preserveAspectRatio="xMidYMid meet"
			primaryColor="var(--m3c-primary)"
			secondaryColor="var(--m3c-on-primary)"
			class="features-illustration"
		/>
	</Feature>
	<Feature title={$_('features.keyboard.title')} description={$_('features.keyboard.description')}>
		<Keyboard
			preserveAspectRatio="xMidYMid meet"
			primaryColor="var(--m3c-primary)"
			secondaryColor="var(--m3c-on-primary)"
			class="features-illustration"
		/>
	</Feature>
	<Feature
		title={$_('features.autoReply.title')}
		description={$_('features.autoReply.description')}
	>
		<AutoReply
			preserveAspectRatio="xMidYMid meet"
			primaryColor="var(--m3c-primary)"
			secondaryColor="var(--m3c-on-primary)"
			class="features-illustration"
		/>
	</Feature>
</div>

<div class="big-feature-wrapper">
	<Feature
		title={$_('features.settings.title')}
		description={$_('features.settings.description')}
		big
	>
		<PopupScreenshots />
	</Feature>
</div>

<h3 id="install">{$_('installSection.title')}</h3>

{#snippet storeButton(url: string)}
	<Button
		style="max-width: fit-content; margin: 0 auto;"
		variant="outlined"
		href={url}
		iconType="left"
		>{$_('installSection.installButton')} <Icon viewBox="0 0 24 24" icon={icons['arrow-forward']} />
	</Button>
{/snippet}

<div class="feature-gallery install">
	<Feature
		description={$_('installSection.firefox.description')}
		title={$_('installSection.firefox.title')}
	>
		{@render storeButton(storeURLS.firefox)}
		<Icon viewBox="0 0 512 512" icon={icons['firefox']} size={72} class="features-illustration" />
	</Feature>
	<Feature
		description={$_('installSection.chrome.description')}
		title={$_('installSection.chrome.title')}
	>
		{@render storeButton(storeURLS.chrome)}
		<Icon viewBox="0 0 512 512" icon={icons['chrome']} size={72} class="features-illustration" />
	</Feature>
	<Feature
		description={$_('installSection.edge.description')}
		title={$_('installSection.edge.title')}
	>
		{@render storeButton(storeURLS.edge)}
		<Icon viewBox="0 0 512 512" icon={icons['edge']} size={72} class="features-illustration" />
	</Feature>
</div>

<style>
	.preview {
		padding-top: 1.5rem;
		display: grid;
		grid-template-columns: auto;
		align-items: center;
		gap: 1.5rem;
	}

	.headline {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.headline > div {
		text-align: center;
	}

	.logo {
		height: 4rem;
		filter: drop-shadow(0 0 0.75rem #00000060);
	}

	h2 {
		font-size: 2rem;
		line-height: 2.75rem;
		font-weight: 600;
		margin: 0;
	}

	h3 {
		font-size: 1.85rem;
		font-weight: 600;
		margin: 2rem 0;
		text-align: center;
	}

	.main-image {
		display: grid;
		place-items: center;
		width: 100%;
		max-width: 90vw;
		height: auto;
		max-height: 80vh;
		margin: 0 auto;
	}

	.main-image svg {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	:global(.main-image > *) {
		grid-area: 1 / 1;
	}

	:global(#headline-install-button) {
		max-width: fit-content;
		margin: 0 auto;
	}

	.feature-gallery {
		display: grid;
		gap: 1rem;
	}

	.feature-gallery.features {
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
	}

	.feature-gallery.install {
		grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
	}

	:global(.features-illustration) {
		width: 100%;
		margin: 0 auto;
	}

	:global(.feature-gallery.features .feature .features-illustration) {
		height: 10rem;
	}

	.big-feature-wrapper {
		margin: 1rem auto;
	}

	@media (min-width: 880px) {
		.preview {
			grid-template-columns: 50% 50%;
		}

		.headline > div {
			text-align: left;
		}

		:global(#headline-install-button) {
			max-width: fit-content;
			margin: 0;
		}
	}

	@media (min-width: 640px) {
		.headline {
			gap: 3rem;
		}

		.preview {
			padding: 3rem;
			gap: 3rem;
		}

		.logo {
			height: 6rem;
		}

		h2 {
			font-size: 3.25rem;
			line-height: 4.5rem;
		}

		h3 {
			font-size: 2.5rem;
		}

		.feature-gallery {
			gap: 2rem;
		}

		.big-feature-wrapper {
			margin: 2rem 0;
		}

		.install {
			margin-bottom: 2rem;
		}
	}
</style>
