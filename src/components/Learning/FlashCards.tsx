"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { FlashCardType } from '@/types/types'
import { MotionValue, motion, useAnimationControls, useMotionValue, useTransform } from 'framer-motion'
import { Progress } from "@/components/ui/progress"

type FlashcardStateType = 'front' | 'middle' | 'back' | 'prepared'

const FlashCards = ({ flashcards }: { flashcards: FlashCardType[] }) => {

    const [isAnimating, setIsAnimating] = useState(false)
    const [flashcardIndex, setFlashcardIndex] = useState(0)

    const flashcardStates = ['front', 'middle', 'back', 'prepared'] as const
    const [order, setOrder] = useState(0)

    const cardOffset = useMotionValue(0)


    const handleNextCard = () => {
        setOrder((prev) => prev - 1 >= 0 ? prev - 1 : 3)
        setFlashcardIndex((prev) => prev + 1)
        cardOffset.setWithVelocity(0, 0, 1)
    }

    return (
        <div className='relative h-80 w-full max-w-[500px]'>
            <SingleFlashCard startingPosition={(order + 0) % 4} hidden={((order + 0) % 4 + flashcardIndex) >= flashcards.length} progress={((order + 0) % 4 + flashcardIndex) / flashcards.length * 100} handleNextCard={handleNextCard} flashcardState={flashcardStates[(order + 0) % 4]} flashcard={flashcards[(order + 0) % 4 + flashcardIndex]} cardOffset={cardOffset} isAnimating={isAnimating} setIsAnimating={setIsAnimating} />
            <SingleFlashCard startingPosition={(order + 1) % 4} hidden={((order + 1) % 4 + flashcardIndex) >= flashcards.length} progress={((order + 1) % 4 + flashcardIndex) / flashcards.length * 100} handleNextCard={handleNextCard} flashcardState={flashcardStates[(order + 1) % 4]} flashcard={flashcards[(order + 1) % 4 + flashcardIndex]} cardOffset={cardOffset} isAnimating={isAnimating} setIsAnimating={setIsAnimating} />
            <SingleFlashCard startingPosition={(order + 2) % 4} hidden={((order + 2) % 4 + flashcardIndex) >= flashcards.length} progress={((order + 2) % 4 + flashcardIndex) / flashcards.length * 100} handleNextCard={handleNextCard} flashcardState={flashcardStates[(order + 2) % 4]} flashcard={flashcards[(order + 2) % 4 + flashcardIndex]} cardOffset={cardOffset} isAnimating={isAnimating} setIsAnimating={setIsAnimating} />
            <SingleFlashCard startingPosition={(order + 3) % 4} hidden={((order + 3) % 4 + flashcardIndex) >= flashcards.length} progress={((order + 3) % 4 + flashcardIndex) / flashcards.length * 100} handleNextCard={handleNextCard} flashcardState={flashcardStates[(order + 3) % 4]} flashcard={flashcards[(order + 3) % 4 + flashcardIndex]} cardOffset={cardOffset} isAnimating={isAnimating} setIsAnimating={setIsAnimating} />
        </div >

    )
}

export default FlashCards

export const SingleFlashCard = ({ startingPosition, hidden, progress, handleNextCard, flashcardState, flashcard, cardOffset, isAnimating, setIsAnimating }: { startingPosition: number, hidden: boolean, progress: number, handleNextCard: () => void, flashcardState: FlashcardStateType, flashcard: FlashCardType, cardOffset: MotionValue<number>, isAnimating: boolean, setIsAnimating: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const CARD_MAX_OFFESET = 150
    const CARD_SENSITIVITY = 50

    const [currentPosition, setCurrentPosition] = useState(startingPosition)
    const [swipeDirection, setSwipeDirection] = useState<'left' | 'right'>('left')

    const [flipAllowed, setFlipAllowed] = useState(true)
    const [isFlipped, setIsFlipped] = useState(false)


    useEffect(() => {
        setCurrentPosition(startingPosition)
    }, [startingPosition])

    const position = useTransform(
        cardOffset,
        [-CARD_MAX_OFFESET, 0, CARD_MAX_OFFESET],
        [currentPosition - 1, currentPosition, currentPosition - 1]
    )

    useEffect(() => {
        const updateSwipeDirection = (value: number) => {
            if (swipeDirection === 'left' && value > 0 || swipeDirection === 'right' && value < 0) {
                setSwipeDirection((prev) => prev === 'left' ? 'right' : 'left')
            }
        }
        const updateDirection = cardOffset.on("change", (value) => {
            updateSwipeDirection(value)
        })

        return () => {
            updateDirection()
        }
    }, [swipeDirection])

    const opacity = useTransform(
        position,
        [-1, 0, 1, 2, 3],
        [0.7, 1, 1, 1, 0]
    )

    const rotation = useTransform(
        cardOffset,
        [-CARD_MAX_OFFESET, CARD_MAX_OFFESET],
        [currentPosition === 0 ? -15 : 0, currentPosition === 0 ? 15 : 0]
    )

    const transform = useTransform(
        cardOffset,
        [-CARD_MAX_OFFESET, CARD_MAX_OFFESET],
        [currentPosition === 0 ? -60 : 0, currentPosition === 0 ? 60 : 0]
    )

    const top = useTransform(
        position,
        [-1, 0, 1, 2, 3],
        [0, 0, 32, 64, 96]
    )

    const scale = useTransform(
        position,
        [-1, 0, 1, 2, 3],
        [1, 1, 0.9, 0.8, 0.7]
    )

    const background = useTransform(
        position,
        [-1, 0, 1, 2, 3],
        [swipeDirection === 'left' ? "hsl(0, 50, 60)" : 'hsl(114 20 60)', "hsl(246 4 16)", "hsl(246 4 14)", "hsl(246 4 12)", "hsl(246 4 10)"]
    )

    const zIndex = useTransform(
        position,
        [-1, 0, 1, 2, 3],
        [5, 4, 3, 2, 1]
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
            style={{
                opacity,
                rotate: rotation,
                background,
                zIndex,
                scale,
                top,
                translateX: transform,
                transition: "all 0.4s ease-out, opacity 0s ease-out",
            }}
            variants={{
                moveRight: { opacity: 0, rotate: 70, translateX: 300 },
                moveLeft: { opacity: 0, rotate: -70, translateX: -300 },
            }}
            key={flashcard._id}
            animate={controls}
            transition={{ duration: 0.4 }}
            onClick={() => { if (flipAllowed) setIsFlipped((prev) => !prev) }}
            onPanStart={(_e, _pointinfo) => setFlipAllowed(false)}
            onPan={(_e, pointInfo) => {
                !isAnimating ? cardOffset.set(pointInfo.offset.x > CARD_MAX_OFFESET ? CARD_MAX_OFFESET : pointInfo.offset.x < -CARD_MAX_OFFESET ? -CARD_MAX_OFFESET : pointInfo.offset.x) : null
            }}
            onPanEnd={(_e, info) => {
                setFlipAllowed(true)
                handlePanEnd(info.offset.x)
            }}
            className='absolute flex flex-col p-8 px-10 shadow-md cursor-pointer rounded-2xl w-full h-full text-2xl transition-all'
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
        </motion.div >
    )
}