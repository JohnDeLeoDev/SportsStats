
export default function searchRequest(
    searchQuery: string,
    idToken: string,
    accessToken: string,
    refreshToken: string

) {
    const url = 'https://aril0iseol.execute-api.us-east-1.amazonaws.com/default/ss_Search';

    const headers = {
        'Content-Type': 'application/json',
        'X-Api-Key': 'qi4Xkv4meC1cJD03iNyxJ3chJRBic2wW5bCRhGDC',
        'Access-Control-Allow-Origin': '*',
    };

    const body = {
        searchQuery,
        idToken,
        accessToken,
        refreshToken,
    };

    const options = {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    };

    return fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}