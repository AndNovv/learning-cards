import dbConnect from '@/lib/mongo/dbConnect';
import BlogPost from '@/models/BlogPost';

const baseUrl = 'https://plexicon.ru';

export const dynamic = 'force-dynamic';

// Generate all dynamic paths at build time
export const generateStaticParams = async () => {
    await dbConnect();
    const blogPosts = await BlogPost.find({}, '_id'); // Only fetch `_id`

    return blogPosts.map((post) => ({
        id: post._id.toString(), // Convert MongoDB ObjectId to string
    }));
};

// Sitemap generation function for metadata route
export default async function sitemap() {
    const posts = await generateStaticParams(); // Get dynamic routes

    const staticRoutes = [
        { url: `${baseUrl}`, lastModified: new Date().toISOString() },
        { url: `${baseUrl}/collections`, lastModified: new Date().toISOString() },
        { url: `${baseUrl}/blog`, lastModified: new Date().toISOString() },
    ];

    const dynamicRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.id}`,
        lastModified: new Date().toISOString(),
    }));

    return [...staticRoutes, ...dynamicRoutes];
}