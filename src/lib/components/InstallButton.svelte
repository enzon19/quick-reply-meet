<script lang="ts">
	import { browser } from '$app/environment';
	import { getBrowserName, storeURLS } from '$lib/utils';
	import { Button, Icon } from 'm3-svelte';
	import { _ } from 'svelte-i18n';
	import { icons } from '$lib/assets/iconify.json';
	import type { ComponentProps } from 'svelte';

	let { ...restProps }: Omit<ComponentProps<typeof Button>, 'children'> = $props();

	let browserName = $derived(browser ? getBrowserName(window.navigator.userAgent) : undefined);
</script>

<Button
	{...restProps}
	iconType="left"
	href={browserName ? storeURLS[browserName] : storeURLS.chrome}
	target="_blank"
>
	<Icon viewBox="0 0 24 24" icon={icons['add']} />
	{$_('install', {
		values: { browser: browserName }
	})}
</Button>
