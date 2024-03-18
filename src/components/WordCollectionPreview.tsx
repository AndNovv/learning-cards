"use client"
import { WordCollection } from '@/types/types'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Star } from 'lucide-react'
import { Button } from './ui/button'
import { useFavouritesStore } from '@/providers/favourites-store-provider'

const WordCollectionPreview = ({ wordCollection }: { wordCollection: WordCollection }) => {

    const previewFlashCards = [...wordCollection.flashcards]
    previewFlashCards.length = 7

    const { favourites, addFavourite, deleteFavourite } = useFavouritesStore((state) => { return state })

    const handleFavoutiteButtonClick = () => {
        if (isFavourite) {
            deleteFavourite(wordCollection.id)
        }
        else {
            addFavourite(wordCollection.id)
        }
    }

    const isFavourite = favourites.has(wordCollection.id)

    return (
        <Card className='w-[350px]'>
            <CardHeader>
                <CardTitle>{wordCollection.title}</CardTitle>
                <CardDescription>Автор: {wordCollection.author}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className='relative'>
                    {previewFlashCards.map((flashcard, index) => {
                        return (
                            <div key={`${wordCollection.title}${index}`} className='flex gap-2'>
                                <p>{flashcard.english}</p>
                                <p>-</p>
                                <p>{flashcard.russian}</p>
                            </div>
                        )
                    })}
                    <div className='absolute top-0 left-0 h-full w-full bg-gradient-to-b from-transparent to-card to-100%'>
                    </div>
                </div>
            </CardContent>
            <CardFooter className='flex justify-between'>
                <Button variant={'default'} size={'lg'}>
                    Начать
                </Button>
                <Button variant={isFavourite ? 'default' : 'secondary'} size={'icon'} onClick={handleFavoutiteButtonClick}>
                    <Star />
                </Button>
            </CardFooter>
        </Card>
    )
}

export default WordCollectionPreview