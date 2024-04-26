import React from 'react'
import { Skeleton } from '../ui/skeleton'
import ForgetButton from './ForgetButton'
import RememberButton from './RememberButton'

const LoadingLearningPage = () => {
    return (
        <div className='flex flex-col gap-16 justify-center items-center h-full paddings'>
            <div className='relative h-80 w-full max-w-[500px]'>
                <Skeleton className="absolute h-full w-full top-0" />
            </div>
            <div className='flex flex-row w-full max-w-[500px] justify-between'>
                <ForgetButton handleButtonClick={() => { }} />
                <RememberButton handleButtonClick={() => { }} />
            </div>
        </div>
    )
}

export default LoadingLearningPage