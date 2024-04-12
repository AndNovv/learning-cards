"use client"
import useMediaQuery from '@/hooks/useMediaQuery'
import React from 'react'
import SingleCardPreview from './SingleCardPreview'
import { ClientFlashCardType } from '@/types/types'
import { ScrollArea } from '../ui/scroll-area'
import { motion } from 'framer-motion'

const CollectionWordsPreview = ({ flashcards }: { flashcards: ClientFlashCardType[] }) => {

    const isDesktop = useMediaQuery("(min-width: 768px)")

    return (
        <ScrollArea className='h-full paddings'>
            <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    ease: "linear",
                    duration: 0.2,
                }}
                className='flex flex-col divide-y-2 pb-10'>
                {flashcards.slice().reverse().map((flashcard, index) => {
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
                            <SingleCardPreview flashcard={flashcard} flashcardIndex={flashcards.length - index - 1} isDesktop={isDesktop} />
                        </motion.div>
                    )
                })}
            </motion.div>
        </ScrollArea>
    )
}

export default CollectionWordsPreview