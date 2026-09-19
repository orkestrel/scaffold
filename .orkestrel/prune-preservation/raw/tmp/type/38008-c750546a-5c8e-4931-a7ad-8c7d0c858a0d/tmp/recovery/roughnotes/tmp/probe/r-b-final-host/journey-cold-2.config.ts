import type { JourneyVariant } from '@orkestrel/test'
import type { Plugin, ResolvedConfig, UserConfig } from 'vite'
import { mergeConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import { appJourney } from '../../../vite.config.ts'
import { resolve } from 'node:path'
import { matchesCachePath } from './cache-paths.ts'

const cacheDir = process.env.R_B_COLD_CACHE
if (cacheDir === undefined || cacheDir.length === 0) {
	throw new Error('R_B_COLD_CACHE is required')
}
const requestedCache = cacheDir

const mode = process.env.R_B_COLD_MODE
if (mode !== undefined && mode !== 'active-cache' && mode !== 'outer-only-control') {
	throw new Error(`Unsupported R_B_COLD_MODE: ${mode}`)
}

export const VARIANTS: readonly JourneyVariant[] = Object.freeze([
	{ name: 'light-1280', width: 1280, height: 800 },
	{ name: 'dark-1280', width: 1280, height: 800 },
	{ name: 'light-390', width: 390, height: 844 },
	{ name: 'dark-390', width: 390, height: 844 },
])

export function reportCache(config: ResolvedConfig, expected: string): void {
	const requested = resolve(expected)
	const actual = resolve(config.cacheDir)
	if (!matchesCachePath(requested, actual)) {
		console.log(`R-B-COLD-CACHE refused expected=${requested} actual=${actual}`)
		throw new Error(`R-B-COLD-CACHE expected=${requested} actual=${actual}`)
	}
	console.log(`R-B-COLD-CACHE active expected=${requested} actual=${actual}`)
}

export function createCacheObserver(expected: string): Plugin {
	return {
		name: 'r-b-cold-host-cache-observer',
		// Vite invokes this hook after resolving the project's cache configuration.
		configResolved(config) {
			reportCache(config, expected)
		},
	}
}

function createJourney(variant: JourneyVariant): UserConfig {
	const project = appJourney(variant, VARIANTS)
	const override: UserConfig = {
		plugins: [createCacheObserver(requestedCache)],
	}
	if (mode !== 'outer-only-control') {
		override.cacheDir = requestedCache
	}
	return mergeConfig(project, override)
}

export default defineConfig({
	test: {
		projects: VARIANTS.map((variant) => () => createJourney(variant)),
	},
})
