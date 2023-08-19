<script>
	import { navigating } from '$app/stores'
	import { onMount } from 'svelte'
	import '../../styles.css'

	
	let currentPath
	onMount(() => {
		currentPath = window.location.pathname
	})
	const updatePath = () => {
		console.log('updating path', window.location.pathname)
		currentPath = $navigating.to.url.pathname
	}
	$ : if($navigating) updatePath()
</script>
<header class='fixed top-0 left-0 w-screen flex px-4 py-2 text-3xs font-regular'>
	<a href='/' class='mr-4 font-bold text-3xs' class:active={currentPath == ('/')}>Murgiarchivio</a>
	<!-- <nav class='list-none flex'>
		<li><a href='/calvino' class:active={currentPath == ('/calvino')}>Archivio</a></li>
	</nav> -->
</header>
<style lang="postcss">
	li {
		@apply px-1;
	}

	a {
		@apply no-underline;
	}

	a.active {
		@apply font-bold underline;
	}
</style>