<script lang="ts">
	import { pathVerySunny, pathSoftBurst, pathTwelveSidedCookie } from 'm3-svelte';
	import { TinySlider } from 'svelte-tiny-slider';
	import { onMount } from 'svelte';

	let {
		type = 'gallery'
	}: {
		type?: 'gallery' | 'list';
	} = $props();

	let slider: any = $state();
	let currentSlide = $state(0);

	let isPaused = $state(false);
	onMount(() => {
		if (type == 'gallery') {
			const interval = setInterval(() => {
				if (!isPaused) {
					currentSlide = (currentSlide + 1) % features.length;
					slider.setIndex(currentSlide);
				}
			}, 3000);

			return () => clearInterval(interval);
		}
	});

	const features = [
		{
			shape: pathTwelveSidedCookie,
			description: chrome.i18n.getMessage('featureShortcuts')
		},
		{
			shape: pathSoftBurst,
			description: chrome.i18n.getMessage('featureKeyboard')
		},
		{
			shape: pathVerySunny,
			description: chrome.i18n.getMessage('featureTriggers')
		}
	];
</script>

{#snippet gallery()}
	{#each features as feature, index}
		<div class="feature">
			<svg width="22rem" height="22rem" style:margin="auto" viewBox="24 20 332 340">
				<defs>
					<clipPath id="clip-{index}">
						<path d={feature.shape} />
					</clipPath>
				</defs>
				<path class="shape" d={feature.shape} fill="var(--m3c-primary)" />
				<image
					href={'/src/assets/features/' + index + '.png'}
					x="24"
					y="20"
					width="332"
					height="340"
					preserveAspectRatio="xMidYMid slice"
					clip-path="url(#clip-{index})" />
			</svg>
			<p style="text-align: center">{feature.description}</p>
		</div>
	{/each}
{/snippet}

{#if type == 'gallery'}
	<div
		class="gallery"
		role="region"
		aria-label="Gallery"
		onmouseenter={() => (isPaused = true)}
		onmouseleave={() => (isPaused = false)}>
		<TinySlider bind:this={slider}>
			{@render gallery()}
		</TinySlider>
	</div>
{:else}
	<div class="list">
		{@render gallery()}
	</div>
{/if}

<style>
	* {
		font-family: 'Google Sans Flex', sans-serif;
	}

	.feature {
		display: flex;
		flex-direction: column;
	}

	.gallery {
		max-width: 22rem;
		height: 25rem;
		margin: 0 auto;
	}

	.list {
		display: flex;
		gap: 2rem;
	}

	p {
		margin: 0px;
		font-size: 1.1rem;
	}
</style>
