import { defineConfig } from 'vitest/config'
import { service } from '../../../vite.config.ts'

export default defineConfig({
	resolve: service().resolve,
	test: { include: ['tmp/units/probe/*.test.ts'], environment: 'node' },
})
