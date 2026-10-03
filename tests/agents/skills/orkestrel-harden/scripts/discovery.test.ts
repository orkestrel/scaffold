import { describe, expect, it } from 'vitest'
import { isArray, isRecord } from '@orkestrel/contract'
import { createScratch } from '@orkestrel/test/server'
import { join } from 'node:path'
import { runSkillScript, WORKSPACE_ROOT } from '../../../../setupServer.js'

const SCRIPT = '.agents/skills/orkestrel-harden/scripts/discovery.ts'

describe('discovery.ts', () => {
	it('passes allowOnly and strictTags boolean values to full gate collection', () => {
		const scratch = createScratch({ prefix: 'discovery-collection-options-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'vite.config.ts',
				"export default { test: { name: 'core', include: ['tests/*.test.ts'] } }\n",
			)
			scratch.write('tests/a.test.ts', "import { it } from 'vitest'\nit('collects', () => {})\n")
			for (const option of ['--allowOnly', '--strictTags']) {
				scratch.write(
					'package.json',
					JSON.stringify({ type: 'module', scripts: { test: `vitest run ${option} false` } }),
				)
				const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
				expect(run).toMatchObject({ status: 0 })
				expect(run.json?.projects).toEqual([{ name: 'core', gate: 'test', files: 1, tests: 1 }])
			}
			scratch.write(
				'tests/a.test.ts',
				"import { it } from 'vitest'\nit.only('collects', () => {})\n",
			)
			scratch.write(
				'package.json',
				JSON.stringify({ type: 'module', scripts: { test: 'vitest run --allowOnly false' } }),
			)
			const refused = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(refused).toMatchObject({ status: 2 })
			expect(refused.stderr).toContain('allowOnly')
		} finally {
			scratch.destroy()
		}
	})
	it('reuses the universe for a gate with no arguments', () => {
		const scratch = createScratch({ prefix: 'discovery-unfiltered-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				JSON.stringify({ type: 'module', scripts: { test: 'vitest run' } }),
			)
			scratch.write(
				'vite.config.ts',
				"import { appendFileSync } from 'node:fs'\nappendFileSync('listings', 'listed\\n')\nexport default { test: { name: 'core', include: ['tests/*.test.ts'] } }\n",
			)
			scratch.write('tests/a.test.ts', "import { it } from 'vitest'\nit('collects', () => {})\n")
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run).toMatchObject({ status: 0 })
			expect(scratch.read('listings')).toBe('listed\n')
		} finally {
			scratch.destroy()
		}
	})

	it('names the gate and option when Vitest refuses an argument', () => {
		const scratch = createScratch({ prefix: 'discovery-option-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				JSON.stringify({
					type: 'module',
					scripts: { test: 'npm run test:core', 'test:core': 'vitest run --unrecognized' },
				}),
			)
			scratch.write(
				'vite.config.ts',
				"export default { test: { name: 'core', include: ['tests/*.test.ts'] } }\n",
			)
			scratch.write('tests/a.test.ts', "import { it } from 'vitest'\nit('collects', () => {})\n")
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run.status).toBe(2)
			expect(run.stderr).toContain('test > test:core')
			expect(run.stderr).toContain('--unrecognized')
		} finally {
			scratch.destroy()
		}
	})
	it('repeats the census when a workbench file appears between its universe and gate listings', () => {
		const scratch = createScratch({ prefix: 'discovery-mutation-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				JSON.stringify({
					type: 'module',
					scripts: {
						test: 'vitest run --project core',
						probe: 'vitest run --project probe',
						release: 'vitest run --mode release --project core',
					},
				}),
			)
			scratch.write(
				'vite.config.ts',
				`import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
export default ({ mode }) => {
 if (mode === 'release' && !existsSync('tmp/probes/appeared.test.ts')) {
  mkdirSync('tmp/probes', { recursive: true })
  writeFileSync('tmp/probes/appeared.test.ts', "import { it } from 'vitest'\\nit('appeared', () => {})\\n")
 }
 return { test: { projects: [{ test: { name: 'core', include: ['tests/*.test.ts'] } }, { test: { name: 'probe', include: ['tmp/probes/*.test.ts'] } }] } }
}\n`,
			)
			scratch.write('tests/a.test.ts', "import { it } from 'vitest'\nit('collects', () => {})\n")
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run).toMatchObject({ status: 0 })
			expect(run.json?.ungated).toEqual([])
			expect(run.json?.projects).toContainEqual(
				expect.objectContaining({ name: 'probe', gate: 'probe', files: 1, tests: 1 }),
			)
		} finally {
			scratch.destroy()
		}
	})
	it('uses the config discovered under a gate root as a separate universe', () => {
		const scratch = createScratch({ prefix: 'discovery-root-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				JSON.stringify({ type: 'module', scripts: { test: 'vitest run --root nested' } }),
			)
			scratch.write(
				'vite.config.ts',
				"export default { test: { name: 'base', include: ['tests/a.test.ts'] } }\n",
			)
			scratch.write(
				'nested/vite.config.ts',
				"export default { test: { name: 'nested', include: ['tests/b.test.ts'] } }\n",
			)
			for (const file of ['tests/a.test.ts', 'nested/tests/b.test.ts'])
				scratch.write(file, "import { it } from 'vitest'\nit('collects', () => {})\n")
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run).toMatchObject({ status: 3 })
			expect(run.json?.projects).toEqual([
				{ name: 'base', files: 1, tests: 1 },
				{ name: 'nested', gate: 'test', files: 1, tests: 1, units: [{ root: 'nested' }] },
			])
		} finally {
			scratch.destroy()
		}
	})

	it('does not add an empty browser base name when another mode collects its instance', () => {
		const scratch = createScratch({ prefix: 'discovery-empty-browser-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				JSON.stringify({
					type: 'module',
					scripts: {
						test: 'npm run test:web',
						'test:web': 'vitest run --mode empty --project web --passWithNoTests',
					},
				}),
			)
			scratch.write(
				'vite.config.ts',
				"import { playwright } from '@vitest/browser-playwright'\nexport default ({ mode }) => ({ test: { name: 'web', include: mode === 'empty' ? [] : ['tests/web.test.ts'], browser: { enabled: true, headless: true, provider: playwright(), instances: [{ browser: 'chromium' }] } } })\n",
			)
			scratch.write('tests/web.test.ts', "import { it } from 'vitest'\nit('collects', () => {})\n")
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run).toMatchObject({ status: 3 })
			expect(run.json?.projects).toEqual([{ name: 'web (chromium)', files: 1, tests: 1 }])
			expect(run.json?.empty).toEqual([])
		} finally {
			scratch.destroy()
		}
	})
	it('keeps duplicate names distinct when a line filter selects one test in one file', () => {
		const scratch = createScratch({ prefix: 'discovery-lines-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				JSON.stringify({ type: 'module', scripts: { test: 'vitest run tests/a.test.ts:2' } }),
			)
			scratch.write(
				'vite.config.ts',
				"export default { test: { name: 'core', include: ['tests/*.test.ts'] } }\n",
			)
			scratch.write(
				'tests/a.test.ts',
				"import { it } from 'vitest'\nit('same', () => {})\nit('same', () => {})\n",
			)
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run).toMatchObject({ status: 3 })
			expect(run.json?.projects).toEqual([{ name: 'core', files: 1, tests: 2 }])
		} finally {
			scratch.destroy()
		}
	})

	it('keeps duplicate names distinct when tagsFilter selects a partial gate', () => {
		const scratch = createScratch({ prefix: 'discovery-tags-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				JSON.stringify({ type: 'module', scripts: { test: 'vitest run --tagsFilter chosen' } }),
			)
			scratch.write(
				'vite.config.ts',
				"export default { test: { name: 'core', include: ['tests/*.test.ts'], tags: [{ name: 'chosen' }, { name: 'outside' }] } }\n",
			)
			scratch.write(
				'tests/a.test.ts',
				"import { it } from 'vitest'\nit('same', { tags: ['chosen'] }, () => {})\nit('same', { tags: ['outside'] }, () => {})\n",
			)
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run).toMatchObject({ status: 3 })
			expect(run.json?.projects).toEqual([{ name: 'core', files: 1, tests: 2 }])
		} finally {
			scratch.destroy()
		}
	})

	it('passes a negated boolean before a file filter to Vitest', () => {
		const scratch = createScratch({ prefix: 'discovery-boolean-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				JSON.stringify({
					type: 'module',
					scripts: { test: 'vitest run --no-api tests/a.test.ts' },
				}),
			)
			scratch.write(
				'vite.config.ts',
				"export default { test: { name: 'core', include: ['tests/*.test.ts'] } }\n",
			)
			for (const name of ['a', 'b'])
				scratch.write(
					`tests/${name}.test.ts`,
					"import { it } from 'vitest'\nit('collects', () => {})\n",
				)
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run).toMatchObject({ status: 3 })
			expect(run.json?.projects).toEqual([{ name: 'core', files: 2, tests: 2 }])
		} finally {
			scratch.destroy()
		}
	})

	it('passes explicit boolean values and separator tokens to Vitest', () => {
		const scratch = createScratch({ prefix: 'discovery-arguments-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'vite.config.ts',
				"export default { test: { name: 'core', include: ['tests/*.test.ts'] } }\n",
			)
			scratch.write('tests/a.test.ts', "import { it } from 'vitest'\nit('collects', () => {})\n")
			for (const test of [
				'vitest run --isolate false tests/a.test.ts',
				'vitest run --project core -- --project absent',
			]) {
				scratch.write('package.json', JSON.stringify({ type: 'module', scripts: { test } }))
				const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
				expect.soft(run.status, test + run.stdout + run.stderr).toBe(0)
				expect
					.soft(run.json?.projects)
					.toEqual([{ name: 'core', gate: 'test', files: 1, tests: 1 }])
			}
		} finally {
			scratch.destroy()
		}
	})

	it('passes passWithNoTests to an empty shard listing', () => {
		const scratch = createScratch({ prefix: 'discovery-shard-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				JSON.stringify({
					type: 'module',
					scripts: { test: 'vitest run --shard=3/3 --passWithNoTests' },
				}),
			)
			scratch.write(
				'vite.config.ts',
				"export default { test: { name: 'core', include: ['tests/*.test.ts'] } }\n",
			)
			scratch.write('tests/a.test.ts', "import { it } from 'vitest'\nit('collects', () => {})\n")
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run).toMatchObject({ status: 3 })
			expect(run.json?.projects).toEqual([{ name: 'core', files: 1, tests: 1 }])
		} finally {
			scratch.destroy()
		}
	})

	it('refuses reporting and cache maintenance invocations as gates', () => {
		const scratch = createScratch({ prefix: 'discovery-non-gates-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'vite.config.ts',
				"export default { test: { name: 'core', include: ['tests/*.test.ts'] } }\n",
			)
			scratch.write('tests/a.test.ts', "import { it } from 'vitest'\nit('collects', () => {})\n")
			for (const test of ['vitest --merge-reports', 'vitest --listTags', 'vitest --clearCache']) {
				scratch.write('package.json', JSON.stringify({ type: 'module', scripts: { test } }))
				const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
				expect.soft(run.status, test + run.stdout + run.stderr).toBe(3)
			}
		} finally {
			scratch.destroy()
		}
	})
	it('compares real browser project identities from full and file-only listings', () => {
		const scratch = createScratch({ prefix: 'discovery-browser-list-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write('package.json', '{"type":"module"}')
			scratch.write(
				'vite.config.ts',
				"import { playwright } from '@vitest/browser-playwright'\nexport default { test: { name: 'web', include: ['tests/web.test.ts'], browser: { enabled: true, headless: true, provider: playwright(), instances: [{ browser: 'chromium' }] } } }\n",
			)
			scratch.write('tests/web.test.ts', "import { it } from 'vitest'\nit('browser', () => {})\n")
			for (const args of [[], ['--filesOnly']]) {
				const run = runSkillScript(
					'node_modules/vitest/vitest.mjs',
					['list', '--config', 'vite.config.ts', '--project', 'web', '--json=listed.json', ...args],
					{ cwd: scratch.path },
				)
				expect.soft(run.status, run.stderr).toBe(0)
				const listed: unknown = JSON.parse(scratch.read('listed.json') ?? 'null')
				expect(listed).toEqual([
					expect.objectContaining({
						projectName: 'web (chromium)',
						file: join(scratch.path, 'tests/web.test.ts').replaceAll('\\', '/'),
					}),
				])
			}
		} finally {
			scratch.destroy()
		}
	})

	it('lets Vitest apply name patterns, exclusions, line filters, and shards', () => {
		const scratch = createScratch({ prefix: 'discovery-selectors-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'vite.config.ts',
				"export default { test: { name: 'core', include: ['tests/*.test.ts'] } }\n",
			)
			for (const name of ['a', 'b'])
				scratch.write(
					`tests/${name}.test.ts`,
					"import { it } from 'vitest'\nit('selected', () => {})\nit('outside', () => {})\n",
				)
			for (const test of [
				'vitest run -t selected',
				'vitest run --test-name-pattern=selected',
				'vitest run --exclude tests/b.test.ts',
				'vitest run tests/a.test.ts:2',
				'vitest run --shard 1/2',
			]) {
				scratch.write('package.json', JSON.stringify({ type: 'module', scripts: { test } }))
				const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
				expect.soft(run.status, `${test}\n${run.stderr}`).toBe(3)
				expect.soft(run.json?.projects, test).toEqual([{ name: 'core', files: 2, tests: 4 }])
			}
			scratch.write(
				'package.json',
				JSON.stringify({
					type: 'module',
					scripts: {
						test: 'vitest run -t selected && vitest run --testNamePattern outside --reporter dot --no-cache --no-color --typecheck.only=false',
					},
				}),
			)
			const complete = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect.soft(complete.status, complete.stderr).toBe(0)
			expect(complete.json?.projects).toEqual([{ name: 'core', gate: 'test', files: 2, tests: 4 }])
		} finally {
			scratch.destroy()
		}
	})

	it('F1 leaves a real browser project ungated when its base name is negated', () => {
		const scratch = createScratch({ prefix: 'discovery-f1-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				JSON.stringify({ type: 'module', scripts: { test: 'vitest run --project !web' } }),
			)
			scratch.write(
				'vite.config.ts',
				"import { playwright } from '@vitest/browser-playwright'\nexport default { test: { projects: [{ test: { name: 'web', include: ['tests/web.test.ts'], browser: { enabled: true, headless: true, provider: playwright(), instances: [{ browser: 'chromium' }] } } }] } }\n",
			)
			scratch.write('tests/web.test.ts', "import { it } from 'vitest'\nit('browser', () => {})\n")
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			expect(run.json?.projects).toEqual([{ name: 'web (chromium)', files: 1, tests: 1 }])
			expect(run.json?.ungated).toEqual(['web (chromium)'])
		} finally {
			scratch.destroy()
		}
	})

	it('F2 leaves the file outside a positional filter ungated', () => {
		const scratch = createScratch({ prefix: 'discovery-f2-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				JSON.stringify({ type: 'module', scripts: { test: 'vitest run tests/a.test.ts' } }),
			)
			scratch.write(
				'vite.config.ts',
				"export default { test: { name: 'node', include: ['tests/*.test.ts'] } }\n",
			)
			for (const name of ['a', 'b'])
				scratch.write(
					`tests/${name}.test.ts`,
					"import { it } from 'vitest'\nit('collects', () => {})\n",
				)
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			expect(run.json?.projects).toEqual([{ name: 'node', files: 2, tests: 2 }])
			expect(run.json?.ungated).toEqual(['node'])
		} finally {
			scratch.destroy()
		}
	})

	it('F3 refuses benchmark commands as ordinary test gates', () => {
		const scratch = createScratch({ prefix: 'discovery-f3-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				JSON.stringify({ type: 'module', scripts: { test: 'vitest bench --project core' } }),
			)
			scratch.write(
				'vite.config.ts',
				"export default { test: { name: 'core', include: ['tests/a.test.ts'] } }\n",
			)
			scratch.write('tests/a.test.ts', "import { it } from 'vitest'\nit('collects', () => {})\n")
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			expect(run.json?.projects).toEqual([{ name: 'core', files: 1, tests: 1 }])
		} finally {
			scratch.destroy()
		}
	})

	it('F4 merges real browser identities across modes without folding', () => {
		const scratch = createScratch({ prefix: 'discovery-f4-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				JSON.stringify({ type: 'module', scripts: { test: 'vitest run --mode ci --project web' } }),
			)
			scratch.write(
				'vite.config.ts',
				"import { playwright } from '@vitest/browser-playwright'\nexport default { test: { projects: [{ test: { name: 'web', include: ['tests/web.test.ts'], browser: { enabled: true, headless: true, provider: playwright(), instances: [{ browser: 'chromium' }] } } }] } }\n",
			)
			scratch.write('tests/web.test.ts', "import { it } from 'vitest'\nit('browser', () => {})\n")
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run.status).toBe(0)
			expect(run.json?.projects).toEqual([
				{
					name: 'web (chromium)',
					gate: 'test',
					files: 1,
					tests: 1,
					units: [{ config: 'vite.config.ts' }, { config: 'vite.config.ts', mode: 'ci' }],
				},
			])
		} finally {
			scratch.destroy()
		}
	})

	it('F5 classifies an empty chained project independently of script order', () => {
		const scratch = createScratch({ prefix: 'discovery-f5-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'vite.config.ts',
				"export default { test: { projects: [{ test: { name: 'core', include: ['tests/a.test.ts'] } }, { test: { name: 'probe', include: [] } }] } }\n",
			)
			scratch.write('tests/a.test.ts', "import { it } from 'vitest'\nit('collects', () => {})\n")
			for (const scripts of [
				{
					probe: 'vitest run --project probe',
					test: 'npm run test:unit',
					'test:unit': 'vitest run --project core --project probe',
				},
				{
					test: 'npm run test:unit',
					'test:unit': 'vitest run --project core --project probe',
					probe: 'vitest run --project probe',
				},
			]) {
				scratch.write('package.json', JSON.stringify({ type: 'module', scripts }))
				const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
				expect(run.status).toBe(3)
				expect(run.json?.empty).toEqual(['probe'])
				expect(run.json?.workbenches).toEqual([])
			}
		} finally {
			scratch.destroy()
		}
	})

	it('O2 recognizes the runner after Node options and npm exec', () => {
		const scratch = createScratch({ prefix: 'discovery-o2-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'vite.config.ts',
				"export default { test: { name: 'core', include: ['tests/a.test.ts'] } }\n",
			)
			scratch.write('tests/a.test.ts', "import { it } from 'vitest'\nit('collects', () => {})\n")
			for (const test of [
				'node --max-old-space-size=4096 node_modules/vitest/vitest.mjs run',
				'npm exec vitest run',
			]) {
				scratch.write('package.json', JSON.stringify({ type: 'module', scripts: { test } }))
				const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
				expect.soft(run.status, test).toBe(0)
				expect
					.soft(run.json?.projects, test)
					.toEqual([{ name: 'core', gate: 'test', files: 1, tests: 1 }])
			}
		} finally {
			scratch.destroy()
		}
	})
	it('keeps an empty workbench outside an unrelated unfiltered listing gate', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-empty-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				JSON.stringify({
					type: 'module',
					scripts: {
						test: 'npm run test:wrapper',
						'test:wrapper': 'vitest run --config wrapper.config.ts',
						'test:probe': 'vitest run --project probe',
					},
				}),
			)
			for (const config of ['vite.config.ts', 'wrapper.config.ts']) {
				scratch.write(
					config,
					"export default { test: { name: 'core', include: ['tests/shared.test.ts'] } }\n",
				)
			}
			scratch.write(
				'tests/shared.test.ts',
				"import { it } from 'vitest'\nit('collects', () => {})\n",
			)
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run.status).toBe(0)
			expect(run.json?.empty).toEqual([])
			expect(run.json?.workbenches).toEqual(['probe'])
			expect(run.json?.projects).toContainEqual({
				name: 'probe',
				gate: 'test:probe',
				files: 0,
				tests: 0,
			})
		} finally {
			scratch.destroy()
		}
	})

	it('does not gate tests through a listing that only names their project', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-named-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				JSON.stringify({
					type: 'module',
					scripts: {
						test: 'vitest run --project node && vitest run --config wrapper.config.ts --project wrapped --project browser',
					},
				}),
			)
			scratch.write(
				'vite.config.ts',
				"export default { test: { projects: ['node', 'browser'].map((name) => ({ test: { name, include: ['tests/shared.test.ts'] } })) } }\n",
			)
			scratch.write(
				'wrapper.config.ts',
				"export default { test: { name: 'wrapped', include: ['tests/shared.test.ts'] } }\n",
			)
			scratch.write(
				'tests/shared.test.ts',
				"import { it } from 'vitest'\nit('collects', () => {})\n",
			)
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			expect(run.json?.ungated).toEqual(['browser'])
			expect(run.json?.projects).toContainEqual({ name: 'browser', files: 1, tests: 1 })
		} finally {
			scratch.destroy()
		}
	})

	it('keeps a Vitest file argument inside its project gate', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-argument-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				'{"type":"module","scripts":{"test":"vitest run --project node tests/shared.test.ts"}}',
			)
			scratch.write(
				'vite.config.ts',
				"export default { test: { projects: ['node', 'browser'].map((name) => ({ test: { name, include: ['tests/shared.test.ts'] } })) } }\n",
			)
			scratch.write(
				'tests/shared.test.ts',
				"import { it } from 'vitest'\nit('collects', () => {})\n",
			)
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			expect(run.json?.ungated).toEqual(['browser'])
		} finally {
			scratch.destroy()
		}
	})

	it('flags a row when only some of its test identities have a gate', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-partial-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				'{"type":"module","scripts":{"test":"vitest run --config other.config.ts"}}',
			)
			scratch.write(
				'vite.config.ts',
				"export default { test: { name: 'node', include: ['tests/a.test.ts'] } }\n",
			)
			scratch.write(
				'other.config.ts',
				"export default { test: { name: 'node', include: ['tests/b.test.ts'] } }\n",
			)
			for (const name of ['a', 'b'])
				scratch.write(
					`tests/${name}.test.ts`,
					"import { it } from 'vitest'\nit('collects', () => {})\n",
				)
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			expect(run.json?.ungated).toEqual(['node'])
			expect(run.json?.projects).toEqual([
				{
					name: 'node',
					files: 2,
					tests: 2,
					units: [{ config: 'vite.config.ts' }, { config: 'other.config.ts' }],
				},
			])
		} finally {
			scratch.destroy()
		}
	})

	it('keeps a non-browser parenthetical project name intact', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-parenthetical-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				'{"type":"module","scripts":{"test":"vitest run --project core"}}',
			)
			scratch.write(
				'vite.config.ts',
				"export default { test: { projects: ['core', 'core (legacy)'].map((name) => ({ test: { name, include: ['tests/shared.test.ts'] } })) } }\n",
			)
			scratch.write(
				'tests/shared.test.ts',
				"import { it } from 'vitest'\nit('collects', () => {})\n",
			)
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			expect(run.json?.ungated).toEqual(['core (legacy)'])
		} finally {
			scratch.destroy()
		}
	})

	it('matches wildcard project filters against the whole name', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-wildcard-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				JSON.stringify({ type: 'module', scripts: { test: 'vitest run --project "src:*"' } }),
			)
			scratch.write(
				'vite.config.ts',
				"export default { test: { projects: ['src:core', 'src:server', 'app:core'].map((name) => ({ test: { name, include: ['tests/shared.test.ts'] } })) } }\n",
			)
			scratch.write(
				'tests/shared.test.ts',
				"import { it } from 'vitest'\nit('collects', () => {})\n",
			)
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			expect(run.json?.ungated).toEqual(['app:core'])
			expect(run.json?.projects).toEqual([
				{ name: 'app:core', files: 1, tests: 1 },
				{ name: 'src:core', gate: 'test', files: 1, tests: 1 },
				{ name: 'src:server', gate: 'test', files: 1, tests: 1 },
			])
		} finally {
			scratch.destroy()
		}
	})

	it('matches negated project filters', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-negated-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				'{"type":"module","scripts":{"test":"vitest run --project !browser"}}',
			)
			scratch.write(
				'vite.config.ts',
				"export default { test: { projects: ['node', 'browser'].map((name) => ({ test: { name, include: ['tests/shared.test.ts'] } })) } }\n",
			)
			scratch.write(
				'tests/shared.test.ts',
				"import { it } from 'vitest'\nit('collects', () => {})\n",
			)
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			expect(run.json?.ungated).toEqual(['browser'])
			expect(run.json?.projects).toEqual([
				{ name: 'browser', files: 1, tests: 1 },
				{ name: 'node', gate: 'test', files: 1, tests: 1 },
			])
		} finally {
			scratch.destroy()
		}
	})

	it('matches project filters without case sensitivity', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-case-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				'{"type":"module","scripts":{"test":"vitest run --project Core"}}',
			)
			scratch.write(
				'vite.config.ts',
				"export default { test: { name: 'core', include: ['tests/shared.test.ts'] } }\n",
			)
			scratch.write(
				'tests/shared.test.ts',
				"import { it } from 'vitest'\nit('collects', () => {})\n",
			)
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run.status).toBe(0)
			expect(run.json?.projects).toEqual([{ name: 'core', gate: 'test', files: 1, tests: 1 }])
		} finally {
			scratch.destroy()
		}
	})

	it('refuses a Vitest argument outside command position and a list command as gates', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-position-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'vite.config.ts',
				"export default { test: { name: 'core', include: ['tests/shared.test.ts'] } }\n",
			)
			scratch.write(
				'tests/shared.test.ts',
				"import { it } from 'vitest'\nit('collects', () => {})\n",
			)
			for (const test of ['npm ls vitest', 'vitest list tests/shared.test.ts']) {
				scratch.write('package.json', JSON.stringify({ type: 'module', scripts: { test } }))
				const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
				expect(run.status).toBe(3)
				expect(run.json?.ungated).toEqual(['core'])
			}
		} finally {
			scratch.destroy()
		}
	})

	it('X2 excludes benchmark-only collection from the test universe', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-benchmark-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				'{"type":"module","scripts":{"test":"vitest bench --project core"}}',
			)
			scratch.write(
				'vite.config.ts',
				"export default ({ mode }) => ({ test: { name: 'core', include: ['cases/' + mode + '.test.ts'] } })\n",
			)
			for (const name of ['test', 'benchmark'])
				scratch.write(
					`cases/${name}.test.ts`,
					"import { it } from 'vitest'\nit('collects', () => {})\n",
				)
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			expect(run.json?.ungated).toEqual(['core'])
			expect(run.json?.projects).toEqual([
				{
					name: 'core',
					files: 1,
					tests: 1,
				},
			])
		} finally {
			scratch.destroy()
		}
	})

	it('keeps a shared file from gating another project in the same config', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-overlap-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				'{"type":"module","scripts":{"test":"vitest run --project node"}}',
			)
			scratch.write(
				'vite.config.ts',
				"export default { test: { projects: ['node', 'browser'].map((name) => ({ test: { name, include: ['tests/shared.test.ts'] } })) } }\n",
			)
			scratch.write(
				'tests/shared.test.ts',
				"import { it } from 'vitest'\nit('collects', () => {})\n",
			)
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			expect(run.json?.ungated).toEqual(['browser'])
			expect(run.json?.projects).toEqual([
				{ name: 'browser', files: 1, tests: 1 },
				{ name: 'node', gate: 'test', files: 1, tests: 1 },
			])
		} finally {
			scratch.destroy()
		}
	})

	it('keeps distinct reported project names across listing gates', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-fold-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				'{"type":"module","scripts":{"test":"vitest run --config second.config.ts --project core"}}',
			)
			scratch.write(
				'vite.config.ts',
				"export default { test: { name: 'core (chromium)', include: ['tests/shared.test.ts'] } }\n",
			)
			scratch.write(
				'second.config.ts',
				"export default { test: { name: 'core', include: ['tests/shared.test.ts'] } }\n",
			)
			scratch.write(
				'tests/shared.test.ts',
				"import { it } from 'vitest'\nit('collects', () => {})\n",
			)
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			expect(run.json?.ungated).toEqual(['core (chromium)'])
			expect(run.json?.projects).toEqual([
				{ name: 'core', gate: 'test', files: 1, tests: 1, units: [{ config: 'second.config.ts' }] },
				{ name: 'core (chromium)', files: 1, tests: 1 },
			])
		} finally {
			scratch.destroy()
		}
	})

	it('counts repeated browser identities once across listings and retains duplicate names', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-dedupe-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				'{"type":"module","scripts":{"test":"vitest run --project core && vitest run --config second.config.ts --project core"}}',
			)
			for (const config of ['vite.config.ts', 'second.config.ts'])
				scratch.write(
					config,
					"import { playwright } from '@vitest/browser-playwright'\nexport default { test: { name: 'core', include: ['tests/shared.test.ts'], browser: { enabled: true, headless: true, provider: playwright(), instances: [{ browser: 'chromium' }] } } }\n",
				)
			scratch.write(
				'tests/shared.test.ts',
				"import { it } from 'vitest'\nit('same', () => {})\nit('same', () => {})\n",
			)
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run.status).toBe(0)
			expect(run.json?.projects).toEqual([
				{
					name: 'core (chromium)',
					gate: 'test',
					files: 1,
					tests: 2,
					units: [{ config: 'vite.config.ts' }, { config: 'second.config.ts' }],
				},
			])
		} finally {
			scratch.destroy()
		}
	})

	it('recognizes a Vitest entry path as the command token', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-entry-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				'{"type":"module","scripts":{"test":"node node_modules/vitest/vitest.mjs run --project core"}}',
			)
			scratch.write(
				'vite.config.ts',
				"export default { test: { name: 'core', include: ['tests/sample.test.ts'] } }\n",
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

	it('shares the default universe and passes explicit test mode to its own gate listing', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-default-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				'{"type":"module","scripts":{"test":"vitest run --project core && vitest run --mode test --project core"}}',
			)
			scratch.write(
				'vite.config.ts',
				"import { appendFileSync } from 'node:fs'\nappendFileSync('listings', 'listed\\n')\nexport default { test: { name: 'core', include: ['tests/sample.test.ts'] } }\n",
			)
			scratch.write(
				'tests/sample.test.ts',
				"import { it } from 'vitest'\nit('collects', () => {})\n",
			)
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run.status).toBe(0)
			expect(scratch.read('listings')).toBe('listed\nlisted\nlisted\n')
			expect(run.json?.projects).toEqual([{ name: 'core', gate: 'test', files: 1, tests: 1 }])
		} finally {
			scratch.destroy()
		}
	})

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
			expect(run.status).toBe(3)
			expect(run.json?.ungated).toEqual(['wrapper (chromium)'])
			expect(run.json?.projects).toEqual([
				expect.objectContaining({
					name: 'wrapped',
					gate: 'test > test:wrapper',
					files: 1,
					tests: 1,
				}),
				{
					name: 'wrapper (chromium)',
					files: 1,
					tests: 1,
				},
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

	it('collects an unfiltered universe per unit and lets each gate select separately', () => {
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
				"import { it } from 'vitest'\nit('collects', () => {})\n",
			)
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			expect(scratch.read('listings')).toBe('listed\nlisted\nlisted\n')
			expect(run.json?.ungated).toEqual(['excluded'])
			expect(run.json?.projects).toEqual([
				expect.objectContaining({
					name: 'browser',
					gate: 'test > test:browser',
					files: 1,
					tests: 1,
					units: [{ config: 'selected.config.ts', mode: 'selected' }],
				}),
				{ name: 'core', gate: 'test > test:core', files: 1, tests: 1 },
				{
					name: 'excluded',
					files: 1,
					tests: 1,
					units: [{ config: 'selected.config.ts', mode: 'selected' }],
				},
				expect.objectContaining({
					name: 'server',
					gate: 'test > test:server',
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
			scratch.write(
				'tests/sample.test.ts',
				"import { it } from 'vitest'\nit('collects', () => {})\n",
			)
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

	it('retains a real browser instance name under its base project gate', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-instance-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				'{"type":"module","scripts":{"test":"vitest run --project core"}}',
			)
			scratch.write(
				'vite.config.ts',
				"import { playwright } from '@vitest/browser-playwright'\nexport default { test: { name: 'core', include: ['tests/sample.test.ts'], browser: { enabled: true, headless: true, provider: playwright(), instances: [{ browser: 'chromium' }] } } }\n",
			)
			scratch.write(
				'tests/sample.test.ts',
				"import { it } from 'vitest'\nit('collects', () => {})\n",
			)
			const run = runSkillScript(SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run.json?.projects).toEqual([
				{ name: 'core (chromium)', gate: 'test', files: 1, tests: 1 },
			])
			expect(run.json?.ungated).toEqual([])
			expect(run.json?.empty).toEqual([])
			expect(run.status).toBe(0)
		} finally {
			scratch.destroy()
		}
	})

	it('scopes reporting with Vitest after collecting the unfiltered universe', () => {
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
			expect(scratch.has('collected')).toBe(true)
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
		expect(run).toMatchObject({ status: 0 })
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
			'discovery: probe is an empty workbench; no chain containing " > " names it',
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
