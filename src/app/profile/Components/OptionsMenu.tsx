"use client"
import React, { useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import DeleteButtonWithAlert from '../../../components/Aside/DeleteButtonWithAlert'
import { deletePublishedCollection } from '@/state/user/userSlice'
import { Ellipsis, PenLine } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/state/store'

const OptionsMenu = ({ collectionId }: { collectionId: string }) => {

    const dispatch = useDispatch<AppDispatch>()

    const handleOptionsClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        setOptionsOpen(true)
    }

    const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        setOptionsOpen(false)
        dispatch(deletePublishedCollection(collectionId))
    }

    const handleUpdateClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        setOptionsOpen(false)
        console.log('update')
    }

    const [optionsOpen, setOptionsOpen] = useState(false)

    return (
        <Popover open={optionsOpen} onOpenChange={setOptionsOpen}>
            <PopoverTrigger onClick={handleOptionsClick}>
                <div className='p-2 flex justify-center items-center rounded-sm hover:bg-[#393939]'>
                    <Ellipsis className='size-5' />
                </div>
            </PopoverTrigger>
            <PopoverContent className='w-[200px]'>

                <div className="grid text-sm">
                    <div className="flex items-center px-2 py-3 gap-4 hover:bg-accent transition-all cursor-pointer rounded-xl" onClick={handleUpdateClick}>
                        <PenLine className='size-5' />
                        <span>Обновить</span>
                    </div>
                    <DeleteButtonWithAlert handleDeleteClick={handleDeleteClick} />
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default OptionsMenu