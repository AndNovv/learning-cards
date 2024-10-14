"use client"
import CollectionWords from '@/components/Collection/Preview/CollectionWords'
import { RootState } from '@/state/store'
import { FlashCardType } from '@/types/types'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'

const OverviewPage = () => {

    const { user } = useSelector((state: RootState) => state.user)

    const calculateFlashcards = () => {
        const allFlashccards: FlashCardType[] = []
        user.collections.forEach((collection) => {
            collection.flashcards.forEach((flashcard) => allFlashccards.push(flashcard))
        })
        const sortedFlashcards = allFlashccards.sort((a, b) => b.EF - a.EF)
        return sortedFlashcards
    }

    const sortedFlashcards = calculateFlashcards()

    return (
        <div className='relative flex flex-col gap-2 h-full w-full pt-6 md:pt-1 overflow-hidden'>
            <div className='flex justify-between gap-2 bg-background sticky top-0 z-10 paddings'>
                <h3>Трудные карточки</h3>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button className='rounded-full' variant="outline">?</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className='p-2'>
                            Сверху расположены самые сложные слова, можете воспользоваться помощью ассистента чтобы лучше их запомнить. Внизу, наоборот, расположены самые простые слова
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <CollectionWords flashcards={sortedFlashcards} bottomPadding={true} />
        </div>
    )
}

export default OverviewPage