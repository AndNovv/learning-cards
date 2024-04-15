"use client"
import CollectionWords from '@/components/Collection/Preview/CollectionWords'
import { Button } from '@/components/ui/button';
import { WordCollection } from '@/types/types';
import { Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

const CollectionPage = ({ collection, setEditing }: { collection: WordCollection, setEditing: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const router = useRouter()

    return (
        <div className='relative flex flex-col h-full w-full pt-6 md:pt-1 overflow-hidden'>
            <div className='flex flex-col bg-background sticky top-0 z-10 paddings'>
                <div className='flex flex-row justify-between items-center'>
                    <div>
                        <h1 className='text-xl mt-2'>{collection.title}</h1>
                        <p className='text-muted-foreground mt-2 mb-4'>{`Автор: ${collection.author}`}</p>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <Button variant={'outline'} onClick={() => router.push(`/learning/${collection._id}`)}>
                            Проверить себя
                        </Button>
                        <Button onClick={() => setEditing((prev) => !prev)} variant={'outline'} size={'smallIcon'}>
                            <Settings className='size-5' />
                        </Button>
                    </div>
                </div>

            </div>
            <CollectionWords flashcards={collection.flashcards} />
        </div>
    )
}

export default CollectionPage