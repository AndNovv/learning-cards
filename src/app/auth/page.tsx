import Image from 'next/image'
import React from 'react'
import google from '../../../public/images/google.svg'

const AuthPage = () => {
    return (
        <div className='w-[400px] bg-card flex flex-col gap-4 p-4'>
            <p>Авторизация</p>
            <div className='flex gap-3 items-center p-2 '>
                <Image
                    src={google}
                    alt={'google'}
                    width={50}
                    height={50}
                />
                <p>Войти с Google.com</p>
            </div>
        </div>
    )
}

export default AuthPage