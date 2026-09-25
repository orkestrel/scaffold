// J-ORACLE-FIX-OFFCANVAS probe: records a static-backdrop offcanvas scenario under Bootstrap's bundle
// and Veneer's compiled source, and writes each step's focus and the departures, so the static
// press's focus reading is Bootstrap's own rather than an inference.
import type { PluginScenario } from '../../tests/setupServer.js'
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import {
	WORKSPACE_ROOT,
	collectEngineDepartures,
	compileVeneerRuntime,
	readBootstrapRuntime,
	recordPluginOracle,
} from '../../tests/setupServer.js'

const OUTPUT = resolve(WORKSPACE_ROOT, 'tmp/j-oracle-fix-offcanvas')

const SCENARIO: PluginScenario = {
	plugin: 'offcanvas',
	markup: [
		'<button id="trigger" class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvas">Open panel</button>',
		'<div id="offcanvas" class="offcanvas offcanvas-start" data-bs-backdrop="static" tabindex="-1" aria-labelledby="offcanvas-title">',
		'<div id="offcanvas-header" class="offcanvas-header"><h5 id="offcanvas-title" class="offcanvas-title">Panel</h5><button id="offcanvas-close" type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button></div>',
		'<div id="offcanvas-body" class="offcanvas-body"><p id="offcanvas-text">Body</p></div>',
		'</div>',
	].join(''),
	spawned: ['.offcanvas-backdrop'],
	setup: { bootstrap: '', veneer: 'new veneer.Delegate()' },
	actions: [
		{ name: 'click.trigger', gesture: 'click', target: 'trigger' },
		{ name: 'point.static.backdrop', gesture: 'point', point: { x: 1000, y: 300 }, refused: true },
		{ name: 'click.close', gesture: 'click', target: 'offcanvas-close' },
	],
}

describe('static backdrop probe', () => {
	it('records the focus each library leaves after a static backdrop press', async () => {
		mkdirSync(OUTPUT, { recursive: true })
		const official = await recordPluginOracle(SCENARIO, readBootstrapRuntime())
		const own = await recordPluginOracle(SCENARIO, await compileVeneerRuntime())
		const focus = official.steps.map((step, index) => ({
			step: step.name,
			bootstrap: step.state.focus,
			veneer: own.steps[index]?.state.focus,
		}))
		const departures = collectEngineDepartures(official, own)
		const label = process.env.PROBE_LABEL ?? 'probe'
		writeFileSync(
			resolve(OUTPUT, `static-${label}.json`),
			JSON.stringify({ focus, departures }, undefined, '\t'),
		)
		expect(focus.length).toBeGreaterThan(0)
	}, 300_000)
})
