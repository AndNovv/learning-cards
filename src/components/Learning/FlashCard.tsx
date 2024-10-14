"use client"
import React, { useEffect, useState } from 'react'
import { AnimationControls, MotionValue, motion, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Progress } from '../ui/progress'
import { AnyFlashCard } from '@/types/types'


const FlashCard = ({ controls, startingPosition, hidden, progress, handleNextCard, flashcard, cardOffset, isAnimating, setIsAnimating }: { controls: AnimationControls, startingPosition: number, hidden: boolean, progress: number, handleNextCard: (isRemembered: boolean) => void, flashcard: AnyFlashCard, cardOffset: MotionValue<number>, isAnimating: boolean, setIsAnimating: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const CARD_MAX_OFFESET = 150
    const CARD_SENSITIVITY = 50

    const [currentPosition, setCurrentPosition] = useState(startingPosition)
    const [swipeDirection, setSwipeDirection] = useState<'left' | 'right'>('left')

    const [isFlipped, setIsFlipped] = useState(false)

    useEffect(() => {
        setCurrentPosition(startingPosition)
        if (startingPosition === 3) {
            setIsFlipped(false)
        }
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
        [-1, 0, 1, 2, 3, 4],
        [0.7, 1, 1, 1, 0, 0]
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
        [-1, 0, 1, 2, 3, 4],
        [0, 0, 32, 64, 96, 96]
    )

    const scale = useTransform(
        position,
        [-1, 0, 1, 2, 3, 4],
        [1, 1, 0.9, 0.8, 0, 0]
    )

    const background = useTransform(
        position,
        [-1, 0, 1, 2, 3, 4],
        [swipeDirection === 'left' ? "hsl(0, 50, 60)" : 'hsl(114 20 60)', "hsl(246 4 16)", "hsl(246 4 14)", "hsl(246 4 12)", "hsl(246 4 10)", "hsl(246 4 10)"]
    )

    const zIndex = useTransform(
        position,
        [-1, 0, 1, 2, 3, 4],
        [5, 4, 3, 2, 1, 0]
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
                transition: "all 0.5s ease-out",
            }}
            variants={{
                moveRight: { opacity: 0, rotate: 70, translateX: 450, background: 'hsl(114 20 60)' },
                moveLeft: { opacity: 0, rotate: -70, translateX: -450, background: "hsl(0, 50, 60)" },
                shrink: { scale: 0 }
            }}
            animate={controls}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onMouseDown={!isAnimating ? handleMouseDown : () => { }}
            onMouseUp={!isAnimating ? handleMouseUp : () => { }}
            onPan={(_e, pointInfo) => { (!isAnimating && currentPosition === 0) ? cardOffset.set(pointInfo.offset.x > CARD_MAX_OFFESET ? CARD_MAX_OFFESET : pointInfo.offset.x < -CARD_MAX_OFFESET ? -CARD_MAX_OFFESET : pointInfo.offset.x) : null }}
            onPanEnd={(_e, info) => { (!isAnimating && currentPosition === 0) ? handlePanEnd(info.offset.x) : null }}
            className={cn(currentPosition === 0 ? 'cursor-pointer' : '', 'absolute flex flex-col p-8 px-10 shadow-md rounded-2xl w-full h-full text-2xl transition-opacity duration-0 ease-out')}
        >
            <Progress value={progress} className='h-2' />
            <div className='relative flex flex-col flex-1 h-full justify-center items-center p-4 select-none'>
                <motion.span
                    className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center'
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isFlipped ? 0 : 1, transition: { ease: 'easeOut', duration: 0.25 } }}
                >{flashcard.english}</motion.span>
                <motion.span
                    className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isFlipped ? 1 : 0, transition: { ease: 'easeOut', duration: 0.25 } }}
                >{flashcard.russian}</motion.span>
            </div>
        </motion.div >
    )
}

export default FlashCard