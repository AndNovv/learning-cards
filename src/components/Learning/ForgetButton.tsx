"use client"
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import React, { useState } from 'react'

const ForgetButton = ({ handleButtonClick }: { handleButtonClick: () => void }) => {

    const [hovered, setHovered] = useState(false)

    return (
        <motion.div
            initial={'notHovered'}
            animate={hovered ? 'hovered' : 'notHovered'}
            whileTap={{ scale: 1.1, transition: { duration: 0.1 } }}
            variants={{
                notHovered: { backgroundPositionX: '100%' },
                hovered: { backgroundPositionX: '85%' }
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            transition={{ duration: 0.5 }}
            className='bg-gradient-to-l text-white to-red-600 from-transparent to-50% from-10% pl-4 pr-20 py-4 rounded-l-lg cursor-pointer animate-gradient'
            onClick={handleButtonClick}
        >
            <motion.div
                initial={{ x: 0 }}
                animate={{ x: hovered ? -10 : 0 }}
                transition={{ duration: 0.4 }}
                className='flex gap-1 items-center select-none'
            >
                <ChevronLeft className='size-8' />
                <p>Забыл</p>
            </motion.div>
        </motion.div>
    )
}

export default ForgetButton