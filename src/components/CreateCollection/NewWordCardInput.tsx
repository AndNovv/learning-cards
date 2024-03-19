"use client"
import React, { useRef, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { MoveHorizontal, Plus } from 'lucide-react'
import { addFlashCardToNewCollection } from '@/stores/new-collection-store'

const NewWordCardInput = () => {

    const englishWordInputRef = useRef<HTMLInputElement>(null)
    const russianWordInputRef = useRef<HTMLInputElement>(null)

    const [wordsOrderReversed, setWordsOrderReversed] = useState(false)

    const handleSubmitNewWordCard = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const englishInputRef = englishWordInputRef.current
        const russianInputRef = russianWordInputRef.current

        const english = englishInputRef?.value
        const russian = russianInputRef?.value

        if (english) {
            if (russian) {
                console.log(english)
                console.log(russian)
                addFlashCardToNewCollection({ english: english, russian: russian })
                englishInputRef.value = ''
                russianInputRef.value = ''
                wordsOrderReversed ? englishInputRef?.focus() : russianInputRef?.focus()
            }
            else {
                russianInputRef?.focus()
            }
        }
        else {
            if (russian) {
                englishInputRef?.focus()
            }
            else {
                wordsOrderReversed ? englishInputRef?.focus() : russianInputRef?.focus()
            }
        }
    }

    return (
        <div className='flex flex-col gap-2'>
            <h2 className='text-xl'>Добавьте слова в Коллекцию</h2>
            <form onSubmit={handleSubmitNewWordCard} className='flex flex-row gap-4'>
                <div className='flex flex-row gap-4 flex-1'>
                    <Input className={wordsOrderReversed ? 'order-first' : 'order-last'} placeholder='Английский' ref={englishWordInputRef} />
                    <MoveHorizontal className='h-10 shrink-0 cursor-pointer' onClick={() => { setWordsOrderReversed((prev) => !prev) }} />
                    <Input className={wordsOrderReversed ? 'order-last' : 'order-first'} placeholder='Русский' ref={russianWordInputRef} />
                </div>
                <Button type='submit' variant={'outline'} className='h-10 w-10 p-0 shrink-0'>
                    <Plus />
                </Button>
            </form>
        </div >
    )
}

export default NewWordCardInput