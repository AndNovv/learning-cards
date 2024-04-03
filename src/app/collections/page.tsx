"use client"
import WordCollectionPreview from '@/components/PublishedCollection/WordCollectionPreview'
import { ScrollArea } from '@/components/ui/scroll-area'
import useFavoritePublishedCollections from '@/hooks/useFavoritePublishedCollections'
import { PublishedCOllectionType } from '@/types/types'
import axios from 'axios'
import React, { useEffect, useState } from 'react'


const AllCollectionsPage = () => {

    const [collections, setCollections] = useState<PublishedCOllectionType[] | null>(null)

    const favouritePublishedCollections = useFavoritePublishedCollections()

    async function fetchCollections() {
        try {
            const { data }: { data: PublishedCOllectionType[] } = await axios.get(`/api/publishedcollection/all`)
            setCollections(data)
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchCollections()
    }, [])

    if (!collections) return <div>Данные не найдены</div>

    return (
        <ScrollArea className='h-full'>
            <div className='flex flex-row flex-wrap gap-6 justify-center'>
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