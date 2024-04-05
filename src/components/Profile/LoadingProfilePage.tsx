import React from 'react'
import { Skeleton } from '../ui/skeleton'
import { Button } from '../ui/button'

const LoadingProfilePage = () => {
    return (
        <div className='flex flex-col gap-2 items-start lg:px-40 md:px-5 px-5'>
            <div className='flex w-full gap-4 justify-between mb-10 border-b pb-6'>
                <div className='flex gap-4'>
                    <Skeleton className='size-[60px] rounded-full' />
                    <div>
                        <Skeleton className='h-4 w-52 mt-3' />
                        <Skeleton className='h-4 w-52 mt-2' />
                    </div>
                </div>
                <Button variant={'outline'}>Выйти</Button>
            </div>
            <Skeleton className='h-4 w-60 mt-3' />
            <Skeleton className='h-48 w-full rounded-xl mt-5' />
        </div>
    )
}

export default LoadingProfilePage