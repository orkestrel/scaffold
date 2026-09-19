import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'
import { appBrowser } from '../../vite.config.js'

export default defineConfig({
	test: {
		projects: [() => {
			const configuration = appBrowser()
			return {
				...configuration,
				plugins: [...(configuration.plugins ?? []), {
					name: 'u4-baseline-css',
					enforce: 'pre' as const,
					load(id: string) {
						if (id.replaceAll('\\', '/').endsWith('/app/browser/styles/index.scss')) {
							return readFileSync(resolve('tmp/codex/u4-before.css'), 'utf8')
						}
					},
				}],
			}
		}],
	},
})
