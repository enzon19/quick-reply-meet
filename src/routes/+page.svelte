<script>
	import { onMount } from 'svelte';
	import { Button, pathPill } from 'm3-svelte';
	import { _ } from 'svelte-i18n';
	import PreviewScreenshots from '$lib/components/ChatScreenshot.svelte';
	import Feature from '$lib/components/Feature.svelte';
	import icon from '$lib/assets/icon-512.png';

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

<div class="preview container">
	<div class="headline">
		<div>
			<img class="logo" src={icon} alt="Quick Reply Meet Logo" />
			<h2>{$_('headline')}</h2>
		</div>
		<Button id="headline-install-button" size="l">{$_('install')}</Button>
	</div>
	<div class="main-image">
		<PreviewScreenshots />
		<svg width="24rem" height="24rem" style:margin="auto" viewBox="0 0 380 380">
			<path class="shape" d={pathPill} fill="var(--m3c-surface-container)" />
		</svg>
	</div>
</div>

<h3>{$_('features.title')}</h3>

<div class="feature-gallery container">
	<Feature title={$_('features.click.title')} description={$_('features.click.description')}>
		<img class="feature-image" src="features/0.png" alt="Feature" />
	</Feature>
	<Feature title={$_('features.keyboard.title')} description={$_('features.keyboard.description')}>
		<img class="feature-image" src="features/1.png" alt="Feature" />
	</Feature>
	<Feature
		title={$_('features.autoReply.title')}
		description={$_('features.autoReply.description')}
	>
		<img class="feature-image" src="features/2.png" alt="Feature" />
	</Feature>
</div>

<!-- <Button onclick={() => alert('Hello world')}>Click me</Button> -->

<style>
	.preview {
		padding: 1.5rem;
		display: grid;
		grid-template-columns: auto;
		align-items: center;
		gap: 2.5rem;
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
	}

	h2 {
		font-size: 2rem;
		line-height: 3.25rem;
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
		max-width: min-content;
		margin: 0 auto;
	}

	.feature-gallery {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 2rem;
	}

	.feature-image {
		width: 100%;
	}

	@media (min-width: 880px) {
		.preview {
			grid-template-columns: 50% 50%;
		}

		.headline > div {
			text-align: left;
		}

		:global(#headline-install-button) {
			max-width: min-content;
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
			flex-direction: row;
		}
	}
</style>
