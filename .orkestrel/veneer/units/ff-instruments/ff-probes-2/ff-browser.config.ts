// FOCUS-FRAME probe workbench: the app browser project, aimed at this unit's probe files only.
import { defineConfig } from 'vitest/config'
import { appBrowser } from '../../vite.config.ts'

const browser = appBrowser()

export default defineConfig({
	...browser,
	test: {
		...browser.test,
		name: { label: 'ff-probe', color: 'magenta' },
		include: ['tmp/probe/ff-drives-*.test.ts'],
		exclude: [],
		testTimeout: 300_000,
		browser: { ...browser.test?.browser, enabled: true, viewport: { width: 1280, height: 800 } },
	},
})
