"use client"
import CollectionWordsPreview from '@/components/CreateCollection/CollectionWordsPreview'
import NewWordCardInput from '@/components/CreateCollection/NewWordCardInput'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { allCollections } from '@/data/data'
import { addFavouriteCollection } from '@/stores/favourites-store'
import { resetNewCollection, useNewCollectionStore } from '@/stores/new-collection-store'
import { WordCollection } from '@/types/types'
import React, { useRef } from 'react'

const CreateCollectionPage = () => {

    const { toast } = useToast()

    const nameInputRef = useRef<HTMLInputElement>(null)

    const { flashcards } = useNewCollectionStore((state) => state)

    const handleCreateCollectionButtonClick = () => {
        if (nameInputRef.current?.value) {
            if (flashcards.length >= 5) {
                console.log('success')
                const collection: WordCollection = {
                    id: allCollections.length,
                    author: 'user',
                    title: nameInputRef.current.value,
                    flashcards: flashcards
                }
                addFavouriteCollection(collection)
                allCollections.push(collection)
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
            <div className='flex flex-row gap-4 mb-8'>
                <Input ref={nameInputRef} placeholder='Введите название Коллекции' />
                <Button onClick={handleCreateCollectionButtonClick} variant={'outline'}>Создать</Button>
            </div>
            <NewWordCardInput />
            <CollectionWordsPreview flashcards={flashcards} />
        </div>
    )
}

export default CreateCollectionPage