"use client"
import CollectionWordsPreview from '@/components/CreateCollection/CollectionWordsPreview'
import NewWordCardInput from '@/components/CreateCollection/NewWordCardInput'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { resetCollection } from '@/state/newCollection/newCollectionSlice'
import { AppDispatch, RootState } from '@/state/store'
import { createNewCollectionAndAddToUser } from '@/state/user/userSlice'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { TailSpin } from 'react-loader-spinner'
import { cn } from '@/lib/utils'


const CreateCollectionPage = () => {

    const { user, loading, error } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>()

    const { toast } = useToast()

    const router = useRouter()

    const titleInputRef = useRef<HTMLInputElement>(null)

    const newCollection = useSelector((state: RootState) => state.newCollection)
    const flashcards = newCollection.flashcards


    const createNewCollection = async (title: string) => {
        const newCollection = await dispatch(createNewCollectionAndAddToUser({ collection: { title: title, author: user.name, authorId: user._id, flashcards } })).unwrap()
        if (newCollection) router.push(`/collection/${newCollection._id}`)

    }

    const handleSubmitNewWordCollection = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (titleInputRef.current?.value) {
            if (flashcards.length > 0) {
                createNewCollection(titleInputRef.current.value)
                dispatch(resetCollection())
                setIsCreating(true)
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

    const [isCreating, setIsCreating] = useState(false)

    return (
        <div className='relative flex flex-col h-full pt-6 md:pt-1 overflow-hidden'>
            <div className='sticky top-0 bg-background z-10 paddings'>
                <form onSubmit={handleSubmitNewWordCollection} className='flex flex-row gap-3 mb-6'>
                    <Input ref={titleInputRef} placeholder='Введите название Коллекции' />
                    <Button type={'submit'} variant={'outline'}>Создать</Button>
                </form>
                <NewWordCardInput />
            </div>
            <CollectionWordsPreview flashcards={flashcards} />
            <div className={cn(isCreating ? 'visible' : 'invisible', 'flex flex-col gap-2 justify-center items-center h-full w-full absolute top-0 left-0')}>
                <TailSpin
                    visible={isCreating}
                    height="80"
                    width="80"
                    color="#f0f0f0"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
                <span className='text-xl'>Создаем коллекцию</span>
            </div>
        </div>
    )
}

export default CreateCollectionPage