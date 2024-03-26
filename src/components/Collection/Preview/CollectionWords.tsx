import React from 'react'
import { WordCollection } from '@/types/types'
import ExistingCollectionWordPreview from './ExistingCollectionWordPreview'
import { ScrollArea } from '@/components/ui/scroll-area'

const CollectionWord = ({ collection }: { collection: WordCollection }) => {

    return (
        <ScrollArea className='h-full'>
            <div className='flex flex-col divide-y-2'>
                {collection.flashcards.slice().reverse().map((flashcard, index) => {
                    return (
                        <ExistingCollectionWordPreview key={`flashcardPreview${index}`} flashcard={flashcard} />
                    )
                })}
            </div>
        </ScrollArea>
    )
}

export default CollectionWord