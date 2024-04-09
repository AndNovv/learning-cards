"use client"
import FlashCard from '@/components/Learning/FlashCard'
import ForgetButton from '@/components/Learning/ForgetButton'
import LoadingLearningPage from '@/components/Learning/LoadingLearningPage'
import NothingToRepeatPage from '@/components/Learning/NothingToRepeatPage'
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
    }, [addNewUpdatedCard, flashcardsLoading])


    useEffect(() => {
        if (!loading) {
            console.log('init cards')
            console.log(user.collections)
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

    if (!currentFlashcard) return <NothingToRepeatPage />

    return (
        <div className='flex justify-center items-center h-full'>
            <div className='flex flex-col w-full max-w-[500px] gap-10'>
                <FlashCard flashcardInfo={currentFlashcard} />
                <div className='flex flex-row w-full justify-between'>
                    <ForgetButton handleButtonClick={() => handleButtonClick(false)} />
                    <RememberButton handleButtonClick={() => handleButtonClick(true)} />
                </div>
            </div>
        </div>
    )
}

export default Learning