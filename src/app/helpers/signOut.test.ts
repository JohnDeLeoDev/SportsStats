import { signOut } from './signOut'
import { signIn } from './signIn'
import { testCredentials } from './testCredentials'

test('signOut', async () => {
    const signInResponse = await signIn(
        testCredentials.username,
        testCredentials.password
    )

    if (!signInResponse) {
        throw new Error('No sign in response')
    }

    const response = await signOut(signInResponse)
    expect(response)
})
