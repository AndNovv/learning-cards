"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton";
import { BlogPostType } from "@/types/types";
import axios from "axios";
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown';


const BlogPage = ({ params }: { params: { blogId: string } }) => {

    const [blogPost, setBlogPost] = useState<BlogPostType | null>(null)

    const fetchBlogPost = async () => {
        try {
            const { data }: { data: BlogPostType } = await axios.get(`/api/blogposts/${params.blogId}`)
            setBlogPost(data)
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchBlogPost()
    }, [])

    if (!blogPost) return (
        <ScrollArea className='paddings'>
            <Skeleton className="w-3/4 h-8 my-8" />

            <Skeleton className="w-4/5 h-3 my-4" />
            <Skeleton className="w-5/6 h-3 my-4" />
            <Skeleton className="w-full h-3 my-4" />
            <Skeleton className="w-2/3 h-3 my-4" />
            <Skeleton className="w-4/5 h-3 my-4" />
            <Skeleton className="w-full h-3 my-4" />

            <Skeleton className="w-full h-60" />

            <Skeleton className="w-3/4 h-8 my-8" />

            <Skeleton className="w-4/5 h-3 my-4" />
            <Skeleton className="w-5/6 h-3 my-4" />
            <Skeleton className="w-full h-3 my-4" />
            <Skeleton className="w-2/3 h-3 my-4" />
            <Skeleton className="w-4/5 h-3 my-4" />
            <Skeleton className="w-full h-3 my-4" />

        </ScrollArea>
    )

    return (
        <ScrollArea className='paddings'>
            <h1>{blogPost.title}</h1>
            <ReactMarkdown className={'pb-10'}>{blogPost.content}</ReactMarkdown>
        </ScrollArea>
    )
}

export default BlogPage