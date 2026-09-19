import { mergeConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import journey from '../../../configs/app/vite.journey.config.ts'

const cacheDir = process.env.R_B_COLD_CACHE
if (cacheDir === undefined || cacheDir.length === 0) {
	throw new Error('R_B_COLD_CACHE is required')
}

export default defineConfig(mergeConfig(journey, { cacheDir }))
