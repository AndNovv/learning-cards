import React from 'react'
import { FlashCardType } from '@/types/types'
import ExistingCollectionWordPreview from './ExistingCollectionWordPreview'
import { ScrollArea } from '@/components/ui/scroll-area'
import { motion } from 'framer-motion'

const CollectionWord = ({ flashcards }: { flashcards: FlashCardType[] }) => {

    return (
        <ScrollArea className='h-full'>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    ease: "linear",
                    duration: 0.2,
                }}
                className='flex flex-col divide-y-2'>
                {flashcards.slice().reverse().map((flashcard, index) => {
                    return (
                        <ExistingCollectionWordPreview key={`flashcardPreview${index}`} flashcard={flashcard} />
                    )
                })}
            </motion.div>
        </ScrollArea>
    )
}

export default CollectionWord