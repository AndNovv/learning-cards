"use client"
import FlashCard from '@/components/Learning/FlashCard'
import ForgetButton from '@/components/Learning/ForgetButton'
import RememberButton from '@/components/Learning/RememberButton'
import useAllFlashcards from '@/hooks/useAllFlashcards'
import { RecalculateFlashcard } from '@/lib/RecalculateFlashcard'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'

const Learning = () => {

    const router = useRouter()

    const { flashcards, addUpdatedCard } = useAllFlashcards()
    const [flashcardIndex, setFlashcardIndex] = useState(0)
    const currentFlashcard = flashcards[flashcardIndex]

    const handleButtonClick = useCallback((isRemembered: boolean) => {
        if (flashcardIndex !== flashcards.length - 1) {
            const recalculatedFlashcard = RecalculateFlashcard(currentFlashcard, isRemembered)
            addUpdatedCard(recalculatedFlashcard)
            setFlashcardIndex((prev) => prev + 1)
        }
        else if (flashcardIndex === flashcards.length - 1) {
            console.log('Повтор закончен')
            const recalculatedFlashcard = RecalculateFlashcard(currentFlashcard, isRemembered)
            addUpdatedCard(recalculatedFlashcard)
            router.push('/')
        }
    }, [flashcardIndex, flashcards.length, currentFlashcard, addUpdatedCard, router])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowLeft':
                    handleButtonClick(false)
                    break
                case "ArrowRight":
                    handleButtonClick(true)
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
                <ForgetButton handleButtonClick={() => handleButtonClick(false)} />
                <RememberButton handleButtonClick={() => handleButtonClick(true)} />
            </div>
        </div>
    )
}

export default Learning