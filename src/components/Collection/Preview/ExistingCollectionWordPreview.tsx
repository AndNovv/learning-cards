import * as React from "react"
import { FlashCardType } from "@/types/types"

const ExistingCollectionWordPreview = ({ flashcard }: { flashcard: FlashCardType }) => {

    return (
        <div className='flex flex-row hover:bg-hover transition-all cursor-pointer px-4 py-3 justify-between gap-4'>
            <div className='flex flex-row gap-2 w-full items-center'>
                <p>{flashcard.english}</p>
                <p>-</p>
                <p>{flashcard.russian}</p>
            </div>
        </div>
    )
}

export default ExistingCollectionWordPreview 