"use client"
import React, { useEffect } from 'react'
import AsideProfileIcon from './AsideProfileIcon'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/state/store'
import { motion, useAnimationControls } from "framer-motion"
import CreateNewCollection from './CreateNewCollection'
import { groupCollectionsByTime } from '@/lib/GroupCollectionsByTime'
import { cn } from '@/lib/utils'
import { setVisibility } from '@/state/asideMenu/asideMenuSlice'
import { useDispatch } from 'react-redux'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { ScrollArea } from '../ui/scroll-area'
import TimeGroupSection from './TimeGroupSection'
import AsideMenuCloseIcon from './AsideMenuCloseIcon'
import { Skeleton } from '../ui/skeleton'

const AsideMenu = () => {

    const user = useSelector((state: RootState) => state.user)
    const activeCollection = useSelector((state: RootState) => state.activeCollection)
    const asideMenu = useSelector((state: RootState) => state.asideMenu)

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
            animate={asideMenu.visible ? 'visible' : 'hidden'}
            variants={{ hidden: { transform: "translateX(-300px)" }, visible: { transform: "translateX(0px)" } }}
            transition={{ ease: "linear", duration: 0.2 }}
            className={cn("md:relative md:translate-x-0 -translate-x-[300px] absolute bg-background z-50 flex flex-col shrink-0 w-[300px] items-center h-screen p-4 border-r")}
        >
            <div className='w-full h-full flex flex-col justify-between relative'>
                <div className='flex flex-col w-full overflow-hidden'>
                    <CreateNewCollection isDesktop={isDesktop} />
                    <AsideMenuCloseIcon />

                    {user.loading ? (
                        <div className='le text-sm'>
                            <Skeleton className='w-1/2 h-4 mt-8 ml-2' />
                            <Skeleton className='w-2/3 h-4 mt-4 ml-2' />
                            <Skeleton className='w-2/3 h-4 mt-4 ml-2' />

                            <Skeleton className='w-1/2 h-4 mt-8 ml-2' />
                            <Skeleton className='w-2/3 h-4 mt-4 ml-2' />
                            <Skeleton className='w-2/3 h-4 mt-4 ml-2' />
                            <Skeleton className='w-2/3 h-4 mt-4 ml-2' />
                            <Skeleton className='w-2/3 h-4 mt-4 ml-2' />
                        </div>
                    ) : (
                        <>

                            <ScrollArea className='flex-1'>
                                <motion.ol
                                    layout
                                    transition={{ ease: "linear", duration: 0.2, }}
                                    className='flex flex-col items-start'
                                >
                                    {groupedCollection.Today.length > 0 && <TimeGroupSection wordCollectionGroup={groupedCollection.Today} groupName={'Сегодня'} activeCollectionId={activeCollectionId} isDesktop={isDesktop} />}
                                    {groupedCollection.Yesterday.length > 0 && <TimeGroupSection wordCollectionGroup={groupedCollection.Yesterday} groupName={'Вчера'} activeCollectionId={activeCollectionId} isDesktop={isDesktop} />}
                                    {groupedCollection.Week.length > 0 && <TimeGroupSection wordCollectionGroup={groupedCollection.Week} groupName={'Последняя неделя'} activeCollectionId={activeCollectionId} isDesktop={isDesktop} />}
                                    {groupedCollection.Month.length > 0 && <TimeGroupSection wordCollectionGroup={groupedCollection.Month} groupName={'Последний месяц'} activeCollectionId={activeCollectionId} isDesktop={isDesktop} />}
                                    {groupedCollection.Later.length > 0 && <TimeGroupSection wordCollectionGroup={groupedCollection.Later} groupName={'Больше месяца назад'} activeCollectionId={activeCollectionId} isDesktop={isDesktop} />}
                                </motion.ol>
                            </ScrollArea>
                        </>
                    )
                    }
                </div>
                <AsideProfileIcon isDesktop={isDesktop} />

            </div>
        </motion.aside>
    )
}

export default AsideMenu