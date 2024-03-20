"use client"
import React from 'react'
import CardsCollectionAsideIcon from './CardsCollectionAsideIcon'
import { GraduationCap, Plus } from 'lucide-react'
import AsideIcon from './AsideIcon'
import { useFavouriteCollectionsStore } from '@/stores/favourites-store'

const AsideMenu = () => {

    const { favouriteCollections } = useFavouriteCollectionsStore((state) => state)

    return (
        <aside className="flex flex-col items-center z-20 gap-2 h-screen sticky top-0 px-4 py-4 border-r">
            <AsideIcon description='Главная' icon={<GraduationCap />} href='/' />
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