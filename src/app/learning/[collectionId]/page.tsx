"use client"
import FlashCard from '@/components/Learning/FlashCard'
import FlashCardNew from '@/components/Learning/FlashCards'
import ForgetButton from '@/components/Learning/ForgetButton'
import RememberButton from '@/components/Learning/RememberButton'
import { RootState } from '@/state/store'
import { FlashCardType } from '@/types/types'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const LearnCollectionCardsPage = ({ params }: { params: { collectionId: string } }) => {

    const { user, loading, error } = useSelector((state: RootState) => state.user)

    const router = useRouter()

    const shuffleArray = (array: FlashCardType[]) => {
        const shuffledArray = array.slice()
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    const [flashcardIndex, setFlashcardIndex] = useState(0)

    const [shuffledFlashcards, setShuffledFlashcards] = useState<FlashCardType[] | null>(null)

    useEffect(() => {
        const collection = user.collections.find((element) => element._id === params.collectionId)
        if (collection) {
            setShuffledFlashcards(shuffleArray(collection.flashcards))
        }
    }, [user.collections])

    const handleButtonClick = useCallback(() => {
        if (shuffledFlashcards) {
            if (flashcardIndex !== shuffledFlashcards.length - 1) {
                setFlashcardIndex((prev) => prev + 1)
            }
            else {
                router.push(`/collection/${params.collectionId}`)
            }
        }
    }, [shuffledFlashcards, flashcardIndex])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowLeft':
                    handleButtonClick()
                    break
                case 'a':
                    handleButtonClick()
                    break
                case 'A':
                    handleButtonClick()
                    break
                case 'ф':
                    handleButtonClick()
                    break
                case 'Ф':
                    handleButtonClick()
                    break
                case "ArrowRight":
                    handleButtonClick()
                    break
                case 'd':
                    handleButtonClick()
                    break
                case 'D':
                    handleButtonClick()
                    break
                case 'В':
                    handleButtonClick()
                    break
                case 'в':
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

    if (!shuffledFlashcards) return <div>Коллекция не найдена</div>

    return (
        <div className='flex justify-center items-center h-full paddings'>
            <div className='flex flex-col w-full max-w-[500px] gap-10'>
                <FlashCardNew flashcardInfo={shuffledFlashcards[flashcardIndex]} />
                <div className='flex flex-row w-full justify-between'>
                    <ForgetButton handleButtonClick={handleButtonClick} />
                    <RememberButton handleButtonClick={handleButtonClick} />
                </div>
            </div>
        </div>
    )
}

export default LearnCollectionCardsPage