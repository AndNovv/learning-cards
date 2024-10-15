import { BlogPostType } from '@/types/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BlogPostCard = ({ blogPost }: { blogPost: BlogPostType }) => {

    return (
        <Link href={`/blog/${blogPost._id}`}>
            <div className='group w-full rounded-xl bg-card text-white border shadow-none hover:shadow-2xl transition'>
                <div className='relative w-full aspect-[5/3] rounded-xl overflow-hidden cursor-pointer text-balance'>
                    <Image
                        className='group-hover:scale-105 w-full transition-all'
                        fill
                        src={blogPost.imageUrl}
                        alt={`Image-${blogPost.title}`}
                    />
                    <div className='absolute flex items-end pb-4 px-4 w-full h-full bg-gradient-to-b from-[#00000000] to-[#000000]'>
                        <h3 className='mb-0 group-hover:text-zinc-300 transition'>{blogPost.title}</h3>
                    </div>
                </div>
                <div className='p-4'>
                    <div className='opacity-80 overflow-hidden text-ellipsis max-h-[calc(3*1.5rem)] leading-6 line-clamp-3 break-words'>
                        {blogPost.content}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default BlogPostCard