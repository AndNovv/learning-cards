"use client"
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import React, { useState } from 'react'

const RememberButton = ({ handleButtonClick }: { handleButtonClick: () => void }) => {

    const [hovered, setHovered] = useState(false)

    return (
        <motion.div
            initial={'hovered'}
            animate={hovered ? 'hovered' : 'notHovered'}
            variants={{
                notHovered: { backgroundPositionX: '65%' },
                hovered: { backgroundPositionX: '75%' }
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            transition={{ duration: 0.5 }}
            className='flex gap-2 text-white items-center bg-gradient-to-l from-green-600 to-transparent to-50% from-10% pr-4 pl-10 py-4 rounded-r-lg cursor-pointer animate-gradient'
            onClick={handleButtonClick}
        >
            <motion.div
                initial={{ x: 0 }}
                animate={{ x: hovered ? 10 : 0 }}
                transition={{ duration: 0.4 }}
                className='flex gap-2 items-center select-none'
            >
                <p>Помню</p>
                <ChevronRight className='size-8' />
            </motion.div>
        </motion.div>
    )
}

export default RememberButton