import { RootState } from '@/state/store'
import { PublishedCollectionType } from '@/types/types'
import axios from 'axios'
import { Ellipsis } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const UserPublishedCollections = () => {

    const { user } = useSelector((state: RootState) => state.user)

    const [publishedcollections, setPublishedCollections] = useState<PublishedCollectionType[]>([])

    const fetchPublishedCollections = async () => {
        if (user._id) {
            const response = await axios(`/api/publishedcollection/user/${user._id}`)
            console.log(response.status)
            console.log(response.data)
            if (response.status === 200) {
                setPublishedCollections(response.data)
            }
        }
    }

    useEffect(() => {
        fetchPublishedCollections()
    }, [user._id])

    const router = useRouter()

    const monthNames = [
        'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
    ];

    return (
        <div className='w-full'>
            <h2 className='text-2xl mb-4'>Ваши публикации</h2>
            {publishedcollections.length > 0 &&
                <div className='divide-y w-full border rounded-xl overflow-hidden'>
                    <div key={`collectionColumns`} className='grid grid-cols-12 leading-8 gap-2 text-nowrap w-full px-4 py-1 text-white opacity-60'>
                        <p className='col-span-5'>Название</p>
                        <p className='col-span-2 flex justify-center'>Лайки</p>
                        <p className='col-span-4 flex justify-center'>Опубликована</p>
                    </div>
                    {publishedcollections.map((colleciton) => {
                        const date = new Date(colleciton.publishedAt)
                        const time = `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
                        return (
                            <div key={`collection${colleciton._id}`} className='grid grid-cols-12 leading-8 gap-2 text-nowrap w-full px-4 py-1 cursor-pointer hover:bg-hover transition-all' onClick={() => router.push(`publishedcollection/${colleciton._id}`)}>
                                <p className='col-span-5'>{colleciton.title}</p>
                                <p className='col-span-2 flex justify-center'>{colleciton.favouriteCount}</p>
                                <p className='col-span-4 flex justify-center'>{time}</p>
                                <div className='col-span-1 flex justify-center'>
                                    <div className='p-2 flex justify-center items-center rounded-sm hover:bg-accent'>
                                        <Ellipsis className='size-5' />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default UserPublishedCollections