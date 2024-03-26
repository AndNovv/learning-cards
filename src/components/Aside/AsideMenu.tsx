"use client"
import React, { useEffect, useState } from 'react'
import CardsCollectionAsideIcon from './CardsCollectionAsideIcon'
import { Plus } from 'lucide-react'
import AsideProfileIcon from './AsideProfileIcon'
import AsideIcon from './AsideIcon'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { ModeToggle } from '../ModeToggle'
import { motion } from "framer-motion"

const AsideMenu = () => {

    const { user, loading, error } = useSelector((state: RootState) => state.user);
    const favouriteCollections = user.collections

    return (
        <aside className="flex flex-col justify-between items-center z-20 h-screen sticky top-0 px-4 py-4 border-r">
            <div className='flex flex-col gap-2 items-center'>
                <AsideProfileIcon description='Профиль пользователя' href='/profile' />
                <div className='w-2/3 h-1 rounded-full bg-secondary'></div>
                <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 75 }}
                    className='flex flex-col gap-2 items-center'
                >
                    {favouriteCollections.map((collection) => {
                        return (
                            <motion.div layout transition={{ type: "spring", stiffness: 75 }} key={`AsideIcon${collection._id}`} className='flex'>
                                <CardsCollectionAsideIcon collection={collection} />
                            </motion.div>
                        )
                    })}
                    <motion.div layout transition={{ type: "spring", stiffness: 75 }}>
                        <AsideIcon description='Создать Коллекцию' icon={<Plus />} href='/create' />
                    </motion.div>
                </motion.div>

            </div>
            <ModeToggle />
        </aside>
    )
}

export default AsideMenu