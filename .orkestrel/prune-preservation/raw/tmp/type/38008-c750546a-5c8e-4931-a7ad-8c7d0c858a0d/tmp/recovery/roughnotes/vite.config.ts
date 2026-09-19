import type { JourneyVariant } from '@orkestrel/test'
import type { PluginOption, UserConfig } from 'vite'
import { mergeConfig } from 'vite'
import { playwright } from '@vitest/browser-playwright'
import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { defineConfig } from 'vitest/config'
import manifest from './package.json' with { type: 'json' }
import tsconfig from './tsconfig.json' with { type: 'json' }
import { enforceBuildLog, environmentBoundary, outputBoundary } from './configs/helpers.js'
import { resolveBrowser, resolvePinnedBrowser } from './configs/browsers.js'
import { fileURLToPath, URL } from 'node:url'

const browserOptions = resolveBrowser(resolvePinnedBrowser(), process.platform, process.env)

const capture = process.env.CAPTURE === '1'

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

// Merges a caller's override onto the configuration a factory declares, so a
// package's own configuration reaches the factory through its parameter instead of
// wrapping the call from outside.
//
// Vitest calls every registered project factory with its own invocation record —
// `command`, `mode`, `isSsrBuild`, `isPreview` — so a factory that also takes an
// override receives that record in the same position. A `UserConfig` declares `mode`
// but not `command`, and the invocation record always carries both, so a value
// carrying the pair is that record rather than an override. The merge returns the
// base unchanged and reports nothing. The `tests/config.test.ts` file drives every
// registered factory through it.
//
// `mergeConfig` concatenates arrays, so an override carrying `plugins` would otherwise
// add a second copy of a plugin the base already declares. Only named top-level
// objects replace a base plugin of the same name, in the base's position, and one
// override entry is taken at most once. An entry no base position took appends in its
// written order; the caller's own entries never merge with each other. Nested arrays,
// promises, falsy entries, and anonymous objects pass through unchanged. An override
// cannot remove a base plugin. Every key other than `plugins` merges as `mergeConfig`
// merges it, so an override's arrays elsewhere concatenate with the base's rather than
// replacing them.
export function mergeOverride(base: UserConfig, override?: UserConfig): UserConfig {
	if (override === undefined || ('command' in override && 'mode' in override)) return base
	const merged: UserConfig = mergeConfig(base, override)
	if (merged.plugins === undefined) return merged
	const candidates = override.plugins ?? []
	const taken = new Set<number>()
	const selected: PluginOption[] = []
	for (const plugin of base.plugins ?? []) {
		if (!isNamedPlugin(plugin)) {
			selected.push(plugin)
			continue
		}
		const index = candidates.findIndex(
			(candidate, position) =>
				!taken.has(position) && isNamedPlugin(candidate) && candidate.name === plugin.name,
		)
		const replacement = candidates[index]
		if (replacement === undefined) {
			selected.push(plugin)
		} else {
			selected.push(replacement)
			taken.add(index)
		}
	}
	for (const [index, plugin] of candidates.entries()) {
		if (!taken.has(index)) selected.push(plugin)
	}
	return { ...merged, plugins: selected }
}

function isNamedPlugin(plugin: PluginOption): plugin is { name: string } {
	return (
		typeof plugin === 'object' &&
		plugin !== null &&
		!Array.isArray(plugin) &&
		!('then' in plugin && typeof plugin.then === 'function') &&
		'name' in plugin &&
		typeof plugin.name === 'string'
	)
}

export function appCore(override?: UserConfig): UserConfig {
	const project: UserConfig = {
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
	}
	return mergeOverride(project, override)
}

export function appBrowser(override?: UserConfig): UserConfig {
	const output = 'dist/app/browser'
	const project: UserConfig = {
		resolve,
		plugins: [outputBoundary(output), environmentBoundary('app/browser'), vue()],
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
		test: {
			name: { label: 'app:browser', color: 'blue' },
			root: resolveWorkspacePath('.'),
			dir: resolveWorkspacePath('.'),
			include: ['tests/app/browser/**/*.test.ts'],
			exclude: ['tests/app/browser/integration.test.ts'],
			setupFiles: ['./tests/setup.ts', './tests/setupBrowser.ts'],
			browser: {
				enabled: true,
				provider: playwright(browserOptions),
				instances: [{ browser: 'chromium', headless: true }],
			},
			fileParallelism: false,
		},
	}
	return mergeOverride(project, override)
}

export function appShowcase(override?: UserConfig): UserConfig {
	const output = 'dist/showcase'
	const showcase: UserConfig = {
		plugins: [
			outputBoundary(output),
			viteSingleFile({
				removeViteModuleLoader: true,
				useRecommendedBuildConfig: true,
			}),
			{
				name: 'orkestrel-showcase-html',
				transformIndexHtml: {
					order: 'post',
					handler(html) {
						const stamp = new Date().toISOString()
						return html.replace(
							'</head>',
							'		<meta name="build-id" content="' + stamp + '" />\n	</head>',
						)
					},
				},
			},
		],
		build: {
			// The `appBrowser` factory sets `assetsInlineLimit` to 0, so every asset becomes
			// its own file, and 4096 is Vite's own default put back. The `viteSingleFile`
			// plugin overwrites the value while the `useRecommendedBuildConfig` option stays
			// true, so this line takes effect only in a workspace that turns that option off.
			assetsInlineLimit: 4096,
			cssMinify: 'lightningcss',
			minify: 'oxc',
			modulePreload: false,
			outDir: resolveWorkspacePath(output),
			reportCompressedSize: false,
			sourcemap: false,
			target: 'esnext',
		},
	}
	return appBrowser(mergeOverride(showcase, override))
}

// Replace the journey fields directly: merging would concatenate the ordinary include
// and retain the exclusion of the journey suite.
export function appJourney(
	variant: JourneyVariant,
	variants: readonly JourneyVariant[],
): UserConfig {
	const browser = appBrowser()
	return {
		...browser,
		test: {
			...browser.test,
			name: { label: `journey:${variant.name}`, color: 'green' },
			include: ['tests/app/browser/integration.test.ts'],
			exclude: [],
			provide: { variant: variant.name, variants, capture },
			browser: {
				...browser.test?.browser,
				enabled: true,
				viewport: { width: variant.width, height: variant.height },
			},
		},
	}
}

export function policy(override?: UserConfig): UserConfig {
	const project: UserConfig = {
		resolve,
		test: {
			name: { label: 'policy', color: 'white' },
			include: ['tests/policy.test.ts'],
			setupFiles: ['./tests/setup.ts'],
			environment: 'node',
			browser: { enabled: false },
		},
	}
	return mergeOverride(project, override)
}

export function config(override?: UserConfig): UserConfig {
	const project: UserConfig = {
		resolve,
		test: {
			name: { label: 'config', color: 'yellow' },
			include: ['tests/config.test.ts'],
			setupFiles: ['./tests/setup.ts'],
			environment: 'node',
			browser: { enabled: false },
			// A config test validates every target wrapper, spawns the real linter twice under
			// 15-second child caps, and rolls one face up through the compiler and the extractor it
			// spawns, so this budget clears the capped pair with room for a contended host.
			testTimeout: 60_000,
		},
	}
	return mergeOverride(project, override)
}

export function setup(override?: UserConfig): UserConfig {
	const project: UserConfig = {
		resolve,
		test: {
			name: { label: 'setup', color: 'white' },
			include: ['tests/setup*.test.ts'],
			exclude: ['tests/setupBrowser.test.ts'],
			setupFiles: ['./tests/setup.ts'],
			environment: 'node',
			browser: { enabled: false },
		},
	}
	return mergeOverride(project, override)
}

export function setupBrowser(override?: UserConfig): UserConfig {
	const project: UserConfig = {
		resolve,
		plugins: [vue()],
		test: {
			name: { label: 'setup:browser', color: 'blue' },
			include: ['tests/setupBrowser.test.ts'],
			setupFiles: ['./tests/setup.ts', './tests/setupBrowser.ts'],
			browser: {
				enabled: true,
				provider: playwright(browserOptions),
				instances: [{ browser: 'chromium', headless: true }],
			},
		},
	}
	return mergeOverride(project, override)
}

// Where this package drifts from the official tooling it stays compatible with.
// The subject is this package, so the proof is hermetic and stays in `npm test`.
export function conformance(override?: UserConfig): UserConfig {
	const project: UserConfig = {
		resolve,
		test: {
			name: { label: 'conformance', color: 'magenta' },
			include: ['tests/conformance.test.ts'],
			setupFiles: ['./tests/setup.ts'],
			environment: 'node',
			browser: { enabled: false },
		},
	}
	return mergeOverride(project, override)
}

// A workbench, not a proof. No gate selects this project. Run in test mode by the
// `test:probe` script, it collects `tmp/probe/**/*.test.ts`. Run in benchmark mode by the
// `test:bench` script, the same workbench also collects `tests/**/*.test.ts` for a `bench` block,
// so a suite may carry a bench beside its ordinary tests without a second project. The mode
// guard around each `bench` call keeps it out of test mode, so it never executes there.
export function probe(override?: UserConfig): UserConfig {
	const project: UserConfig = {
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
	}
	return mergeOverride(project, override)
}

export default defineConfig({
	resolve,
	test: {
		projects: [appCore, appBrowser, policy, config, setup, setupBrowser, conformance, probe],
	},
})
