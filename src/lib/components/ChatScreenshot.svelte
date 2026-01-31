<script>
	import { HoverTilt } from 'hover-tilt';
</script>

<HoverTilt
	class="stacked-3d"
	scaleFactor={1.01}
	blendMode="normal"
	glareIntensity={0}
	springOptions={{ stiffness: 0.08, damping: 0.25 }}
	tiltSpringOptions={{ stiffness: 0.1, damping: 0.2 }}
>
	<div class="stacked-3d-content">
		<img src="mouse.png" alt="Spongebob SquarePants Logo" class="stacked-3d-over" />
		<img src="chat.png" alt="Chat Screenshot" class="stacked-3d-main" />
	</div>
</HoverTilt>

<style>
	:global(.stacked-3d::part(container)) {
		perspective: 800px;
	}

	:global(.stacked-3d > div) {
		/* by default, the will-change list is: transform, box-shadow, opacity */
		will-change: transform, box-shadow, mask;
		/* we remove the 'opacity' property from the will-change list, because when 'opacity'
      is set; the 3d context becomes "flat" and will not allow parallax effects. */
	}

	.stacked-3d-content {
		--depth: 30px; /* an arbitrary depth value */
		--layer-z: max(
			var(--hover-tilt-opacity, 0) * var(--depth),
			0px
		); /* max is used so the layers dont go behind the background */
		--shadow-opacity: calc(
			var(--hover-tilt-opacity, 0) * 0.4
		); /* shadow is hidden when the layer is not active */
		--shadow-size: calc(var(--depth) / 5); /* shadow size is 1/5 of the depth */
		--shadow-offset: calc(var(--depth) / 8); /* shadow offset is 1/8 of the depth */
		--shadow-offset-x: calc(var(--shadow-x) * var(--shadow-offset));
		--shadow-offset-y: calc(var(--shadow-y) * var(--shadow-offset));

		/* this is essential for the 3d effect to work */
		position: relative;
		transform-style: preserve-3d;
	}

	.stacked-3d-over {
		/* apply a dynamic drop shadow to the logo and image */
		filter: drop-shadow(
			var(--shadow-offset-x) var(--shadow-offset-y) var(--shadow-size)
				rgba(0, 0, 0, var(--shadow-opacity))
		);
		/* performance consideration */
		will-change: transform, filter, opacity;

		/* the image is popped out 2x further than the logo */
		transform: translateZ(calc(var(--layer-z) * 4));
		/* the image is hidden when the layer is not active */
		opacity: calc(var(--hover-tilt-opacity, 0) * 1.2 - 0.1);

		position: absolute;
		top: 20.5rem;
		left: 5.5rem;
		max-height: 2.5rem;
	}

	.stacked-3d-main {
		max-height: 28rem;
		display: block;
		transform: translateZ(var(--layer-z));
	}
</style>
