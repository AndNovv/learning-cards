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
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/state/store'
import { useDispatch } from 'react-redux'
import { addCollectionToUser, deleteCollectionFromUser } from '@/state/user/userSlice'
import { useRouter } from 'next/navigation'

const WordCollectionPreview = ({ wordCollection }: { wordCollection: WordCollection }) => {

    const dispatch = useDispatch<AppDispatch>()

    const router = useRouter()

    const { user, loading, error } = useSelector((state: RootState) => state.user);
    const favouriteCollections = user.collections

    const previewFlashCards = [...wordCollection.flashcards]
    previewFlashCards.length = 7


    const isFavouriteFn = () => favouriteCollections.findIndex((element) => {
        return element._id == wordCollection._id
    }) !== -1

    const isFavourite = isFavouriteFn()

    const handleFavoutiteButtonClick = () => {
        if (isFavourite) {
            dispatch(deleteCollectionFromUser(wordCollection._id))
        }
        else {
            dispatch(addCollectionToUser(wordCollection))
        }
    }


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
                <Button variant={'default'} size={'lg'} onClick={() => router.push(`/learning/${wordCollection._id}`)}>
                    Смотреть
                </Button>
                <Button variant={isFavourite ? 'default' : 'secondary'} size={'icon'} onClick={handleFavoutiteButtonClick}>
                    <Star />
                </Button>
            </CardFooter>
        </Card>
    )
}

export default WordCollectionPreview