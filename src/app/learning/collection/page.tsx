"use client"
import FlashCardsWithoutProgress from '@/components/Learning/FlashCardsWithoutProgress'
import LoadingLearningPage from '@/components/Learning/LoadingLearningPage'
import { AnyFlashCard } from '@/types/types'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const LearnCollectionCardsPage = () => {

    const searchParams = useSearchParams()

    const shuffleArray = (array: AnyFlashCard[]) => {
        const shuffledArray = array.slice()
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    const [shuffledFlashcards, setShuffledFlashcards] = useState<AnyFlashCard[] | null>(null)

    useEffect(() => {
        const encodedFlashcards = searchParams.get('flashcards')
        const flashcards = encodedFlashcards ? JSON.parse(decodeURIComponent(encodedFlashcards)) : null
        if (flashcards) {
            setShuffledFlashcards(shuffleArray(flashcards))
        }
    }, [searchParams])

    if (!shuffledFlashcards) return <LoadingLearningPage />

    return (
        <div className='flex justify-center items-center h-full paddings'>
            <div className='flex flex-col flex-1 w-full max-w-[500px] gap-16'>
                <FlashCardsWithoutProgress flashcards={shuffledFlashcards} />
            </div>
        </div>
    )
}

export default LearnCollectionCardsPage