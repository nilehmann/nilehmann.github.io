<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<div class="container">
	<div class="image">
		<img src="/me.jpg" alt="Profile" />
	</div>
	<div class="info">
		<div class="name">Nico Lehmann</div>
		<div class="position">PhD Student at UC San Diego</div>
		<div><Icon icon="mdi:email" inline /> nlehmann at ucsd.edu</div>
		<a href="https://github.com/nilehmann">
			<Icon icon="mdi:github" inline /> nilehmann
		</a>
		<a href="https://scholar.google.com/citations?user=3iBn2y8AAAAJ&hl=en">
			<Icon icon="mdi:graduation-cap" inline font-size="1.1rem" /> Google Scholar
		</a>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	@media (max-width: 900px) {
		.container {
			flex-direction: row;
		}
	}

	img {
		width: 210px;
		max-width: 35vw;
	}

	.info {
		display: flex;
		flex-direction: column;
	}

	.position {
		margin-bottom: 15px;
	}

	.name {
		font-family: 'Bree Serif', sans-serif;
		font-size: 170%;
		line-height: 0.6;
		margin-bottom: 0.4em;
	}

	a {
		color: inherit;
	}

	a:hover {
		color: var(--link-color);
		text-decoration: none;
	}
</style>
