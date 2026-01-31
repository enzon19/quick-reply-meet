<script>
	import { HoverTilt } from 'hover-tilt';
	import { onMount } from 'svelte';
	import { Button } from 'm3-svelte';
	import { _ } from 'svelte-i18n';
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
		<Button id="headline-install-button">{$_('install')}</Button>
	</div>
	<div class="main-image">
		<HoverTilt glareIntensity={0}>
			<div class="stacked-3d-content">
				<img src="mouse.png" alt="Spongebob SquarePants Logo" class="stacked-3d-logo" />
				<img src="chat.png" alt="Chat Screenshot" class="stacked-3d-bg" />
			</div>
		</HoverTilt>
	</div>
</div>

<!-- <Button onclick={() => alert('Hello world')}>Click me</Button> -->

<style>
	.preview {
		padding: 1.5rem;
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
	}

	h2 {
		font-size: 2rem;
		line-height: 3.25rem;
		font-weight: 600;
		margin: 0;
	}

	.main-image {
		max-width: fit-content;
		margin: 0 auto;
	}

	:global(#headline-install-button) {
		max-width: min-content;
		margin: 0 auto;
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
	}
</style>
