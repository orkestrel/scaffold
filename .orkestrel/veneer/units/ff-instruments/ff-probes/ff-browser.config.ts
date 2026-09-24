// FOCUS-FRAME probe workbench: the app browser project, aimed at this unit's probe files only.
import { defineConfig } from 'vitest/config'
import { appBrowser } from '../../vite.config.ts'

const browser = appBrowser()

export default defineConfig({
	...browser,
	test: {
		...browser.test,
		name: { label: 'ff-probe', color: 'magenta' },
		include: ['tmp/probe/ff-*.test.ts'],
		exclude: [],
		browser: {
			...browser.test?.browser,
			enabled: true,
			viewport: { width: 1280, height: 800 },
		},
	},
})
