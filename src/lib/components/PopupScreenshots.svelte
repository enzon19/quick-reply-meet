<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { TinySlider } from 'svelte-tiny-slider';

	let slider: any = $state();
	let currentSlide = $state(0);

	let isPaused = $state(false);
	onMount(() => {
		const interval = setInterval(() => {
			if (!isPaused) {
				currentSlide = (currentSlide + 1) % 4;
				slider.setIndex(currentSlide);
			}
		}, 3000);

		return () => clearInterval(interval);
	});

	let popupScreenshotsElement = $derived(
		browser ? document.querySelector('#popup-screenshots') : undefined
	);
	let colorScheme = $derived(
		browser && popupScreenshotsElement
			? window.getComputedStyle(popupScreenshotsElement).getPropertyValue('--color-scheme') ||
					'light'
			: 'light'
	);
</script>

<div
	class="gallery"
	id="popup-screenshots"
	role="region"
	aria-label="Gallery"
	onmouseenter={() => (isPaused = true)}
	onmouseleave={() => (isPaused = false)}
>
	<TinySlider bind:this={slider}>
		<img src="popup/{colorScheme}/0.png" alt="Popup message list" class="slide" />
		<img src="popup/{colorScheme}/1.png" alt="Popup edit message details" class="slide" />
		<img src="popup/{colorScheme}/2.png" alt="Popup edit message triggers" class="slide" />
		<img src="popup/{colorScheme}/3.png" alt="Popup extension settings" class="slide" />
	</TinySlider>
</div>

<style>
	.slide {
		width: 100%;
		height: 100%;
		aspect-ratio: 724 / 745;
	}

	#popup-screenshots {
		--color-scheme: light;
	}

	.gallery {
		margin: 0 auto;
	}

	:global(.gallery > div) {
		border-radius: 0.5rem;
	}

	:global(.slider) {
		width: 100%;
		max-width: 25rem;
		aspect-ratio: 724 / 745;
	}

	@media (prefers-color-scheme: dark) {
		#popup-screenshots {
			--color-scheme: dark;
		}
	}
</style>
