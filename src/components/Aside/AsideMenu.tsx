"use client"
import React from 'react'
import CardsCollectionAsideIcon from './CardsCollectionAsideIcon'
import { Plus } from 'lucide-react'
import AsideProfileIcon from './AsideProfileIcon'
import AsideIcon from './AsideIcon'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/store'

const AsideMenu = () => {

    const { user, loading, error } = useSelector((state: RootState) => state.user);
    const favouriteCollections = user.collections

    return (
        <aside className="flex flex-col items-center z-20 gap-2 h-screen sticky top-0 px-4 py-4 border-r">
            <AsideProfileIcon description='Профиль пользователя' href='/profile' />
            <div className='w-2/3 h-1 rounded-full bg-secondary'></div>
            {favouriteCollections.map((collection, index) => {
                return (
                    <CardsCollectionAsideIcon key={`AsideIcon${index}`} collection={collection} />
                )
            })}
            <AsideIcon description='Создать Коллекцию' icon={<Plus />} href='/create' />
        </aside>
    )
}

export default AsideMenu