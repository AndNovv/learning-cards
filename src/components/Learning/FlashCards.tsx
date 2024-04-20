"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { FlashCardType } from '@/types/types'
import { MotionValue, motion, useAnimationControls, useMotionValue, useTransform } from 'framer-motion'
import { Progress } from "@/components/ui/progress"

type FlashcardStateType = 'front' | 'middle' | 'back' | 'prepared'

const FlashCards = ({ flashcards }: { flashcards: FlashCardType[] }) => {

    const [isAnimating, setIsAnimating] = useState(false)

    const [flashcardIndex, setFlashcardIndex] = useState(0)

    // const handleCardClick = useCallback(() => {
    //     if (!isAnimating) {
    //         setIsAnimating(true)
    //         setIsFlipped((prev) => !prev)
    //     }
    // }, [isAnimating])


    // useEffect(() => {
    //     setIsFlipped(false)
    // }, [flashcards])

    const flashcardStates = ['front', 'middle', 'back', 'prepared'] as const
    const [order, setOrder] = useState(0)

    const cardOffset = useMotionValue(0)

    const handleNextCard = () => {
        setOrder((prev) => prev - 1 >= 0 ? prev - 1 : 3)
        setFlashcardIndex((prev) => prev + 1)
        cardOffset.set(0)
    }


    return (
        <div className='relative h-80 w-full max-w-[500px]'>
            <SingleFlashCard hidden={((order + 0) % 4 + flashcardIndex) >= flashcards.length} progress={((order + 0) % 4 + flashcardIndex) / flashcards.length * 100} handleNextCard={handleNextCard} key={`${flashcards[0]._id}${flashcardStates[(order + 0) % 4]}`} flashcardState={flashcardStates[(order + 0) % 4]} flashcard={flashcards[(order + 0) % 4 + flashcardIndex]} cardOffset={cardOffset} isAnimating={isAnimating} setIsAnimating={setIsAnimating} />
            <SingleFlashCard hidden={((order + 1) % 4 + flashcardIndex) >= flashcards.length} progress={((order + 1) % 4 + flashcardIndex) / flashcards.length * 100} handleNextCard={handleNextCard} key={`${flashcards[1]._id}${flashcardStates[(order + 1) % 4]}`} flashcardState={flashcardStates[(order + 1) % 4]} flashcard={flashcards[(order + 1) % 4 + flashcardIndex]} cardOffset={cardOffset} isAnimating={isAnimating} setIsAnimating={setIsAnimating} />
            <SingleFlashCard hidden={((order + 2) % 4 + flashcardIndex) >= flashcards.length} progress={((order + 2) % 4 + flashcardIndex) / flashcards.length * 100} handleNextCard={handleNextCard} key={`${flashcards[2]._id}${flashcardStates[(order + 2) % 4]}`} flashcardState={flashcardStates[(order + 2) % 4]} flashcard={flashcards[(order + 2) % 4 + flashcardIndex]} cardOffset={cardOffset} isAnimating={isAnimating} setIsAnimating={setIsAnimating} />
            <SingleFlashCard hidden={((order + 3) % 4 + flashcardIndex) >= flashcards.length} progress={((order + 3) % 4 + flashcardIndex) / flashcards.length * 100} handleNextCard={handleNextCard} key={`${flashcards[3]._id}${flashcardStates[(order + 3) % 4]}`} flashcardState={flashcardStates[(order + 3) % 4]} flashcard={flashcards[(order + 3) % 4 + flashcardIndex]} cardOffset={cardOffset} isAnimating={isAnimating} setIsAnimating={setIsAnimating} />
        </div >

    )
}

export default FlashCards

export const SingleFlashCard = ({ hidden, progress, handleNextCard, flashcardState, flashcard, cardOffset, isAnimating, setIsAnimating }: { hidden: boolean, progress: number, handleNextCard: () => void, flashcardState: FlashcardStateType, flashcard: FlashCardType, cardOffset: MotionValue<number>, isAnimating: boolean, setIsAnimating: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const CARD_MAX_OFFESET = 100
    const CARD_SENSITIVITY = 50

    const opacity = useTransform(
        cardOffset,
        [-CARD_MAX_OFFESET, 0, CARD_MAX_OFFESET],
        [0.7, 1, 0.7]
    )

    const frontCardBackground = useTransform(
        cardOffset,
        [-CARD_MAX_OFFESET, 0, CARD_MAX_OFFESET],
        ['hsl(0, 50, 60)', "hsl(246 4 16)", 'hsl(114 20 60)']
    )

    const rotation = useTransform(
        cardOffset,
        [-CARD_MAX_OFFESET, CARD_MAX_OFFESET],
        [-15, 15]
    )

    const transform = useTransform(
        cardOffset,
        [-CARD_MAX_OFFESET, CARD_MAX_OFFESET],
        [-60, 60]
    )

    const baseTopValues = new Map<FlashcardStateType, number>([['front', 0], ['middle', 32], ['back', 64], ['prepared', 96]])
    const baseTop = baseTopValues.get(flashcardState) || 0

    const top = useTransform(
        cardOffset,
        [-CARD_MAX_OFFESET, 0, CARD_MAX_OFFESET],
        [-32 + baseTop, baseTop, -32 + baseTop]
    )

    const preparedOpacity = useTransform(
        cardOffset,
        [-CARD_MAX_OFFESET, 0, CARD_MAX_OFFESET],
        [1, 0, 1]
    )

    const baseScaleValues = new Map<FlashcardStateType, number>([['front', 1], ['middle', 0.9], ['back', 0.8], ['prepared', 0.7]])
    const baseScale = baseScaleValues.get(flashcardState) || 0

    const scale = useTransform(
        cardOffset,
        [-CARD_MAX_OFFESET, 0, CARD_MAX_OFFESET],
        [0.1 + baseScale, baseScale, 0.1 + baseScale]
    )

    const baseBackgroundValues = new Map<FlashcardStateType, string[]>([['middle', ["hsl(246 4 16)", "hsl(246 4 14)", "hsl(246 4 16)"]], ['back', ["hsl(246 4 14)", "hsl(246 4 12)", "hsl(246 4 14)"]], ['prepared', ["hsl(246 4 12)", "hsl(246 4 10)", "hsl(246 4 12)"]]])
    const baseBackground = baseBackgroundValues.get(flashcardState) || ["hsl(246 4 16)", "hsl(246 4 14)", "hsl(246 4 16)"]

    const background = useTransform(
        cardOffset,
        [-CARD_MAX_OFFESET, 0, CARD_MAX_OFFESET],
        baseBackground
    )

    const controls = useAnimationControls()
    const handlePanEnd = (offset: number) => {
        if (flashcardState === 'front') {
            if (offset > CARD_SENSITIVITY) {
                setIsAnimating(true)
                controls.start("moveRight").finally(() => {
                    setIsAnimating(false)
                    handleNextCard()
                })
            }
            else if (offset < -CARD_SENSITIVITY) {
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

    const [isFlipped, setIsFlipped] = useState(false)
    const [startTime, setStartTime] = useState<number | null>(null);

    const handleMouseDown = () => {
        setStartTime(Date.now());
    };

    const handleMouseUp = () => {
        if (startTime !== null) {
            const clickDuration = Date.now() - startTime;
            if (clickDuration < 200) {
                setIsFlipped((prev) => !prev)
            }
            setStartTime(null);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (flashcardState === 'front') {
                switch (event.key) {
                    case " ": // Space key
                        setIsFlipped((prev) => !prev)
                        break
                    default:
                        break
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    if (hidden) return null

    return (
        <motion.div
            style={flashcardState === 'front' ? {
                background: frontCardBackground,
                opacity,
                rotate: rotation,
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
                moveRight: { opacity: 0, rotate: 70, translateX: 300 },
                moveLeft: { opacity: 0, rotate: -70, translateX: -300 },
                front: { top: 0, scale: 1 },
                middle: { top: 32, scale: 0.9 },
                back: { top: 64, scale: 0.8 },
                prepared: { top: 96, scale: 0.7 },
            }}
            key={flashcard._id}
            initial={flashcardState}
            animate={controls}
            transition={{ duration: 0.4 }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onPan={(_e, pointInfo) => {
                !isAnimating ? cardOffset.set(pointInfo.offset.x > CARD_MAX_OFFESET ? CARD_MAX_OFFESET : pointInfo.offset.x < -CARD_MAX_OFFESET ? -CARD_MAX_OFFESET : pointInfo.offset.x) : null
            }}
            onPanEnd={(_e, info) => {
                handlePanEnd(info.offset.x)
            }}
            className='absolute flex flex-col p-8 px-10 shadow-md cursor-pointer rounded-2xl w-full h-full text-2xl'
        >
            <Progress value={progress} className='h-2' />
            <div className='relative flex flex-col flex-1 h-full justify-center items-center p-4 select-none'>
                <motion.p
                    className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center'
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isFlipped ? 0 : 1, transition: { ease: 'easeOut', duration: 0.25 } }}
                >{flashcard.english}</motion.p>
                <motion.p
                    className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isFlipped ? 1 : 0, transition: { ease: 'easeOut', duration: 0.25 } }}
                >{flashcard.russian}</motion.p>
            </div>
        </motion.div>
    )
}