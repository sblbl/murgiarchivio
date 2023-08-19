import { json } from '@sveltejs/kit'
import { OPENAI_KEY, PINECONE_KEY, PINECONE_ENV } from '$env/static/private'
import { PineconeClient } from '@pinecone-database/pinecone'
import { loadQAStuffChain } from 'langchain/chains'
import { Document } from 'langchain/document'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { OpenAI } from 'langchain/llms/openai'
import { PineconeStore } from 'langchain/vectorstores/pinecone'

const pinecone = new PineconeClient()
await pinecone.init({
	environment: PINECONE_ENV,
	apiKey: PINECONE_KEY
})

const index = pinecone.Index('calvino')

const vectorStore = await PineconeStore.fromExistingIndex(
	new OpenAIEmbeddings(
		{
			openAIApiKey: OPENAI_KEY
		}
	),
	{ index }
)

const model = new OpenAI({
	modelName: 'gpt-4',
	openAIApiKey: OPENAI_KEY
})

const chain = loadQAStuffChain(model)

const askIndex = async question => {
	/* const results = await chain.call({
		input: {
			query: question
		},
	}) */
	//const results = await vectorStore.similaritySearch(question)
	const queryEmbedding = await new OpenAIEmbeddings({openAIApiKey: OPENAI_KEY}).embedQuery(question)
	let queryResponse = await index.query({
		queryRequest: {
			topK: 10,
			vector: queryEmbedding,
			includeMetadata: true,
			includeValues: true,
		},
	})
	console.log(`Found ${queryResponse.matches.length} matches...`)
	const concatenatedPageContent = queryResponse.matches
		.map((match) => match.metadata.pageContent)
		.join(" ");

	const results = await chain.call({
		input_documents: [new Document({ pageContent: concatenatedPageContent })],
		question: question
	})
	//const results = await vectorStore.similaritySearch(question)
	return {text : results.text, sources : queryResponse.matches.map((match) => match.metadata.text)}
}

// Cos'è la leggerezza per Calvino?

export async function POST({request}) {
	try {
		const r = await request.json()
		const question = await r.question
		console.log('question', question)
		const response = await askIndex(question)
		console.log('response', response)
		return json({text : response.text, sources : response.sources}, { status: 200 })
	} catch	(err) {
		console.log(err)
		return json({error: err}, { status: 500 })
	}
}