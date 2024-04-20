"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { FlashCardType } from '@/types/types'
import { MotionValue, motion, useAnimationControls, useMotionValue, useTransform } from 'framer-motion'
import { Progress } from "@/components/ui/progress"

type FlashcardStateType = 'front' | 'middle' | 'back' | 'prepared'

const FlashCards = ({ flashcards }: { flashcards: FlashCardType[] }) => {

    const [isFlipped, setIsFlipped] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)


    const handleCardClick = useCallback(() => {
        if (!isAnimating) {
            setIsAnimating(true)
            setIsFlipped((prev) => !prev)
        }
    }, [isAnimating])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case " ": // Space key
                    handleCardClick()
                    break
                default:
                    break
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleCardClick]);

    useEffect(() => {
        setIsFlipped(false)
    }, [flashcards])

    const flashcardStates = ['front', 'middle', 'back', 'prepared'] as const
    const [order, setOrder] = useState(0)

    const cardOffset = useMotionValue(0)

    const handleNextCard = () => {
        setOrder((prev) => prev - 1 >= 0 ? prev - 1 : 3)
        cardOffset.set(0)
    }


    return (
        <div className='relative h-80 w-full max-w-[500px]'>
            <SingleFlashCard handleNextCard={handleNextCard} key={`${flashcards[0]._id}${flashcardStates[(order + 0) % 4]}`} flashcardState={flashcardStates[(order + 0) % 4]} flashcard={{ english: flashcards[0].english, russian: flashcards[0].russian, id: flashcards[0]._id }} cardOffset={cardOffset} isAnimating={isAnimating} setIsAnimating={setIsAnimating} />
            <SingleFlashCard handleNextCard={handleNextCard} key={`${flashcards[1]._id}${flashcardStates[(order + 0) % 4]}`} flashcardState={flashcardStates[(order + 1) % 4]} flashcard={{ english: flashcards[1].english, russian: flashcards[1].russian, id: flashcards[1]._id }} cardOffset={cardOffset} isAnimating={isAnimating} setIsAnimating={setIsAnimating} />
            <SingleFlashCard handleNextCard={handleNextCard} key={`${flashcards[2]._id}${flashcardStates[(order + 0) % 4]}`} flashcardState={flashcardStates[(order + 2) % 4]} flashcard={{ english: flashcards[2].english, russian: flashcards[2].russian, id: flashcards[2]._id }} cardOffset={cardOffset} isAnimating={isAnimating} setIsAnimating={setIsAnimating} />
            <SingleFlashCard handleNextCard={handleNextCard} key={`${flashcards[3]._id}${flashcardStates[(order + 0) % 4]}`} flashcardState={flashcardStates[(order + 3) % 4]} flashcard={{ english: flashcards[3].english, russian: flashcards[3].russian, id: flashcards[3]._id }} cardOffset={cardOffset} isAnimating={isAnimating} setIsAnimating={setIsAnimating} />
        </div >

    )
}

export default FlashCards

export const SingleFlashCard = ({ handleNextCard, flashcardState, flashcard, cardOffset, isAnimating, setIsAnimating }: { handleNextCard: () => void, flashcardState: FlashcardStateType, flashcard: { english: string, russian: string, id: string }, cardOffset: MotionValue<number>, isAnimating: boolean, setIsAnimating: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const opacity = useTransform(
        cardOffset,
        [-150, 0, 150],
        [0.7, 1, 0.7]
    )

    const frontCardBackground = useTransform(
        cardOffset,
        [-150, 0, 150],
        ['hsl(0, 50, 60)', "hsl(246 4 16)", 'hsl(114 20 60)']
    )

    const rotation = useTransform(
        cardOffset,
        [-150, 150],
        [-15, 15]
    )

    const transform = useTransform(
        cardOffset,
        [-150, 150],
        [-60, 60]
    )

    const baseTopValues = new Map<FlashcardStateType, number>([['front', 0], ['middle', 32], ['back', 64], ['prepared', 96]])
    const baseTop = baseTopValues.get(flashcardState) || 0

    const top = useTransform(
        cardOffset,
        [-150, 0, 150],
        [-32 + baseTop, baseTop, -32 + baseTop]
    )

    const preparedOpacity = useTransform(
        cardOffset,
        [-150, 0, 150],
        [1, 0, 1]
    )

    const baseScaleValues = new Map<FlashcardStateType, number>([['front', 1], ['middle', 0.9], ['back', 0.8], ['prepared', 0.7]])
    const baseScale = baseScaleValues.get(flashcardState) || 0

    const scale = useTransform(
        cardOffset,
        [-150, 0, 150],
        [0.1 + baseScale, baseScale, 0.1 + baseScale]
    )

    const baseBackgroundValues = new Map<FlashcardStateType, string[]>([['middle', ["hsl(246 4 16)", "hsl(246 4 14)", "hsl(246 4 16)"]], ['back', ["hsl(246 4 14)", "hsl(246 4 12)", "hsl(246 4 14)"]], ['prepared', ["hsl(246 4 12)", "hsl(246 4 10)", "hsl(246 4 12)"]]])
    const baseBackground = baseBackgroundValues.get(flashcardState) || ["hsl(246 4 16)", "hsl(246 4 14)", "hsl(246 4 16)"]

    const background = useTransform(
        cardOffset,
        [-150, 0, 150],
        baseBackground
    )

    const controls = useAnimationControls()
    const handlePanEnd = (offset: number) => {
        if (flashcardState === 'front') {
            if (offset > 50) {
                setIsAnimating(true)
                controls.start("moveRight").finally(() => {
                    setIsAnimating(false)
                    handleNextCard()
                })
            }
            else if (offset < -50) {
                setIsAnimating(true)
                controls.start("moveLeft").finally(() => {
                    setIsAnimating(false)
                    handleNextCard()
                })
            }
            else {
                cardOffset.set(0)
            }
        }

    }

    return (
        <motion.div
            style={flashcardState === 'front' ? {
                background: frontCardBackground,
                opacity,
                rotate: rotation,
                // top: 0,
                // scale: 1,
                translateX: transform,
                zIndex: 0,
            } : flashcardState === 'middle' ? {
                rotate: 0,
                opacity: 1,
                background,
                translateX: 0,
                top: top,
                scale: scale,
                zIndex: -5.
            } : flashcardState === 'back' ? {
                opacity: 1,
                rotate: 0,
                background,
                translateX: 0,
                top: top,
                scale: scale,
                zIndex: -10,
            } : {
                opacity: preparedOpacity,
                rotate: 0,
                background,
                top: top,
                translateX: 0,
                scale: scale,
                zIndex: -15
            }}
            variants={{
                moveRight: { opacity: 0, rotate: 50, translateX: 200 },
                moveLeft: { opacity: 0, rotate: -50, translateX: -200 },
                front: { top: 0, scale: 1 },
                middle: { top: 32, scale: 0.9 },
                back: { top: 64, scale: 0.8 },
                prepared: { top: 96, scale: 0.7 },
            }}
            key={flashcard.id}
            initial={flashcardState}
            animate={controls}
            transition={{ duration: 0.5 }}
            // onClick={ }
            onPan={(_e, pointInfo) => { !isAnimating ? cardOffset.set(pointInfo.offset.x > 150 ? 150 : pointInfo.offset.x < -150 ? -150 : pointInfo.offset.x) : null }}
            onPanEnd={(_e, info) => handlePanEnd(info.offset.x)}
            className='absolute flex flex-col p-8 px-10 shadow-md cursor-pointer rounded-2xl w-full h-full text-2xl'
        >
            <Progress value={33} className='h-2' />
            <div className='flex flex-col flex-1 h-full justify-center items-center p-4 select-none'>
                <p>{flashcard.english}</p>
            </div>
        </motion.div>
    )
}