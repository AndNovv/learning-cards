import React from 'react'
import { Skeleton } from '../ui/skeleton'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const LoadingLearningPage = () => {
    return (
        <div className='flex flex-col gap-10 justify-center items-center h-full paddings'>
            <Skeleton className="h-40 w-full max-w-[500px]" />
            <div className='flex flex-row w-full max-w-[500px] justify-between'>
                <motion.div
                    initial={'notHovered'}
                    variants={{
                        notHovered: { backgroundPositionX: '100%' },
                    }}
                    className='bg-gradient-to-l text-white to-red-600 from-transparent to-50% from-10% pl-4 pr-20 py-4 rounded-l-lg cursor-pointer animate-gradient'
                >
                    <motion.div
                        initial={{ x: 0 }}
                        className='flex gap-1 items-center select-none'
                    >
                        <ChevronLeft className='size-8' />
                        <p>Забыл</p>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={'notHovered'}
                    variants={{
                        notHovered: { backgroundPositionX: '65%' },
                    }}
                    className='flex gap-2 text-white items-center bg-gradient-to-l from-green-600 to-transparent to-50% from-10% pr-4 pl-10 py-4 rounded-r-lg cursor-pointer animate-gradient'
                >
                    <motion.div
                        initial={{ x: 0 }}
                        className='flex gap-2 items-center select-none'
                    >
                        <p>Помню</p>
                        <ChevronRight className='size-8' />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default LoadingLearningPage