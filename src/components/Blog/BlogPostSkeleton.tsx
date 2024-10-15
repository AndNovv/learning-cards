import React from 'react'
import { Skeleton } from '../ui/skeleton'

const BlogPostSkeleton = () => {
    return (
        <Skeleton className='w-full h-fit'>
            <div className='w-full aspect-[5/3]'></div>
            <div className='h-[6.5rem]'></div>
        </Skeleton>
    )
}

export default BlogPostSkeleton