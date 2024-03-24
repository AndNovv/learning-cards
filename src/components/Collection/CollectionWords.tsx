"use client"
import useMediaQuery from '@/hooks/useMediaQuery'
import React from 'react'
import { WordCollection } from '@/types/types'
import ExistingCollectionWordPreview from './ExistingCollectionWordPreview'

const CollectionWord = ({ collection }: { collection: WordCollection }) => {

    const isDesktop = useMediaQuery("(min-width: 768px)")

    return (
        <div className='flex flex-col divide-y-2'>
            {collection.flashcards.map((flashcard, index) => {
                return (
                    <ExistingCollectionWordPreview key={`flashcardPreview${index}`} collectionId={collection._id} flashcard={flashcard} flashCardIndex={index} isDesktop={isDesktop} />
                )
            })}
        </div>
    )
}

export default CollectionWord