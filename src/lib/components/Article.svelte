<script lang="ts">
	import { year, type IArticle } from '$lib/types';
	import type { Author } from '@citation-js/core';
	import Icon from '@iconify/svelte';

	export let article: IArticle;

	let showAbstract = false;

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

<div class="article-item">
	<div class="article-caret">
		<a href={`#${article.key}`} onclickcapture={toggleAbstract}>
			<Icon icon="ic:baseline-arrow-forward-ios" inline font-size="0.8rem" />
		</a>
	</div>
	<div class="article-actions">
		[<a href="papers/{article.key}.pdf" target="_blank">pdf</a>,
		<a href="papers/{article.key}.bib" target="_blank">bibtex</a>]
	</div>
	<a href={`#${article.key}`} onclickcapture={toggleAbstract} class="article-title">
		{article.title}
	</a>
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

	.article-caret a {
		color: var(--primary);
	}

	.article-title {
		display: block;
		padding-left: 25px;
		font-family: 'Bree Serif';
		font-size: 1.1rem;
		color: var(--primary);
	}
	.article-title:hover {
		text-decoration: none;
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
		float: right;
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
