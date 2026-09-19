import { defineConfig } from 'vitest/config'
import { appJourney } from '../../vite.config.ts'

export default defineConfig({ test: { projects: ['desktop', 'compact'].map((name) => () => appJourney(name)) } })
