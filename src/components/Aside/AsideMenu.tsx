"use client"
import React from 'react'
import CardsCollectionAsideIcon from './CardsCollectionAsideIcon'
import AsideProfileIcon from './AsideProfileIcon'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/state/store'
import { motion } from "framer-motion"
import CreateNewCollection from './CreateNewCollection'
import { groupCollectionsByTime } from '@/lib/GroupCollectionsByTime'
import { cn } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import { setVisibility } from '@/state/asideMenu/asideMenuSlice'
import { useDispatch } from 'react-redux'
import { useOutsideClick } from '@/hooks/useOutsideClick'

const AsideMenu = () => {

    const user = useSelector((state: RootState) => state.user);
    const activeCollection = useSelector((state: RootState) => state.activeCollection);
    const asideMenu = useSelector((state: RootState) => state.asideMenu);

    const dispatch = useDispatch<AppDispatch>()

    const favouriteCollections = user.user.collections
    const activeCollectionId = activeCollection.activeCollection

    const groupedCollection = groupCollectionsByTime(favouriteCollections)

    const isDesktop = asideMenu.isDesktop !== null ? asideMenu.isDesktop : true

    const ref = useOutsideClick(() => {
        if (asideMenu.visible && !isDesktop) {
            dispatch(setVisibility(false))
        }
    });

    return (
        <motion.aside
            ref={ref}
            initial={"visible"}
            animate={asideMenu.visible ? 'visible' : 'hidden'}
            variants={
                {
                    hidden: { translateX: '-300px' },
                    visible: { translateX: '0px' },
                }
            }
            transition={{
                ease: "linear",
                duration: 0.2,
            }}
            className={cn(asideMenu.isDesktop ? null : 'absolute', "bg-background z-10 flex flex-col shrink-0 justify-between w-[300px] items-center h-screen p-4 border-r")}
        >
            <div className='w-full relative'>
                <CreateNewCollection isDesktop={isDesktop} />
                <motion.div
                    initial={"visible"}
                    animate={!isDesktop ? (asideMenu.visible ? 'visible' : 'hidden') : 'hidden'}
                    variants={
                        {
                            hidden: { scale: 0 },
                            visible: { scale: 1 },
                        }
                    }
                    transition={{
                        ease: "linear",
                        duration: 0.2,
                    }}
                    onClick={() => dispatch(setVisibility(false))}
                    className='absolute cursor-pointer -right-20 top-2 size-12 bg-accent border border-card rounded-xl flex items-center justify-center'><ArrowLeft /></motion.div>
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
                                        <CardsCollectionAsideIcon collection={collection} active={activeCollectionId === collection._id} isDesktop={isDesktop} />
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
                                        <CardsCollectionAsideIcon collection={collection} active={activeCollectionId === collection._id} isDesktop={isDesktop} />
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
                                        <CardsCollectionAsideIcon collection={collection} active={activeCollectionId === collection._id} isDesktop={isDesktop} />
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
                                        <CardsCollectionAsideIcon collection={collection} active={activeCollectionId === collection._id} isDesktop={isDesktop} />
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
                                        <CardsCollectionAsideIcon collection={collection} active={activeCollectionId === collection._id} isDesktop={isDesktop} />
                                    </motion.li>
                                )
                            })}
                        </div>
                    }
                </motion.ol>

            </div>
            <AsideProfileIcon isDesktop={isDesktop} />
        </motion.aside>
    )
}

export default AsideMenu