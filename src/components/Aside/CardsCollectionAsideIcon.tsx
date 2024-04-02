import { cn } from '@/lib/utils'
import { WordCollection } from '@/types/types'
import { useRouter } from "next/navigation"
import React from 'react'

const CardsCollectionAsideIcon = ({ collection, active }: { collection: WordCollection, active: boolean }) => {

    const router = useRouter()

    return (
        <div onClick={() => router.push(`/collection/${collection._id}`)} className={cn('p-2 text-sm w-full rounded-xl text-left cursor-pointer transition-all', active ? 'bg-accent hover:bg-accent' : 'bg-background hover:bg-hover')}>
            {collection.title}
        </div>
    )
}

export default CardsCollectionAsideIcon