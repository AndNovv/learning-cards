"use client"
import React from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { motion } from 'framer-motion'
import PublishedCollectionWord from './PublishedCollectionWord'

const PublishedCollectionWords = ({ flashcards }: { flashcards: { english: string, russian: string }[] }) => {

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
                        <PublishedCollectionWord key={`flashcardPreview${index}`} flashcard={flashcard} />
                    )
                })}
            </motion.div>
        </ScrollArea>
    )
}

export default PublishedCollectionWords