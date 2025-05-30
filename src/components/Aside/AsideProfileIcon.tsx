"use client"
import React from 'react'
import { useRouter } from "next/navigation";
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { User } from 'lucide-react';
import { setVisibility } from '@/state/asideMenu/asideMenuSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/state/store';
import { Skeleton } from '../ui/skeleton';

const AsideProfileIcon = ({ isDesktop }: { isDesktop: boolean }) => {

    const { status, data } = useSession()

    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()

    const handleSignInClick = () => {
        if (!isDesktop) {
            dispatch(setVisibility(false))
        }
        signIn("google", { callbackUrl: '/' })
    }

    const handleUserClick = () => {
        if (!isDesktop) {
            dispatch(setVisibility(false))
        }
        router.push('/profile')
    }

    if (status === 'loading') {
        return (
            <div className='px-4'>

                <div className='flex flex-row gap-2 items-center p-2 w-full rounded-xl hover:bg-asidehover bg-aside text-left cursor-pointer transition-all text-nowrap'>
                    <Skeleton className='size-10 rounded-full' />
                    <Skeleton className='w-40 h-4' />
                </div>
            </div>
        )
    }

    if (status !== 'authenticated') {
        return (
            <div className='px-4'>
                <div onClick={handleSignInClick} className='flex flex-row gap-2 items-center p-2 w-full rounded-xl hover:bg-asidehover bg-aside text-left cursor-pointer transition-all text-nowrap'>
                    <div className='flex items-center justify-center size-10 rounded-full bg-secondary'>
                        <User className='size-5' />
                    </div>
                    <span>Войти</span>
                </div>
            </div>
        )
    }

    const image = data.user?.image

    return (
        <div className='px-4'>
            <div onClick={handleUserClick} className='flex flex-row gap-2 items-center p-2 w-full rounded-xl hover:bg-asidehover bg-aside text-left cursor-pointer transition-all text-nowrap'>
                {image &&
                    <Image
                        loader={() => image}
                        src={'/images/google.png'}
                        priority={false}
                        alt="Profile Image"
                        width={40}
                        height={40}
                        className='rounded-full'
                    />}
                <span>{data.user?.name}</span>
            </div>
        </div>
    )
}

export default AsideProfileIcon