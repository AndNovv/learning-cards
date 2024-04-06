"use client"
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const LinkNavigationCard = ({ title, href, image }: { title: string, href: string, image: string }) => {

    const router = useRouter()
    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: 0.5 }}
            className='relative overflow-hidden w-full border rounded-xl bg-card h-52 cursor-pointer'
            onClick={() => router.push(href)}>
            <Image
                src={image}
                height={500}
                width={500}
                alt='bg-image'
                className='w-full h-full absolute'
            />
            <div className='bg-black opacity-60 absolute w-full h-full hover:opacity-35 transition-all flex justify-center items-center'>
                <h2 className='z-10 text-2xl text-center'>{title}</h2>
            </div>
        </motion.div>
    )
}

export default LinkNavigationCard