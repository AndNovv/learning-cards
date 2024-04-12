import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const LoadingPublishedCollectionPage = () => {
    return (
        <div className='relative flex flex-col h-full paddings'>
            <div className='flex flex-col bg-background'>
                <div className='flex flex-row justify-between items-center'>
                    <div>
                        <Skeleton className='h-4 w-52 mt-5' />
                        <Skeleton className='h-4 w-40 mt-4 mb-4' />
                    </div>

                    <div className='flex gap-2 items-center'>
                        <Skeleton className='h-4 w-32 mt-5' />
                    </div>
                </div>
            </div>
            <Skeleton className='h-4 w-full mb-4 mt-10' />
            <Skeleton className='h-4 w-full mb-4' />
            <Skeleton className='h-4 w-full mb-4' />
            <Skeleton className='h-4 w-full mb-4' />
            <Skeleton className='h-4 w-full mb-4' />
            <Skeleton className='h-4 w-full mb-4' />
            <Skeleton className='h-4 w-full mb-4' />

        </div>
    )
}

export default LoadingPublishedCollectionPage