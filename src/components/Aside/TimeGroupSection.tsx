"use client"
import { WordCollection } from '@/types/types'
import { motion } from 'framer-motion'
import React from 'react'
import CardsCollectionAsideIcon from './CardsCollectionAsideIcon'

const TimeGroupSection = ({ wordCollectionGroup, groupName, activeCollectionId, isDesktop }: { wordCollectionGroup: WordCollection[], groupName: string, activeCollectionId: string | null, isDesktop: boolean }) => {
    return (
        <div className='w-full mt-4'>
            <motion.p layout transition={{ ease: "linear", duration: 0.2 }} className='text-sm text-[#ffffff62] font-semibold p-2'>{groupName}</motion.p>
            {wordCollectionGroup.map((collection) => {
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
    )
}

export default TimeGroupSection