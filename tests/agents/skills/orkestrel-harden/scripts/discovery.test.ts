import { describe, expect, it } from 'vitest'
import { isArray, isRecord } from '@orkestrel/contract'
import { createScratch } from '@orkestrel/test/server'
import { join } from 'node:path'
import { runSkillScript, WORKSPACE_ROOT } from '../../../../setupServer.js'

const SCRIPT = '.agents/skills/orkestrel-harden/scripts/discovery.ts'

describe('discovery.ts', () => {
	it('reads a listing despite bracketed optimizer output', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-output-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				'{"type":"module","scripts":{"test":"vitest run --project core"}}',
			)
			scratch.write(
				'vite.config.ts',
				"console.log('[vite] (client) [optimizer] dependencies optimized')\nexport default { test: { name: 'core', include: ['tests/sample.test.ts'] } }\n",
			)
			scratch.write(
				'tests/sample.test.ts',
				"import { it } from 'vitest'\nit('collects', () => {})\n",
			)
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run.status).toBe(0)
			expect(run.json?.projects).toEqual([{ name: 'core', gate: 'test', files: 1, tests: 1 }])
		} finally {
			scratch.destroy()
		}
	})

	it('scopes collection to every requested project before excluded modules execute', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-scope-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				'{"type":"module","scripts":{"test":"vitest run --project core --project server --project distribution"}}',
			)
			scratch.write(
				'vite.config.ts',
				"export default { test: { projects: ['core', 'server', 'distribution'].map((name) => ({ test: { name, include: ['tests/' + name + '.test.ts'] } })) } }\n",
			)
			for (const name of ['core', 'server']) {
				scratch.write(
					`tests/${name}.test.ts`,
					"import { it } from 'vitest'\nit('collects', () => {})\n",
				)
			}
			scratch.write(
				'tests/distribution.test.ts',
				"import { writeFileSync } from 'node:fs'\nimport { it } from 'vitest'\nwriteFileSync('collected', 'yes')\nit('collects', () => {})\n",
			)
			const run = runSkillScript(SCRIPT, ['--projects', 'core,server', '--json'], {
				cwd: scratch.path,
			})
			expect(scratch.has('collected')).toBe(false)
			expect(run.status).toBe(0)
			expect(run.json?.projects).toEqual([
				{ name: 'core', gate: 'test', files: 1, tests: 1 },
				{ name: 'server', gate: 'test', files: 1, tests: 1 },
			])
			expect(run.json?.undiscovered).toEqual([])
			const control = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(control.status).toBe(0)
			expect(scratch.has('collected')).toBe(true)
		} finally {
			scratch.destroy()
		}
	})

	it('prints the Vitest worker-group diagnostic and keeps exit 2 when listing fails', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-refusal-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write('package.json', '{"type":"module","scripts":{}}')
			scratch.write(
				'vite.config.ts',
				`export default {
	test: { projects: [
		{ test: { name: 'parallel', include: ['tests/sample.test.ts'], maxWorkers: 2 } },
		{ test: { name: 'serial', include: ['tests/sample.test.ts'], maxWorkers: 1, isolate: false } },
	] },
}\n`,
			)
			scratch.write(
				'tests/sample.test.ts',
				"import { it } from 'vitest'\nit('collects', () => {})\n",
			)
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run.status).toBe(2)
			expect(run.stderr).toContain("have different 'maxWorkers' but same 'sequence.groupOrder'")
			expect(run.stderr).toContain("Provide unique 'sequence.groupOrder' for them.")
			expect(run.stderr.split(/\r\n|\n/u).filter((line) => line !== '').length).toBeLessThanOrEqual(
				13,
			)
			scratch.write(
				'vite.config.ts',
				"throw new Error('Fixture configuration refused')\nexport default {}\n",
			)
			const refused = runSkillScript(SCRIPT, [], { cwd: scratch.path })
			expect(refused.status).toBe(2)
			expect(refused.stderr).toContain('Fixture configuration refused')
		} finally {
			scratch.destroy()
		}
	})

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
