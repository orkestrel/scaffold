// J-TAILWIND-PROBE extended reading: the consumer preflight profile with its markup line replaced by
// an inline source naming the scenario class tokens Tailwind generates and the exclusion line does
// not withhold (`p-3` from toast, `w-100` from carousel), so the utilities a consumer scanning that
// markup would generate are on the page. Records the toast and carousel scenarios under it and under
// the alone runtime, and writes the departures to tmp/j-tailwind-probe/out/extended.*.json.
import type { PluginRuntime } from '../../tests/setupServer.js'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import {
	PLUGIN_SCENARIOS,
	SheetReader,
	WORKSPACE_ROOT,
	collectEngineDepartures,
	compileVeneerRuntime,
	recordPluginOracle,
} from '../../tests/setupServer.js'
import { compileProfile } from '../../tests/setupService.js'

const OUTPUT = resolve(WORKSPACE_ROOT, 'tmp/j-tailwind-probe/out')

describe('extended', () => {
	it('records toast and carousel with the colliding utilities generated', async () => {
		const alone = await compileVeneerRuntime()
		const stylesheet = await compileProfile(resolve(OUTPUT, 'extended.css'))
		const names = new SheetReader(stylesheet).names
		const present = { 'p-3': names.includes('p-3'), 'w-100': names.includes('w-100') }
		const extended: PluginRuntime = { ...alone, stylesheet }
		const findings: Record<string, unknown> = { present }
		for (const scenario of PLUGIN_SCENARIOS.filter((s) => ['toast', 'carousel'].includes(s.plugin))) {
			const departures = collectEngineDepartures(
				await recordPluginOracle(scenario, alone),
				await recordPluginOracle(scenario, extended),
			)
			findings[scenario.plugin] = departures
		}
		writeFileSync(resolve(OUTPUT, 'extended.findings.json'), JSON.stringify(findings, undefined, '\t'))
		console.log(JSON.stringify(findings, undefined, 2))
		expect(present).toEqual({ 'p-3': true, 'w-100': true })
	}, 300_000)
})
