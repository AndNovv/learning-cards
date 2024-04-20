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
import { useRouter } from 'next/navigation'
import FlashCards from '@/components/Learning/FlashCards'

const Learning = () => {

    const router = useRouter()
    const { user, loading } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (!loading) {
            dispatch(initializeAllFlashcards(user.collections))
        }
    }, [user, dispatch, loading]);

    const { flashcards, addNewUpdatedCard, flashcardsLoading } = useLearningCards()

    const handleFlashcard = useCallback((isRemembered: boolean) => {
        if (!flashcardsLoading) {
            addNewUpdatedCard(isRemembered)
        }
    }, [addNewUpdatedCard, flashcardsLoading])


    if (flashcardsLoading) return <LoadingLearningPage />

    if (flashcards.length === 0) {
        router.push('/finishedlearning')
        return null
    }

    return (
        <div className='flex justify-center items-center flex-1 paddings'>
            <div className='flex flex-col w-full max-w-[500px] gap-16'>
                <FlashCards flashcards={flashcards} handleFlashcard={handleFlashcard} />
            </div>
        </div>
    )
}

export default Learning