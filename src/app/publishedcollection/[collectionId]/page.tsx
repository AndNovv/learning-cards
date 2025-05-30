"use client"
import LoadingPublishedCollectionPage from '@/components/PublishedCollection/LoadingPublishCollectionPage'
import PublishedCollectionWords from '@/components/PublishedCollection/PublishedCollectionWords'
import { Button } from '@/components/ui/button'
import useFavoritePublishedCollections from '@/hooks/useFavoritePublishedCollections'
import { initCurrentPracticeCollection } from '@/state/currentPracticeCollection/currentPracticeCollectionSlice'
import { AppDispatch, RootState } from '@/state/store'
import { dislikePublishedCollection, likePublishedCollection } from '@/state/user/userSlice'
import { PublishedCollectionType } from '@/types/types'
import axios from 'axios'
import { Heart, ListTodo, Star } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const PublishedCollectionPage = ({ params }: { params: { collectionId: string } }) => {

    const dispatch = useDispatch<AppDispatch>()

    const { user } = useSelector((state: RootState) => state.user)

    const { status } = useSession()

    const [publishedCollection, setPublishedCollection] = useState<PublishedCollectionType | null>(null)
    const [error, setError] = useState<boolean>(false)

    const favouritePublishedCollections = useFavoritePublishedCollections()

    const isFavourite = favouritePublishedCollections.includes(params.collectionId)

    const router = useRouter()

    const fetchPublishedCollection = async () => {
        try {
            const response = await axios.get(`/api/publishedcollection/${params.collectionId}`)
            if (response.status === 200) {
                setPublishedCollection(response.data)
            }
        } catch (e) {
            setError(true)
        }
    }

    useEffect(() => {
        fetchPublishedCollection()
    }, [])

    if (error) return <div>Ошибка... Страница недоступна</div>

    if (!publishedCollection) return <LoadingPublishedCollectionPage />

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

    const checkYourSelf = () => {
        dispatch(initCurrentPracticeCollection({ collectionLink: `/publishedcollection/${params.collectionId}`, flashcards: publishedCollection.flashcards }))
        router.push('/learning/collection')
    }

    return (
        <div className='relative flex flex-col gap-2 h-full overflow-hidden pt-6 md:pt-0'>
            <div className='flex flex-col bg-background paddings'>
                <div className='flex flex-row justify-between items-center'>
                    <div>
                        <h3>{publishedCollection.title}</h3>
                        <span className='text-muted-foreground mt-2'>{`Автор: ${publishedCollection.authorName}`}</span>
                    </div>

                    <div className='flex gap-5 items-center'>
                        <Button className='gap-2 h-10 w-10 p-2 md:px-4 md:py-2 md:w-auto' variant={'outline'} onClick={checkYourSelf}>
                            <ListTodo size={20} />
                            <span className='hidden md:block'>Проверить себя</span>
                        </Button>
                        <div className='flex gap-2 items-center opacity-70'>
                            <span>{publishedCollection.favouriteCount}</span>
                            <Heart size={18} />
                        </div>
                        {user._id !== publishedCollection.authorId && status === 'authenticated' &&
                            <Button variant={isFavourite ? 'default' : 'secondary'} size={'smallIcon'} onClick={handleFavoutiteButtonClick}>
                                <Star size={20} className={!isFavourite ? 'opacity-70 transition-all' : 'transition-all'} />
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