// Workbench config: the src:browser project, collecting the scratch copies under tmp/probe/ in Chromium.
import { defineConfig } from 'vitest/config'
import { srcBrowser } from '../../vite.config.js'

export default defineConfig({
	test: {
		projects: [
			srcBrowser({
				test: {
					name: { label: 'probe:browser', color: 'yellow' },
					include: ['tmp/probe/**/*.test.ts'],
				},
			}),
		],
	},
})
