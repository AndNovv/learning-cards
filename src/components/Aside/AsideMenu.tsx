"use client"
import React from 'react'
import CardsCollectionAsideIcon from './CardsCollectionAsideIcon'
import { useFavouritesStore } from '@/providers/favourites-store-provider'
import { GraduationCap, Plus } from 'lucide-react'
import AsideIcon from './AsideIcon'

const AsideMenu = () => {

    const { favourites, addFavourite, deleteFavourite } = useFavouritesStore((state) => state)

    const favouritesArray = Array.from(favourites)

    return (
        <aside className="flex flex-col items-center z-20 gap-2 h-screen sticky top-0 px-4 py-4 border-r">
            <AsideIcon description='Главная' icon={<GraduationCap />} />
            <div className='w-2/3 h-1 rounded-full bg-secondary'></div>
            {favouritesArray.map((collectionId, index) => {
                return (
                    <CardsCollectionAsideIcon collectionId={collectionId} key={`CardsCollectionIcon${index}`} />
                )
            })}
            <AsideIcon description='Создать Коллекцию' icon={<Plus />} />
        </aside>
    )
}

export default AsideMenu