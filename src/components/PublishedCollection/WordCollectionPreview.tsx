"use client"
import { PublishedCollectionType } from '@/types/types'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Heart, MessageCircleMore, Star } from 'lucide-react'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/state/store'
import { useDispatch } from 'react-redux'
import { likePublishedCollection, dislikePublishedCollection } from '@/state/user/userSlice'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const WordCollectionPreview = ({ wordCollection, isFavourite }: { wordCollection: PublishedCollectionType, isFavourite: boolean }) => {

    const dispatch = useDispatch<AppDispatch>()

    const router = useRouter()

    const { user, loading, error } = useSelector((state: RootState) => state.user);

    const { status } = useSession()

    const publishedCollectionsId = user.publishedCollections.map((el) => el._id)

    const previewFlashCards = [...wordCollection.flashcards]
    previewFlashCards.length = 7

    const handleFavoutiteButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
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
        <Card className='w-full flex flex-col shadow-xl cursor-pointer' onClick={() => router.push(`/publishedcollection/${wordCollection._id}`)}>
            <CardHeader>
                <CardTitle>{wordCollection.title}</CardTitle>
                <CardDescription>Автор: {wordCollection.authorName}</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col justify-between flex-1 gap-8'>
                <div className='relative flex flex-col gap-1 flex-1 overflow-hidden'>
                    {previewFlashCards.map((flashcard, index) => {
                        return (
                            <div key={`${wordCollection.title}${index}`} className='flex gap-x-2 flex-wrap'>
                                <span className=''>{flashcard.english}</span>
                                <span className=''>-</span>
                                <span className=''>{flashcard.russian}</span>
                            </div>
                        )
                    })}
                    <div className='absolute top-0 left-0 h-full w-full bg-gradient-to-b from-transparent to-card to-100%'>
                    </div>
                </div>
                <div className='flex justify-between items-center h-10'>
                    <div className='flex gap-5'>
                        <div className='flex gap-2 items-center justify-center opacity-70'>
                            <span>{wordCollection.favouriteCount}</span>
                            <Heart size={18} />
                        </div>
                        <div className='flex gap-2 items-center justify-center opacity-70'>
                            <span>0</span>
                            <MessageCircleMore size={18} />
                        </div>

                    </div>

                    {!publishedCollectionsId.includes(wordCollection._id) && (

                        status === 'unauthenticated' ? null : isFavourite ? (
                            <Button variant={'default'} size={'smallIcon'} onClick={handleFavoutiteButtonClick}>
                                <Star size={20} />
                            </Button>) :
                            (
                                <Button variant={'secondary'} size={'smallIcon'} onClick={handleFavoutiteButtonClick}>
                                    <Star size={20} className='opacity-70' />
                                </Button>
                            )
                    )
                    }
                </div>
            </CardContent>
        </Card>
    )
}

export default WordCollectionPreview