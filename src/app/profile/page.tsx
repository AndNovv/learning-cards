"use client"
import { Button } from '@/components/ui/button'
import { RootState } from '@/state/store'
import { signOut } from 'next-auth/react'
import React from 'react'
import { useSelector } from 'react-redux'

const ProfilePage = () => {

    const { user } = useSelector((state: RootState) => state.user)

    return (
        <div className='flex flex-col gap-2 items-start'>
            <p>Страница профиля</p>

            {user._id && (
                <div>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                    <p>{user._id}</p>
                    <Button onClick={() => signOut({ callbackUrl: '/' })}>Выйти</Button>
                </div>
            )}
        </div>
    )
}

export default ProfilePage