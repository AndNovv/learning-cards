"use client"
import React, { useEffect, useState } from 'react'
import { FlashCardType } from '@/types/types'
import { motion } from 'framer-motion'

const FlashCard = ({ flashcardInfo }: { flashcardInfo: FlashCardType }) => {

    const [isFlipped, setIsFlipped] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

    const handleCardClick = () => {
        if (!isAnimating) {
            setIsAnimating(true)
            setIsFlipped((prev) => !prev)
        }
    }

    useEffect(() => {
        setIsFlipped(false)
    }, [flashcardInfo])

    return (
        <motion.div
            key={`flashcard-${flashcardInfo._id}`}
            initial={{ translateY: -10, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={handleCardClick}
            className='flip-card cursor-pointer h-40 w-1/2'
        >
            <motion.div
                key={`flashcardInner-${flashcardInfo._id}`}
                initial={'front'}
                animate={isFlipped ? 'back' : 'front'}
                variants={{
                    front: { rotateY: 360 },
                    back: { rotateY: 180 },
                }}
                transition={{ duration: 0.3, animationDirection: 'normal' }}
                onAnimationComplete={() => setIsAnimating(false)}
                className='flip-card-inner w-full h-full text-2xl'
            >
                <div className='flip-card-front flex w-full h-full bg-card rounded-lg border shadow-md shadow-card justify-center items-center p-4'><p>{flashcardInfo.english}</p></div>
                <div className='flip-card-back flex w-full h-full bg-card rounded-lg border shadow-md shadow-card justify-center items-center p-4'><p>{flashcardInfo.russian}</p></div>
            </motion.div>
        </motion.div>

    )
}

export default FlashCard