<script lang="ts">
	import { year, type IArticle } from '$lib/types';
	import type { Author } from '@citation-js/core';
	import Icon from '@iconify/svelte';

	export let article: IArticle;

	function formatAuthors(authors: Author[]): string {
		return authors
			.map((author) => {
				if (!author.given || !author.family) {
					throw new Error(`Author missing info`);
				}
				return `${author.given} ${author.family}`;
			})
			.join(', ');
	}
</script>

<div class="article-item">
	<div class="article-caret">
		<Icon icon="ic:baseline-arrow-forward-ios" inline font-size="0.8rem" />
	</div>
	<div class="article-actions">
		[<a href="papers/{article.key}.bib" target="_blank">bibtex</a>,
		<a href="papers/{article.key}.pdf" target="_blank">pdf</a>]
	</div>
	<div class="article-title">
		{article.title}
	</div>
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

<style>
	.article-item {
		margin-bottom: 10px;
	}

	.article-caret {
		float: left;
	}

	.article-title {
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
		float: right;
	}
</style>
