import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	experimental: { serverComponentsExternalPackages: ['ua-parser-js'] }
};

export default nextConfig;
