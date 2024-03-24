import WordCollectionPreview from '@/components/WordCollectionPreview'
import { WordCollection } from '@/types/types'
import React from 'react'


async function AllCollectionsPage() {

    async function fetchCollections() {
        try {
            const res = await fetch("http://localhost:3000/api/collection/all", { cache: "no-store" })
            const collections = await res.json()
            return collections
        }
        catch (e) {
            console.log(e)
        }
    }

    let collections: WordCollection[] | null
    try {
        collections = await fetchCollections()
    }
    catch (e) {
        return <div>Данные не найдены</div>
    }


    if (!collections) return <div>Данные не найдены</div>

    return (
        <div className='flex flex-row flex-wrap gap-6 justify-center'>
            {collections.map((wordCollection, index) => {
                return (
                    <WordCollectionPreview key={`wordCollection${index}`} wordCollection={wordCollection} />
                )
            })}
        </div>
    )
}

export default AllCollectionsPage