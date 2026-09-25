// J-ORACLE-RECORD census instrument: records every plugin scenario (or the ones ORACLE_PLUGINS names,
// comma-separated) under Bootstrap's bundle and Veneer's compiled source, reports each step scan,
// and writes both recordings and the departures under tmp/j-oracle/census/.
import type { EngineDeparture, PluginRecording } from '../../tests/setupServer.js'
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import {
	PLUGIN_SCENARIOS,
	WORKSPACE_ROOT,
	collectEngineDepartures,
	compileVeneerRuntime,
	readBootstrapRuntime,
	recordPluginOracle,
	scanPluginSteps,
} from '../../tests/setupServer.js'

const OUTPUT = resolve(WORKSPACE_ROOT, 'tmp/j-oracle/census')

describe('census', () => {
	it('records both libraries and writes the departures', async () => {
		mkdirSync(OUTPUT, { recursive: true })
		const selected = process.env.ORACLE_PLUGINS?.split(',') ?? PLUGIN_SCENARIOS.map((s) => s.plugin)
		const veneer = await compileVeneerRuntime()
		const bootstrap = readBootstrapRuntime()
		const all: EngineDeparture[] = []
		const findings: Record<string, unknown> = {}
		for (const scenario of PLUGIN_SCENARIOS.filter((s) => selected.includes(s.plugin))) {
			const timings: Record<string, number> = {}
			let official: PluginRecording | undefined
			let own: PluginRecording | undefined
			let started = performance.now()
			try {
				official = await recordPluginOracle(scenario, bootstrap)
			} catch (error) {
				findings[`${scenario.plugin}.bootstrap`] = String(error)
			}
			timings.bootstrap = Math.round(performance.now() - started)
			started = performance.now()
			try {
				own = await recordPluginOracle(scenario, veneer)
			} catch (error) {
				findings[`${scenario.plugin}.veneer`] = String(error)
			}
			timings.veneer = Math.round(performance.now() - started)
			findings[`${scenario.plugin}.timings`] = timings
			if (official !== undefined) {
				writeFileSync(resolve(OUTPUT, `${scenario.plugin}.bootstrap.json`), JSON.stringify(official, undefined, '\t'))
				findings[`${scenario.plugin}.steps`] = scanPluginSteps(scenario, official) ?? 'every non-refused step changes state'
			}
			if (own !== undefined)
				writeFileSync(resolve(OUTPUT, `${scenario.plugin}.veneer.json`), JSON.stringify(own, undefined, '\t'))
			if (official !== undefined && own !== undefined) {
				const departures = collectEngineDepartures(official, own)
				all.push(...departures)
				findings[`${scenario.plugin}.departures`] = departures.length
			}
		}
		writeFileSync(resolve(OUTPUT, 'departures.json'), JSON.stringify(all, undefined, '\t'))
		writeFileSync(resolve(OUTPUT, 'findings.json'), JSON.stringify(findings, undefined, '\t'))
		console.log(JSON.stringify(findings, undefined, 2))
		expect(true).toBe(true)
	}, 900_000)
})
