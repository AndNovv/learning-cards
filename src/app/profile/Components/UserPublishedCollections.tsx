import { RootState } from '@/state/store'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux'
import OptionsMenu from './OptionsMenu'
import { ScrollArea } from '../../../components/ui/scroll-area'

const UserPublishedCollections = () => {

    const { user } = useSelector((state: RootState) => state.user)
    const publishedCollections = user.publishedCollections

    const router = useRouter()

    // const monthNames = [
    //     'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
    // ];

    return (
        <div className='w-full overflow-hidden'>
            <h3 className=''>Ваши публикации</h3>
            {publishedCollections.length === 0 && <div className='text-white opacity-60'>Вы еще не опубликовали ни одной коллекции...</div>}
            {publishedCollections.length > 0 &&
                <div className='flex flex-col bg-card divide-y divide-[#f0f0f0]/20 w-full border rounded-xl overflow-hidden mb-10'>
                    <div key={`collectionColumns`} className='grid grid-cols-10 leading-8 gap-2 text-nowrap w-full px-4 py-1 text-white opacity-60'>
                        <span className='col-span-5'>Название</span>
                        <span className='col-span-2 flex justify-center'>Лайки</span>
                        <span className='col-span-2 flex justify-center'>Слов</span>
                    </div>
                    <div className='flex flex-col divide-y divide-[#f0f0f0]/10'>
                        {publishedCollections.map((colleciton) => {
                            // const date = new Date(colleciton.publishedAt)
                            // const time = `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
                            return (
                                <div key={`collection${colleciton._id}`} className='grid grid-cols-10 leading-8 gap-2 text-nowrap w-full px-4 py-1 cursor-pointer hover:bg-hover transition-all' onClick={() => router.push(`publishedcollection/${colleciton._id}`)}>
                                    <span className='col-span-5'>{colleciton.title}</span>
                                    <span className='col-span-2 flex justify-center'>{colleciton.favouriteCount}</span>
                                    <span className='col-span-2 flex justify-center'>{colleciton.flashcards.length}</span>
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