<script lang="ts">
	import { _ } from 'svelte-i18n';
</script>

<h2>{$_('uninstalled.title')}</h2>
<p>{$_('uninstalled.description')}</p>

<div class="iframe-container">
	<iframe
		src="https://docs.google.com/forms/d/e/1FAIpQLSewvM2XKRFOyWBAFMqHRM_Uy0TdqZ8mqKq57gwOpZtdXUs5Lg/viewform"
		frameborder="0"
		title="Uninstall feedback form"
	></iframe>
</div>

<style>
	h2 {
		font-size: 1.85rem;
		font-weight: 600;
		margin: 2rem 0 0.75rem;
		text-align: center;
	}

	p {
		margin: 0 0 2rem;
		text-align: center;
		color: var(--m3c-on-surface-variant);

		font-size: 1rem;
		font-weight: 500;
	}
	.iframe-container {
		position: relative;
		width: 100%;
		height: 600px;
		border-radius: 0.5rem;
		overflow: hidden;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: none;
	}

	@media (min-width: 768px) {
		.iframe-container {
			height: 800px;
		}
	}

	@media (min-width: 1024px) {
		.iframe-container {
			height: 900px;
		}
	}
</style>
