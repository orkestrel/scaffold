import vue from '@vitejs/plugin-vue'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'
import { setupBrowser } from '../../../vite.config.ts'
import { resolveBrowser, resolvePinnedBrowser } from '../../../configs/browsers.ts'

export default defineConfig({
	test: { projects: [setupBrowser({
		plugins: [vue()],
		test: { browser: { provider: playwright({ ...resolveBrowser(resolvePinnedBrowser(), process.platform, process.env), contextOptions: { reducedMotion: 'reduce' } }) } },
	})] },
})
