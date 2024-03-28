"use client"
import WordCollectionPreview from '@/components/WordCollectionPreview'
import { ScrollArea } from '@/components/ui/scroll-area'
import { WordCollection } from '@/types/types'
import axios from 'axios'
import React, { useEffect, useState } from 'react'


const AllCollectionsPage = () => {

    const [collections, setCollections] = useState<WordCollection[] | null>(null)

    async function fetchCollections() {
        try {
            const { data } = await axios.get(`/api/collection/all`)
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
                        <WordCollectionPreview key={`wordCollection${index}`} wordCollection={wordCollection} />
                    )
                })}
            </div>
        </ScrollArea>
    )
}

export default AllCollectionsPage