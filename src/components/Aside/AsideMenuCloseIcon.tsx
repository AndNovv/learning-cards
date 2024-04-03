"use clint"
import { setVisibility } from '@/state/asideMenu/asideMenuSlice'
import { AppDispatch, RootState } from '@/state/store'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const AsideMenuCloseIcon = () => {

    const dispatch = useDispatch<AppDispatch>()

    const asideMenu = useSelector((state: RootState) => state.asideMenu)
    const isDesktop = asideMenu.isDesktop

    return (
        <motion.div
            initial={"hidden"}
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
            className='absolute cursor-pointer -right-20 top-2 size-12 bg-accent border border-card rounded-xl flex items-center justify-center'>
            <ArrowLeft />
        </motion.div>
    )
}

export default AsideMenuCloseIcon