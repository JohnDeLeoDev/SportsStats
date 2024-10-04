export function signIn(email: string, password: string) {
    const url =
        'https://xbv2mvcqy5.execute-api.us-east-1.amazonaws.com/default/ss_Login'

    // Request headers
    const headers = {
        'Content-Type': 'application/json',
        'X-Api-Key': 'O79yWaCl7m8IXYa5HWikraFft2GMMGBd1ujGN780',
        'Access-Control-Allow-Origin': '*',
    }

    // Request body
    const body = {
        email: email,
        password: password,
    }

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
