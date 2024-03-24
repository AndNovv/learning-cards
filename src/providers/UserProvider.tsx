"use client"
import { AppDispatch } from '@/state/store'
import { fetchUser } from '@/state/user/userSlice'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const UserProvider = ({ children }: { children: React.ReactNode }) => {

    const { data } = useSession()
    const email = data?.user?.email

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (email) {
            dispatch(fetchUser(email))
        }
    }, [email]);

    return (
        <>
            {children}
        </>
    )
}

export default UserProvider