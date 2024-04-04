"use client"
import PublishedCollectionWords from '@/components/PublishedCollection/PublishedCollectionWords'
import { Button } from '@/components/ui/button'
import useFavoritePublishedCollections from '@/hooks/useFavoritePublishedCollections'
import { AppDispatch, RootState } from '@/state/store'
import { dislikePublishedCollection, likePublishedCollection } from '@/state/user/userSlice'
import { PublishedCollectionType } from '@/types/types'
import axios from 'axios'
import { Star } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const PublishedCollectionPage = ({ params }: { params: { collectionId: string } }) => {

    const dispatch = useDispatch<AppDispatch>()

    const { user } = useSelector((state: RootState) => state.user)

    const [publishedCollection, setPublishedCollection] = useState<PublishedCollectionType | null>(null)
    const [error, setError] = useState<boolean>(false)

    const favouritePublishedCollections = useFavoritePublishedCollections()

    const isFavourite = favouritePublishedCollections.includes(params.collectionId)

    const fetchPublishedCollection = async () => {
        const response = await axios.get(`/api/publishedcollection/${params.collectionId}`)
        if (response.status === 200) {
            setPublishedCollection(response.data)
        }
        else {
            setError(true)
        }
    }

    useEffect(() => {
        fetchPublishedCollection()
    }, [])

    if (error) return <div>Ошибка... Страница недоступна</div>

    if (!publishedCollection) return <div>Загрузка...</div>

    const handleFavoutiteButtonClick = () => {
        if (isFavourite) {
            if (publishedCollection.favouriteCount > 0) {
                setPublishedCollection((prev) => {
                    if (prev) return { ...prev, favouriteCount: prev.favouriteCount - 1 }
                    return prev
                })
            }
            dispatch(dislikePublishedCollection({ userId: user._id, collectionId: publishedCollection._id }))
        }
        else {
            setPublishedCollection((prev) => {
                if (prev) return { ...prev, favouriteCount: prev.favouriteCount + 1 }
                return prev
            })
            dispatch(likePublishedCollection({ userId: user._id, collectionId: publishedCollection._id }))
        }
    }

    return (
        <div className='relative flex flex-col xl:px-60 lg:px-40 md:px-20 px-1 h-full'>
            <div className='flex flex-col bg-background'>
                <div className='flex flex-row justify-between items-center'>
                    <div>
                        <h1 className='text-xl mt-2'>{publishedCollection.title}</h1>
                        <p className='text-muted-foreground mt-2 mb-4'>{`Автор: ${publishedCollection.authorName}`}</p>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <p>{publishedCollection.favouriteCount} лайков</p>
                        {user._id !== publishedCollection.authorId &&
                            <Button variant={isFavourite ? 'default' : 'secondary'} size={'icon'} onClick={handleFavoutiteButtonClick}>
                                <Star />
                            </Button>
                        }
                    </div>
                </div>

            </div>
            <PublishedCollectionWords flashcards={publishedCollection.flashcards} />
        </div>
    )
}

export default PublishedCollectionPage