import { render, screen, act, waitFor, fireEvent } from '@testing-library/react'
import React from 'react'
import Signin from './page'

const email = 'testing@gmail.com'
const password = 'testing'
const wrongPassword = 'test'

function renderSignin() {
    render(<Signin />)
    const emailElement = screen.getByTestId('email-input')
    const passwordElement = screen.getByTestId('password')
    const signinButton = screen.getByTestId('signin-button')
    const mainElement = screen.getByRole('main')
    const titleElement = screen.getByTestId('signin-title')
    const descriptionElement = screen.getByText(
        'Enter your email address and password to sign in.'
    )
    const signinLink = screen.getByText("Don't have an account? Sign up here.")
    const forgotPasswordLink = screen.getByText('Forgot password?')

    return {
        emailElement,
        passwordElement,
        signinButton,
        mainElement,
        titleElement,
        descriptionElement,
        signinLink,
        forgotPasswordLink
    }
}

beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
        value: {
            getItem: jest.fn(() => null),
            setItem: jest.fn(() => null),
            removeItem: jest.fn(() => null),
            clear: jest.fn(() => null),
        },
        writable: true,
    });
});

test('Renders Signin page', () => {
    const { mainElement } = renderSignin()
    expect(mainElement).toBeInTheDocument()
})

test('Renders Signin title', () => {
    const { titleElement } = renderSignin()
    expect(titleElement).toBeInTheDocument()
})

test('Renders Signin description', () => {
    const { descriptionElement } = renderSignin()
    expect(descriptionElement).toBeInTheDocument()
})

test('Renders email input field', () => {
    const { emailElement } = renderSignin()
    expect(emailElement).toBeInTheDocument()
})

test('Renders password input field', () => {
    const { passwordElement } = renderSignin()
    expect(passwordElement).toBeInTheDocument()
})

test('Renders Signin button', () => {
    const { signinButton } = renderSignin()
    expect(signinButton).toBeInTheDocument()
})

test('Renders Sign up link', () => {
    const { signinLink } = renderSignin()
    expect(signinLink).toBeInTheDocument()
})

test('Renders Forgot password link', () => {
    const { forgotPasswordLink } = renderSignin()
    expect(forgotPasswordLink).toBeInTheDocument()
})

test('Blank email or password renders "Please fill in all fields.', () => {
    const { signinButton } = renderSignin()
    act(() => {
        signinButton.click()
    })
    const missingFields = screen.getByText('Please fill in all fields.')
    expect(missingFields).toBeInTheDocument()
})

test('Text entry into fields on sign in', () => {
    const { emailElement, passwordElement } = renderSignin()
    act(() => {
        (emailElement as HTMLInputElement).value = email;
        (passwordElement as HTMLInputElement).value = password;
    })

    expect((emailElement as HTMLInputElement).value).toBe(email)
    expect((passwordElement as HTMLInputElement).value).toBe(password)
})

test('Incorrect email or password renders "Sign in failed. Please try again.', async () => {
    const { emailElement, passwordElement, signinButton } = renderSignin()
    act(() => {
        fireEvent.change(emailElement, { target: { value: email } });
        fireEvent.change(passwordElement, { target: { value: wrongPassword } });
        signinButton.click();
    })

    await waitFor(() => {
        expect(screen.getByTestId('failed-signin')).toBeInTheDocument();
    })
})

test('Correct email and password redirects to / on sign in', async () => {
    const { emailElement, passwordElement, signinButton } = renderSignin()
    act(() => {
        fireEvent.change(emailElement, { target: { value: email } });
        fireEvent.change(passwordElement, { target: { value: password } });
        signinButton.click();
    })

    await waitFor(() => {
        expect(window.location.href).toBe('http://localhost/');
    })
})

test('Correct email and password sets user in local storage', async () => {
    const { emailElement, passwordElement, signinButton } = renderSignin()
    act(() => {
        fireEvent.change(emailElement, { target: { value: email } });
        fireEvent.change(passwordElement, { target: { value: password } });
        signinButton.click();

    })
    await waitFor(() => {
        expect(window.location.href).toBe('http://localhost/');
        expect(localStorage.setItem).toHaveBeenCalled();
    })
})
