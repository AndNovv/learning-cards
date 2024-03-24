"use client"
import React from 'react'
import { useRouter } from "next/navigation";
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { User } from 'lucide-react';

const AsideProfileIcon = ({ description, href }: { description: string, href: string }) => {

    const { status, data } = useSession()

    const router = useRouter()


    if (status !== 'authenticated') {
        return (
            <div onClick={() => signIn("google", { callbackUrl: '/profile' })} className='group relative flex items-center justify-center w-14 h-14 rounded-full hover:rounded-3xl bg-accent hover:bg-primary hover:text-primary-foreground cursor-pointer transition-all'>
                <User />
                <div className='absolute left-20 min-h-fit bg-secondary text-secondary-foreground border p-2 rounded-xl invisible group-hover:visible'>
                    <p className='text-nowrap'>{description}</p>
                </div>
            </div>
        )
    }

    return (
        <div onClick={() => router.push(href)} className='group relative flex items-center justify-center w-14 h-14 rounded-full hover:rounded-3xl bg-accent hover:bg-primary hover:text-primary-foreground cursor-pointer transition-all'>
            <div className='w-14 h-14 rounded-full hover:rounded-3xl overflow-hidden transition-all'>
                {data?.user?.image &&
                    <Image
                        src={data.user.image}
                        alt="Profile Image"
                        width={60}
                        height={60}
                    />}
            </div>
            <div className='absolute left-20 min-h-fit bg-secondary text-secondary-foreground border p-2 rounded-xl invisible group-hover:visible'>
                <p className='text-nowrap'>{description}</p>
            </div>
        </div>
    )
}

export default AsideProfileIcon