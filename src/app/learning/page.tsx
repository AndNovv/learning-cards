"use client"
import FlashCard from '@/components/Learning/FlashCard'
import ForgetButton from '@/components/Learning/ForgetButton'
import RememberButton from '@/components/Learning/RememberButton'
import useAllFlashcards from '@/hooks/useAllFlashcards'
import { CalculateNextRepetition } from '@/lib/CalculateNextRepetition'
import React, { useCallback, useEffect, useState } from 'react'

const Learning = () => {

    const allFlashcards = useAllFlashcards()
    const [flashcardIndex, setFlashcardIndex] = useState(0)
    const currentFlashcard = allFlashcards[flashcardIndex]

    const handleButtonClick = useCallback(() => {
        if (flashcardIndex !== allFlashcards.length - 1) {
            setFlashcardIndex((prev) => prev + 1)
        }
        else {
            console.log('Конец коллекции')
        }
    }, [flashcardIndex, allFlashcards.length])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowLeft':
                    handleButtonClick()
                    break
                case "ArrowRight":
                    handleButtonClick()
                    break
                default:
                    break
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleButtonClick]);


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