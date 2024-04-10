import { cn } from '@/lib/utils'
import { setVisibility } from '@/state/asideMenu/asideMenuSlice'
import { AppDispatch } from '@/state/store'
import { WordCollection } from '@/types/types'
import { Ellipsis, PenLine, Share } from 'lucide-react'
import { useRouter } from "next/navigation"
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { changeCollectionName, deleteCollectionFromUser, publishCollection } from '@/state/user/userSlice'
import { deleteCollectionDB } from '@/lib/collection/helpers'
import DeleteButtonWithAlert from './DeleteButtonWithAlert'
import { useOutsideFormClick } from '@/hooks/useOutsideFormClick'


const CardsCollectionAsideIcon = ({ collection, active, isDesktop }: { collection: WordCollection, active: boolean, isDesktop: boolean }) => {

    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()


    const handleClick = () => {
        if (!isDesktop) {
            dispatch(setVisibility(false))
        }
        router.push(`/collection/${collection._id}`)
    }

    const handleOptionsClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        setOptionsOpen(true)
    }

    const handleRenameClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        setOptionsOpen(false)
        setIsRenaming(true)
    }
    const handlePublishClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        setOptionsOpen(false)
        dispatch(publishCollection(collection._id))
    }

    const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        setOptionsOpen(false)
        deleteCollectionDB(collection._id)
        dispatch(deleteCollectionFromUser(collection._id))
    }

    const [optionsOpen, setOptionsOpen] = useState(false)
    const [isRenaming, setIsRenaming] = useState(false)

    const formRef = useOutsideFormClick(() => {
        if (formRef.current) {
            setIsRenaming(false)
            if (inputRef.current && inputRef.current.value.length > 0) {
                if (collection.title !== inputRef.current.value) {
                    dispatch(changeCollectionName({ collectionId: collection._id, collectionName: inputRef.current.value }))
                }
            }
        }
    });

    const inputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsRenaming(false)
        if (inputRef.current && inputRef.current.value.length > 0) {
            if (collection.title !== inputRef.current.value) {
                dispatch(changeCollectionName({ collectionId: collection._id, collectionName: inputRef.current.value }))
            }
        }
    }

    return (
        <div onClick={handleClick} className={cn('group flex flex-row justify-between gap-2 p-2 text-sm w-full rounded-xl text-left cursor-pointer transition-all', active ? 'bg-asideactive' : (optionsOpen ? 'bg-asidehover' : 'bg-aside hover:bg-asidehover'))}>
            {isRenaming ?
                <form ref={formRef} onSubmit={handleSubmit} className='w-full'>
                    <label>
                        <input
                            onClick={(e) => { e.stopPropagation() }}
                            ref={inputRef}
                            type="text"
                            defaultValue={collection.title}
                            placeholder='Новое название'
                            className='w-full'
                            autoFocus
                        />
                    </label>
                </form> :
                <h4>{collection.title}</h4>}
            <Popover open={optionsOpen} onOpenChange={setOptionsOpen}>
                <PopoverTrigger onClick={handleOptionsClick}>
                    <div className='h-full'>
                        <Ellipsis className={cn('group-hover:visible transition-all size-5 h-full', active ? 'visible' : (optionsOpen ? 'visible' : 'invisible'))} />
                    </div>
                </PopoverTrigger>
                <PopoverContent className='w-[200px]' onClick={(e) => e.stopPropagation()}>

                    <div className="grid text-sm">
                        <div className="inside flex items-center px-2 py-3 gap-4 hover:bg-accent transition-all cursor-pointer rounded-xl" onClick={handleRenameClick}>
                            <PenLine className='size-5 inside' />
                            <p className='inside'>Переименовать</p>
                        </div>
                        {!collection.publishedCollectionRef &&
                            <div className="inside flex items-center px-2 py-3 gap-4 hover:bg-accent transition-all cursor-pointer rounded-xl" onClick={handlePublishClick}>
                                <Share className='size-5 inside' />
                                <p className='inside'>Опубликовать</p>
                            </div>
                        }
                        <DeleteButtonWithAlert handleDeleteClick={handleDeleteClick} />
                    </div>
                </PopoverContent>
            </Popover>

        </div>
    )
}

export default CardsCollectionAsideIcon