"use client"
import UserPublishedCollections from '@/components/Profile/UserPublishedCollections'
import { Button } from '@/components/ui/button'
import { RootState } from '@/state/store'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image';
import LoadingProfilePage from '@/components/Profile/LoadingProfilePage'
import { motion } from 'framer-motion'

const ProfilePage = () => {

    const { user, loading } = useSelector((state: RootState) => state.user)
    const { data } = useSession()


    if (loading) return <LoadingProfilePage />

    return (
        <div className='flex flex-col gap-2 items-start'>
            <div className='flex w-full gap-4 justify-between mb-10 border-b pb-6'>
                <div className='flex gap-4 shrink-0'>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ ease: 'easeInOut', duration: 0.2 }}
                    >
                        {data?.user?.image &&
                            <Image
                                src={data.user.image}
                                priority={false}
                                alt="Profile Image"
                                width={60}
                                height={60}
                                className='rounded-full'
                            />}
                    </motion.div>
                    <motion.div
                        initial={{ x: 30 }}
                        animate={{ x: 0 }}
                        transition={{ ease: 'easeInOut', duration: 0.2 }}
                    >
                        <p className='text-lg'>{user.name}</p>
                        <p className='text-white opacity-60'>{user.email}</p>
                    </motion.div>
                </div>
                <Button variant={'outline'} onClick={() => signOut({ callbackUrl: '/' })}>Выйти</Button>
            </div>
            <UserPublishedCollections />
        </div>
    )
}

export default ProfilePage