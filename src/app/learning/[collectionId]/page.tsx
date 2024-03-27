"use client"
import FlashCard from '@/components/Learning/FlashCard'
import ForgetButton from '@/components/Learning/ForgetButton'
import RememberButton from '@/components/Learning/RememberButton'
import { RootState } from '@/state/store'
import { FlashCardType } from '@/types/types'
import React, { useMemo, useState } from 'react'
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

    const collection = useMemo(() => user.collections.find((element) => element._id === params.collectionId), [user.collections, params.collectionId]);
    const shuffledFlashcards = useMemo(() => collection ? shuffleArray(collection.flashcards) : undefined, [collection]);

    const [flashcardIndex, setFlashcardIndex] = useState(0)


    if (!shuffledFlashcards) return <div>Коллекция не найдена</div>

    const handleButtonClick = () => {
        if (flashcardIndex !== shuffledFlashcards.length - 1) {
            setFlashcardIndex((prev) => prev + 1)
        }
        else {
            console.log('Конец коллекции')
        }
    }

    return (
        <div className='flex flex-col gap-10 justify-center items-center h-full'>
            <FlashCard flashcardInfo={shuffledFlashcards[flashcardIndex]} />
            <div className='flex flex-row w-1/2 justify-between'>
                <ForgetButton handleButtonClick={handleButtonClick} />
                <RememberButton handleButtonClick={handleButtonClick} />
            </div>
        </div>
    )
}

export default LearnCollectionCardsPage