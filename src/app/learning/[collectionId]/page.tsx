"use client"
import FlashCardsWithoutProgress from '@/components/Learning/FlashCardsWithoutProgress'
import { RootState } from '@/state/store'
import { FlashCardType } from '@/types/types'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const LearnCollectionCardsPage = ({ params }: { params: { collectionId: string } }) => {

    const { user, loading, error } = useSelector((state: RootState) => state.user)

    const shuffleArray = (array: FlashCardType[]) => {
        const shuffledArray = array.slice()
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    const [shuffledFlashcards, setShuffledFlashcards] = useState<FlashCardType[] | null>(null)

    useEffect(() => {
        const collection = user.collections.find((element) => element._id === params.collectionId)
        if (collection) {
            setShuffledFlashcards(shuffleArray(collection.flashcards))
        }
    }, [user.collections])

    if (!shuffledFlashcards) return <div>Коллекция не найдена</div>

    return (
        <div className='flex justify-center items-center h-full paddings'>
            <div className='flex flex-col flex-1 w-full max-w-[500px] gap-16'>
                <FlashCardsWithoutProgress flashcards={shuffledFlashcards} collectionId={params.collectionId} />
            </div>
        </div>
    )
}

export default LearnCollectionCardsPage