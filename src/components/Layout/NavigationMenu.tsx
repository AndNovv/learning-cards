import Link from 'next/link'
import React from 'react'
import { ModeToggle } from '../ModeToggle'

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
        href: '/duels',
        title: 'Дуэли'
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
    return (
        <header className='z-10 sticky top-0 flex flex-row items-center justify-between px-10 py-4 bg-gradient-to-b from-background from-70% to-transparent'>
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
            <ModeToggle />
        </header>
    )
}

export default NavigationMenu