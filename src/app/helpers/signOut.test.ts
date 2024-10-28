import { signOut } from './signOut';
import { signIn } from './signIn';

const email = 'testing@gmail.com';
const password = 'testing';

// sign in first to get token

test('signOut', async () => {
    const signInResponse = await signIn(email, password);
    if (signInResponse.error) {
        console.log(signInResponse.error);
        return;
    }

    const user = signInResponse.user;
    const token = signInResponse.token;

    const response = await signOut(user.email, token)
    expect(response);

})