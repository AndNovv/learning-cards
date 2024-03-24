"use client"
import useMediaQuery from '@/hooks/useMediaQuery'
import React from 'react'
import SingleCardPreview from './SingleCardPreview'
import { FlashCardClientType } from '@/types/types'

const CollectionWordsPreview = ({ flashcards }: { flashcards: FlashCardClientType[] }) => {

    const isDesktop = useMediaQuery("(min-width: 768px)")

    return (
        <div className='flex flex-col divide-y-2'>
            {flashcards.map((flashcard, index) => {
                return (
                    <SingleCardPreview key={`flashcardPreview${index}`} flashcard={flashcard} flashcardIndex={index} isDesktop={isDesktop} />
                )
            })}
        </div>
    )
}

export default CollectionWordsPreview