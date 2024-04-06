"use client"
import FlashCard from '@/components/Learning/FlashCard'
import ForgetButton from '@/components/Learning/ForgetButton'
import LoadingLearningPage from '@/components/Learning/LoadingLearningPage'
import RememberButton from '@/components/Learning/RememberButton'
import useLearningCards from '@/hooks/useLearningCards'
import { initializeAllFlashcards } from '@/state/allFlashcards/allFlashcardsSlice'
import { AppDispatch, RootState } from '@/state/store'
import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const Learning = () => {

    const { user, loading } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch<AppDispatch>()

    const { currentFlashcard, addNewUpdatedCard, flashcardsLoading } = useLearningCards()


    const handleButtonClick = useCallback((isRemembered: boolean) => {
        if (!flashcardsLoading) {
            addNewUpdatedCard(isRemembered)
        }
    }, [addNewUpdatedCard])


    useEffect(() => {
        if (!loading) {
            dispatch(initializeAllFlashcards(user.collections))
        }
    }, [user.collections, dispatch, loading]);


    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowLeft':
                    handleButtonClick(false)
                    break
                case 'a':
                    handleButtonClick(false)
                    break
                case 'A':
                    handleButtonClick(false)
                    break
                case 'ф':
                    handleButtonClick(false)
                    break
                case 'Ф':
                    handleButtonClick(false)
                    break
                case "ArrowRight":
                    handleButtonClick(true)
                    break
                case 'd':
                    handleButtonClick(true)
                    break
                case 'D':
                    handleButtonClick(true)
                    break
                case 'В':
                    handleButtonClick(true)
                    break
                case 'в':
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

    if (flashcardsLoading) return <LoadingLearningPage />

    if (!currentFlashcard) return <div>Больше нечего повторять</div>

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