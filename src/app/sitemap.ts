import dbConnect from '@/lib/mongo/dbConnect'
import BlogPost from '@/models/BlogPost'
import { MetadataRoute } from 'next'

const baseUrl = 'https://plexicon.ru'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    await dbConnect()
    const blogPosts = await BlogPost.find({})

    const baseSitemap = [
        {
            url: 'https://plexicon.ru',
            lastModified: new Date(),
        },
        {
            url: 'https://plexicon.ru/collections',
            lastModified: new Date(),
        },
        {
            url: 'https://plexicon.ru/blog',
            lastModified: new Date(),
        },
    ]

    const blogPostsArray = blogPosts.map((blogPost) => ({
        url: `${baseUrl}/blog/${blogPost._id}`,
        lastModified: new Date(),
    }))


    return [...baseSitemap, ...blogPostsArray]
}