import { describe, expect, it } from 'vitest'
import { isArray, isRecord } from '@orkestrel/contract'
import { createScratch } from '@orkestrel/test/server'
import { join } from 'node:path'
import { runSkillScript, WORKSPACE_ROOT } from '../../../../setupServer.js'

const SCRIPT = '.agents/skills/orkestrel-harden/scripts/discovery.ts'

describe('discovery.ts', () => {
	it('gates every project in a wrapper config without a project filter', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-wrapper-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				JSON.stringify({
					type: 'module',
					scripts: {
						test: 'npm run test:wrapper',
						'test:wrapper': 'vitest run --config="wrapper.config.ts"',
					},
				}),
			)
			scratch.write(
				'vite.config.ts',
				"export default { test: { name: 'wrapper (chromium)', include: ['tests/sample.test.ts'] } }\n",
			)
			scratch.write(
				'wrapper.config.ts',
				"export default { test: { name: 'wrapped', include: ['tests/sample.test.ts'] } }\n",
			)
			scratch.write(
				'tests/sample.test.ts',
				"import { it } from 'vitest'\nit('collects', () => {})\n",
			)
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run.status).toBe(0)
			expect(run.json?.ungated).toEqual([])
			expect(run.json?.projects).toEqual([
				expect.objectContaining({
					name: 'wrapped',
					gate: 'test > test:wrapper',
					files: 1,
					tests: 1,
				}),
				expect.objectContaining({
					name: 'wrapper (chromium)',
					gate: 'test > test:wrapper',
					files: 1,
					tests: 1,
				}),
			])
		} finally {
			scratch.destroy()
		}
	})

	it('collects a file reached only through a second config script', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-config-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				JSON.stringify({
					type: 'module',
					scripts: {
						test: 'npm run test:core && npm run test:journey',
						'test:core': 'vitest run --project=core',
						'test:journey': 'vitest run --config journey.config.ts --project journey',
					},
				}),
			)
			scratch.write(
				'vite.config.ts',
				"export default { test: { name: 'core', include: ['tests/core.test.ts'] } }\n",
			)
			scratch.write(
				'journey.config.ts',
				"export default { test: { name: 'journey', include: ['tests/journey.test.ts'] } }\n",
			)
			for (const name of ['core', 'journey'])
				scratch.write(
					`tests/${name}.test.ts`,
					"import { it } from 'vitest'\nit('collects', () => {})\n",
				)
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run.status).toBe(0)
			expect(run.json?.undiscovered).toEqual([])
			expect(run.json?.projects).toContainEqual(
				expect.objectContaining({
					name: 'journey',
					gate: 'test > test:journey',
					files: 1,
					tests: 1,
				}),
			)
		} finally {
			scratch.destroy()
		}
	})

	it('collects the files selected by each gated config mode', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-mode-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				JSON.stringify({
					type: 'module',
					scripts: {
						test: 'npm run test:core && npm run test:vue && npm run test:browser',
						'test:core': 'vitest run --project core',
						'test:vue': 'vitest run --config=journey.config.ts --mode=vue',
						'test:browser': 'vitest run --config journey.config.ts --mode browser',
					},
				}),
			)
			scratch.write(
				'vite.config.ts',
				"export default { test: { name: 'core', include: ['tests/core.test.ts'] } }\n",
			)
			scratch.write(
				'journey.config.ts',
				"export default ({ mode }) => ({ test: { name: 'journey', include: ['tests/' + mode + '.test.ts'] } })\n",
			)
			for (const name of ['core', 'vue', 'browser'])
				scratch.write(
					`tests/${name}.test.ts`,
					"import { it } from 'vitest'\nit('collects', () => {})\n",
				)
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run.status).toBe(0)
			expect(run.json?.undiscovered).toEqual([])
			expect(run.json?.projects).toContainEqual(
				expect.objectContaining({ name: 'journey', files: 2, tests: 2 }),
			)
		} finally {
			scratch.destroy()
		}
	})

	it('keeps a project in an ungated second config outside another units gate', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-ungated-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				JSON.stringify({
					type: 'module',
					scripts: {
						test: 'npm run test:core',
						'test:core': 'vitest run --config vite.config.ts',
					},
				}),
			)
			scratch.write(
				'vite.config.ts',
				"export default { test: { name: 'core', include: ['tests/core.test.ts'] } }\n",
			)
			scratch.write(
				'second.config.ts',
				"export default { test: { name: 'orphan', include: ['tests/orphan.test.ts'] } }\n",
			)
			for (const name of ['core', 'orphan'])
				scratch.write(
					`tests/${name}.test.ts`,
					"import { it } from 'vitest'\nit('collects', () => {})\n",
				)
			const run = runSkillScript(SCRIPT, ['--config', 'second.config.ts', '--json'], {
				cwd: scratch.path,
			})
			expect(run.status).toBe(3)
			expect(run.json?.ungated).toEqual(['orphan'])
			expect(run.json?.undiscovered).toEqual([])
			expect(run.json?.projects).toContainEqual(
				expect.objectContaining({ name: 'core', gate: 'test > test:core', files: 1, tests: 1 }),
			)
		} finally {
			scratch.destroy()
		}
	})

	it('unions project filters per unit and collects that config and mode once', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-filters-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				JSON.stringify({
					type: 'module',
					scripts: {
						test: 'npm run test:core && npm run test:server -- --mode=selected && npm run test:browser',
						'test:core': 'vitest run --project core',
						'test:server': 'vitest run --config=./selected.config.ts --project=server',
						'test:browser':
							'vitest run --config selected.config.ts --mode selected --project browser',
					},
				}),
			)
			scratch.write(
				'vite.config.ts',
				"export default { test: { name: 'core', include: ['tests/core.test.ts'] } }\n",
			)
			scratch.write(
				'selected.config.ts',
				"import { appendFileSync } from 'node:fs'\nappendFileSync('listings', 'listed\\n')\nexport default ({ mode }) => ({ test: { projects: ['server', 'browser', 'excluded'].map((name) => ({ test: { name, include: ['cases/' + mode + '/' + name + '.test.ts'] } })) } })\n",
			)
			scratch.write('tests/core.test.ts', "import { it } from 'vitest'\nit('collects', () => {})\n")
			for (const name of ['server', 'browser'])
				scratch.write(
					`cases/selected/${name}.test.ts`,
					"import { it } from 'vitest'\nit('collects', () => {})\n",
				)
			scratch.write(
				'cases/selected/excluded.test.ts',
				"throw new Error('Excluded project collected')\n",
			)
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run.status).toBe(0)
			expect(scratch.read('listings')).toBe('listed\n')
			expect(run.json?.projects).toEqual([
				expect.objectContaining({
					name: 'browser',
					files: 1,
					tests: 1,
					units: [{ config: 'selected.config.ts', mode: 'selected' }],
				}),
				{ name: 'core', gate: 'test > test:core', files: 1, tests: 1 },
				expect.objectContaining({
					name: 'server',
					files: 1,
					tests: 1,
					units: [{ config: 'selected.config.ts', mode: 'selected' }],
				}),
			])
			const scoped = runSkillScript(SCRIPT, ['--projects', 'core', '--json'], { cwd: scratch.path })
			expect(scoped.status).toBe(0)
			expect(scoped.json?.projects).toEqual([
				{ name: 'core', gate: 'test > test:core', files: 1, tests: 1 },
			])
		} finally {
			scratch.destroy()
		}
	})

	it('lets an unfiltered gate collect beyond another gate on the same unit', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-all-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				JSON.stringify({
					type: 'module',
					scripts: {
						test: 'vitest run --config "selected config.ts" --project server && vitest run --config="selected config.ts"',
					},
				}),
			)
			scratch.write(
				'vite.config.ts',
				"export default { test: { name: 'server', include: ['tests/server.test.ts'] } }\n",
			)
			scratch.write(
				'selected config.ts',
				"export default { test: { projects: ['server', 'browser'].map((name) => ({ test: { name, include: ['tests/' + name + '.test.ts'] } })) } }\n",
			)
			for (const name of ['server', 'browser'])
				scratch.write(
					`tests/${name}.test.ts`,
					"import { it } from 'vitest'\nit('same', () => {})\nit('same', () => {})\n",
				)
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run.status).toBe(0)
			expect(run.json?.projects).toEqual([
				expect.objectContaining({ name: 'browser', gate: 'test', files: 1, tests: 2 }),
				expect.objectContaining({ name: 'server', gate: 'test', files: 1, tests: 2 }),
			])
		} finally {
			scratch.destroy()
		}
	})

	it('reports a gated project absent from the config as empty', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-absent-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				'{"type":"module","scripts":{"test":"npm run test:absent","test:absent":"vitest run --project absent"}}',
			)
			scratch.write(
				'vite.config.ts',
				"export default { test: { name: 'core', include: ['tests/sample.test.ts'] } }\n",
			)
			scratch.write('tests/sample.test.ts', "throw new Error('Excluded project collected')\n")
			const run = runSkillScript(SCRIPT, ['--projects', 'absent', '--json'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			expect(run.json?.empty).toEqual(['absent'])
			expect(run.json?.projects).toEqual([
				{ name: 'absent', gate: 'test > test:absent', files: 0, tests: 0 },
			])
		} finally {
			scratch.destroy()
		}
	})

	it('removes its listing without leaving a target tmp directory', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-cleanup-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				'{"type":"module","scripts":{"test":"vitest run --project core"}}',
			)
			scratch.write(
				'vite.config.ts',
				"export default { test: { name: 'core', include: ['tests/sample.test.ts'] } }\n",
			)
			scratch.write(
				'tests/sample.test.ts',
				"import { it } from 'vitest'\nit('collects', () => {})\n",
			)
			expect(runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path }).status).toBe(0)
			expect(scratch.has('tmp')).toBe(false)
		} finally {
			scratch.destroy()
		}
	})
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

	it('counts a browser instance under the gated project it belongs to', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-instance-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				'{"type":"module","scripts":{"test":"vitest run --project core"}}',
			)
			// Vitest reports a browser project's tests under the instance name `core (chromium)`.
			scratch.write(
				'vite.config.ts',
				"export default { test: { name: 'core (chromium)', include: ['tests/sample.test.ts'] } }\n",
			)
			scratch.write(
				'tests/sample.test.ts',
				"import { it } from 'vitest'\nit('collects', () => {})\n",
			)
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run.json?.projects).toEqual([{ name: 'core', gate: 'test', files: 1, tests: 1 }])
			expect(run.json?.ungated).toEqual([])
			expect(run.json?.empty).toEqual([])
			expect(run.status).toBe(0)
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
