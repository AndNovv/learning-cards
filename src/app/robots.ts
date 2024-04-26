import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: ['/', '/collections', '/publishedcollection'],
            disallow: ['/api'],
        },
        sitemap: 'https://plexicon.ru/sitemap.xml',
    }
}