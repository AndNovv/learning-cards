"use client"
import { PublishedCOllectionType } from '@/types/types'
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
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/state/store'
import { useDispatch } from 'react-redux'
import { likePublishedCollection, dislikePublishedCollection } from '@/state/user/userSlice'
import { useRouter } from 'next/navigation'

const WordCollectionPreview = ({ wordCollection, isFavourite }: { wordCollection: PublishedCOllectionType, isFavourite: boolean }) => {

    const dispatch = useDispatch<AppDispatch>()

    const router = useRouter()

    const { user, loading, error } = useSelector((state: RootState) => state.user);

    const previewFlashCards = [...wordCollection.flashcards]
    previewFlashCards.length = 7



    const handleFavoutiteButtonClick = () => {
        if (isFavourite) {
            if (wordCollection.favouriteCount > 0) {
                wordCollection.favouriteCount -= 1
            }
            dispatch(dislikePublishedCollection({ userId: user._id, collectionId: wordCollection._id }))
        }
        else {
            wordCollection.favouriteCount += 1
            dispatch(likePublishedCollection({ userId: user._id, collectionId: wordCollection._id }))
        }
    }


    return (
        <Card className='w-[350px] flex flex-col'>
            <CardHeader>
                <CardTitle>{wordCollection.title}</CardTitle>
                <CardDescription>Автор: {wordCollection.authorName}</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col justify-between flex-1 gap-8'>
                <div className='relative flex-1'>
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
                <div className='flex justify-between items-center'>
                    <Button variant={'default'} size={'lg'} onClick={() => router.push(`/learning/${wordCollection._id}`)}>
                        Смотреть
                    </Button>
                    <div>{`${wordCollection.favouriteCount} лайков`}</div>
                    <Button variant={isFavourite ? 'default' : 'secondary'} size={'icon'} onClick={handleFavoutiteButtonClick}>
                        <Star />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default WordCollectionPreview