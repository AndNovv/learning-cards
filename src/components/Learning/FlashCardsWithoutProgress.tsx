"use client"
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimationControls, MotionValue, motion, useAnimationControls, useMotionValue, useTransform } from 'framer-motion'
import { Progress } from "@/components/ui/progress"
import ForgetButton from './ForgetButton'
import RememberButton from './RememberButton'
import { cn } from '@/lib/utils'
import { ClientFlashCardType } from '@/types/types'
import { useRouter } from 'next/navigation'
import FlashCard from './FlashCard'

const FlashCardsWithoutProgress = ({ flashcards }: { flashcards: ClientFlashCardType[] }) => {

    const NUMBER_OF_CARDS = 5

    const [isAnimating, setIsAnimating] = useState(false)
    const [flashcardIndex, setFlashcardIndex] = useState(0)

    const router = useRouter()

    useEffect(() => {
        if (flashcardIndex >= flashcards.length) {
            // router.push(`/collection/${collectionId}`)
            router.back()
        }
    }, [flashcardIndex])

    const [order, setOrder] = useState(0)

    const cardOffset = useMotionValue(0)

    const controlsOne = useAnimationControls()
    const controlsTwo = useAnimationControls()
    const controlsThree = useAnimationControls()
    const controlsFour = useAnimationControls()
    const controlsFive = useAnimationControls()

    const allControls = useMemo(() => [controlsOne, controlsTwo, controlsThree, controlsFour, controlsFive], [controlsOne, controlsTwo, controlsThree, controlsFour, controlsFive])

    const handleNextCard = useCallback((() => {
        cardOffset.set(0)
        setOrder((prev) => prev - 1 >= 0 ? prev - 1 : NUMBER_OF_CARDS - 1)
        setFlashcardIndex((prev) => prev + 1)
    }), [cardOffset])

    const handleButtonClick = useCallback(((isRemembered: boolean) => {
        if (!isAnimating) {
            setIsAnimating(true)
            if (isRemembered) {
                allControls[(NUMBER_OF_CARDS - order) % NUMBER_OF_CARDS].start("moveRight").finally(() => {
                    allControls[(NUMBER_OF_CARDS - order) % NUMBER_OF_CARDS].start('shrink').finally(() => {
                        setIsAnimating(false)
                        handleNextCard()
                    })
                })
            }
            else {
                allControls[(NUMBER_OF_CARDS - order) % NUMBER_OF_CARDS].start("moveLeft").finally(() => {
                    allControls[(NUMBER_OF_CARDS - order) % NUMBER_OF_CARDS].start('shrink').finally(() => {
                        setIsAnimating(false)
                        handleNextCard()
                    })
                })
            }
        }
    }), [order, handleNextCard, allControls, isAnimating])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!isAnimating) {
                switch (event.key) {
                    case 'ArrowLeft':
                        handleButtonClick(false)
                        break
                    case 'a':
                        handleButtonClick(false)
                        break
                    case 'A':
                        handleButtonClick(false)
                        break
                    case 'ф':
                        handleButtonClick(false)
                        break
                    case 'Ф':
                        handleButtonClick(false)
                        break
                    case "ArrowRight":
                        handleButtonClick(true)
                        break
                    case 'd':
                        handleButtonClick(true)
                        break
                    case 'D':
                        handleButtonClick(true)
                        break
                    case 'В':
                        handleButtonClick(true)
                        break
                    case 'в':
                        handleButtonClick(true)
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
    }, [handleButtonClick, isAnimating]);


    return (
        <>
            <div className='relative h-80 w-full max-w-[500px] touch-none'>
                <FlashCard key={'flashcard1'} controls={controlsOne} startingPosition={(order + 0) % 5} hidden={((order + 0) % 5 + flashcardIndex) >= flashcards.length} progress={((order + 0) % 5 + flashcardIndex) / flashcards.length * 100} handleNextCard={handleNextCard} flashcard={flashcards[(order + 0) % 5 + flashcardIndex]} cardOffset={cardOffset} isAnimating={isAnimating} setIsAnimating={setIsAnimating} />
                <FlashCard key={'flashcard2'} controls={controlsTwo} startingPosition={(order + 1) % 5} hidden={((order + 1) % 5 + flashcardIndex) >= flashcards.length} progress={((order + 1) % 5 + flashcardIndex) / flashcards.length * 100} handleNextCard={handleNextCard} flashcard={flashcards[(order + 1) % 5 + flashcardIndex]} cardOffset={cardOffset} isAnimating={isAnimating} setIsAnimating={setIsAnimating} />
                <FlashCard key={'flashcard3'} controls={controlsThree} startingPosition={(order + 2) % 5} hidden={((order + 2) % 5 + flashcardIndex) >= flashcards.length} progress={((order + 2) % 5 + flashcardIndex) / flashcards.length * 100} handleNextCard={handleNextCard} flashcard={flashcards[(order + 2) % 5 + flashcardIndex]} cardOffset={cardOffset} isAnimating={isAnimating} setIsAnimating={setIsAnimating} />
                <FlashCard key={'flashcard4'} controls={controlsFour} startingPosition={(order + 3) % 5} hidden={((order + 3) % 5 + flashcardIndex) >= flashcards.length} progress={((order + 3) % 5 + flashcardIndex) / flashcards.length * 100} handleNextCard={handleNextCard} flashcard={flashcards[(order + 3) % 5 + flashcardIndex]} cardOffset={cardOffset} isAnimating={isAnimating} setIsAnimating={setIsAnimating} />
                <FlashCard key={'flashcard5'} controls={controlsFive} startingPosition={(order + 4) % 5} hidden={((order + 4) % 5 + flashcardIndex) >= flashcards.length} progress={((order + 4) % 5 + flashcardIndex) / flashcards.length * 100} handleNextCard={handleNextCard} flashcard={flashcards[(order + 4) % 5 + flashcardIndex]} cardOffset={cardOffset} isAnimating={isAnimating} setIsAnimating={setIsAnimating} />
            </div >
            <div className='flex flex-row w-full justify-between'>
                <ForgetButton handleButtonClick={() => handleButtonClick(false)} />
                <RememberButton handleButtonClick={() => handleButtonClick(true)} />
            </div>
        </>

    )
}

export default FlashCardsWithoutProgress

export const SingleFlashCard = ({ controls, startingPosition, hidden, progress, handleNextCard, flashcard, cardOffset, isAnimating, setIsAnimating }: { controls: AnimationControls, startingPosition: number, hidden: boolean, progress: number, handleNextCard: (isRemembered: boolean) => void, flashcard: ClientFlashCardType, cardOffset: MotionValue<number>, isAnimating: boolean, setIsAnimating: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const CARD_MAX_OFFESET = 150
    const CARD_SENSITIVITY = 50

    const [currentPosition, setCurrentPosition] = useState(startingPosition)
    const [swipeDirection, setSwipeDirection] = useState<'left' | 'right'>('left')

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
        [1, 1, 0.9, 0.8, 0]
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

    const handlePanEnd = (offset: number) => {
        if (currentPosition === 0) {
            if (offset > CARD_SENSITIVITY) {
                setIsAnimating(true)
                controls.start("moveRight").finally(() => {
                    controls.start('shrink').finally(() => {
                        setIsAnimating(false)
                        handleNextCard(true)
                    })
                })
            }
            else if (offset < -CARD_SENSITIVITY) {
                setIsAnimating(true)
                controls.start("moveLeft").finally(() => {
                    controls.start('shrink').finally(() => {
                        setIsAnimating(false)
                        handleNextCard(false)
                    })
                })
            }
            else {
                cardOffset.set(0)
            }
        }

    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (currentPosition === 0 && !isAnimating) {
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
    }, [setIsFlipped, currentPosition, isAnimating]);


    const [clickStartTime, setClickStartTime] = useState<number | null>(null)

    const handleMouseDown = () => {
        setClickStartTime(Date.now())
    }

    const handleMouseUp = () => {
        if (clickStartTime !== null) {
            const clickDuration = Date.now() - clickStartTime;
            if (clickDuration < 150) {
                setIsFlipped((prev) => !prev)
            }
            setClickStartTime(null);
        }
    }

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
                transition: "all 0.5s ease-out, opacity 0.01s linear",
            }}
            variants={{
                moveRight: { opacity: 0, rotate: 70, translateX: 450, background: 'hsl(114 20 60)' },
                moveLeft: { opacity: 0, rotate: -70, translateX: -450, background: "hsl(0, 50, 60)" },
                shrink: { scale: 0, top: 96, transition: { duration: 0.1 } }
            }}
            animate={controls}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            onMouseDown={!isAnimating ? handleMouseDown : () => { }}
            onMouseUp={!isAnimating ? handleMouseUp : () => { }}
            onPan={(_e, pointInfo) => { (!isAnimating && currentPosition === 0) ? cardOffset.set(pointInfo.offset.x > CARD_MAX_OFFESET ? CARD_MAX_OFFESET : pointInfo.offset.x < -CARD_MAX_OFFESET ? -CARD_MAX_OFFESET : pointInfo.offset.x) : null }}
            onPanEnd={(_e, info) => { handlePanEnd(info.offset.x) }}
            className={cn(currentPosition === 0 ? 'cursor-pointer' : '', 'absolute flex flex-col p-8 px-10 shadow-md rounded-2xl w-full h-full text-2xl transition-opacity duration-0 ease-out')}
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