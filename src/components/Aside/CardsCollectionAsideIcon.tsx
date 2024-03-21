import { WordCollection } from '@/types/types'
import { Scroll } from 'lucide-react'
import { useRouter } from "next/navigation"
import React from 'react'

const CardsCollectionAsideIcon = ({ collection }: { collection: WordCollection }) => {

    const router = useRouter()

    return (
        <div onClick={() => router.push(`/collection/${collection._id}`)} className='group relative flex items-center justify-center w-14 h-14 rounded-full hover:rounded-3xl bg-accent hover:bg-primary hover:text-primary-foreground cursor-pointer transition-all'>
            <Scroll />
            <div className='absolute left-20 bg-secondary text-secondary-foreground border p-2 rounded-xl invisible group-hover:visible'>
                <p className='text-nowrap'>{collection.title}</p>
            </div>
        </div>
    )
}

export default CardsCollectionAsideIcon