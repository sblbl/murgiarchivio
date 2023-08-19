import { json } from '@sveltejs/kit'
import Papa from 'papaparse'
import { DB_URL } from '$env/static/private'
import fetch from 'node-fetch'

const getDB = async () => {
    const response = await fetch(DB_URL);
    const csvText = await response.text();

    return new Promise((resolve, reject) => {
        Papa.parse(csvText, {
            header: true,
            complete: results => {
                resolve(results.data)
            },
            error: error => {
                reject(error)
            }
        })
    })
}

export async function POST({request}) {
    try {
        let DB = await getDB()
        return json({DB}, { status: 200 })
    } catch (err) {
        console.log(err)
        return json({error: err}, { status: 500 })
    }
}