import {CognitoUserSession} from 'amazon-cognito-identity-js';
import authHeaders from '@/app/helpers/authorization';

export async function getData(
    userSession: CognitoUserSession | null,
    dataType: string,
    dataId: string,
    yearID: string
) {
    const url = 'https://2nr77cbpx9.execute-api.us-east-1.amazonaws.com/default/ss_GetData';

    // Request headers
    const headers = authHeaders(userSession);

    // Request body
    const body = {
        dataType: dataType,
        dataId: dataId,
        yearID: yearID,
    };

    // HTTP request options
    const options = {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    };

    // Send HTTP request
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        throw error; // Re-throw the error to ensure it is properly handled in tests
    }
}