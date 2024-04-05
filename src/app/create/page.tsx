"use client"
import CollectionWordsPreview from '@/components/CreateCollection/CollectionWordsPreview'
import NewWordCardInput from '@/components/CreateCollection/NewWordCardInput'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { resetCollection } from '@/state/newCollection/newCollectionSlice'
import { AppDispatch, RootState } from '@/state/store'
import { createNewCollectionAndAddToUser } from '@/state/user/userSlice'
import { WordCollection } from '@/types/types'
import { useRouter } from 'next/navigation'
import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'


const CreateCollectionPage = () => {

    const { user, loading, error } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>()

    const { toast } = useToast()

    const router = useRouter()

    const titleInputRef = useRef<HTMLInputElement>(null)

    const newCollection = useSelector((state: RootState) => state.newCollection)
    const flashcards = newCollection.flashcards


    const createNewCollection = async (title: string) => {
        const newCollection = await dispatch(createNewCollectionAndAddToUser({ userId: user._id, collection: { title: title, author: user.name, flashcards } })).unwrap()
        if (newCollection) {
            router.push(`/collection/${newCollection._id}`)
        }
    }

    const handleSubmitNewWordCollection = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (titleInputRef.current?.value) {
            if (flashcards.length > 0) {
                createNewCollection(titleInputRef.current.value)
                dispatch(resetCollection())
                titleInputRef.current.value = ''
            }
            else {
                toast({
                    title: "Слишком мало карт",
                    description: "Добавьте хотя бы одну карту в коллекцию",
                })
            }
        }
        else {
            toast({
                title: "Сначала введите имя вашей коллекции",
            })
            if (titleInputRef.current) {
                titleInputRef.current.focus()
            }
        }
    }

    return (
        <div className='flex flex-col xl:px-60 lg:px-40 md:px-20 px-1 h-full'>
            <h2 className='text-2xl mb-4'>Создание новой Коллекции</h2>
            <form onSubmit={handleSubmitNewWordCollection} className='flex flex-row gap-4 mb-6'>
                <Input ref={titleInputRef} placeholder='Введите название Коллекции' />
                <Button type={'submit'} variant={'outline'}>Создать</Button>
            </form>
            <NewWordCardInput />
            <CollectionWordsPreview flashcards={flashcards} />
        </div>
    )
}

export default CreateCollectionPage