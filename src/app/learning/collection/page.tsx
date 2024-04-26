"use client"
import FlashCardsWithoutProgress from '@/components/Learning/FlashCardsWithoutProgress'
import LoadingLearningPage from '@/components/Learning/LoadingLearningPage'
import { PracticeFlashCardType } from '@/state/currentPracticeCollection/currentPracticeCollectionSlice'
import { RootState } from '@/state/store'
import { ClientFlashCardType } from '@/types/types'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const LearnCollectionCardsPage = () => {

    const currentPracticeCollection = useSelector((state: RootState) => state.currentPracticeCollection)

    const shuffleArray = (array: PracticeFlashCardType[]) => {
        const shuffledArray = array.slice()
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    const [shuffledFlashcards, setShuffledFlashcards] = useState<PracticeFlashCardType[]>([])

    useEffect(() => {
        if (currentPracticeCollection.flashcards) {
            setShuffledFlashcards(shuffleArray(currentPracticeCollection.flashcards))
        }
    }, [currentPracticeCollection])

    if (shuffledFlashcards.length === 0) return <LoadingLearningPage />

    return (
        <div className='flex justify-center items-center h-full paddings'>
            <div className='flex flex-col flex-1 w-full max-w-[500px] gap-16'>
                <FlashCardsWithoutProgress flashcards={shuffledFlashcards} />
            </div>
        </div>
    )
}

export default LearnCollectionCardsPage