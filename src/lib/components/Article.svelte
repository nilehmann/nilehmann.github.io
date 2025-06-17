<script lang="ts">
	import { year, type IArticle } from '$lib/types';
	import type { Author } from '@citation-js/core';
	import Icon from '@iconify/svelte';

	let { article }: { article: IArticle } = $props();

	let showAbstract = $state(false);
	const caret = $derived(
		showAbstract ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill' // 'ic:baseline-arrow-forward-ios'
	);

	function toggleAbstract() {
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
</script>

<div class="article-item" id={article.key}>
	<div onclickcapture={toggleAbstract} style="cursor: pointer;">
		<div class="article-caret">
			<Icon icon={caret} inline />
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
		<a href="papers/{article.key}.pdf" target="_blank">
			<div class="action"><Icon icon="mdi:tray-download" inline /> PDF</div>
		</a>
		<a href="papers/{article.key}.bib" target="_blank">
			<div class="action"><Icon icon="mdi:format-quote-close" inline /> BibTex</div>
		</a>
		{#if article.URL}
			<a href={article.URL} target="_blank">
				<div class="action"><Icon icon="mdi:external-link" inline /> External Link</div>
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
		cursor: pointer;
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

	/* .article-actions {
		float: right;
	} */
	.article-actions {
		/* float: right; */
		margin-top: 0.5rem;
		padding-left: 25px;
	}

	.article-actions .action {
		display: inline-block;
		border: solid 1px var(--blue-fg);
		padding: 2px 8px;
	}

	.article-actions .action:hover {
		background-color: var(--blue-fg);
		color: white !important;
	}

	/* .article-actions .action {
		display: inline-block;
		color: var(--text-color);
		background-color: var(--light-gray);
		padding: 2px 8px;
	} */

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
