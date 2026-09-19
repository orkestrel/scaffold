import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'
import { setupBrowser } from '../../../vite.config.ts'
import { resolveBrowser, resolvePinnedBrowser } from '../../../configs/browsers.ts'

const browser = resolveBrowser(resolvePinnedBrowser(), process.platform, process.env)

export default defineConfig({
	test: {
		projects: [
			setupBrowser({
				test: {
					browser: {
						provider: playwright({
							...browser,
							contextOptions: { reducedMotion: 'reduce' },
						}),
					},
				},
			}),
		],
	},
})
