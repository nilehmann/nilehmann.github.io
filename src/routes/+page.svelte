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
				I'm a final year PhD student at the University of California, San Diego, advised by Ranjit
				Jhala. I'm interested in <emph>programming languages</emph> and
				<emph>program verification</emph>. My goal is to make formal verification part of the
				day-to-day development process by integrating formal methods into programming languages. I'm
				particularly interested in using these techniques to secure the low-level systems that power
				critical infrastructure. Check out my tool
				<a href="https://github.com/flux-rs/flux" target="_blank">Flux</a>, a refinement type
				checker for Rust that lets you specify a range of correctness properties and have them be
				verified at compile time.
			</p>
			<p>
				Outside of research, I'm a decent musician. You can check my college band, Modesto Medio, in
				<a
					href="https://open.spotify.com/artist/4z8hrlYC3dtLNbLb8dLiUv?si=dXBh95WQRLWe1vJvmaOa2w"
					target="_blank">Spotify</a
				>. Here's also a
				<a
					href="https://www.youtube.com/watch?v=6EqmrloOkiQ&list=PLrSWf-X1MTC4ZLZm66YhxnPLKWHg-uOdS"
					target="_blank">video</a
				> of me performing with some fellow PhD students at the holiday party. I'm also a beer connoisseur—if
				you ever see me around, feel free to strike up a conversation about beer (or better yet, share
				one!)
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
		padding: 0px 20px;
	}

	p {
		text-align: justify;
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
