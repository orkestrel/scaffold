// J-TAILWIND-PROBE census: records every plugin scenario (or the ones TAILWIND_PLUGINS names,
// comma-separated) under Veneer alone and under Veneer with the consumer preflight profile as its
// stylesheet, and writes both recordings and the departures of the tailwind runtime from the alone
// runtime under tmp/j-tailwind-probe/out/. A departure's `bootstrap` member holds the alone value
// and its `veneer` member the tailwind value, because the collector names its two sides that way.
import type { EngineDeparture, PluginRecording, PluginRuntime } from '../../tests/setupServer.js'
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import {
	PLUGIN_SCENARIOS,
	WORKSPACE_ROOT,
	collectEngineDepartures,
	compileVeneerRuntime,
	recordPluginOracle,
} from '../../tests/setupServer.js'
import { TAILWIND_PATHS, compileProfile } from '../../tests/setupService.js'

const OUTPUT = resolve(WORKSPACE_ROOT, 'tmp/j-tailwind-probe/out')

describe('census', () => {
	it('records both runtimes and writes the departures', async () => {
		mkdirSync(OUTPUT, { recursive: true })
		const selected =
			process.env.TAILWIND_PLUGINS?.split(',') ?? PLUGIN_SCENARIOS.map((s) => s.plugin)
		const alone = await compileVeneerRuntime()
		const tailwind: PluginRuntime = {
			...alone,
			stylesheet: await compileProfile(TAILWIND_PATHS.consumer.preflight),
		}
		const findings: Record<string, unknown> = {}
		for (const scenario of PLUGIN_SCENARIOS.filter((s) => selected.includes(s.plugin))) {
			const timings: Record<string, number> = {}
			let base: PluginRecording | undefined
			let paired: PluginRecording | undefined
			let started = performance.now()
			try {
				base = await recordPluginOracle(scenario, alone)
			} catch (error) {
				findings[`${scenario.plugin}.alone`] = String(error)
			}
			timings.alone = Math.round(performance.now() - started)
			started = performance.now()
			try {
				paired = await recordPluginOracle(scenario, tailwind)
			} catch (error) {
				findings[`${scenario.plugin}.tailwind`] = String(error)
			}
			timings.tailwind = Math.round(performance.now() - started)
			findings[`${scenario.plugin}.timings`] = timings
			if (base !== undefined)
				writeFileSync(
					resolve(OUTPUT, `${scenario.plugin}.alone.json`),
					JSON.stringify(base, undefined, '\t'),
				)
			if (paired !== undefined)
				writeFileSync(
					resolve(OUTPUT, `${scenario.plugin}.tailwind.json`),
					JSON.stringify(paired, undefined, '\t'),
				)
			if (base !== undefined && paired !== undefined) {
				const departures: readonly EngineDeparture[] = collectEngineDepartures(base, paired)
				findings[`${scenario.plugin}.steps`] = base.steps.length
				findings[`${scenario.plugin}.departures`] = departures.length
				writeFileSync(
					resolve(OUTPUT, `${scenario.plugin}.departures.json`),
					JSON.stringify(departures, undefined, '\t'),
				)
			}
		}
		const slice = process.env.TAILWIND_PLUGINS ?? 'all'
		writeFileSync(
			resolve(OUTPUT, `findings.${slice.replaceAll(',', '-')}.json`),
			JSON.stringify(findings, undefined, '\t'),
		)
		console.log(JSON.stringify(findings, undefined, 2))
		expect(true).toBe(true)
	}, 900_000)
})
