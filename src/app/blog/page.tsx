"use client"

import BlogPostCard from '@/components/Blog/BlogPostCard'
import BlogPostSkeleton from '@/components/Blog/BlogPostSkeleton'
import { ScrollArea } from '@/components/ui/scroll-area'
import { BlogPostType } from '@/types/types'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'

const BlogPostsPage = () => {

    const [blogPosts, setBlogPosts] = useState<BlogPostType[] | null>(null)

    const fetchBlogPosts = useCallback(async () => {
        try {
            const { data }: { data: BlogPostType[] } = await axios.get(`/api/blogposts`)
            setBlogPosts(data)
        }
        catch (e) {
            console.log(e)
        }
    }, [])

    useEffect(() => {
        fetchBlogPosts()
    }, [fetchBlogPosts])

    if (!blogPosts) return (
        <ScrollArea className='h-full'>
            <div className='flex paddings w-full flex-col gap-6 pt-6 md:pt-0 flex-1 overflow-hidden'>

                <div className='grid grid-cols-1 xl:grid-cols-2 gap-6 pb-6'>
                    <BlogPostSkeleton />
                    <BlogPostSkeleton />
                    <BlogPostSkeleton />
                    <BlogPostSkeleton />
                </div>

            </div>
        </ScrollArea >

    )


    if (blogPosts.length === 0) return <h3>Статьи не найдены</h3>

    return (
        <ScrollArea className='h-full'>
            <div className='flex paddings w-full flex-col gap-6 pt-6 md:pt-0 flex-1 overflow-hidden'>

                <div className='grid grid-cols-1 xl:grid-cols-2 gap-6 pb-6'>
                    {blogPosts.map((blogPost) => {
                        return (
                            <BlogPostCard key={`blog-${blogPost._id}`} blogPost={blogPost} />
                        )
                    })}
                </div>

            </div>
        </ScrollArea >
    )
}

export default BlogPostsPage