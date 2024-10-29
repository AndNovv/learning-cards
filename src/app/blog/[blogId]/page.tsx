import MarkdownRenderer from "@/components/MarkdownRenderer";
import { ScrollArea } from "@/components/ui/scroll-area"
import dbConnect from "@/lib/mongo/dbConnect";
import BlogPost from "@/models/BlogPost";
import { BlogPostType } from "@/types/types";
import { Metadata } from "next";
import React from 'react'

async function getBlogPost(id: string): Promise<BlogPostType | null> {

    try {
        // Connect to the database
        await dbConnect();

        // Fetch the blog post by ID
        const blogPost: BlogPostType | null = await BlogPost.findById(id);

        if (!blogPost) {
            console.error(`Blog post with ID ${id} not found.`);
            return null; // Or throw a custom error if needed
        }

        return blogPost;
    } catch (error) {
        console.error('An error occurred while fetching the blog post:', error);
        return null
    }
}

export async function generateStaticParams() {

    dbConnect()
    const blogPosts: BlogPostType[] = await BlogPost.find({})

    if (!blogPosts) return []

    return blogPosts.map((post) => ({
        id: post._id,
    }))
}

export async function generateMetadata({ params }: { params: { blogId: string } }): Promise<Metadata> {

    const data = await getBlogPost(params.blogId)

    const metadata: Metadata = {
        title: `${data ? data.title : 'Статья не найдена'}`,
        description: `${data ? data.description : 'Неизвестная статья | Plexicon'}`,
        openGraph: {
            description: `${data ? data.description : 'Неизвестная статья | Plexicon'}`,
        },
        keywords: data ? data.keywords : ['Plexicon', 'Плексикон', 'Онлайн учить слова', 'Онлайн флеш карточки', 'Онлайн', 'Изучение английского языка', 'Английский', 'Флешкарты', 'Флеш карточки', 'Флеш-карточки', 'Учить слова', 'Эффективные методы запоминания слов'],
    }

    return metadata
}

export default async function BlogPage({ params }: { params: { blogId: string } }) {

    const blogPost = await getBlogPost(params.blogId)

    if (!blogPost) return (<div className="h-full w-full flex justify-center"><h3>Такой статьи не существует</h3></div>)

    return (
        <ScrollArea className="w-full h-full">
            <article className="paddings pb-10 w-full">
                <h1>{blogPost.title}</h1>
                <MarkdownRenderer content={blogPost.content} />
            </article>
        </ScrollArea>
    )
}
