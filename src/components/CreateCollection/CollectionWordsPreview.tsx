"use client"
import useMediaQuery from '@/hooks/useMediaQuery'
import React from 'react'
import SingleCardPreview from './SingleCardPreview'
import { FlashCardClientType } from '@/types/types'
import { ScrollArea } from '../ui/scroll-area'

const CollectionWordsPreview = ({ flashcards }: { flashcards: FlashCardClientType[] }) => {

    const isDesktop = useMediaQuery("(min-width: 768px)")

    return (
        <ScrollArea className='h-full'>
            <div className='flex flex-col divide-y-2'>
                {flashcards.slice().reverse().map((flashcard, index) => {
                    return (
                        <SingleCardPreview key={`flashcardPreview${index}`} flashcard={flashcard} flashcardIndex={flashcards.length - index - 1} isDesktop={isDesktop} />
                    )
                })}
            </div>
        </ScrollArea>
    )
}

export default CollectionWordsPreview