"use client"
import UserPublishedCollections from '@/components/Profile/UserPublishedCollections'
import { Button } from '@/components/ui/button'
import { RootState } from '@/state/store'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image';


const ProfilePage = () => {

    const { user, loading } = useSelector((state: RootState) => state.user)
    const { status, data } = useSession()

    if (status !== 'authenticated') return null

    return (
        <div className='flex flex-col gap-2 items-start lg:px-40 px-10'>

            {!loading && (
                <div className='flex w-full gap-4 justify-between mb-10 border-b pb-6'>
                    <div className='flex gap-4'>
                        {data?.user?.image &&
                            <Image
                                src={data.user.image}
                                priority={false}
                                alt="Profile Image"
                                width={60}
                                height={60}
                                className='rounded-full'
                            />}
                        <div>
                            <p className='text-xl'>{user.name}</p>
                            <p className='text-lg text-white opacity-60'>{user.email}</p>
                        </div>
                    </div>
                    <Button variant={'outline'} onClick={() => signOut({ callbackUrl: '/' })}>Выйти</Button>
                </div>
            )}
            <UserPublishedCollections />
        </div>
    )
}

export default ProfilePage