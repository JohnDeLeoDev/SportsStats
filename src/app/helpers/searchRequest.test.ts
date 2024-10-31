import searchRequest from './searchRequest'
import { CognitoUserSession } from 'amazon-cognito-identity-js'
import { testCredentials } from './testCredentials'
import { signIn } from './signIn'

let user: CognitoUserSession

beforeAll(async () => {
    user = await signIn(testCredentials.username, testCredentials.password)
})

describe('searchRequest', () => {
    test('no user', async () => {
        const searchQuery = 'test'
        const response = await searchRequest(searchQuery)
        console.log('No user response:', response)
        expect(response)
    })

    test('user', async () => {
        const searchQuery = 'test'
        const response = await searchRequest(searchQuery, user)
        console.log('User response:', response)
        expect(response)
    })
})
