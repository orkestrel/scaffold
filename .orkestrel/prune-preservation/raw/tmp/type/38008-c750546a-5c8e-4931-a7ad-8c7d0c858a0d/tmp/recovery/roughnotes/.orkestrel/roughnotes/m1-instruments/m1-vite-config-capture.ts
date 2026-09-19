import type { PluginOption, UserConfig } from 'vite'
import { mergeConfig } from 'vite'
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
 * This is the single declaration of the journey variants. Each becomes its own Vitest project,
 * and the integration suite reads the set from `VITE_VARIANTS` rather than repeating it.
 */
export const VARIANTS: readonly JourneyVariant[] = Object.freeze([
	Object.freeze({ name: 'light-1280', width: 1280, height: 800 }),
	Object.freeze({ name: 'dark-1280', width: 1280, height: 800 }),
	Object.freeze({ name: 'light-390', width: 390, height: 844 }),
	Object.freeze({ name: 'dark-390', width: 390, height: 844 }),
])

/** Names the suite every journey variant drives. */
export const JOURNEY_INCLUDE = 'tests/app/browser/integration.test.ts'

/**
 * Merges a caller's override onto the configuration a factory declares, so this workspace's
 * own configuration reaches the factory through its parameter instead of wrapping the call
 * from outside.
 *
 * @param base - The configuration the factory declares.
 * @param override - The caller's override, when one is given.
 * @returns The merged configuration. Each base position carries its own entry, or the override
 * entry that replaced it. The merge visits the base positions in order, and each named position
 * takes the earliest same-named override entry that no earlier position took, so an override
 * entry replaces one base position at most. Every override entry that replaced none follows in
 * the order the caller wrote it. The base itself when the override is absent or is Vitest's
 * invocation record.
 *
 * @remarks
 * Vitest calls every registered project factory with its own invocation record — `command`,
 * `mode`, `isSsrBuild`, `isPreview` — so a factory that also takes an override receives that
 * record in the same position. A `UserConfig` declares `mode` but not `command`, and the
 * invocation record always carries both, so a value carrying the pair is that record rather than
 * an override. The merge returns the base unchanged and reports nothing. The
 * `tests/config.test.ts` file hands a record of that shape to every registered factory and
 * refuses any configuration carrying a field of it.
 *
 * `mergeConfig` concatenates arrays, so an override carrying `plugins` would otherwise add a
 * second copy of a plugin the base already declares. Only named top-level objects replace a base
 * plugin of the same name, in the base's position, and one override entry is taken at most once.
 * An entry no base position took appends in its written order; the caller's own entries never
 * merge with each other. Nested arrays, promises, falsy entries, and anonymous objects pass
 * through unchanged. An override cannot remove a base plugin. Every key other than `plugins`
 * merges as `mergeConfig` merges it, so an override's arrays elsewhere concatenate with the
 * base's rather than replacing them.
 *
 * @example
 * ```ts
 * mergeOverride(appBrowser(), { build: { emptyOutDir: false } })
 * ```
 */
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

/**
 * Builds the browser application configuration.
 *
 * @param override - Configuration to merge onto the browser configuration
 * @returns The browser configuration, merged with the override when one is given
 *
 * @remarks
 * This is the single declaration of the browser application: the build that writes
 * `dist/app/browser`, the `app:browser` Vitest project, and every configuration composed on them.
 *
 * @example
 * ```ts
 * appBrowser({ build: { emptyOutDir: false } })
 * ```
 */
export function appBrowser(override?: UserConfig): UserConfig {
	const output = 'dist/app/browser'
	const browser: UserConfig = {
		resolve,
		plugins: [outputBoundary(output), environmentBoundary('app/browser'), vue()],
		// Bootstrap reaches its partials through `@import`, calls the global built-in and colour
		// functions, and uses the deprecated `if()` form. This workspace cannot act on any of them —
		// its own entry already uses `@use` — and unsilenced they bury a warning that is actionable.
		// This is the set the build emits, not the set Bootstrap's Vite page documents: that page
		// predates `if-function`, which Dart Sass activated in 1.95.0, and lists `mixed-decls`, which
		// 5.3.8 no longer raises and Dart Sass has marked obsolete, so naming it raises its own warning.
		css: {
			preprocessorOptions: {
				scss: {
					silenceDeprecations: ['import', 'color-functions', 'global-builtin', 'if-function'],
				},
			},
		},
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
		test: {
			name: { label: 'app:browser', color: 'blue' },
			root: resolveWorkspacePath('.'),
			dir: resolveWorkspacePath('.'),
			include: ['tests/app/browser/**/*.test.ts'],
			// Every journey variant owns its own project, so the shared browser project
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
	return mergeOverride(browser, override)
}

/**
 * Builds the showcase configuration on the browser configuration.
 *
 * @param override - Configuration to merge onto the showcase configuration
 * @returns The browser configuration writing `dist/showcase`, merged with the override
 *
 * @remarks
 * A showcase is the browser application written to its own output, so this restates neither the
 * aliases, the plugins, nor the build options `appBrowser` declares. The showcase boundary carries
 * the plugin name the browser boundary carries, so the merge replaces that boundary rather than
 * adding a second one.
 *
 * No wrapper selects this configuration. A workspace uses it by adding
 * `configs/app/vite.showcase.config.ts`, whose presence is what makes a workspace a showcase
 * workspace.
 *
 * @example
 * ```ts
 * appShowcase({ build: { minify: true } })
 * ```
 */
export function appShowcase(override?: UserConfig): UserConfig {
	const output = 'dist/showcase'
	const showcase: UserConfig = {
		plugins: [outputBoundary(output)],
		build: { outDir: resolveWorkspacePath(output) },
	}
	return appBrowser(mergeOverride(showcase, override))
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
 * A journey replaces the browser test block rather than passing it as an override, because
 * `mergeOverride` concatenates arrays: an override would add the journey suite beside the browser
 * include and keep the exclusion that leaves that suite out.
 *
 * @example
 * ```ts
 * journey({ name: 'light-1280', width: 1280, height: 800 })
 * ```
 */
export function journey(variant: JourneyVariant): UserConfig {
	const browser = appBrowser()
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

// Selected by any proof named `tests/setup*.test.ts`, so its include is the glob the vendored
// `tests/config.test.ts` file reads rather than one proof's path. `red` is the one label colour
// this workspace's other projects leave unused.
export const setup = (): UserConfig => ({
	resolve,
	test: {
		name: { label: 'setup', color: 'red' },
		include: ['tests/setup*.test.ts'],
		setupFiles: ['./tests/setup.ts'],
		environment: 'node',
		browser: { enabled: false },
	},
})

export const conformance = (): UserConfig => ({
	resolve,
	test: {
		name: { label: 'conformance', color: 'green' },
		include: ['tests/conformance.test.ts'],
		setupFiles: ['./tests/setup.ts'],
		environment: 'node',
		browser: { enabled: false },
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
			setup,
			conformance,
			probe,
		],
	},
})
