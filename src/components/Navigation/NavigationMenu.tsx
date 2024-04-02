"use client"
import { setVisibility } from '@/state/asideMenu/asideMenuSlice'
import { AppDispatch, RootState } from '@/state/store'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const navLinks = [
    {
        href: '/',
        title: 'Главная'
    },
    {
        href: '/learning',
        title: 'Изучение'
    },
    {
        href: '/collections',
        title: 'Коллекции карточек'
    },
    {
        href: '/statistics',
        title: 'Статистика'
    },
] as const

const NavigationMenu = () => {

    const asideMenu = useSelector((state: RootState) => state.asideMenu)

    const dispatch = useDispatch<AppDispatch>()

    return (
        <header className='flex flex-row justify-between items-center px-10 py-6 bg-gradient-to-b from-background from-70% to-transparent'>
            {!asideMenu.isDesktop && <div className='p-2 cursor-pointer' onClick={() => dispatch(setVisibility(true))}><Menu /></div>}
            <nav>
                <ul className="flex flex-row gap-4 items-center">
                    {navLinks.map((link, index) => {
                        return (
                            <li className="hover:text-primary underline-offset-4 hover:underline rounded-md font-medium transition-all" key={`NavLink${index}`}>
                                <Link href={link.href}>{link.title}</Link>
                            </li>
                        )
                    })
                    }
                </ul>
            </nav>
        </header>
    )
}

export default NavigationMenu