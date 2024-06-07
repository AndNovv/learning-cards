import { cn, shuffle } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { motion } from 'framer-motion'
import { wordDefinitionExerciseType } from '@/types/types'

const DefinitionExercise = ({ wordDefinitionsExercise }: { wordDefinitionsExercise: wordDefinitionExerciseType }) => {

    const [wordAnswers, setWordAnswers] = useState<{ word: string, correct: boolean | null }[]>([])
    const definitions = wordDefinitionsExercise.map((newWord) => newWord.definition)

    useEffect(() => {
        const randomizedWords = shuffle(wordDefinitionsExercise.map((newWord) => ({ word: newWord.word, correct: null })))
        setWordAnswers(randomizedWords);
    }, []);

    const [active, setActive] = useState<null | string>(null)
    const [checked, setChecked] = useState(false)

    function wordClickHandle(word: string) {

        // Нажатие на первый элемент для свапа
        if (active === null) {
            setActive(word)
        }

        // Нажатие на второй элемент
        else {

            // Сброс "правильно" - "неправильно"
            if (checked) {
                setChecked(false)
                setWordAnswers((prev) => {
                    return prev.map((el) => ({ word: el.word, correct: null }))
                })
            }

            // Повторное нажатие на то же слово
            if (active === word) {
                setActive(null)
            }

            // Свап двух слов
            else {
                setWordAnswers((prev) => {
                    const newArr = [...prev];
                    const activeWordIndex = newArr.findIndex((el) => el.word === active);
                    const clickedWordIndex = newArr.findIndex((el) => el.word === word);
                    [newArr[activeWordIndex], newArr[clickedWordIndex]] = [newArr[clickedWordIndex], newArr[activeWordIndex]]
                    return newArr
                })
                setActive(null)
            }
        }
    }

    const countOfRightAnswers = wordAnswers.reduce((sum, el) => sum + (el.correct ? 1 : 0), 0)
    const rightAnswersRatio = countOfRightAnswers / wordDefinitionsExercise.length

    function checkAnswers() {
        setActive(null)
        setWordAnswers((prev) => {
            const newArr = prev.map((el, index) => ({ word: el.word, correct: wordDefinitionsExercise[index].word === el.word }))
            return newArr
        })
        setChecked(true)
    }

    const generateGridElements = () => {
        const elements: React.ReactNode[] = []
        wordAnswers.forEach((wordAnswer, index) => {
            elements.push(
                <motion.div
                    layout="position"
                    transition={{ duration: 0.5 }}
                    key={`word-${wordAnswer.word}`}
                    onClick={() => wordClickHandle(wordAnswer.word)}
                    className={cn('bg-[#252529] border border-gray-700 w-full text-center h-fit my-auto rounded-sm px-2 py-1 col-span-3 hover:bg-[#353b43] cursor-pointer', wordAnswer.correct !== null && (wordAnswer.correct ? 'border-green-500' : 'border-red-500'), wordAnswer.word === active ? 'bg-[#353b43]' : null)}
                >
                    {wordAnswer.word}
                </motion.div>)

            elements.push(
                <motion.div layout key={`definition-${index}`} className='col-span-5 my-auto'>
                    {`${definitions[index]}`}
                </motion.div>
            )
        })
        return elements
    }

    if (wordAnswers.length === 0) return <div>Loading...</div>

    return (
        <div className='space-y-4'>
            <h1 className='text-2xl font-medium'>Сопоставьте слова с их значениями</h1>

            <div className='flex flex-col gap-1'>
                <div className='grid grid-cols-8 gap-y-2 gap-x-3'>
                    {generateGridElements().map((el) => el)}
                </div>
            </div>

            <div className='flex gap-4 items-center justify-end w-full'>
                {checked && <div className={cn(rightAnswersRatio < 0.5 ? 'text-red-500' : rightAnswersRatio < 0.7 ? 'text-orange-500' : rightAnswersRatio < 0.85 ? 'text-yellow-500' : 'text-green-500')}>{`${countOfRightAnswers} правильных из ${wordDefinitionsExercise.length}`}</div>}
                <Button variant={'outline'} onClick={checkAnswers}>Проверить себя</Button>
            </div>
        </div>
    )
}

export default DefinitionExercise