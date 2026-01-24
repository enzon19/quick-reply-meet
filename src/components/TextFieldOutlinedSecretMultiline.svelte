<script lang="ts">
	import { TextFieldOutlinedMultiline } from 'm3-svelte';
	import { onMount, type ComponentProps } from 'svelte';

	let {
		value = $bindable(),
		...restProps
	}: {
		value?: string;
	} & Omit<ComponentProps<typeof TextFieldOutlinedMultiline>, 'value'> = $props();

	onMount(() => {
		const textarea = document.querySelector('#messageContentInput');
		if (!textarea) return;
		const container = textarea.parentNode as any;
		if (!container) return;

		requestAnimationFrame(() => {
			if (textarea.scrollHeight > container.clientHeight) {
				textarea.dispatchEvent(new Event('input', { bubbles: true }));
			}
		});
	});
</script>

<TextFieldOutlinedMultiline bind:value {...restProps} />

<style>
	:global(.m3-container:has(> input)) {
		width: 100%;
	}

	:global(.m3-container:has(> textarea)) {
		min-height: 3.5rem !important;
	}
</style>
