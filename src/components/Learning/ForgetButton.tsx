"use client"
import { motion, useAnimationControls } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import React from 'react'

const ForgetButton = ({ handleButtonClick }: { handleButtonClick: () => void }) => {

    const controls = useAnimationControls()

    return (
        <motion.div
            whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            onTap={() => controls.start('leftSlideAnimation').finally(() => controls.start('rightSlideAnimation'))}
            onClick={handleButtonClick}
            className='flex justify-center items-center rounded-full bg-red-500 size-20 select-none cursor-pointer'
        >
            <motion.div

                initial={{ x: 0 }}
                animate={controls}
                variants={{
                    leftSlideAnimation: { x: [0, -15], opacity: [1, 0], transition: { duration: 0.3 } },
                    rightSlideAnimation: { x: [15, 0], opacity: [0, 1], transition: { duration: 0.3 } }
                }}
            >
                <ChevronLeft className='size-10' />
            </motion.div>
        </motion.div>
    )
}

export default ForgetButton