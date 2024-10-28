import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import { userPool } from "./userpool";


export function signIn(email: string, password: string) {
    return new Promise((resolve, reject) => {
        const user = new CognitoUser({
            Username: email,
            Pool: userPool
        });

        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password
        });

        user.authenticateUser(authDetails, {
            onSuccess: result => {
                resolve(result);
            },
            onFailure: err => {
                reject(err);
            }
        });
    });

}
