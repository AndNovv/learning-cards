import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Settings } from 'lucide-react'
import React from 'react'

const LoadingCollectionPage = () => {
    return (
        <div className='relative flex flex-col h-full pt-6 md:pt-1 paddings'>
            <div className='flex flex-col bg-background'>
                <div className='flex flex-row justify-between items-center'>
                    <div>
                        <Skeleton className='h-4 w-52 mt-5' />
                        <Skeleton className='h-4 w-40 mt-4 mb-4' />
                    </div>

                    <div className='flex gap-2 items-center'>
                        <Button variant={'outline'}>
                            Проверить себя
                        </Button>
                        <Button variant={'outline'} size={'smallIcon'}>
                            <Settings className='size-5' />
                        </Button>
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

export default LoadingCollectionPage