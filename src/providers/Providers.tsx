import React from 'react'
import { NextAuthProvider } from './NextAuthProvider'
import StoreProvider from './StoreProvider'
import { ThemeProvider } from './ThemeProvider'
import UserProvider from './UserProvider'
import UserDeviceProvider from './UserDeviceProvider'

const Providers = ({ children }: { children: JSX.Element }) => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <StoreProvider>
                <UserDeviceProvider>
                    <NextAuthProvider>
                        <UserProvider>
                            {children}
                        </UserProvider>
                    </NextAuthProvider>
                </UserDeviceProvider>
            </StoreProvider>
        </ThemeProvider>
    )
}

export default Providers