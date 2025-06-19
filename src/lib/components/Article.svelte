<script lang="ts">
	import { year, type IArticle } from '$lib/types';
	import type { Author } from '@citation-js/core';
	import Icon from '@iconify/svelte';
	import Modal from './Modal.svelte';

	let { article }: { article: IArticle } = $props();

	let showAbstract = $state(false);

	function toggleAbstract() {
		if (!article.abstract) {
			return;
		}
		showAbstract = !showAbstract;
	}

	function formatAuthors(authors: Author[]): string {
		return authors
			.map((author) => {
				if (!author.given || !author.family) {
					throw new Error(`missing author info: ${author}`);
				}
				return `${author.given} ${author.family}`;
			})
			.join(', ');
	}

	let bibtex: HTMLTextAreaElement | undefined;

	function copyBibTexToClipboard() {
		bibtex?.select();
		navigator.clipboard.writeText(article.bibtex);
	}

	let showModal = $state(false);
</script>

<div class="article-item" id={article.key}>
	<Modal bind:showModal title="Export Citation">
		<div class="bibtex-container">
			<textarea readonly bind:this={bibtex}>{article.bibtex}</textarea>
		</div>
		<div class="citation-actions">
			<a href={`papers/${article.key}.bib`} target="_blank" class="citation-action">
				<Icon icon="mdi:tray-download" />
			</a>
			<button class="citation-action" onclick={copyBibTexToClipboard}>
				<Icon icon="mdi:content-copy" />
			</button>
		</div>
	</Modal>

	<div>
		<div class="article-caret">
			<Icon icon="eva:arrow-ios-forward-fill" inline />
		</div>
		<span class="article-title">
			{article.title}
		</span>
		{#if article.author}
			<div class="article-authors">
				{formatAuthors(article.author)}
			</div>
		{/if}
		<div class="article-venue">
			In
			{article.venue.publisher}
			{article.venue.name}
			(<span class="article-short-venue">{article.venue.shortName}</span>)
			{year(article)}
		</div>
	</div>
	<div class="article-actions">
		{#if article.abstract}
			<button class="action" onclickcapture={toggleAbstract}>
				<Icon icon="mdi:text" inline /> Abstract
			</button>
		{/if}
		<a href="papers/{article.key}.pdf" target="_blank">
			<div class="action"><Icon icon="mdi:tray-download" inline /> PDF</div>
		</a>
		<button class="action" onclick={() => (showModal = true)}>
			<Icon icon="mdi:format-quote-close" inline /> Cite
		</button>
		{#if article.URL}
			<a href={article.URL} target="_blank">
				<div class="action"><Icon icon="mdi:external-link" inline /> URL</div>
			</a>
		{/if}
	</div>
	{#if article.abstract && showAbstract}
		<div class="details">
			<p class="article-abstract"><strong>Abstract.</strong>{article.abstract}</p>
		</div>
	{/if}
</div>

<style>
	.bibtex-container textarea {
		width: 100%;
		box-sizing: border-box;
		height: 300px;
		border: 1px solid lightgray;
		outline: none;
		background-color: var(--light-gray);
		padding: 0.65rem 0.65rem 0.65rem 0.9rem;
		color: var(--text-color);
		overscroll-behavior: contain;
		margin: 10px 0px;
		resize: vertical;
	}

	.citation-actions {
		float: right;
	}

	.citation-action:first-child {
		margin-right: 0.5rem;
	}

	.citation-action {
		color: var(--text-color);
		font-size: 1.4rem;
		cursor: pointer;
	}

	.citation-action:hover {
		color: var(--blue-fg);
	}

	.article-item {
		margin-bottom: 10px;
	}

	.article-caret {
		float: left;
	}

	.article-title {
		display: block;
		padding-left: 25px;
		font-family: 'Bree Serif';
		font-size: 1.1rem;
		color: var(--primary);
	}

	.article-authors {
		padding-left: 25px;
		font-style: italic;
	}

	.article-venue {
		padding-left: 25px;
	}

	.article-short-venue {
		font-weight: bold;
	}

	.article-actions {
		margin-top: 0.5rem;
		padding-left: 25px;
	}

	.article-actions .action {
		cursor: pointer;
		display: inline-block;
		border: solid 1px var(--blue-fg);
		padding: 0px 8px;
		color: var(--blue-fg);
	}

	.article-actions .action:hover {
		background-color: var(--blue-fg);
		color: white !important;
	}

	.article-actions .action:hover {
		color: var(--blue-fg);
	}

	.details {
		padding: 15px 25px 15px 25px;
		margin: 10px 0px 20px 0px;
		background-color: var(--light-gray);
	}

	.article-abstract {
		text-align: justify;
		hyphens: auto;
		padding: 0;
		margin: 0;
	}

	.article-abstract strong {
		font-family: 'Bree Serif', sans-serif;
	}

	.article-abstract strong::after {
		content: ' ';
	}
</style>
