// next.config.js
module.exports = {
	webpack: (config, { nextRuntime }) => {
		if (nextRuntime === 'edge') {
			config.output.globalObject = 'globalThis';
			config.node = {
				...config.node,
				__dirname: true,
				__filename: true
			};
		}
		return config;
	}
};
