import React, { useState } from 'react'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { FillBlankExerciseType } from '@/types/types'


const FillBlankExercise = ({ fillBlankExercise }: { fillBlankExercise: FillBlankExerciseType }) => {


    const initialAnswers: { answer: string | undefined, correct: boolean | undefined }[] = fillBlankExercise.blankSentences.map(() => ({ answer: undefined, correct: undefined }));
    const [userAnswers, setUserAnswers] = useState(initialAnswers);

    function checkAnswers() {
        setUserAnswers((prev) => {
            return prev.map((el, index) => ({ answer: el.answer, correct: el.answer === fillBlankExercise.blankSentences[index].right }))
        })
        setChecked(true)
    }

    const usedOptions: string[] = []
    userAnswers.forEach((el) => { if (el.answer) { usedOptions.push(el.answer) } })

    const unusedOptions: string[] = []
    fillBlankExercise.options.forEach((el) => { if (!usedOptions.includes(el)) { unusedOptions.push(el) } })

    const countOfRightAnswers = userAnswers.reduce((sum, el) => sum += el.correct ? 1 : 0, 0)
    const rightAnswersRatio = countOfRightAnswers / fillBlankExercise.blankSentences.length

    const [checked, setChecked] = useState(false)

    function changeValue(value: string, index: number) {
        setUserAnswers((prev) => {
            const newArr = prev.map(el => ({ answer: el.answer === value ? undefined : el.answer, correct: undefined }))
            newArr[index].answer = value
            return newArr
        })
        setChecked(false)
    }

    return (
        <div className='space-y-4'>
            <h1 className='font-medium text-2xl'>Заполните пропуски</h1>

            <div className='flex flex-wrap gap-x-4 bg-[#252529] border-gray-700 border rounded-md p-4'>
                {fillBlankExercise.options.map((option) => (
                    <span key={option} className={cn(usedOptions.includes(option) ? 'line-through opacity-60' : null)}>{option}</span>
                ))}
            </div>

            <div className='space-y-2'>
                {fillBlankExercise.blankSentences.map((exercise, index) => {
                    const blankSplittedSentence = exercise.sentence.split('___________')
                    const beforeBlank = blankSplittedSentence[0]
                    const afterBlank = blankSplittedSentence[1]
                    return (
                        <div
                            key={`${userAnswers[index].answer}-${index}`}
                            className='space-x-2'
                        >
                            <span>{`${index + 1}. ${beforeBlank}`}</span>


                            <Select value={userAnswers[index].answer}
                                onValueChange={(value) => changeValue(value, index)}
                            >
                                <SelectTrigger className={cn("w-fit gap-2 inline-flex", userAnswers[index].correct !== undefined && (userAnswers[index].correct ? 'border-green-500' : 'border-red-500'), userAnswers[index].answer === undefined ? 'border-yellow-200' : null)}>
                                    <SelectValue placeholder="Заполнить" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Варианты</SelectLabel>
                                        {unusedOptions.map((option, index) => (
                                            <SelectItem key={`${option}${index}`} value={option}>{option}</SelectItem>
                                        ))}
                                        {usedOptions.map((option, index) => (
                                            <SelectItem className='opacity-70' key={`${option}${index}`} value={option}>{option}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <span>{afterBlank}</span>

                        </div>
                    )
                })}

            </div>


            <div className='flex gap-4 items-center justify-end w-full'>
                {checked && <div className={cn(rightAnswersRatio < 0.5 ? 'text-red-500' : rightAnswersRatio < 0.7 ? 'text-orange-500' : rightAnswersRatio < 0.85 ? 'text-yellow-500' : 'text-green-500')}>{`${countOfRightAnswers} правильных из ${fillBlankExercise.blankSentences.length}`}</div>}
                <Button variant={'outline'} onClick={checkAnswers}>Проверить себя</Button>
            </div>
        </div >
    )
}

export default FillBlankExercise