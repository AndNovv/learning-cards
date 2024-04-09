"use client"
import { setVisibility } from '@/state/asideMenu/asideMenuSlice'
import { AppDispatch } from '@/state/store'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useDispatch } from 'react-redux'
import textLogo from '../../../public/images/plexicon.svg'

const NavigationMenu = () => {

    const dispatch = useDispatch<AppDispatch>()

    return (
        <header className='relative flex flex-row justify-between items-center py-4 bg-gradient-to-b from-background from-70% to-transparent'>
            <div className='p-2 cursor-pointer block md:invisible hover:bg-hover hover:outline outline-1 outline-accent rounded-xl' onClick={() => dispatch(setVisibility(true))}><Menu /></div>
            <div className='text-2xl absolute left-1/2 -translate-x-1/2'>
                <Link href={'/'}>
                    <Image
                        src={textLogo}
                        alt='PLEXICON'
                        height={10}
                        width={150}
                    />
                </Link>
            </div>
            <div></div>
        </header>
    )
}

export default NavigationMenu