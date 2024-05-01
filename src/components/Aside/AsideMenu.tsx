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
import { useSession } from 'next-auth/react'
import { MoveDown } from 'lucide-react'

const AsideMenu = () => {

    const { status, data } = useSession()

    const user = useSelector((state: RootState) => state.user)
    const activeCollection = useSelector((state: RootState) => state.activeCollection)
    const asideMenu = useSelector((state: RootState) => state.asideMenu)

    const dispatch = useDispatch<AppDispatch>()

    const ref = useOutsideClick(() => {
        if (asideMenu.visible && !isDesktop) {
            dispatch(setVisibility(false))
        }
    });

    const favouriteCollections = user.user.collections
    const activeCollectionId = activeCollection.activeCollection

    const groupedCollection = groupCollectionsByTime(favouriteCollections)

    const isDesktop = asideMenu.isDesktop !== null ? asideMenu.isDesktop : true

    return (
        <>
            <motion.aside
                ref={ref}
                animate={asideMenu.visible ? 'visible' : 'hidden'}
                variants={{ hidden: { transform: "translateX(-300px)" }, visible: { transform: "translateX(0px)" } }}
                transition={{ ease: "linear", duration: 0.2 }}
                className={cn("md:relative md:translate-x-0 -translate-x-[300px] absolute bg-aside z-50 flex flex-col shrink-0 w-[300px] shadow-xl items-center h-full py-4")}
            >
                <div className='w-full h-full flex flex-col justify-between relative'>
                    <div className='flex flex-col w-full overflow-hidden flex-1'>
                        <CreateNewCollection isDesktop={isDesktop} disabled={user.loading} />
                        <AsideMenuCloseIcon />

                        {status === 'unauthenticated' ? (
                            <div className='flex flex-col justify-between w-full h-full items-center mb-10 aside-paddings '>
                                <div className='text-balance h-full w-full flex flex-col items-center justify-center gap-6'>
                                    <h3 className='text-foreground/70'>Без авторизации пользователям доступна вкладка: «Библиотека». Вы можете учить слова, а также проверить свои знания!</h3>
                                    <h3 className='text-foreground/70'>Для того чтобы сохранить прогресс вашего обучения, необходима авторизация.</h3>
                                    <h3 className='text-foreground/70'>Авторизация откроет доступ ко всем возможностям!</h3>
                                </div>
                                <motion.div
                                    animate={{ translateY: [-20, 10, -20], scale: [1, 0.7, 1] }}
                                    transition={{ times: [0, 2, 4], repeat: Infinity, repeatDelay: 5 }}
                                    className='origin-bottom'
                                >
                                    <MoveDown size={50} strokeWidth={1} className='opacity-70' />
                                </motion.div>
                            </div>
                        ) :
                            user.loading ? (
                                <div className='text-sm aside-paddings'>
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
                                            className='flex flex-col items-start px-4 pb-4'
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
            </motion.aside >
            <motion.div
                animate={asideMenu.visible && !isDesktop ? 'visible' : 'hidden'}
                variants={{ hidden: { zIndex: -10, opacity: 0 }, visible: { zIndex: 40, opacity: 0.4 } }}
                transition={{ ease: "easeOut", duration: 0.3 }}
                className='absolute z-40 w-full h-full opacity-30 bg-background'
            >
            </motion.div>
        </>
    )
}

export default AsideMenu