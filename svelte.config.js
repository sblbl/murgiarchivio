import adapter from '@sveltejs/adapter-cloudflare';
import dotenv from 'dotenv'
dotenv.config()
const { GOOGLE_API_KEY, GOOGLE_CSE_ID, OPENAI_KEY } = process.env

export default {
    kit: {
        adapter: adapter({
            // See below for an explanation of these options
            routes: {
                include: ['/*'],
                exclude: ['<all>']
            }
        }),
        //target: '#svelte',
       /*  vite: {
            define: {
                'process.env.GOOGLE_API_KEY': `"${GOOGLE_API_KEY}"`,
                'process.env.GOOGLE_CSE_ID': `"${GOOGLE_CSE_ID}"`,
                'process.env.OPENAI_KEY': `"${OPENAI_KEY}"`,
            },
        }, */
    }
};