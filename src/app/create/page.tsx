"use client"
import CollectionWordsPreview from '@/components/CreateCollection/CollectionWordsPreview'
import NewWordCardInput from '@/components/CreateCollection/NewWordCardInput'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { resetCollection } from '@/state/newCollection/newCollectionSlice'
import { AppDispatch, RootState } from '@/state/store'
import { createNewCollectionAndAddToUser } from '@/state/user/userSlice'
import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'


const CreateCollectionPage = () => {

    const { user, loading, error } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>()

    const { toast } = useToast()

    const nameInputRef = useRef<HTMLInputElement>(null)

    const newCollection = useSelector((state: RootState) => state.newCollection)
    const flashcards = newCollection.flashcards

    const handleSubmitNewWordCollection = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (nameInputRef.current?.value) {
            if (flashcards.length >= 5) {
                dispatch(createNewCollectionAndAddToUser({ userId: user._id, collection: { title: nameInputRef.current.value, author: user.name, flashcards } }))
                dispatch(resetCollection())
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