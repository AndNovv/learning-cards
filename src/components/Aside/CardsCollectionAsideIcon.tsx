import { cn } from '@/lib/utils'
import { setVisibility } from '@/state/asideMenu/asideMenuSlice'
import { AppDispatch } from '@/state/store'
import { WordCollection } from '@/types/types'
import { useRouter } from "next/navigation"
import React from 'react'
import { useDispatch } from 'react-redux'

const CardsCollectionAsideIcon = ({ collection, active, isDesktop }: { collection: WordCollection, active: boolean, isDesktop: boolean }) => {

    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()

    const handleClick = () => {
        if (!isDesktop) {
            dispatch(setVisibility(false))
        }
        router.push(`/collection/${collection._id}`)
    }

    return (
        <div onClick={handleClick} className={cn('p-2 text-sm w-full rounded-xl text-left cursor-pointer transition-all', active ? 'bg-accent hover:bg-accent' : 'bg-background hover:bg-hover')}>
            {collection.title}
        </div>
    )
}

export default CardsCollectionAsideIcon