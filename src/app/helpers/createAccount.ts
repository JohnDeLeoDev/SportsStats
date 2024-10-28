import { User } from '../types/user';
import { userPool } from './userpool';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

export async function createAccount(user: User) {
    // make sure user is the correct type and has all the required fields
    if (!user.email || !user.firstName || !user.lastName || !user.password) {
        console.error('Missing required fields');
        return;
    }

    return new Promise((resolve, reject) => {
        if (typeof user.password === "string") {
            const attributeList = [
                new CognitoUserAttribute({
                    Name: 'email',
                    Value: user.email
                }),
                new CognitoUserAttribute({
                    Name: 'given_name',
                    Value: user.firstName
                }),
                new CognitoUserAttribute({
                    Name: 'family_name',
                    Value: user.lastName
                })
            ];

            userPool.signUp(user.email, user.password, attributeList, null as never, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        }
    });
}