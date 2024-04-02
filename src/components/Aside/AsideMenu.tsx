"use client"
import React from 'react'
import CardsCollectionAsideIcon from './CardsCollectionAsideIcon'
import AsideProfileIcon from './AsideProfileIcon'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { motion } from "framer-motion"
import CreateNewCollection from './CreateNewCollection'
import { groupCollectionsByTime } from '@/lib/GroupCollectionsByTime'

const AsideMenu = () => {

    const user = useSelector((state: RootState) => state.user);
    const activeCollection = useSelector((state: RootState) => state.activeCollection);

    if (user.user.collections.length === 0) {
        return (
            <aside className="flex flex-col justify-between w-[350px] items-center z-20 h-screen sticky top-0 p-4 border-r">
                <div className='w-full h-full flex flex-col justify-between'>
                    <CreateNewCollection />
                    <AsideProfileIcon />
                </div>
            </aside>
        )
    }
    const favouriteCollections = user.user.collections
    const activeCollectionId = activeCollection.activeCollection

    const groupedCollection = groupCollectionsByTime(favouriteCollections)

    return (
        <aside className="flex flex-col justify-between w-[350px] items-center z-20 h-screen sticky top-0 p-4 border-r">
            <div className='w-full'>
                <CreateNewCollection />
                <motion.ol
                    layout
                    transition={{
                        ease: "linear",
                        duration: 0.2,
                    }}
                    className='flex flex-col items-start mt-4'
                >
                    {groupedCollection.Today.length > 0 &&
                        <div className='w-full'>
                            <motion.p layout className='text-sm text-[#ffffff62] font-semibold p-2'>Сегодня</motion.p>
                            {groupedCollection.Today.map((collection) => {
                                return (
                                    <motion.li layout transition={{
                                        ease: "linear",
                                        duration: 0.2,
                                    }}
                                        key={`AsideIcon${collection._id}`}
                                        className='w-full'>
                                        <CardsCollectionAsideIcon collection={collection} active={activeCollectionId === collection._id} />
                                    </motion.li>
                                )
                            })}
                        </div>
                    }
                    {groupedCollection.Yesterday.length > 0 &&
                        <div className='w-full'>
                            <motion.p layout className='text-sm text-[#ffffff62] font-semibold p-2'>Вчера</motion.p>
                            {groupedCollection.Yesterday.map((collection) => {
                                return (
                                    <motion.li layout transition={{
                                        ease: "linear",
                                        duration: 0.2,
                                    }} key={`AsideIcon${collection._id}`} className='w-full'>
                                        <CardsCollectionAsideIcon collection={collection} active={activeCollectionId === collection._id} />
                                    </motion.li>
                                )
                            })}
                        </div>
                    }
                    {groupedCollection.Week.length > 0 &&
                        <div className='w-full'>
                            <motion.p layout className='text-sm text-[#ffffff62] font-semibold p-2'>Последняя неделя</motion.p>
                            {groupedCollection.Week.map((collection) => {
                                return (
                                    <motion.li layout transition={{
                                        ease: "linear",
                                        duration: 0.2,
                                    }} key={`AsideIcon${collection._id}`} className='w-full'>
                                        <CardsCollectionAsideIcon collection={collection} active={activeCollectionId === collection._id} />
                                    </motion.li>
                                )
                            })}
                        </div>
                    }
                    {groupedCollection.Month.length > 0 &&
                        <div className='w-full'>
                            <motion.p layout className='text-sm text-[#ffffff62] font-semibold p-2'>Последний месяц</motion.p>
                            {groupedCollection.Month.map((collection) => {
                                return (
                                    <motion.li layout transition={{
                                        ease: "linear",
                                        duration: 0.2,
                                    }} key={`AsideIcon${collection._id}`} className='w-full'>
                                        <CardsCollectionAsideIcon collection={collection} active={activeCollectionId === collection._id} />
                                    </motion.li>
                                )
                            })}
                        </div>
                    }
                    {groupedCollection.Later.length > 0 &&
                        <div className='w-full'>
                            <motion.p layout className='text-sm text-[#ffffff62] font-semibold p-2'>Больше месяца назад</motion.p>
                            {groupedCollection.Later.map((collection) => {
                                return (
                                    <motion.li layout transition={{
                                        ease: "linear",
                                        duration: 0.2,
                                    }} key={`AsideIcon${collection._id}`} className='w-full'>
                                        <CardsCollectionAsideIcon collection={collection} active={activeCollectionId === collection._id} />
                                    </motion.li>
                                )
                            })}
                        </div>
                    }
                </motion.ol>

            </div>
            <AsideProfileIcon />
        </aside>
    )
}

export default AsideMenu