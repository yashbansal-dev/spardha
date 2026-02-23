/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        unoptimized: true, // Disabled Vercel Image Optimization to preserve free tier limits
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '**',
            },
        ],
    },
    async rewrites() {
        const backendUrl = process.env.BACKEND_URL || 'https://backendspardha-production.up.railway.app';
        return [
            {
                source: '/api/register-action',
                destination: `${backendUrl}/register`,
            },
            {
                source: '/api/:path*',
                destination: `${backendUrl}/api/:path*`,
            },
            {
                source: '/auth/:path*',
                destination: `${backendUrl}/auth/:path*`,
            },
            {
                source: '/login',
                destination: `${backendUrl}/login`,
            },
            {
                source: '/signup',
                destination: `${backendUrl}/signup`,
            },

        ];
    },
};

export default nextConfig;
