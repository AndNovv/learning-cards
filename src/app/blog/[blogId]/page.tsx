import MarkdownRenderer from "@/components/MarkdownRenderer";
import { ScrollArea } from "@/components/ui/scroll-area"
import { BlogPostType } from "@/types/types";
import { Metadata } from "next";
import React from 'react'

async function getBlogPost(id: string): Promise<BlogPostType | null> {
    try {
        const response = await fetch(`${process.env.BASE_URL}/api/blogposts/${id}`, { cache: 'no-store' });

        // Check if the response is not OK (e.g., 404, 500 errors)
        if (!response.ok) {
            console.error(`Error fetching post: ${response.status} ${response.statusText}`);
            return null; // or handle it differently based on your needs
        }

        const post: BlogPostType = await response.json();

        // If the post is empty or invalid
        if (!post) {
            console.warn('No post found.');
            return null;
        }

        return post;
    } catch (error) {
        console.error('Failed to fetch the blog post:', error);
        return null;
    }
}

export async function generateStaticParams() {

    let posts = await fetch(`${process.env.BASE_URL}/api/blogposts/`, { cache: "no-store" }).then((res) =>
        res.json()
    )

    return posts.map((post: BlogPostType) => ({
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
        <ScrollArea className='paddings'>
            <article className="pb-10">
                <h1>{blogPost.title}</h1>
                <MarkdownRenderer content={blogPost.content} />
            </article>
        </ScrollArea>
    )
}
