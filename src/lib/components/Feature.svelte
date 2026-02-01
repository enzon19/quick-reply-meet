<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		description,
		children
	}: { title?: string; description: string; children?: Snippet } = $props();
</script>

<div class="feature">
	<div class="text-block">
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

	h4 {
		margin: 0;
		font-size: 1.25rem;
		font-weight: 700;
		line-height: 1.75rem;
	}

	p {
		font-size: 1rem;
		font-weight: 500;
		line-height: 1.5rem;
		margin: 0;
		margin-bottom: 0.5rem;
		color: var(--m3c-on-surface-variant);
	}

	.text-block {
		flex: 1;
	}
</style>
