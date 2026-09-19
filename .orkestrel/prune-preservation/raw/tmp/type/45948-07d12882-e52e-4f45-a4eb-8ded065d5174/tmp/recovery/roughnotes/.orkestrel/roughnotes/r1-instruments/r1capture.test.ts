import { writeFileSync } from 'node:fs'
import type { PluginOption, UserConfig } from 'vite'
import { it } from 'vitest'
import { VARIANTS, appBrowser, appShowcase, journey } from '../../vite.config.js'
import wrapper from '../../configs/app/vite.browser.config.js'

function readNames(config: UserConfig): readonly string[] {
	const plugins: readonly PluginOption[] = config.plugins ?? []
	return plugins.map((plugin) =>
		typeof plugin === 'object' && plugin !== null && 'name' in plugin
			? String(plugin.name)
			: Array.isArray(plugin)
				? 'nested'
				: String(plugin),
	)
}

function describeConfig(config: UserConfig): unknown {
	return JSON.parse(
		JSON.stringify({ ...config, plugins: readNames(config) }, (key, value: unknown) =>
			typeof value === 'function' ? 'function' : value,
		),
	)
}

it('captures the effective configuration of every wrapper and project', () => {
	const captured = {
		browser: describeConfig(appBrowser()),
		showcase: describeConfig(appShowcase()),
		journeys: VARIANTS.map((variant) => describeConfig(journey(variant))),
		wrapper: describeConfig(wrapper),
	}
	writeFileSync(
		process.env.CAPTURE_PATH ?? 'tmp/units/r1-wrappers.json',
		JSON.stringify(captured, undefined, '\t'),
		'utf8',
	)
})
