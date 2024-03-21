"use client"
import CollectionWords from '@/components/Collection/CollectionWords'
import { useFavouriteCollectionsStore } from '@/stores/favourites-store'
import React from 'react'

const SingleCollectionPage = ({ params }: { params: { collectionId: string } }) => {

    const { favouriteCollections } = useFavouriteCollectionsStore((state) => state)

    const findCollection = () => {
        for (let i = 0; i < favouriteCollections.length; i++) {
            if (favouriteCollections[i]._id === params.collectionId) {
                return favouriteCollections[i]
            }
        }
        return null
    }

    const collection = findCollection()

    if (!collection) return <div>Коллекция с таким номером не найдена</div>

    return (
        <div className='flex flex-col xl:px-60 lg:px-40 md:px-20 px-1'>
            <h1 className='text-xl mt-2'>{collection.title}</h1>
            <p className='text-muted-foreground mt-2 mb-4'>{`Автор: ${collection.author}`}</p>
            <CollectionWords collection={collection} />
        </div>
    )
}

export default SingleCollectionPage