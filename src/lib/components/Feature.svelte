<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		description,
		big = false,
		children
	}: { title?: string; description: string; big?: boolean; children?: Snippet } = $props();
</script>

<div class="feature" class:big-feature={big}>
	<div class:text-block={!big}>
		{#if title}
			<p>{title}</p>
		{/if}
		<h4>{description}</h4>
	</div>
	{#if children}
		{@render children()}
	{/if}
</div>

<style>
	.feature {
		background-color: var(--m3c-surface-container-highest);
		border-radius: 2rem;
		padding: 3.5rem 2.5rem;
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 2.75rem;
	}

	.big-feature {
		text-align: left;
		flex-direction: column-reverse;
	}

	.text-block {
		flex: 1;
	}

	@media (min-width: 640px) {
		.big-feature {
			flex-direction: row;
			align-items: center;
		}
	}

	h4 {
		margin: 0;
		font-size: 1.25rem;
		font-weight: 700;
		line-height: 1.75rem;
		max-width: 35rem;
	}

	p {
		font-size: 1rem;
		font-weight: 500;
		line-height: 1.5rem;
		margin: 0;
		margin-bottom: 0.5rem;
		color: var(--m3c-on-surface-variant);
	}
</style>
