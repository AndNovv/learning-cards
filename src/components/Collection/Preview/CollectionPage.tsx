"use client"
import CollectionWords from '@/components/Collection/Preview/CollectionWords'
import { Button } from '@/components/ui/button';
import { initCurrentPracticeCollection } from '@/state/currentPracticeCollection/currentPracticeCollectionSlice';
import { WordCollection } from '@/types/types';
import { ListTodo, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useDispatch } from 'react-redux';

const CollectionPage = ({ collection, setEditing }: { collection: WordCollection, setEditing: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const router = useRouter()

    const dispatch = useDispatch()

    const checkYourSelf = () => {
        dispatch(initCurrentPracticeCollection({ collectionLink: `/collection/${collection._id}`, flashcards: collection.flashcards }))
        router.push('/learning/collection')
    }


    return (
        <div className='relative flex flex-col h-full w-full pt-6 md:pt-1 overflow-hidden'>
            <div className='flex flex-col bg-background sticky top-0 z-10 paddings'>
                <div className='flex flex-row justify-between items-center'>
                    <div>
                        <h1 className='text-xl mt-2'>{collection.title}</h1>
                        <p className='text-muted-foreground mt-2 mb-4'>{`Автор: ${collection.author}`}</p>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <Button className='gap-2 h-10 w-10 p-2 md:px-4 md:py-2 md:w-auto' variant={'outline'} onClick={checkYourSelf}>
                            <ListTodo size={20} />
                            <p className='hidden md:block'>Проверить себя</p>
                        </Button>
                        <Button onClick={() => setEditing((prev) => !prev)} variant={'outline'} size={'smallIcon'}>
                            <Settings className='size-5' />
                        </Button>
                    </div>
                </div>

            </div>
            <CollectionWords flashcards={collection.flashcards} bottomPadding={true} />
        </div>
    )
}

export default CollectionPage