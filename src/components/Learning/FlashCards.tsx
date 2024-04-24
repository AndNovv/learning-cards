"use client"
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FlashCardType } from '@/types/types'
import { useAnimationControls, useMotionValue } from 'framer-motion'
import ForgetButton from './ForgetButton'
import RememberButton from './RememberButton'
import FlashCard from './FlashCard'


const FlashCards = ({ flashcards, handleFlashcard }: { flashcards: FlashCardType[], handleFlashcard: (isRemembered: boolean) => void }) => {


    const NUMBER_OF_CARDS = 5

    const [isAnimating, setIsAnimating] = useState(false)
    const [flashcardIndex, setFlashcardIndex] = useState(0)

    const [order, setOrder] = useState(0)

    const cardOffset = useMotionValue(0)

    const controlsOne = useAnimationControls()
    const controlsTwo = useAnimationControls()
    const controlsThree = useAnimationControls()
    const controlsFour = useAnimationControls()
    const controlsFive = useAnimationControls()

    const allControls = useMemo(() => [controlsOne, controlsTwo, controlsThree, controlsFour, controlsFive], [controlsOne, controlsTwo, controlsThree, controlsFour, controlsFive])

    const handleNextCard = useCallback(((isRemembered: boolean) => {
        cardOffset.set(0)
        handleFlashcard(isRemembered)
        setOrder((prev) => prev - 1 >= 0 ? prev - 1 : NUMBER_OF_CARDS - 1)
        setFlashcardIndex((prev) => prev + 1)
    }), [cardOffset, handleFlashcard])

    const handleButtonClick = useCallback(((isRemembered: boolean) => {
        if (!isAnimating) {
            setIsAnimating(true)
            if (isRemembered) {
                allControls[(NUMBER_OF_CARDS - order) % NUMBER_OF_CARDS].start("moveRight").finally(() => {
                    allControls[(NUMBER_OF_CARDS - order) % NUMBER_OF_CARDS].start('shrink').finally(() => {
                        setIsAnimating(false)
                        handleNextCard(true)
                    })
                })
            }
            else {
                allControls[(NUMBER_OF_CARDS - order) % NUMBER_OF_CARDS].start("moveLeft").finally(() => {
                    allControls[(NUMBER_OF_CARDS - order) % NUMBER_OF_CARDS].start('shrink').finally(() => {
                        setIsAnimating(false)
                        handleNextCard(false)
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

export default FlashCards
