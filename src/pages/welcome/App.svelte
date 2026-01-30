<script lang="ts">
	import { Icon, Button } from 'm3-svelte';
	import Features from '../components/Features.svelte';
	import SetMessages from '../components/SetMessages.svelte';
	import ButtonAppearance from '../components/ButtonAppearance.svelte';

	import { icons as materialSymbols } from '@iconify-json/material-symbols/icons.json';
	const wavingIcon = materialSymbols['waving-hand'];
	const arrowIcon = materialSymbols['arrow-forward'];
	const chatIcon = materialSymbols['chat-bubble'];
	const brushIcon = materialSymbols['brush'];
	const checkIcon = materialSymbols['check'];

	let currentPage: 0 | 1 | 2 = $state(0);
	const pages = [
		{ icon: wavingIcon, name: 'welcome' },
		{ icon: chatIcon, name: 'welcomeDefaultMessages' },
		{ icon: brushIcon, name: 'welcomeSettings' }
	];
	let newMessages: any = $state(['hello']);

	function nextPage() {
		if (currentPage < 2) {
			if (currentPage == 1) {
				// add new messages
			}
			currentPage++;
		} else {
			document.location.href = 'https://meet.google.com';
		}
	}

	function onSelectedMessagesChanged(messages: any) {
		const selectedMessages = Object.entries(messages).filter(([n, v]) => v);
		newMessages = selectedMessages.map(([n, v]) => n);
	}
</script>

<div class="title">
	<img src="/logo512.png" class="logo" alt="Quick Reply Meet Logo" />
	<h1>Quick Reply Meet</h1>
</div>

<div class="container">
	<div>
		<Icon icon={pages[currentPage].icon} viewBox="0 0 24 24" size={56} />
		<h2>{chrome.i18n.getMessage(`${pages[currentPage].name}Title`)}</h2>
		<p>{@html chrome.i18n.getMessage(`${pages[currentPage].name}Description`)}</p>
		<Button onclick={nextPage} size="m" iconType="left" style="margin-top: 1rem">
			{chrome.i18n.getMessage(`${pages[currentPage].name}Button`)}
			<Icon icon={currentPage == 2 ? checkIcon : arrowIcon} viewBox="0 0 24 24" />
		</Button>
	</div>
	{#if currentPage == 0}
		<Features />
	{:else if currentPage == 1}
		<SetMessages {onSelectedMessagesChanged} />
	{:else if currentPage == 2}
		<ButtonAppearance />
	{/if}
</div>

<style>
	* {
		font-family: 'Google Sans Flex', sans-serif;
	}

	:global(body) {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100vh;
		box-sizing: border-box;
	}

	.container {
		max-width: 58rem;
		margin: 0 auto;
		min-height: calc(100vh - 17rem);
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		align-content: center;
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
