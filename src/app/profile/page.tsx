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
import { LogOut } from 'lucide-react'

const ProfilePage = () => {

    const { user, loading } = useSelector((state: RootState) => state.user)
    const { data } = useSession()


    if (loading) return <LoadingProfilePage />

    const image = data?.user?.image

    return (
        <div className='flex flex-col gap-2 items-start pt-6 md:pt-0 overflow-hidden'>
            <div className='flex w-full gap-4 justify-between mb-8 paddings'>
                <div className='flex gap-2 md:gap-4 shrink-0'>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ ease: 'easeInOut', duration: 0.2 }}
                    >
                        {image &&
                            <Image
                                loader={() => image}
                                src={'/images/google.png'}
                                priority={false}
                                alt="Profile Image"
                                width={60}
                                height={60}
                                className='rounded-full size-12 md:size-14'
                            />}
                    </motion.div>
                    <motion.div
                        initial={{ x: 30 }}
                        animate={{ x: 0 }}
                        transition={{ ease: 'easeInOut', duration: 0.2 }}
                    >
                        <p className='text-base md:text-lg'>{user.name}</p>
                        <p className='opacity-60 text-xs md:text-base'>{user.email}</p>
                    </motion.div>
                </div>
                <div>
                    <Button className='flex gap-2 justify-center items-center size-15 p-3 md:size-auto md:px-4 md:py-3' variant={'outline'} onClick={() => signOut({ callbackUrl: '/' })}><LogOut size={20} /><p className='hidden md:block'>Выйти</p></Button>
                </div>
            </div>
            <UserPublishedCollections />
        </div>
    )
}

export default ProfilePage