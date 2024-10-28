import { AppProvider, appContext  } from "./app";
import { render, waitFor } from "@testing-library/react";

import React from "react";
import {User} from "@/app/types/user";

const email = "testing@gmail.com"
const password = "testing"
const token = "1234567890"

// mock local storage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
}

Object.defineProperty(window, "localStorage", {
    value: localStorageMock
})

describe("AppProvider", () => {
    it("should provide the app context", () => {
        const { container } = render(
            <AppProvider>
                <appContext.Consumer>
                    {value => {
                        expect(value.user).toBeNull()
                        expect(value.setUser).toBeInstanceOf(Function)
                        expect(value.setLocalUser).toBeInstanceOf(Function)
                        expect(value.searchQuery).toBe("")
                        expect(value.setSearchQuery).toBeInstanceOf(Function)
                        expect(value.localQuery).toBe("")
                        expect(value.setLocalQuery).toBeInstanceOf(Function)
                        expect(value.searchTriggered).toBe(false)
                        expect(value.setSearchTriggered).toBeInstanceOf(Function)
                        expect(value.searchResponse).toBeNull()
                        expect(value.setSearchResponse).toBeInstanceOf(Function)
                        expect(value.playerQuery).toBe("")
                        expect(value.setPlayerQuery).toBeInstanceOf(Function)
                        expect(value.playerResponse).toBeNull()
                        expect(value.setPlayerResponse).toBeInstanceOf(Function)
                        expect(value.playerResult).toEqual([])
                        expect(value.setPlayerResult).toBeInstanceOf(Function)
                        return null
                    }}
                </appContext.Consumer>
            </AppProvider>
        )
        expect(container).toMatchSnapshot()

    })
    it("should have no user set", () => {
        const { container } = render(
            <AppProvider>
                <appContext.Consumer>
                    {value => {
                        expect(value.user).toBeNull()
                        return null
                    }}
                </appContext.Consumer>
            </AppProvider>
        )
        expect(container).toMatchSnapshot()
    })

    it("should have no searchQuery set", () => {
        const { container } = render(
            <AppProvider>
                <appContext.Consumer>
                    {value => {
                        expect(value.searchQuery).toBe("")
                        return null
                    }}
                </appContext.Consumer>
            </AppProvider>
        )
        expect(container).toMatchSnapshot()
    })

    it("should have no localQuery set", () => {
        const { container } = render(
            <AppProvider>
                <appContext.Consumer>
                    {value => {
                        expect(value.localQuery).toBe("")
                        return null
                    }}
                </appContext.Consumer>
            </AppProvider>
        )
        expect(container).toMatchSnapshot()
    })

    it("should have searchTriggered set to false", () => {
        const { container } = render(
            <AppProvider>
                <appContext.Consumer>
                    {value => {
                        expect(value.searchTriggered).toBe(false)
                        return null
                    }}
                </appContext.Consumer>
            </AppProvider>
        )
        expect(container).toMatchSnapshot()
    })


    it("should have no searchResponse set", () => {
        const { container } = render(
            <AppProvider>
                <appContext.Consumer>
                    {value => {
                        expect(value.searchResponse).toBeNull()
                        return null
                    }}
                </appContext.Consumer>
            </AppProvider>
        )
        expect(container).toMatchSnapshot()
    })

    it("should have no playerQuery set", () => {
        const { container } = render(
            <AppProvider>
                <appContext.Consumer>
                    {value => {
                        expect(value.playerQuery).toBe("")
                        return null
                    }}
                </appContext.Consumer>
            </AppProvider>
        )
        expect(container).toMatchSnapshot()
    })

    it("should have no playerResponse set", () => {
        const { container } = render(
            <AppProvider>
                <appContext.Consumer>
                    {value => {
                        expect(value.playerResponse).toBeNull()
                        return null
                    }}
                </appContext.Consumer>
            </AppProvider>
        )
        expect(container).toMatchSnapshot()
    })

    it("should have no playerResult set", () => {
        const { container } = render(
            <AppProvider>
                <appContext.Consumer>
                    {value => {
                        expect(value.playerResult).toEqual([])
                        return null
                    }}
                </appContext.Consumer>
            </AppProvider>
        )
        expect(container).toMatchSnapshot()
    })

    it("should set the user in local storage", async () => {
        const { container } = render(
            <AppProvider>
                <appContext.Consumer>
                    {value => {
                        const user: User = {
                            firstName: "", lastName: "",
                            email: email,
                            password: password,
                            token: token
                        };
                        value.setLocalUser(user);
                        return null;
                    }}
                </appContext.Consumer>
            </AppProvider>
        );

        await waitFor(() => {
            expect(localStorageMock.setItem).toHaveBeenCalledWith("user", JSON.stringify({
                firstName: "", lastName: "",
                email: email,
                password: password,
                token: token
            }));
        });

        expect(container).toMatchSnapshot();
    });


})

