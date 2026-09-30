import { describe, expect, it } from 'vitest'
import { isArray, isRecord } from '@orkestrel/contract'
import { createScratch } from '@orkestrel/test/server'
import { runSkillScript, WORKSPACE_ROOT } from '../../../../setupServer.js'

const SCRIPT = '.agents/skills/orkestrel-harden/scripts/discovery.ts'

describe('discovery.ts', () => {
	it('reads this checkout: every gated project, its root chain, the workbench, and the skip markers', () => {
		const run = runSkillScript(SCRIPT, ['--json'], { cwd: WORKSPACE_ROOT })
		expect(run.status).toBe(0)
		const projects = run.json?.projects
		if (!isArray(projects)) throw new Error('The census carries no projects')
		const gates = new Map(
			projects.map((project) =>
				isRecord(project) ? [project.name, project.gate] : ['', undefined],
			),
		)
		expect(gates.get('policy')).toBe('test > test:policy')
		expect(gates.get('skills')).toBe('test > test:skills')
		expect(gates.get('distribution')).toBe('prepublishOnly > test:distribution')
		expect(run.json?.ungated).toEqual([])
		expect(run.json?.empty).toEqual([])
		expect(run.json?.workbenches).toEqual(['probe'])
		expect(run.json?.undiscovered).toEqual([])
		const census = run.json?.census
		if (!isArray(census)) throw new Error('The census carries no file rows')
		const helpers = census.find(
			(entry) => isRecord(entry) && entry.file === 'tests/src/server/helpers.test.ts',
		)
		expect(
			isRecord(helpers) &&
				isRecord(helpers.markers) &&
				typeof helpers.markers['.skipIf('] === 'number',
		).toBe(true)
		const text = runSkillScript(SCRIPT, [], { cwd: WORKSPACE_ROOT })
		expect(text.status).toBe(0)
		expect(text.stdout).toContain(
			'discovery: probe is a workbench no chain runs; it collects nothing',
		)
	})

	it('refuses a missing configuration, a flag with no value, and a checkout with no local Vitest', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-' })
		try {
			expect(
				runSkillScript(SCRIPT, ['--config', 'absent.config.ts'], { cwd: WORKSPACE_ROOT }).status,
			).toBe(64)
			expect(runSkillScript(SCRIPT, ['--config', '--json'], { cwd: WORKSPACE_ROOT }).status).toBe(
				64,
			)
			scratch.write('package.json', '{"scripts":{"test":"vitest run --project a"}}')
			scratch.write('vite.config.ts', 'export default {}\n')
			expect(runSkillScript(SCRIPT, [], { cwd: scratch.path }).status).toBe(2)
		} finally {
			scratch.destroy()
		}
	})
})
