"use client"
import useMediaQuery from '@/hooks/useMediaQuery'
import React from 'react'
import EditableExistingCollectionWordPreview from './EditableExistingWordPreview'
import { ScrollArea } from '@/components/ui/scroll-area'
import { EditedWordCollection } from '@/state/editedCollection/editedCollectionSlice'

const EditableCollectionWords = ({ collection }: { collection: EditedWordCollection }) => {

    const isDesktop = useMediaQuery("(min-width: 768px)")

    const collectionId = collection.collectionId

    if (!collectionId) {
        return <div>Загрузка</div>
    }

    return (
        <ScrollArea className='h-full'>
            <div className='flex flex-col divide-y-2'>
                {collection.flashcards.slice().reverse().map((flashcard, index) => {
                    return (
                        <EditableExistingCollectionWordPreview key={`flashcardPreview${index}`} collectionId={collectionId} flashcard={flashcard} flashcardIndex={collection.flashcards.length - index - 1} isDesktop={isDesktop} />
                    )
                })}
            </div>
        </ScrollArea>
    )
}

export default EditableCollectionWords