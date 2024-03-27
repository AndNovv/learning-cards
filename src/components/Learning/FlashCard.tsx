"use client"
import React, { useState } from 'react'
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


    return (
        <div onClick={handleCardClick} className='flip-card cursor-pointer h-40 w-1/2'>
            <motion.div
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 360 }}
                transition={{ duration: 0.3, animationDirection: 'normal' }}
                onAnimationComplete={() => setIsAnimating(false)}
                className='flip-card-inner w-full h-full text-2xl'
            >
                <div className='flip-card-front flex w-full h-full bg-card rounded-lg border shadow-md shadow-card justify-center items-center p-4'><p>{flashcardInfo.english}</p></div>
                <div className='flip-card-back flex w-full h-full bg-card rounded-lg border shadow-md shadow-card justify-center items-center p-4'><p>{flashcardInfo.russian}</p></div>
            </motion.div>
        </div>

    )
}

export default FlashCard