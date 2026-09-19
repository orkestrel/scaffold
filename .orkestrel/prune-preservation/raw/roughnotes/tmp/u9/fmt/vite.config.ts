import type { UserConfig } from 'vite'
import { playwright } from '@vitest/browser-playwright'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'
import manifest from './package.json' with { type: 'json' }
import tsconfig from './tsconfig.json' with { type: 'json' }
import { enforceBuildLog, environmentBoundary, outputBoundary } from './configs/helpers.js'
import { resolveBrowser, resolvePinnedBrowser } from './configs/browsers.js'
import { fileURLToPath, URL } from 'node:url'

/** Describes one journey variant: a color mode paired with the viewport it renders at. */
export interface JourneyVariant {
	readonly name: string
	readonly width: number
	readonly height: number
}

const browserOptions = resolveBrowser(resolvePinnedBrowser(), process.platform, process.env)

export function resolveWorkspacePath(relativePath: string): string {
	return fileURLToPath(new URL(relativePath, import.meta.url))
}

const peerDependencies = 'peerDependencies' in manifest ? manifest.peerDependencies : undefined
if (
	peerDependencies !== undefined &&
	(typeof peerDependencies !== 'object' ||
		peerDependencies === null ||
		Array.isArray(peerDependencies))
) {
	throw new Error('package peerDependencies must be an object')
}
export const peers: readonly string[] =
	peerDependencies === undefined ? [] : Object.keys(peerDependencies)

const resolve = {
	alias: Object.entries(tsconfig.compilerOptions.paths).reduce((aliases, [key, values]) => {
		const [path] = values
		if (path === undefined) throw new Error('tsconfig path alias ' + key + ' has no target')
		return Object.assign(aliases, { [key]: resolveWorkspacePath(path) })
	}, {}),
}

export const appCore = (): UserConfig => ({
	resolve,
	publicDir: false,
	plugins: [environmentBoundary('app/core')],
	test: {
		name: { label: 'app:core', color: 'cyan' },
		include: ['tests/app/core/**/*.test.ts'],
		setupFiles: ['./tests/setup.ts'],
		environment: 'node',
		browser: { enabled: false },
	},
})

/**
 * Pairs a color mode with a viewport for one journey run.
 *
 * @remarks
 * This is the single declaration of the journey variants. Each becomes its own Vitest project
 * below, and the integration suite reads the set from `VITE_VARIANTS` rather than repeating it.
 */
export const VARIANTS: readonly JourneyVariant[] = Object.freeze([
	Object.freeze({ name: 'light-1280', width: 1280, height: 800 }),
	Object.freeze({ name: 'dark-1280', width: 1280, height: 800 }),
	Object.freeze({ name: 'light-390', width: 390, height: 844 }),
	Object.freeze({ name: 'dark-390', width: 390, height: 844 }),
])

/** Names the suite every journey variant drives. */
export const JOURNEY_INCLUDE = 'tests/app/browser/integration.test.ts'

function applicationBrowser(showcase: boolean): UserConfig {
	const output = showcase ? 'dist/showcase' : 'dist/app/browser'
	return {
		resolve,
		plugins: [outputBoundary(output), environmentBoundary('app/browser'), vue()],
		optimizeDeps: {
			include: ['vue', 'bootstrap', '@popperjs/core', '@orkestrel/test', '@orkestrel/test/browser'],
		},
		root: resolveWorkspacePath('app/browser'),
		publicDir: false,
		build: {
			assetsInlineLimit: 0,
			emptyOutDir: true,
			outDir: resolveWorkspacePath(output),
			rolldownOptions: {
				onLog: enforceBuildLog,
				input: resolveWorkspacePath('app/browser/index.html'),
			},
		},
		css: {
			preprocessorOptions: {
				scss: {
					silenceDeprecations: ['import', 'mixed-decls', 'color-functions', 'global-builtin'],
				},
			},
		},
		test: {
			name: { label: 'app:browser', color: 'blue' },
			root: resolveWorkspacePath('.'),
			dir: resolveWorkspacePath('.'),
			include: ['tests/app/browser/**/*.test.ts'],
			// Every journey variant owns its own project below, so the shared browser project
			// leaves that suite alone rather than running its default variant a fifth time.
			exclude: [JOURNEY_INCLUDE],
			setupFiles: ['./tests/setup.ts', './tests/setupBrowser.ts'],
			browser: {
				enabled: true,
				provider: playwright(browserOptions),
				instances: [{ browser: 'chromium', headless: true }],
			},
			fileParallelism: false,
		},
	}
}

export function appBrowser(): UserConfig {
	return applicationBrowser(false)
}

/**
 * Builds the Vitest project that drives every journey at one variant.
 *
 * @param variant - The color mode and viewport this project renders
 * @returns The project configuration, labelled by the variant name
 *
 * @remarks
 * The suite reads its own variant from `VITE_VARIANT` and the declared set from `VITE_VARIANTS`,
 * so the variants have one home here and the manifest needs no loop to enumerate them.
 *
 * @example
 * ```ts
 * journey({ name: 'light-1280', width: 1280, height: 800 })
 * ```
 */
export function journey(variant: JourneyVariant): UserConfig {
	const browser = applicationBrowser(false)
	return {
		...browser,
		test: {
			...browser.test,
			name: { label: `journey:${variant.name}`, color: 'magenta' },
			include: [JOURNEY_INCLUDE],
			exclude: [],
			// `provide` is the per-project channel. `define` would not do: it substitutes at
			// transform time, and these projects share one module graph, so the last project's
			// value would reach every one of them.
			provide: { variant: variant.name, variants: VARIANTS },
		},
	}
}

export const policy = (): UserConfig => ({
	resolve,
	test: {
		name: { label: 'policy', color: 'white' },
		include: ['tests/policy.test.ts'],
		setupFiles: ['./tests/setup.ts'],
		environment: 'node',
		browser: { enabled: false },
	},
})

export const config = (): UserConfig => ({
	resolve,
	test: {
		name: { label: 'config', color: 'yellow' },
		include: ['tests/config.test.ts'],
		setupFiles: ['./tests/setup.ts'],
		environment: 'node',
		browser: { enabled: false },
		// A config test validates every target wrapper and runs the real linter twice with
		// 15-second child caps, so this budget clears both caps and reports their diagnostics.
		testTimeout: 45_000,
	},
})

// A workbench, not a proof. No gate selects this project. Run in test mode by the
// `test:probe` script, it collects `tmp/probe/**/*.test.ts`. Run in benchmark mode by the
// `test:bench` script, the same workbench also collects `tests/**/*.test.ts` for a `bench` block,
// so a suite may carry a bench beside its ordinary tests without a second project. The mode
// guard around each `bench` call keeps it out of test mode, so it never executes there.
export const probe = (): UserConfig => ({
	resolve,
	test: {
		name: { label: 'probe', color: 'black' },
		include: ['tmp/probe/**/*.test.ts'],
		setupFiles: ['./tests/setup.ts'],
		environment: 'node',
		browser: { enabled: false },
		fileParallelism: false,
		pool: 'threads',
		benchmark: { include: ['tmp/probe/**/*.test.ts', 'tests/**/*.test.ts'] },
	},
})

export default defineConfig({
	resolve,
	test: {
		projects: [
			appCore,
			appBrowser,
			...VARIANTS.map((variant) => () => journey(variant)),
			policy,
			config,
			probe,
		],
	},
})
