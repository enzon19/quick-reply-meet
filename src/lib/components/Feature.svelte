<script lang="ts">
	import type { Snippet } from 'svelte';

	let { title, description, child }: { title: string; description?: string; child?: Snippet } =
		$props();
</script>

<div class="feature">
	<h4>{title}</h4>
	{#if description}
		<p>{description}</p>
	{/if}
	{#if child}
		{@render child()}
	{/if}
</div>

<style>
	.feature {
		background-color: var(--m3c-surface-container-highest);
		border-radius: 2rem;
		padding: 3.5rem 2.5rem;
		text-align: center;
	}

	h4 {
		margin: 0;
		margin-bottom: 0.5rem;
		font-size: 1.25rem;
		font-weight: 700;
		line-height: 1.75rem;
	}

	p {
		font-size: 1rem;
		font-weight: 500;
		line-height: 1.5rem;
		margin: 0;
		margin-bottom: 1rem;
		color: var(--m3c-on-surface-variant);
	}
</style>
