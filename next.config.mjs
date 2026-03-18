/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['spardhajklu.online'],
    unoptimized: true
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false, crypto: false };
    return config;
  },
  async rewrites() {
    // Automatically use Railway backend in production, Localhost in development
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 
      (process.env.NODE_ENV === 'production' 
        ? 'https://spardha-backend-production.up.railway.app' 
        : 'http://localhost:5000');

    return [
      {
        source: '/api/admin/:path*',
        destination: `${backendUrl}/admin/:path*`, // Admin routes
      },
      {
        source: '/api/login',
        destination: `${backendUrl}/login`,
      },
      {
        source: '/api/logout',
        destination: `${backendUrl}/logout`,
      },
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`, // Default local backend fallback
      },
    ];
  },
};

export default nextConfig;
