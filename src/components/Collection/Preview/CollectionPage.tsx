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
        <div className='relative flex flex-col gap-2 h-full w-full pt-6 md:pt-0 overflow-hidden'>
            <div className='flex flex-col bg-background sticky top-0 z-10 paddings'>
                <div className='flex flex-row justify-between items-center'>
                    <div>
                        <h3>{collection.title}</h3>
                        <span className='text-muted-foreground mt-2'>{`Автор: ${collection.author}`}</span>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <Button className='gap-2 h-10 w-10 p-2 md:px-4 md:py-2 md:w-auto' variant={'outline'} onClick={checkYourSelf}>
                            <ListTodo size={20} />
                            <span className='hidden md:block'>Проверить себя</span>
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