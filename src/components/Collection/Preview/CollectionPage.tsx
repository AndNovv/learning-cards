"use client"
import CollectionWords from '@/components/Collection/Preview/CollectionWords'
import { Button } from '@/components/ui/button';
import { WordCollection } from '@/types/types';
import { Settings } from 'lucide-react';
import React from 'react'

const CollectionPage = ({ collection, setEditing }: { collection: WordCollection, setEditing: React.Dispatch<React.SetStateAction<boolean>> }) => {

    return (
        <div className='relative flex flex-col xl:px-60 lg:px-40 md:px-20 px-1 h-full'>
            <div className='flex flex-col bg-background'>
                <div className='flex flex-row justify-between items-center'>
                    <div>
                        <h1 className='text-xl mt-2'>{collection.title}</h1>
                        <p className='text-muted-foreground mt-2 mb-4'>{`Автор: ${collection.author}`}</p>
                    </div>

                    <Button onClick={() => setEditing((prev) => !prev)} variant={'outline'} size={'smallIcon'}>
                        <Settings className='size-5' />
                    </Button>
                </div>

            </div>
            <CollectionWords collection={collection} />
        </div>
    )
}

export default CollectionPage