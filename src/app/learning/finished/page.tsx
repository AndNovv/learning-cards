"use client"
import CollectionWords from '@/components/Collection/Preview/CollectionWords'
import { Button } from '@/components/ui/button'
import { RootState } from '@/state/store'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux'

const FinishedCollectionPage = () => {

    const currentPracticeCollection = useSelector((state: RootState) => state.currentPracticeCollection)

    const router = useRouter()

    return (
        <>
            <div className='paddings mb-2 mt-6 md:mt-0'>
                <h1 className='text-2xl'>Проблемные слова</h1>
            </div>
            <CollectionWords flashcards={currentPracticeCollection.flashcards} bottomPadding={false} />
            <div className='paddings flex justify-between mb-6 mt-6'>
                <Button variant={'outline'} onClick={() => currentPracticeCollection.collectionLink ? router.push(currentPracticeCollection.collectionLink) : null}>Назад к коллекции</Button>
                <Button variant={'outline'} onClick={() => router.push('/learning/collection')}>Проверить себя</Button>
            </div>
        </>
    )
}

export default FinishedCollectionPage