import { allCollections } from '@/data/data'
import { Scroll } from 'lucide-react'
import React from 'react'

const CardsCollectionAsideIcon = ({ collectionId }: { collectionId: number }) => {

    const cardCollection = allCollections[collectionId]

    return (
        <div className='group relative flex items-center justify-center w-14 h-14 rounded-full hover:rounded-3xl bg-accent hover:bg-primary hover:text-primary-foreground cursor-pointer transition-all'>
            <Scroll />
            <div className='absolute left-20 bg-secondary text-secondary-foreground border p-2 rounded-xl invisible group-hover:visible'>
                <p className='text-nowrap'>{cardCollection.title}</p>
            </div>
        </div>
    )
}

export default CardsCollectionAsideIcon