<script lang="ts">
	import '../app.css';
</script>

<div class="container">
	<nav>
		<span class="name">Nico Lehmann</span>
		<!-- <a href="#about">About Me</a>
		<a href="#publicaton">Publications</a> -->
	</nav>
</div>

<slot />

<style>
	.name {
		font-family: 'Bree Serif', serif;
		font-size: 1.8rem;
		color: white;
	}

	.container {
		background-color: var(--header-bg-color);
		margin-bottom: 40px;
	}

	nav {
		max-width: var(--max-width);
		margin: auto;
		padding: 1rem;
	}

	nav a {
		margin: 0 1rem;
		color: white;
		text-decoration: none;
		font-weight: bold;
	}
</style>
