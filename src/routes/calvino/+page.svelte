<script>
	import '../../styles.css'
	let question = '',
		answer = '',
		sources = []

	const submitQuestion = async() => {
		if (question.length < 10) return
		answer = 'Loading...'
		sources = []
		const res = await fetch('/api/pinecone', {
			method: 'POST',
			body: JSON.stringify({ question }),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		let r = await res.json()
		console.log(r)
		answer = r.text
		sources = r.sources
	}
</script>

<svelte:head>
	<title>Calvino</title>
	<meta name='description' content='Langchain+Pinecone PDF interrogation' />
</svelte:head>

<section class='section flex flex-col gap-2'>
	<form on:submit|preventDefault class='flex gap-2 w-3/4 p-4'>
		<input type='text' class='px-3 py-1 text-blue w-full border-blue border-2 focus:outline-none rounded-full' placeholder='Enter your question' bind:value={question} />
		<button class='button blue' type='submit' on:click={submitQuestion}>ask</button>
	</form>
	{#if answer}
		<div class='p-4'>
			<p class='text-md max-w-xl'>{answer}</p>
		</div>
		<div class='p-4'>
			<ul class='text-sm max-w-xl text-gray-400'>
				{#each sources as source}
					<li class='pb-2'>
						{source}
					</li>	
				{/each}
			</ul>
		</div>
	{/if}
</section>

<style lang='postcss'>
	.button {
		@apply cursor-pointer py-2 px-3 text-white w-fit rounded-full;
	}

	.blue {
		@apply bg-blue;
	}
</style>
