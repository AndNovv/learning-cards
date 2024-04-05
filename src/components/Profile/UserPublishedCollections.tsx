import { AppDispatch, RootState } from '@/state/store'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux'
import OptionsMenu from './OptionsMenu'

const UserPublishedCollections = () => {

    const { user } = useSelector((state: RootState) => state.user)
    const publishedCollections = user.publishedCollections

    const router = useRouter()

    const monthNames = [
        'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
    ];

    return (
        <div className='w-full'>
            <h2 className='text-2xl mb-4'>Ваши публикации</h2>
            {publishedCollections.length === 0 && <div className='text-white opacity-60'>Вы еще не опубликовали ни одной коллекции...</div>}
            {publishedCollections.length > 0 &&
                <div className='flex flex-col divide-y w-full border rounded-xl overflow-hidden'>
                    <div key={`collectionColumns`} className='grid grid-cols-12 leading-8 gap-2 text-nowrap w-full px-4 py-1 text-white opacity-60'>
                        <p className='col-span-5'>Название</p>
                        <p className='col-span-2 flex justify-center'>Лайки</p>
                        <p className='col-span-4 flex justify-center'>Опубликована</p>
                    </div>
                    <div className='flex flex-col divide-y'>
                        {publishedCollections.map((colleciton) => {
                            const date = new Date(colleciton.publishedAt)
                            const time = `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
                            return (
                                <div key={`collection${colleciton._id}`} className='grid grid-cols-12 leading-8 gap-2 text-nowrap w-full px-4 py-1 cursor-pointer hover:bg-hover transition-all' onClick={() => router.push(`publishedcollection/${colleciton._id}`)}>
                                    <p className='col-span-5'>{colleciton.title}</p>
                                    <p className='col-span-2 flex justify-center'>{colleciton.favouriteCount}</p>
                                    <p className='col-span-4 flex justify-center'>{time}</p>
                                    <div className='col-span-1 flex justify-center'>
                                        <OptionsMenu collectionId={colleciton._id} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            }
        </div>
    )
}

export default UserPublishedCollections