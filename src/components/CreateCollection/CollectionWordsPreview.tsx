"use client"
import useMediaQuery from '@/hooks/useMediaQuery'
import { useNewCollectionStore } from '@/stores/new-collection-store'
import React from 'react'
import SingleCardPreview from './SingleCardPreview'

const CollectionWordsPreview = () => {

    const isDesktop = useMediaQuery("(min-width: 768px)")
    const { flashcards } = useNewCollectionStore((state) => state)

    return (
        <div className='flex flex-col divide-y-2'>
            {flashcards.map((flashcard, index) => {
                return (
                    <SingleCardPreview key={`flashcardPreview${index}`} flashcard={flashcard} flashCardIndex={index} isDesktop={isDesktop} />
                )
            })}
        </div>
    )
}

export default CollectionWordsPreview