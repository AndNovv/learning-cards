"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import axios from "axios";
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown';

type BlogPostType = {
    title: string
    content: string
}

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

    if (!blogPost) return <h3>Загрузка</h3>

    return (
        <ScrollArea className='paddings'>
            <ReactMarkdown className={'pb-10'}>{blogPost.content}</ReactMarkdown>
        </ScrollArea>
    )
}

export default BlogPage