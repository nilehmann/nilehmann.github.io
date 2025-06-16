<script lang="ts">
	import Article from '$lib/components/Article.svelte';
	import Profile from '$lib/components/Profile.svelte';
	import { year, type IArticle } from '$lib/types.js';

	export let data: { articles: IArticle[] };
	const { articles } = data;

	const sortedArticles = articles.slice().sort((a, b) => year(b) - year(a));
</script>

<div class="container">
	<section id="profile">
		<Profile />
	</section>

	<div class="column">
		<section id="about">
			<h2>About Me</h2>
			<p>
				My research focuses on scalable algorithms for big data analysis, with a particular emphasis
				on graph theory, distributed systems, and machine learning on resource-constrained devices.
			</p>
		</section>
		<section id="publications">
			<h2>Publications</h2>
			{#each sortedArticles as article (article.key)}
				<Article {article} />
			{/each}
		</section>
	</div>
</div>

<style>
	.container {
		max-width: var(--max-width);
		margin: auto;
		display: flex;
		gap: 40px;
		padding: 0px 10px;
	}

	.column {
		flex: 1;
		box-sizing: border-box;
	}

	@media (max-width: 800px) {
		.container {
			flex-direction: column;
		}
	}
</style>
