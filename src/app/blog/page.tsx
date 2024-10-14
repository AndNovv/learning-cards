"use client"

import { ScrollArea } from '@/components/ui/scroll-area'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'

type BlogPostType = {
    _id: string
    title: string
    content: string
}

const BlogPostsPage = () => {

    const [blogPosts, setBlogPosts] = useState<BlogPostType[] | null>(null)
    console.log(blogPosts)

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

    if (!blogPosts) return <h3>Загрузка</h3>
    if (blogPosts.length === 0) return <h3>Статьи не найдены</h3>

    return (
        <div className='flex w-full flex-col gap-6 pt-6 md:pt-0 flex-1 overflow-hidden'>

            <ScrollArea className='h-full paddings'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6'>
                    {blogPosts.map((blogPost) => {
                        return (
                            <a href={`/blog/${blogPost._id}`} key={`blog-${blogPost._id}`}>{blogPost.title}</a>
                        )
                    })}
                </div>
            </ScrollArea >
        </div>
    )
}

export default BlogPostsPage