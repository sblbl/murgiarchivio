<script >
	import '../styles.css'
	import DBentry from './components/DBentry.svelte'
	import {onMount} from 'svelte'

	let DB
	$: console.log(DB)
	
	onMount(async() => {
		try {
			const res = await fetch('/api/get_db', {
				method: 'POST',
				body: '',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const r = await res.json()
			DB = r.DB
		} catch (e) {
			console.log(e)
		}
	})

</script>

<svelte:head>
	<title>Home</title>
	<meta name='description' content='Murgia Archivio' />
</svelte:head>

<section class='home flex flex-col gap-6 pt-2'>
	{#if DB}
		{#each DB as entry}
			<DBentry title={entry['Titolo del contributo']} url={entry.link} date={entry.data} />
		{/each}
	{:else}
		<p>Loading...</p>
	{/if}
</section>

<style lang='postcss'>
	.home {
		@apply w-full;
	}
</style>