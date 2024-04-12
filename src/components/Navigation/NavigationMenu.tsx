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
        <header className='relative flex flex-row justify-between items-center paddings border md:border-none py-4 bg-gradient'>
            <div className='p-2 cursor-pointer block md:invisible hover:bg-hover hover:outline outline-1 outline-accent rounded-xl' onClick={() => dispatch(setVisibility(true))}><Menu /></div>
            <div className='text-2xl absolute left-1/2 -translate-x-1/2'>
                <Link href={'/'}>
                    <Image
                        src={textLogo}
                        alt='PLEXICON'
                        priority={true}
                        width="0"
                        height="0"
                        sizes="100vw"
                        className="w-[150px] h-auto"
                    />
                </Link>
            </div>
            <div></div>
        </header>
    )
}

export default NavigationMenu