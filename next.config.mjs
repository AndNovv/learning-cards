/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true
    },
    images: {
        path: '/_next/image',
    // loader can be 'default', 'imgix', 'cloudinary', 'akamai', or 'custom'
        loader: 'default',
    // file with `export default function loader({src, width, quality})`
        loaderFile: '',
    // disable static imports for image files
        disableStaticImages: false,
    // minimumCacheTTL is in seconds, must be integer 0 or more
        minimumCacheTTL: 60,
    // ordered list of acceptable optimized image formats (mime types)
        formats: ['image/webp'],
        remotePatterns: [],
    },
    webpack: (config, { isServer }) => {
        config.module.rules.push({
            test: /\.aac$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'static/audio/',
                    publicPath: '/_next/static/audio/',
                    esModule: false,
                },
            },
        })
        return config;
    }
}

export default nextConfig;
