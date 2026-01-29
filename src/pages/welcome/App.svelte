<script>
	import { pathVerySunny, pathSoftBurst, pathTwelveSidedCookie, Icon, Button } from 'm3-svelte';
	import { TinySlider } from 'svelte-tiny-slider';

	import { icons as materialSymbols } from '@iconify-json/material-symbols/icons.json';
	const wavingIcon = materialSymbols['waving-hand'];
	const arrowIcon = materialSymbols['arrow-forward'];

	const features = [
		{
			shape: pathVerySunny,
			description: 'Crie e salve mensagens prontas para enviar no chat com apenas um clique'
		},
		{
			shape: pathSoftBurst,
			description: 'Configure atalhos de teclado para enviar suas mensagens'
		},
		{
			shape: pathTwelveSidedCookie,
			description: 'Defina gatilhos automáticos para responder mensagens específicas do chat'
		}
	];
</script>

<div class="title">
	<img src="/logo512.png" class="logo" alt="Quick Reply Meet Logo" />
	<h1>Quick Reply Meet</h1>
</div>

<div class="container">
	<div>
		<Icon icon={wavingIcon} viewBox="0 0 24 24" size={56} />
		<h2>Seja bem-vindo(a)!</h2>
		<p>
			Obrigado pelo download! Caso goste do trabalho, <a class="link" href="">faça uma doação</a> e
			<a class="link" href="">avalie a extensão</a> na loja para apoiar o desenvolvimento.
		</p>
		<Button size="m" iconType="left" style="margin-top: 1rem">
			Configurar extensão
			<Icon icon={arrowIcon} viewBox="0 0 24 24" />
		</Button>
	</div>
	<div class="gallery">
		<TinySlider>
			{#each features as feature}
				<div>
					<svg width="22rem" height="22rem" style:margin="auto" viewBox="24 20 332 340">
						<path class="shape" d={feature.shape} fill="var(--m3c-primary)" />
					</svg>
					<p style="text-align: center">{feature.description}</p>
				</div>
			{/each}
		</TinySlider>
	</div>
</div>

<style>
	* {
		font-family: 'Google Sans Flex', sans-serif;
	}

	:global(body) {
		padding: 1rem;
	}

	.container {
		max-width: 58rem;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
	}

	@media (max-width: 768px) {
		.container {
			grid-template-columns: 1fr;
			gap: 3rem;
		}
	}

	.gallery {
		max-width: 22rem;
		margin: 0 auto;
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
