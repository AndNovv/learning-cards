"use client"
import LoadingLearningPage from '@/components/Learning/LoadingLearningPage'
import useLearningCards from '@/hooks/useLearningCards'
import { initializeAllFlashcards } from '@/state/allFlashcards/allFlashcardsSlice'
import { AppDispatch, RootState } from '@/state/store'
import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import FlashCards from '@/components/Learning/FlashCards'
import { Button } from '@/components/ui/button'

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
        <div className='flex flex-col justify-start items-center flex-1 paddings pt-6'>
            <Button className='item-end' variant={'outline'} onClick={() => router.push('/')}>Закончить повторение</Button>
            <div className='flex justify-center flex-1 flex-col w-full max-w-[500px] gap-16'>
                <FlashCards flashcards={flashcards} handleFlashcard={handleFlashcard} />
            </div>
        </div>
    )
}

export default Learning