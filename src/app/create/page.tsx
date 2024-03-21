"use client"
import CollectionWordsPreview from '@/components/CreateCollection/CollectionWordsPreview'
import NewWordCardInput from '@/components/CreateCollection/NewWordCardInput'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { addFavouriteCollection } from '@/stores/favourites-store'
import { resetNewCollection, useNewCollectionStore } from '@/stores/new-collection-store'
import { FlashCardType, WordCollection } from '@/types/types'
import React, { useRef } from 'react'

async function createCollection(title: string, flashcards: FlashCardType[]) {

    const request = { title, flashcards }
    const response = await fetch('http://localhost:3000/api/collections/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(request)
    });

    const result: WordCollection = await response.json()
    console.log(result)
    addFavouriteCollection(result)
    return result
}

const CreateCollectionPage = () => {

    const { toast } = useToast()

    const nameInputRef = useRef<HTMLInputElement>(null)

    const { flashcards } = useNewCollectionStore((state) => state)

    const handleSubmitNewWordCollection = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (nameInputRef.current?.value) {
            if (flashcards.length >= 5) {
                createCollection(nameInputRef.current.value, flashcards)
                resetNewCollection()
                nameInputRef.current.value = ''
            }
            else {
                toast({
                    title: "Слишком мало карт",
                    description: "В коллекции должно быть как минимум 5 карточек",
                })
            }
        }
        else {
            toast({
                title: "Сначала введите имя вашей коллекции",
            })
            if (nameInputRef.current) {
                nameInputRef.current.focus()
            }
        }
    }

    return (
        <div className='flex flex-col xl:px-60 lg:px-40 md:px-20 px-1'>
            <h2 className='text-2xl mb-4'>Создание новой Коллекции</h2>
            <form onSubmit={handleSubmitNewWordCollection} className='flex flex-row gap-4 mb-8'>
                <Input ref={nameInputRef} placeholder='Введите название Коллекции' />
                <Button type={'submit'} variant={'outline'}>Создать</Button>
            </form>
            <NewWordCardInput />
            <CollectionWordsPreview flashcards={flashcards} />
        </div>
    )
}

export default CreateCollectionPage