"use client"
import useMediaQuery from '@/hooks/useMediaQuery'
import React from 'react'
import SingleCardPreview from './SingleCardPreview'
import { FlashCardClientType } from '@/types/types'
import { ScrollArea } from '../ui/scroll-area'
import { motion } from 'framer-motion'

const CollectionWordsPreview = ({ flashcards }: { flashcards: FlashCardClientType[] }) => {

    const isDesktop = useMediaQuery("(min-width: 768px)")

    return (
        <ScrollArea className='h-full'>
            <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    ease: "linear",
                    duration: 0.2,
                }}
                className='flex flex-col divide-y-2'>
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
                            key={`flashcardPreview-${flashcard.english}-${flashcard.russian}`}
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