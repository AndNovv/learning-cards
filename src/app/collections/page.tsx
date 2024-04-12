"use client"
import WordCollectionPreview from '@/components/PublishedCollection/WordCollectionPreview'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import useFavoritePublishedCollections from '@/hooks/useFavoritePublishedCollections'
import useMediaQuery from '@/hooks/useMediaQuery'
import { PublishedCollectionType } from '@/types/types'
import axios from 'axios'
import React, { useEffect, useState } from 'react'


const AllCollectionsPage = () => {

    const [collections, setCollections] = useState<PublishedCollectionType[] | null>(null)

    const favouritePublishedCollections = useFavoritePublishedCollections()

    async function fetchCollections() {
        try {
            const { data }: { data: PublishedCollectionType[] } = await axios.get(`/api/publishedcollection/all`)
            setCollections(data)
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchCollections()
    }, [])

    if (!collections) return (
        <div className='flex flex-row flex-wrap gap-6 justify-center paddings pt-6 md:pt-0'>
            <Skeleton className='w-[350px] h-[370px]' />
            <Skeleton className='w-[350px] h-[370px]' />
            <Skeleton className='w-[350px] h-[370px]' />
            <Skeleton className='w-[350px] h-[370px]' />
            <Skeleton className='w-[350px] h-[370px]' />
            <Skeleton className='w-[350px] h-[370px]' />
        </div>
    )

    return (
        <ScrollArea className='h-full paddings'>
            <div className='flex flex-row flex-wrap gap-6 justify-center pb-6 pt-6 md:pt-0'>
                {collections.map((wordCollection, index) => {
                    return (
                        <WordCollectionPreview key={`wordCollection${index}`} wordCollection={wordCollection} isFavourite={favouritePublishedCollections.includes(wordCollection._id)} />
                    )
                })}
            </div>
        </ScrollArea>
    )
}

export default AllCollectionsPage