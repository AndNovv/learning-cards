import React from 'react'
import { FlashCardType } from '@/types/types'
import ExistingCollectionWordPreview from './ExistingCollectionWordPreview'
import { motion } from 'framer-motion'
import { ScrollArea } from '@/components/ui/scroll-area'

const CollectionWord = ({ flashcards }: { flashcards: FlashCardType[] }) => {

    return (
        <ScrollArea className='h-full paddings'>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    ease: "linear",
                    duration: 0.2,
                }}
                className='flex flex-col divide-y-2 pb-10 overflow-hidden'>
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