"use client"
import FlashCard from '@/components/Learning/FlashCard'
import ForgetButton from '@/components/Learning/ForgetButton'
import RememberButton from '@/components/Learning/RememberButton'
import useAllFlashcards from '@/hooks/useAllFlashcards'
import React, { useState } from 'react'

const Learning = () => {

    const allFlashcards = useAllFlashcards()
    const [flashcardIndex, setFlashcardIndex] = useState(0)
    const currentFlashcard = allFlashcards[flashcardIndex]

    const handleButtonClick = () => {
        if (flashcardIndex !== allFlashcards.length - 1) {
            setFlashcardIndex((prev) => prev + 1)
        }
        else {
            console.log('Конец коллекции')
        }
    }

    return (
        <div className='flex flex-col gap-10 justify-center items-center h-full'>
            <FlashCard flashcardInfo={currentFlashcard} />
            <div className='flex flex-row w-1/2 justify-between'>
                <ForgetButton handleButtonClick={handleButtonClick} />
                <RememberButton handleButtonClick={handleButtonClick} />
            </div>
        </div>
    )
}

export default Learning