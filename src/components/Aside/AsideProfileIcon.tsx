"use client"
import React from 'react'
import { useRouter } from "next/navigation";
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { User } from 'lucide-react';

const AsideProfileIcon = () => {

    const { status, data } = useSession()

    const router = useRouter()


    if (status !== 'authenticated') {
        return (
            <div onClick={() => signIn("google", { callbackUrl: '/profile' })} className='flex flex-row gap-2 items-center p-2 w-full rounded-xl hover:bg-accent bg-background text-left cursor-pointer transition-all text-nowrap'>
                <div className='flex items-center justify-center size-10 rounded-full bg-secondary'>
                    <User className='size-5' />
                </div>
                <p>Войти</p>
            </div>
        )
    }

    return (
        <div onClick={() => router.push('/profile')} className='flex flex-row gap-2 items-center p-2 w-full rounded-xl hover:bg-accent bg-background text-left cursor-pointer transition-all text-nowrap'>
            {data?.user?.image &&
                <Image
                    src={data.user.image}
                    priority={false}
                    alt="Profile Image"
                    width={40}
                    height={40}
                    className='rounded-full'
                />}
            <p>{data.user?.name}</p>
        </div>
    )
}

export default AsideProfileIcon