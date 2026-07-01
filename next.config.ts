import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	experimental: { serverComponentsExternalPackages: ['ua-parser-js'] },
	webpack: (config, { isServer, nextRuntime }) => {
		if (nextRuntime === 'edge') {
			config.node = {
				...config.node,
				__dirname: true
			};
		}
		return config;
	}
};

export default nextConfig;
