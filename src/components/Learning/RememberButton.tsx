"use client"
import { motion, useAnimationControls } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import React from 'react'

const RememberButton = ({ handleButtonClick }: { handleButtonClick: () => void }) => {

    const controls = useAnimationControls()

    return (
        <motion.div
            whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            onTap={() => controls.start('rightSlideAnimation').finally(() => controls.start('leftSlideAnimation'))}
            onClick={handleButtonClick}
            className='flex justify-center items-center rounded-full bg-green-500 size-20 select-none cursor-pointer'
        >
            <motion.div

                initial={{ x: 0 }}
                animate={controls}
                variants={{
                    rightSlideAnimation: { x: [0, 15], opacity: [1, 0], transition: { duration: 0.3 } },
                    leftSlideAnimation: { x: [-15, 0], opacity: [0, 1], transition: { duration: 0.3 } }
                }}
            >
                <ChevronRight className='size-10' />
            </motion.div>
        </motion.div>
    )
}

export default RememberButton