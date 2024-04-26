import React from 'react'
import { AnyFlashCard } from '@/types/types'
import ExistingCollectionWordPreview from './ExistingCollectionWordPreview'
import { motion } from 'framer-motion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

const CollectionWords = ({ flashcards, bottomPadding }: { flashcards: AnyFlashCard[], bottomPadding: boolean }) => {

    return (
        <ScrollArea className='h-full paddings'>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    ease: "linear",
                    duration: 0.2,
                }}
                className={cn(bottomPadding ? 'pb-10' : 'pb-0', 'flex flex-col divide-y-2 overflow-hidden')}>
                {flashcards.slice().reverse().map((flashcard, index) => {
                    return (
                        <ExistingCollectionWordPreview key={`flashcardPreview${index}`} flashcard={flashcard} />
                    )
                })}
            </motion.div>
        </ScrollArea >
    )
}

export default CollectionWords