<script lang="ts">
	import { Button } from 'm3-svelte';
	import { onDestroy } from 'svelte';

	let {
		shortcut = $bindable()
	}: {
		shortcut?: string[];
	} = $props();

	let capturing = $state(false);
	// svelte-ignore state_referenced_locally
	let oldShortcut = $state(shortcut);

	function captureKeys(e: KeyboardEvent) {
		e.preventDefault();
		if (e.repeat) return;

		if (e.code === 'Escape') {
			capturing = false;
			shortcut = oldShortcut;
		} else if (e.code === 'Enter') {
			capturing = false;
		} else if (!shortcut!.includes(e.code)) {
			shortcut = [...shortcut!, e.code];
		}
	}

	function stopCapture() {
		capturing = false;
	}

	$effect(() => {
		if (typeof document !== 'undefined' && capturing) {
			shortcut = [];
			document.addEventListener('keydown', captureKeys);
			document.addEventListener('keyup', stopCapture);
		} else if (typeof document !== 'undefined') {
			oldShortcut = shortcut;
			document.removeEventListener('keydown', captureKeys);
			document.removeEventListener('keyup', stopCapture);
		}
	});

	onDestroy(() => {
		document.removeEventListener('keydown', captureKeys);
		document.removeEventListener('keyup', stopCapture);
	});

	function prettyKey(code: string) {
		const KEY_LABELS: Record<string, string> = {
			ControlLeft: 'Ctrl',
			ControlRight: 'Ctrl',
			ShiftLeft: 'Shift',
			ShiftRight: 'Shift',
			AltLeft: 'Alt',
			AltRight: 'Alt',
			MetaLeft: 'Meta',
			MetaRight: 'Meta'
		};

		if (KEY_LABELS[code]) return KEY_LABELS[code];
		if (code.startsWith('Key')) return code.slice(3);
		if (code.startsWith('Digit')) return code.slice(5);
		return code;
	}

	function sortShortcut(codes: string[]) {
		const MODIFIER_ORDER = ['Ctrl', 'Shift', 'Alt', 'Meta'];
		const keys = codes.map(prettyKey);

		return keys.sort((a, b) => {
			const ia = MODIFIER_ORDER.indexOf(a);
			const ib = MODIFIER_ORDER.indexOf(b);

			if (ia === -1 && ib === -1) return 0;
			if (ia === -1) return 1;
			if (ib === -1) return -1;
			return ia - ib;
		});
	}
</script>

<label class="recorder-label">
	<div class="recorder-label-label">
		<div>
			{browser.i18n
				.getMessage('keyboardShortcutLabel')
				.replace(!shortcut || shortcut.length == 0 ? ':' : '', '')}
		</div>
		<div class="shortcut">
			{#if capturing && shortcut && shortcut.length == 0}
				<span class="hint">{browser.i18n.getMessage('keyboardShortcutHint')}</span>
			{:else if shortcut && shortcut.length > 0}
				{#each sortShortcut(shortcut) as key}
					<kbd>{key}</kbd>
				{/each}
			{/if}
		</div>
	</div>
	<Button variant={capturing ? 'elevated' : 'filled'} onclick={() => (capturing = !capturing)}
		>{browser.i18n.getMessage(
			capturing ? 'keyboardShortcutRecording' : 'keyboardShortcutButton'
		)}</Button>
</label>

<style>
	:global(.m3-container:has(> input)) {
		width: 100%;
	}

	label {
		margin: 0;
		font-size: 12pt;
		font-family: 'Google Sans Flex', sans-serif;
	}

	.recorder-label {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 16px;
	}

	.recorder-label-label {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: 55px;
		gap: 4px;
	}

	.hint {
		opacity: 0.8;
		font-size: 9.5pt;
		font-weight: 200;
	}

	.shortcut {
		display: flex;
		gap: 6px;
	}

	kbd {
		padding: 4px 8px;
		border-radius: 6px;
		font-size: 0.85rem;
		font-weight: 500;
		background: var(--m3c-surface-container);
		border: 1px solid var(--m3c-surface-container-high);
	}
</style>
