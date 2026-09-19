// Proves where this workspace departs from the tooling it tracks. Vite's `mergeConfig`
// concatenates plugin arrays, and Vitest calls every registered project factory with its
// invocation record, so a factory that both merges an override and is registered as a project
// needs `mergeOverride` rather than the bare merge. Each proof in this file carries the untracked
// behaviour as its control, so an assertion that stopped discriminating fails here.

import type { Plugin, PluginOption, UserConfig } from 'vite'
import { mergeConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { describe, expect, it } from 'vitest'
import { appBrowser, appShowcase, mergeOverride } from '../vite.config.js'
import { createNamedEntry, readPlugins, selectByName } from './setup.js'

/**
 * The invocation record Vitest passes to a registered project factory, in the position a factory
 * that also takes an override reads its override from.
 */
const INVOCATION = Object.freeze({
	command: 'serve',
	isPreview: false,
	isSsrBuild: false,
	mode: 'sentinel-mode',
})

/** Every field of that record, so a refusal is read across the record rather than one key. */
const INVOCATION_FIELDS: readonly string[] = ['command', 'isPreview', 'isSsrBuild', 'mode']

/**
 * A value carrying `command` without `mode`. No Vitest invocation record carries `command` alone,
 * so this is an override and merges.
 */
const COMMAND_ONLY = Object.freeze({ command: 'serve', base: '/conformance-command-only/' })

/**
 * A value carrying `mode` without `command`. A `UserConfig` declares `mode`, and every Vitest
 * invocation record carries `command` beside it, so this is an override and merges.
 */
const MODE_ONLY = Object.freeze({ mode: 'development', base: '/conformance-mode-only/' })

/** The number a non-string plugin name carries in these proofs. */
const NUMBERED_NAME = 42

/**
 * The plugins the showcase adds to the browser configuration, in the order the merge appends them.
 *
 * @remarks
 * The showcase's own output boundary carries the browser boundary's name, so the merge replaces
 * that entry in place and only these two reach the end of the list.
 */
const SHOWCASE_PLUGINS: readonly string[] = Object.freeze([
	'vite:singlefile',
	'orkestrel-showcase-html',
])

/** Vite's own default inline limit, which the showcase puts back over the browser build's zero. */
const SHOWCASE_INLINE_LIMIT = 4096

/** Reads one own property, so a field no `UserConfig` declares is still observable. */
function readField(value: object, field: string): unknown {
	return Object.getOwnPropertyDescriptor(value, field)?.value
}

/** Names every plugin a configuration carries, in the order the configuration carries them. */
function readPluginNames(config: UserConfig): readonly string[] {
	const plugins: readonly PluginOption[] = config.plugins ?? []
	return plugins.map((plugin) =>
		typeof plugin === 'object' && plugin !== null && 'name' in plugin
			? String(plugin.name)
			: String(plugin),
	)
}

/** Counts one plugin name, so a duplicate is a number rather than a membership. */
function countPlugin(config: UserConfig, name: string): number {
	return readPluginNames(config).filter((plugin) => plugin === name).length
}

/** Reads the output directory with portable separators, and fails loudly when there is none. */
function readOutputDirectory(config: UserConfig): string {
	const output = config.build?.outDir
	if (typeof output !== 'string') throw new Error('The configuration carries no output directory')
	return output.replaceAll('\\', '/')
}

/**
 * Builds an override carrying the Vue plugin the base configuration already declares.
 *
 * @remarks
 * This one stays in this file. It calls `vue()`, and `.claude/rules/tests.md` fixes
 * `tests/setup.ts` as host-independent with no Vue, so no helper reaching a framework plugin can
 * live beside the ones imported from there.
 */
function createPluginOverride(): UserConfig {
	const carried: readonly Plugin[] = [vue()].flat()
	return { plugins: [...carried] }
}

describe('configuration conformance', () => {
	it('merges an override into the browser configuration', () => {
		const overridden = appBrowser({
			build: { emptyOutDir: false },
			optimizeDeps: { include: ['bootstrap-icons'] },
		})
		const plain = appBrowser()
		expect(overridden.build?.emptyOutDir).toBe(false)
		expect(overridden.optimizeDeps?.include).toContain('bootstrap-icons')
		expect(readOutputDirectory(overridden)).toBe(readOutputDirectory(plain))

		// Control: the configuration no override reached, which is what a factory that ignored its
		// override would return. The emptied-output reading and the added-dependency reading fail against it.
		expect(plain.build?.emptyOutDir).toBe(true)
		expect(() => expect(plain.build?.emptyOutDir).toBe(false)).toThrow(/expected/u)
		expect(plain.optimizeDeps?.include ?? []).not.toContain('bootstrap-icons')
		expect(() => expect(plain.optimizeDeps?.include ?? []).toContain('bootstrap-icons')).toThrow(
			/expected/u,
		)
	})

	it('builds the showcase on the browser configuration instead of restating it', () => {
		const browser = appBrowser()
		const showcase = appShowcase()
		const browserPlugins = readPluginNames(browser)
		const showcasePlugins = readPluginNames(showcase)
		expect(readOutputDirectory(browser).endsWith('dist/app/browser')).toBe(true)
		expect(readOutputDirectory(showcase).endsWith('dist/showcase')).toBe(true)
		expect(Object.keys(showcase).sort()).toStrictEqual(Object.keys(browser).sort())
		// Every browser plugin reaches the showcase, in the browser's own order, and the
		// single-file machinery appends behind them rather than displacing any of them.
		expect(showcasePlugins.slice(0, browserPlugins.length)).toStrictEqual(browserPlugins)
		expect(showcasePlugins.slice(browserPlugins.length)).toStrictEqual(SHOWCASE_PLUGINS)
		expect(showcase.root).toBe(browser.root)
		expect(showcase.publicDir).toBe(browser.publicDir)
		expect(showcase.build?.emptyOutDir).toBe(browser.build?.emptyOutDir)
		expect(showcase.optimizeDeps?.include).toStrictEqual(browser.optimizeDeps?.include)

		// The single-file machinery is the showcase's alone. The browser build keeps every asset
		// as its own file, and the showcase puts Vite's default inline limit back so the inlining
		// plugin has something to inline.
		for (const plugin of SHOWCASE_PLUGINS) expect(countPlugin(browser, plugin)).toBe(0)
		expect(browser.build?.assetsInlineLimit).toBe(0)
		expect(showcase.build?.assetsInlineLimit).toBe(SHOWCASE_INLINE_LIMIT)

		// Control: a showcase declared on its own rather than composed on the browser
		// configuration. It carries the output boundary and the output directory and nothing else,
		// so the comparisons earlier fail against it.
		const restated: UserConfig = {
			build: { outDir: 'dist/showcase' },
			plugins: [],
		}
		expect(() =>
			expect(Object.keys(restated).sort()).toStrictEqual(Object.keys(browser).sort()),
		).toThrow(/expected/u)
		expect(() =>
			expect(readPluginNames(restated).slice(0, browserPlugins.length)).toStrictEqual(
				browserPlugins,
			),
		).toThrow(/expected/u)
		expect(() =>
			expect(readPluginNames(restated).slice(-SHOWCASE_PLUGINS.length)).toStrictEqual(
				SHOWCASE_PLUGINS,
			),
		).toThrow(/expected/u)
		expect(() => expect(restated.root).toBe(browser.root)).toThrow(/expected/u)
	})

	it('merges an override into the showcase configuration', () => {
		const overridden = appShowcase({ build: { emptyOutDir: false } })
		expect(overridden.build?.emptyOutDir).toBe(false)
		expect(readOutputDirectory(overridden).endsWith('dist/showcase')).toBe(true)

		// Control: the showcase no override reached, which is what a showcase that dropped its
		// override on the way to the browser configuration would return.
		const plain = appShowcase()
		expect(plain.build?.emptyOutDir).toBe(true)
		expect(() => expect(plain.build?.emptyOutDir).toBe(false)).toThrow(/expected/u)
	})

	it('carries each declared plugin exactly once in every configuration these factories return', () => {
		const override = createPluginOverride()
		expect(countPlugin(appBrowser(), 'vite:vue')).toBe(1)
		expect(countPlugin(appShowcase(), 'vite:vue')).toBe(1)
		expect(countPlugin(appBrowser(override), 'vite:vue')).toBe(1)
		expect(countPlugin(appShowcase(override), 'vite:vue')).toBe(1)
		expect(countPlugin(appShowcase(), 'orkestrel-output-boundary')).toBe(1)
		for (const plugin of SHOWCASE_PLUGINS) {
			expect(countPlugin(appShowcase(), plugin)).toBe(1)
			expect(countPlugin(appShowcase(override), plugin)).toBe(1)
		}

		// Control: the bare `mergeConfig` these factories depart from. It concatenates the plugin
		// arrays, so the same override yields the Vue plugin twice and the count earlier fails.
		const bare: UserConfig = mergeConfig(appBrowser(), createPluginOverride())
		expect(countPlugin(bare, 'vite:vue')).toBe(2)
		expect(() => expect(countPlugin(bare, 'vite:vue')).toBe(1)).toThrow(/expected/u)
	})

	it('refuses the invocation record a registered factory receives in the override position', () => {
		const browser = appBrowser()
		const invoked = appBrowser(INVOCATION)
		const showcase = appShowcase(INVOCATION)
		const merged = mergeOverride(browser, INVOCATION)
		for (const field of INVOCATION_FIELDS) {
			expect(readField(invoked, field)).toBeUndefined()
			expect(readField(showcase, field)).toBeUndefined()
			expect(readField(merged, field)).toBeUndefined()
		}
		expect(readPluginNames(merged)).toStrictEqual(readPluginNames(browser))
		expect(readOutputDirectory(invoked)).toBe(readOutputDirectory(browser))
		expect(readOutputDirectory(showcase).endsWith('dist/showcase')).toBe(true)

		// Control: the bare `mergeConfig` these factories depart from. It copies a key
		// `UserConfig` does not declare straight through, so the refusal earlier fails against it.
		const bare: UserConfig = mergeConfig(browser, INVOCATION)
		expect(readField(bare, 'command')).toBe('serve')
		expect(readField(bare, 'mode')).toBe('sentinel-mode')
		expect(() => expect(readField(bare, 'command')).toBeUndefined()).toThrow(/expected/u)
	})

	it('leaves a nested override entry nested rather than lifting it beside the base entries', () => {
		const declared = createNamedEntry('conformance-alpha')
		const nested: PluginOption = [[createNamedEntry('conformance-alpha')]]
		const merged = mergeOverride({ plugins: [declared] }, { plugins: [nested] })
		const plugins = readPlugins(merged)
		expect(plugins.length).toBe(2)
		expect(plugins[0]).toBe(declared)
		expect(plugins[1]).toBe(nested)
		// This count reads top-level entries, because `readPluginNames` stringifies the nested array
		// rather than descending into it. It establishes that the merge adds no second top-level
		// entry carrying the base name. It does not establish deduplication, which the merge does
		// not claim: Vite flattens plugins recursively at resolve time, so this nested override
		// entry does reach the resolved configuration beside the base entry that shares its name.
		expect(countPlugin(merged, 'conformance-alpha')).toBe(1)

		// Control: the one-level flattening this merge departs from. It lifts the inner array into
		// the nested entry's place, so the reading of that position fails against it.
		const flattened: readonly PluginOption[] = [declared, nested].flat()
		expect(() => expect(flattened[1]).toBe(nested)).toThrow(/expected/u)
	})

	it('keeps two override entries sharing a name, in the order the caller wrote them', () => {
		const declared = createNamedEntry('conformance-alpha')
		const first = createNamedEntry('conformance-beta')
		const second = createNamedEntry('conformance-beta')
		const merged = mergeOverride({ plugins: [declared] }, { plugins: [first, second] })
		const plugins = readPlugins(merged)
		expect(plugins.length).toBe(3)
		expect(plugins[0]).toBe(declared)
		expect(plugins[1]).toBe(first)
		expect(plugins[2]).toBe(second)

		// Control: the name-keyed selection this merge departs from. It keeps one entry per name,
		// so it drops the first of the caller's two and the readings earlier fail against it.
		const keyed = selectByName([declared, first, second])
		expect(keyed.length).toBe(2)
		expect(() => expect(keyed.length).toBe(3)).toThrow(/expected/u)
		expect(() => expect(keyed[1]).toBe(first)).toThrow(/expected/u)
	})

	it('installs a named override entry in the position the base entry held', () => {
		const declared = createNamedEntry('conformance-alpha')
		const trailing = createNamedEntry('conformance-beta')
		const replacement = createNamedEntry('conformance-alpha')
		const base: UserConfig = { plugins: [declared, trailing] }
		const merged = mergeOverride(base, { plugins: [replacement] })
		const plugins = readPlugins(merged)
		expect(plugins.length).toBe(2)
		expect(plugins[0]).toBe(replacement)
		expect(plugins[1]).toBe(trailing)

		// Control: the bare `mergeConfig` these factories depart from. It concatenates the arrays,
		// so the base entry survives beside its replacement, and the position reading and the count fail.
		const bare: UserConfig = mergeConfig(base, { plugins: [replacement] })
		expect(readPlugins(bare).length).toBe(3)
		expect(() => expect(readPlugins(bare).length).toBe(2)).toThrow(/expected/u)
		expect(() => expect(readPlugins(bare)[0]).toBe(replacement)).toThrow(/expected/u)
	})

	it('replaces one base entry per override entry where the base repeats a name', () => {
		const declared = createNamedEntry('conformance-alpha')
		const repeated = createNamedEntry('conformance-alpha')
		const replacement = createNamedEntry('conformance-alpha')
		const merged = mergeOverride({ plugins: [declared, repeated] }, { plugins: [replacement] })
		const plugins = readPlugins(merged)
		expect(plugins.length).toBe(2)
		expect(plugins[0]).toBe(replacement)
		expect(plugins[1]).toBe(repeated)

		// Control: the name-keyed selection this merge departs from. It collapses the base's two
		// entries into one, so the count and the trailing entry both fail against it.
		const keyed = selectByName([declared, repeated, replacement])
		expect(keyed.length).toBe(1)
		expect(() => expect(keyed.length).toBe(2)).toThrow(/expected/u)
		expect(() => expect(keyed[1]).toBe(repeated)).toThrow(/expected/u)
	})

	it('treats an entry whose name is not a string as unnamed', () => {
		// The plugin type declares `name` as a string, so each number is written after
		// construction, which is how an untyped plugin reaches the merge.
		const declared: Plugin = { name: 'conformance-numbered' }
		const candidate: Plugin = { name: 'conformance-numbered' }
		Reflect.set(declared, 'name', NUMBERED_NAME)
		Reflect.set(candidate, 'name', NUMBERED_NAME)
		expect(readField(declared, 'name')).toBe(NUMBERED_NAME)
		expect(readField(candidate, 'name')).toBe(NUMBERED_NAME)
		const merged = mergeOverride({ plugins: [declared] }, { plugins: [candidate] })
		const plugins = readPlugins(merged)
		expect(plugins.length).toBe(2)
		expect(plugins[0]).toBe(declared)
		expect(plugins[1]).toBe(candidate)

		// Control: the presence test this predicate departs from. It reads `name` without checking
		// its type, so it matches the two entries on the number they share and the count fails.
		const keyed = selectByName([declared, candidate])
		expect(keyed.length).toBe(1)
		expect(() => expect(keyed.length).toBe(2)).toThrow(/expected/u)
	})

	it('merges a value carrying command alone and refuses one carrying command and mode', () => {
		const browser = appBrowser()
		const merged = mergeOverride(browser, COMMAND_ONLY)
		expect(merged.base).toBe(COMMAND_ONLY.base)
		expect(readPluginNames(merged)).toStrictEqual(readPluginNames(browser))
		const refused = mergeOverride(browser, INVOCATION)
		expect(refused).toBe(browser)
		expect(refused.base).toBeUndefined()

		// Control: the discriminant keyed on `command` alone that this merge departs from, applied
		// to the value carrying `command` without `mode`. It reads one key rather than the pair,
		// so it refuses that value and returns the base for it. The subject's merged reading must
		// differ from what the rival returns.
		const refusesOnCommand = 'command' in COMMAND_ONLY
		const narrowed: UserConfig = refusesOnCommand ? browser : mergeConfig(browser, COMMAND_ONLY)
		expect(refusesOnCommand).toBe(true)
		expect(narrowed).toBe(browser)
		expect(() => expect(merged.base).toBe(narrowed.base)).toThrow(/expected/u)
	})

	it('merges a value carrying mode alone rather than reading it as the invocation record', () => {
		const browser = appBrowser()
		const merged = mergeOverride(browser, MODE_ONLY)
		expect(merged.base).toBe(MODE_ONLY.base)
		expect(merged.mode).toBe(MODE_ONLY.mode)
		expect(readPluginNames(merged)).toStrictEqual(readPluginNames(browser))

		// Control: the discriminant keyed on `mode` alone that this merge departs from, applied to
		// the value carrying `mode` without `command`. It reads one key rather than the pair, so it
		// refuses that value and returns the base for it. The subject's merged reading must differ
		// from what the rival returns.
		const refusesOnMode = 'mode' in MODE_ONLY
		const narrowed: UserConfig = refusesOnMode ? browser : mergeConfig(browser, MODE_ONLY)
		expect(refusesOnMode).toBe(true)
		expect(narrowed).toBe(browser)
		expect(() => expect(merged.base).toBe(narrowed.base)).toThrow(/expected/u)
	})
})
