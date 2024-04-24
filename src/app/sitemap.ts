import axios from 'axios'
import { MetadataRoute } from 'next'


const baseUrl = 'https://plexicon.ru'

export default function sitemap(): MetadataRoute.Sitemap {

    return [
        {
            url: 'https://plexicon.ru',
            lastModified: new Date(),
        },
        {
            url: 'https://plexicon.ru/collections',
            lastModified: new Date(),
        },
    ]
}