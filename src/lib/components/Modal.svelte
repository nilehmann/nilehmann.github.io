<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		showModal: boolean;
		children: Snippet;
	}

	// const { open, close }: Props = $props();
	let { showModal = $bindable(), title, children }: Props = $props();

	let dialog: HTMLDialogElement | undefined = $state(); // HTMLDialogElement

	$effect(() => {
		if (showModal) {
			dialog?.showModal();
		}
	});
</script>

<dialog
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => {
		if (e.target === dialog) dialog.close();
	}}
>
	<div>
		<h2 class="title">{title}</h2>
		<button class="close-button" onclick={() => dialog?.close()}>
			<Icon icon="mdi:close" inline font-size="1.3rem" />
		</button>
		{@render children?.()}
	</div>
</dialog>

<style>
	.title {
		display: inline-block;
		color: var(--text-color);
		line-height: 1;
	}

	.close-button {
		float: right;
		color: var(--text-color);
		cursor: pointer;
	}

	dialog {
		width: 600px;
		border-radius: 0.2em;
		border: none;
		padding: 0;
		background-color: var(--background-color);
		margin-top: 10vh;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.5);
	}
	dialog > div {
		padding: 1rem 2rem 2.8rem;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	button {
		display: block;
	}
</style>
