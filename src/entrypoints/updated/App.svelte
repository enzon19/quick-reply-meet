<script lang="ts">
	import { Icon, Button } from 'm3-svelte';
	import Features from '@/components/Features.svelte';

	import { icons as materialSymbols } from '@iconify-json/material-symbols/icons.json';
	const updateIcon = materialSymbols['update'];
	const heartIcon = materialSymbols['favorite'];
	const starIcon = materialSymbols['star'];
</script>

<div class="title">
	<img src="/icon/512.png" class="logo" alt="Quick Reply Meet Logo" />
	<h1>Quick Reply Meet</h1>
</div>

<div class="container">
	<div>
		<Icon icon={updateIcon} viewBox="0 0 24 24" size={56} />
		<h2>{browser.i18n.getMessage('updateTitle')}</h2>
		<p>{@html browser.i18n.getMessage('updateDescription')}</p>
		<Button
			href="https://enzon19.com/donate"
			target="_blank"
			size="m"
			iconType="left"
			style="margin-top: 1rem">
			<Icon icon={heartIcon} viewBox="0 0 24 24" />
			{browser.i18n.getMessage('donateButton')}
		</Button>
		<Button
			href="https://quickreplymeet.enzon19.com/review"
			target="_blank"
			size="m"
			iconType="left"
			style="margin-top: 1rem; margin-left: 0.7rem">
			<Icon icon={starIcon} viewBox="0 0 24 24" />
			{browser.i18n.getMessage('reviewButton')}
		</Button>
	</div>
	<Features type="list" size={18} />
</div>

<style>
	* {
		font-family: 'Google Sans Flex', sans-serif;
	}

	:global(body) {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	.container {
		max-width: 58rem;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	@media (max-width: 768px) {
		.container {
			grid-template-columns: 1fr;
			gap: 3rem;
		}
	}

	.title {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		background-color: var(--m3c-primary-container-subtle);
		color: var(--m3c-on-primary-container-subtle);
		padding: 1.5rem;
		border-radius: 1.5rem;
		margin: 3rem auto;
		width: fit-content;
	}

	.logo {
		height: 6rem;
		width: 6rem;
		margin: 0px auto;
	}

	h1 {
		margin: 0px;
		font-size: 2.5rem;
		line-height: 1;
	}

	h2 {
		margin: 0px;
		font-size: 2rem;
		font-weight: 600;
	}

	p {
		margin: 0px;
		font-size: 1.1rem;
	}
</style>
