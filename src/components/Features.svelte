<script lang="ts">
	import { pathVerySunny, pathSoftBurst, pathTwelveSidedCookie, LinearProgress } from 'm3-svelte';
	import { TinySlider } from 'svelte-tiny-slider';
	import { onMount } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { quadOut } from 'svelte/easing';
	import Buttons from './svg/Buttons.svelte';
	import Keyboard from './svg/Keyboard.svelte';
	import AutoReply from './svg/AutoReply.svelte';

	let {
		type = 'gallery',
		size = 22
	}: {
		type?: 'gallery' | 'list';
		size?: number;
	} = $props();

	let slider: any = $state();
	let currentSlide = $state(0);
	let isPaused = $state(false);

	const progress = new Tween(0, {
		duration: 3000,
		easing: quadOut
	});

	onMount(() => {
		if (type == 'gallery') {
			progress.target = 100;

			const interval = setInterval(() => {
				if (!isPaused) {
					currentSlide = (currentSlide + 1) % 3;
					slider.setIndex(currentSlide);

					progress.set(0, { duration: 0 });
					requestAnimationFrame(() => {
						progress.target = 100;
					});
				}
			}, 3000);

			return () => clearInterval(interval);
		}
	});

	const features = [
		{
			shape: pathTwelveSidedCookie,
			description: browser.i18n.getMessage('featureShortcuts'),
			illustration: {
				component: Buttons,
				scale: 0.8,
				width: 551.56,
				height: 199.7
			}
		},
		{
			shape: pathSoftBurst,
			description: browser.i18n.getMessage('featureKeyboard'),
			illustration: {
				component: Keyboard,
				scale: 0.55,
				width: 810,
				height: 510.14
			}
		},
		{
			shape: pathVerySunny,
			description: browser.i18n.getMessage('featureTriggers'),
			illustration: {
				component: AutoReply,
				scale: 0.5,
				width: 508.96,
				height: 362.7
			}
		}
	];
</script>

{#snippet gallery()}
	{#each features as feature, index}
		{@const Illustration = feature.illustration.component}
		<div class="feature">
			<svg width="{size}rem" height="{size}rem" viewBox="24 20 332 340">
				<defs>
					<clipPath id="clip-{index}">
						<path d={feature.shape} />
					</clipPath>
				</defs>
				<path class="shape" d={feature.shape} fill="var(--m3c-surface-container-highest)" />
				<Illustration
					primaryColor="var(--m3c-primary)"
					secondaryColor="var(--m3c-on-primary)"
					width={Math.min(332 / feature.illustration.width, 340 / feature.illustration.height) *
						feature.illustration.width *
						feature.illustration.scale}
					height={Math.min(332 / feature.illustration.width, 340 / feature.illustration.height) *
						feature.illustration.height *
						feature.illustration.scale}
					x={24 +
						(332 -
							feature.illustration.width *
								Math.min(332 / feature.illustration.width, 340 / feature.illustration.height) *
								feature.illustration.scale) /
							2}
					y={20 +
						(340 -
							feature.illustration.height *
								Math.min(332 / feature.illustration.width, 340 / feature.illustration.height) *
								feature.illustration.scale) /
							2} />
			</svg>
			<p style="text-align: center">{feature.description}</p>
		</div>
	{/each}
{/snippet}

{#if type == 'gallery'}
	<div
		class="gallery"
		style="max-width: {size}rem; height: {size + 3}rem;"
		role="region"
		aria-label="Gallery"
		onmouseenter={() => (isPaused = true)}
		onmouseleave={() => (isPaused = false)}>
		<TinySlider bind:this={slider}>
			{@render gallery()}
		</TinySlider>
		<div class="progress-container">
			<LinearProgress percent={progress.current} />
		</div>
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
		align-content: start;
		gap: 0.5rem;
	}

	.gallery {
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

	.progress-container {
		padding: 1rem 0;
		width: 100%;
	}
</style>
