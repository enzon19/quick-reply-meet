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
		<picture>
			<source srcset="popup/dark/0.png" media="(prefers-color-scheme: dark)" />
			<img src="popup/light/0.png" alt="Popup message list" class="slide" />
		</picture>
		<picture>
			<source srcset="popup/dark/1.png" media="(prefers-color-scheme: dark)" />
			<img src="popup/light/1.png" alt="Popup edit message details" class="slide" />
		</picture>
		<picture>
			<source srcset="popup/dark/2.png" media="(prefers-color-scheme: dark)" />
			<img src="popup/light/2.png" alt="Popup edit message triggers" class="slide" />
		</picture>
		<picture>
			<source srcset="popup/dark/3.png" media="(prefers-color-scheme: dark)" />
			<img src="popup/light/3.png" alt="Popup extension settings" class="slide" />
		</picture>
	</TinySlider>
</div>

<style>
	.slide {
		width: 16rem;
		height: 16.45rem;
		display: block;
		object-fit: cover;
		object-position: top;
	}

	#popup-screenshots {
		--color-scheme: light;
	}

	.gallery {
		margin: 0 auto;
		max-width: 16rem;
	}

	:global(.gallery > div) {
		border-radius: 0.75rem;
	}

	@media (min-width: 600px) {
		.slide {
			width: 20rem;
			height: 20.55rem;
		}

		.gallery {
			max-width: 20rem;
		}
	}

	@media (min-width: 840px) {
		.slide {
			width: 25rem;
			height: 25.7rem;
		}

		.gallery {
			max-width: 25rem;
		}
	}
</style>
