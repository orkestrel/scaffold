import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import { appBrowser } from '../../../vite.config.ts'

export default defineConfig(
	appBrowser({
		cacheDir: resolve('node_modules/.vite-r-b-plain'),
		server: { host: '127.0.0.1', port: 5197, strictPort: true },
	}),
)
