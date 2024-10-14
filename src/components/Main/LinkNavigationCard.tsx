"use client"
import { motion } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useToast } from '../ui/use-toast'

const LinkNavigationCard = ({ navigatingForbidden, title, description, href, image }: { navigatingForbidden: boolean, title: string, description: string, href: string, image: StaticImageData }) => {

    const router = useRouter()

    const { toast } = useToast()

    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { ease: 'easeInOut', duration: 0.5 } }}
            className='relative overflow-hidden w-full max-w-[350px] flex gap-3 items-center justify-between border rounded-xl bg-card h-40 px-6 cursor-pointer'
            onClick={() => navigatingForbidden ? toast({ title: 'Войдите в аккаунт', description: 'Для сохранения прогресса вашего обучения требутеся авторизация!', variant: 'destructive' }) : router.push(href)}>
            <motion.div
                initial={{ background: '#00000000' }}
                whileHover={{ background: '#00000030' }}
                transition={{ ease: 'linear', duration: 0.1 }}
                className='group bg-[#00000095] absolute w-full h-full top-0 left-0 z-10 transition-all flex justify-center items-center origin-center'>
            </motion.div>
            <div className='flex-1'>
                <h4 className='md:text-2xl'>{title}</h4>
                <p className='text-sm text-foreground/60 mt-2 mb-0'>{description}</p>
            </div>
            <div className='flex-1 max-w-[150px]'>
                <Image
                    src={image}
                    alt={'cardIconImage'}
                    priority={true}
                    width={150}
                    height={150}
                    loading='eager'
                    className='w-full'
                />
            </div>
        </motion.div>
    )
}

export default LinkNavigationCard