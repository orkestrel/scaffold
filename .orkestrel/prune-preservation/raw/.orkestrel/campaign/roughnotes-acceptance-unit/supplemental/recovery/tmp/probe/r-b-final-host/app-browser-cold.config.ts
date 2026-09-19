import { defineConfig } from 'vitest/config'
import { appBrowser } from '../../../vite.config.ts'

const cacheDir = process.env.R_B_COLD_CACHE
if (cacheDir === undefined || cacheDir.length === 0) {
	throw new Error('R_B_COLD_CACHE is required')
}

export default defineConfig({
	test: {
		projects: [() => appBrowser({ cacheDir })],
	},
})
