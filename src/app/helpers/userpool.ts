import { CognitoUserPool } from 'amazon-cognito-identity-js';

const userPoolId = process.env.REACT_APP_USER_POOL_ID;
const clientId = process.env.REACT_APP_CLIENT_ID;

if (!userPoolId || !clientId) {
    throw new Error("Missing environment variables for UserPoolId or ClientId");
}

export const userPool = new CognitoUserPool({
    UserPoolId: userPoolId,
    ClientId: clientId
});

