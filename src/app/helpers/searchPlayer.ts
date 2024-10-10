import { User } from '../types/user'

export default function searchPlayer(user: User | null, searchQuery: string) {
    // https://aril0iseol.execute-api.us-east-1.amazonaws.com/default/ss_Search
    // Endpoint URL
    const url =
        'https://6o7a01lmp1.execute-api.us-east-1.amazonaws.com/default/ss_SearchPlayer'

    // Request headers
    const headers = {
        'Content-Type': 'application/json',
        'X-Api-Key': 'BL1iUfnyWG2EAKYdDpBO16nRrkDCdW3g3UHGDbOw',
        'Access-Control-Allow-Origin': '*',
    }

    // Request body
    const body = {
        query: searchQuery,
        email: user?.email,
        token: user?.token,
    }

    console.log(body)

    console.log(body)

    // HTTP request options
    const options = {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    }

    // Send HTTP request
    return fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
            return data
        })
        .catch((error) => {
            console.error('Error:', error)
        })
}
