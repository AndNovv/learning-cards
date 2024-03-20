"use client"
import useMediaQuery from '@/hooks/useMediaQuery'
import React from 'react'
import SingleCardPreview from './SingleCardPreview'
import { FlashCardType } from '@/types/types'

const CollectionWordsPreview = ({ flashcards }: { flashcards: FlashCardType[] }) => {

    const isDesktop = useMediaQuery("(min-width: 768px)")

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