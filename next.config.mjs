/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: process.env.NODE_ENV === 'development',
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'seven9.local',
            },
            {
                protocol: 'https',
                hostname: 'dev-seven9-devlopers.pantheonsite.io',
            },
            {
                protocol: 'https',
                hostname: 'seven9developers.in',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            }
        ],
    },
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.placeholder.com',
    },
}

export default nextConfig