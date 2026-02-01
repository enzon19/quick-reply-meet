<script lang="ts">
	import { getBrowserName, storeURLS } from '$lib/utils';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';

	function getReviewURL() {
		const browserName = getBrowserName(window.navigator.userAgent);
		switch (browserName) {
			case 'chrome':
				return storeURLS.chrome + '/reviews';
			case 'firefox':
				return storeURLS.firefox;
			case 'edge':
				return storeURLS.edge;
			default:
				break;
		}
	}

	onMount(() => {
		const reviewURL = getReviewURL();
		const redirectAnchor = document.querySelector('#redirect') as HTMLAnchorElement | null;

		if (reviewURL && redirectAnchor) redirectAnchor.href = reviewURL;
		if (reviewURL) document.location.href = reviewURL;
	});
</script>

<p>{@html $_('redirect')}</p>

<style>
	p {
		text-align: center;
		height: 74.7vh;
	}
</style>
