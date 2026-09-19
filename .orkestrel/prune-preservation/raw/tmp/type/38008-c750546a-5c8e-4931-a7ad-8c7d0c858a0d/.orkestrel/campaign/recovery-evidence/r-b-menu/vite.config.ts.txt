import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { setupBrowser } from '../../../vite.config.ts'

const browser = setupBrowser({ plugins: [vue()] })

export default defineConfig({
	...browser,
	test: {
		...browser.test,
		name: 'menu-observation',
		include: ['tmp/probe/r-b-menu/menu.test.ts'],
	},
})
