"use client"
import WordCollectionPreview from '@/components/PublishedCollection/WordCollectionPreview'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import useFavoritePublishedCollections from '@/hooks/useFavoritePublishedCollections'
import { cn } from '@/lib/utils'
import { PublishedCollectionType } from '@/types/types'
import axios from 'axios'
import { Metadata } from 'next'
import React, { useCallback, useEffect, useState } from 'react'


type CategoryType = 'popular' | 'official' | 'new'


const AllCollectionsPage = () => {

    const [collections, setCollections] = useState<PublishedCollectionType[] | null>(null)

    const favouritePublishedCollections = useFavoritePublishedCollections()

    const [activeCategory, setActiveCategory] = useState<CategoryType>('popular')

    const fetchCollections = useCallback(async () => {
        try {
            const { data }: { data: PublishedCollectionType[] } = await axios.get(`/api/publishedcollection/${activeCategory}`)
            setCollections(data)
        }
        catch (e) {
            console.log(e)
        }
    }, [activeCategory])

    useEffect(() => {
        fetchCollections()
    }, [fetchCollections])

    if (!collections) return (
        <div className='flex flex-col gap-6 flex-1 overflow-hidden pt-6 md:pt-0'>

            <div className='paddings w-full'>
                <ScrollArea className='w-full h-full'>
                    <div className='flex space-x-4'>
                        <Button className={cn(activeCategory === 'popular' ? 'bg-card hover:bg-hover' : 'hover:bg-hover')} variant={'outline'} size={'lg'}>Популярные</Button>
                        <Button className={cn(activeCategory === 'official' ? 'bg-card hover:bg-hover' : 'hover:bg-hover')} variant={'outline'} size={'lg'}>Официальные</Button>
                        <Button className={cn(activeCategory === 'new' ? 'bg-card hover:bg-hover' : 'hover:bg-hover')} variant={'outline'} size={'lg'} >Новые</Button>
                    </div>
                    <ScrollBar className='invisible' orientation="horizontal" />
                </ScrollArea>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6 paddings'>
                <Skeleton className='w-full h-[370px]' />
                <Skeleton className='w-full h-[370px]' />
                <Skeleton className='w-full h-[370px]' />
                <Skeleton className='w-full h-[370px]' />
                <Skeleton className='w-full h-[370px]' />
                <Skeleton className='w-full h-[370px]' />
            </div>
        </div>
    )

    return (
        <div className='flex w-full flex-col gap-6 pt-6 md:pt-0 flex-1 overflow-hidden'>

            <div className='paddings w-full'>
                <ScrollArea className='w-full h-full'>
                    <div className='flex space-x-4'>
                        <Button className={cn(activeCategory === 'popular' ? 'bg-card hover:bg-hover' : 'hover:bg-hover')} onClick={() => setActiveCategory('popular')} variant={'outline'} size={'lg'}>Популярные</Button>
                        <Button className={cn(activeCategory === 'official' ? 'bg-card hover:bg-hover' : 'hover:bg-hover')} onClick={() => setActiveCategory('official')} variant={'outline'} size={'lg'}>Официальные</Button>
                        <Button className={cn(activeCategory === 'new' ? 'bg-card hover:bg-hover' : 'hover:bg-hover')} onClick={() => setActiveCategory('new')} variant={'outline'} size={'lg'} >Новые</Button>
                    </div>
                    <ScrollBar className='invisible' orientation="horizontal" />
                </ScrollArea>
            </div>

            <ScrollArea className='h-full paddings'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6'>
                    {collections.map((wordCollection, index) => {
                        return (
                            <WordCollectionPreview key={`wordCollection${index}`} wordCollection={wordCollection} isFavourite={favouritePublishedCollections.includes(wordCollection._id)} />
                        )
                    })}
                </div>
            </ScrollArea >
        </div>
    )
}

export default AllCollectionsPage