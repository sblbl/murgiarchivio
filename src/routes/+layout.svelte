<script>
	import '../styles.css';
	import Header from './components/header.svelte'
	import Footer from './components/footer.svelte'

	const title = 'Murgia Archivio'
	const description = 'Tutto ciò che avreste voluto sentire da Murgia ma non avete mai avuto il coraggio di chiedere.'
</script>
<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="title" content={title} />
    <meta property="og:title" content={title} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://chatnot.es" />
    <meta property="og:description" content={description} />
    <meta property="og:image" content="https://chatnot.es/og.png" />
    <meta name="twitter:title" content="chatnot.es" />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content="https://chatnot.es/og.png" />
    <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class='app font-default w-screen min-h-screen flex flex-col items-center antialiased'>
	<Header />		
	<main class='w-screen max-w-2xl flex flex-row justify-center content-center p-4 pt-8'>
		<slot />
	</main>
	<Footer />
</div>

<style global lang="postcss">
</style>
