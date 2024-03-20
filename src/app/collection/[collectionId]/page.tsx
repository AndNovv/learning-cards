"use client"
import { useFavouriteCollectionsStore } from '@/stores/favourites-store'
import React from 'react'

const SingleCollectionPage = ({ params }: { params: { collectionId: string } }) => {

    const { favouriteCollections } = useFavouriteCollectionsStore((state) => state)

    const findCollection = () => {
        for (let i = 0; i < favouriteCollections.length; i++) {
            if (favouriteCollections[i].id === Number(params.collectionId)) {
                return favouriteCollections[i]
            }
        }
        return null
    }

    const collection = findCollection()

    if (!collection) return <div>Коллекция с таким номером не найдена</div>

    return (
        <div>
            <h1>{collection.title}</h1>
            <p>{`Автор: ${collection.author}`}</p>
            {collection.flashcards.map((flashcard, index) => {
                return (
                    <div className="flex flex-row gap-2" key={`flashcard${index}`}>
                        <p>{flashcard.english}</p>
                        <p>-</p>
                        <p>{flashcard.russian}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default SingleCollectionPage