/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
            },
        ],
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
