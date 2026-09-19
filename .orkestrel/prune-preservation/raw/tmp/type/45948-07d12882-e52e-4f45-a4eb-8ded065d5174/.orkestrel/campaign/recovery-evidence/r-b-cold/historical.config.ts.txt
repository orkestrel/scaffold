import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import { appBrowser } from '../../../vite.config.ts'

export default defineConfig(
	appBrowser({
		cacheDir: resolve('node_modules/.vite-r-b-historical'),
		optimizeDeps: {
			include: ['vue', 'bootstrap', '@popperjs/core', '@orkestrel/test', '@orkestrel/test/browser'],
		},
		server: { host: '127.0.0.1', port: 5198, strictPort: true },
	}),
)
