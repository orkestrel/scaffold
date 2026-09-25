// J-TAILWIND-PROBE planted control: appends one rule to the compiled preflight profile that hides a
// shown collapse panel, records the collapse scenario under that stylesheet, and collects its
// departures from the alone runtime. The census reads zero departures only if this path can report
// a stylesheet-driven difference, so this control must read at least one.
import type { PluginRuntime } from '../../tests/setupServer.js'
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

describe('plant', () => {
	it('reports a planted stylesheet difference through the census path', async () => {
		mkdirSync(OUTPUT, { recursive: true })
		const alone = await compileVeneerRuntime()
		const profile = await compileProfile(TAILWIND_PATHS.consumer.preflight)
		const planted: PluginRuntime = {
			...alone,
			stylesheet: `${profile}\n#panel.show { opacity: 0; }\n`,
		}
		const scenario = PLUGIN_SCENARIOS.find((s) => s.plugin === 'collapse')
		if (scenario === undefined) throw new Error('No collapse scenario')
		const departures = collectEngineDepartures(
			await recordPluginOracle(scenario, alone),
			await recordPluginOracle(scenario, planted),
		)
		writeFileSync(resolve(OUTPUT, 'plant.departures.json'), JSON.stringify(departures, undefined, '\t'))
		console.log(JSON.stringify(departures, undefined, 2))
		expect(departures.length).toBeGreaterThan(0)
	}, 300_000)
})
