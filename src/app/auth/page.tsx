"use client"
import Image from 'next/image'
import React from 'react'
import google from '../../../public/images/google.png'
import { signIn } from 'next-auth/react'

const AuthPage = () => {
    return (
        <div className='flex w-full h-full justify-center items-center'>
            <div className='w-[400px] bg-card flex flex-col gap-4 p-4 rounded-xl shadow-sm shadow-blue-100/70' onClick={() => signIn("google", { callbackUrl: '/' })}>
                <p className='text-center text-xl font-semibold mt-2'>Авторизация</p>
                <div className='flex gap-3 items-center p-2 hover:bg-accent transition-all cursor-pointer rounded-xl border'>
                    <Image
                        src={google}
                        alt={'google'}
                        width={50}
                        height={50}
                    />
                    <p>Вход Google.com</p>
                </div>
            </div>
        </div>
    )
}

export default AuthPage