import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: ['/', '/collections', '/publishedcollection', '/blog'],
            disallow: ['/api'],
        },
        sitemap: 'https://plexicon.ru/sitemap.xml',
    }
}