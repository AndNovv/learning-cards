"use client"
import WordCollectionPreview from '@/components/WordCollectionPreview'
import { allCollections } from '@/data/data'
import React from 'react'

const AllCollectionsPage = () => {


    return (
        <div className='flex flex-row flex-wrap gap-6 justify-center'>
            {allCollections.map((wordCollection, index) => {
                return (
                    <WordCollectionPreview key={`wordCollection${index}`} wordCollection={wordCollection} />
                )
            })}
        </div>
    )
}

export default AllCollectionsPage