import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'
import { setupBrowser } from '../../../vite.config.ts'

export default defineConfig({ test: { projects: [setupBrowser({ plugins: [vue()] })] } })
