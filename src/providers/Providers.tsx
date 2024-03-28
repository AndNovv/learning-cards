import React from 'react'
import { NextAuthProvider } from './NextAuthProvider'
import StoreProvider from './StoreProvider'
import { ThemeProvider } from './ThemeProvider'
import UserProvider from './UserProvider'

const Providers = ({ children }: { children: JSX.Element }) => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <NextAuthProvider>
                <StoreProvider>
                    <UserProvider>
                        {children}
                    </UserProvider>
                </StoreProvider>
            </NextAuthProvider>
        </ThemeProvider>
    )
}

export default Providers