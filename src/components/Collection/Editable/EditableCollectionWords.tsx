"use client"
import useMediaQuery from '@/hooks/useMediaQuery'
import React from 'react'
import EditableExistingCollectionWordPreview from './EditableExistingWordPreview'
import { EditedWordCollection } from '@/state/editedCollection/editedCollectionSlice'
import { motion } from 'framer-motion'
import { ScrollArea } from '@/components/ui/scroll-area'

const EditableCollectionWords = ({ collection }: { collection: EditedWordCollection }) => {

    const isDesktop = useMediaQuery("(min-width: 768px)")

    const collectionId = collection.collectionId

    if (!collectionId) {
        return <div>Загрузка</div>
    }

    return (
        <ScrollArea className='h-full'>
            <motion.div
                layout
                transition={{
                    ease: "linear",
                    duration: 2,
                    x: { duration: 1 }
                }}
                className='flex flex-col paddings divide-y-2 pb-10'
            >
                {collection.flashcards.slice().reverse().map((flashcard, index) => {
                    return (
                        <motion.div
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                ease: "linear",
                                duration: 0.2,
                            }}
                            key={`flashcardPreview${flashcard._id}`}
                        >
                            <EditableExistingCollectionWordPreview collectionId={collectionId} flashcard={flashcard} flashcardIndex={collection.flashcards.length - index - 1} isDesktop={isDesktop} />
                        </motion.div>
                    )
                })}
            </motion.div>
        </ScrollArea>
    )
}

export default EditableCollectionWords