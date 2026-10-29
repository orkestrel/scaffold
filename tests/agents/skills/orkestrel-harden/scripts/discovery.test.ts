import type { Option } from '../../../../../.agents/skills/orkestrel-harden/scripts/discovery.ts'
import { describe, expect, it } from 'vitest'
import { isArray, isRecord } from '@orkestrel/contract'
import { createScratch } from '@orkestrel/test/server'
import { join } from 'node:path'
import {
	DISCOVERY_COMMAND_SHAPES,
	DISCOVERY_MARKER_CASES,
	DISCOVERY_MARKER_FIXTURE,
	DISCOVERY_NPM_SHAPES,
	DISCOVERY_REFUSED_ARGUMENTS,
	DISCOVERY_SCRIPT,
	runSkillScript,
	WORKSPACE_ROOT,
} from '../../../../setupServer.js'
import {
	CodeScanner,
	listFiles,
	listInvocations,
	matchesProjectFilter,
	matchesWildcard,
	narrowGates,
	normalizeSlashes,
	readCommands,
	readFileCredits,
	readGate,
	readGates,
	readMarkers,
	readMissingFlags,
	readMissingOptions,
	readOption,
	readUnknownFlags,
	replaceProjects,
} from '../../../../../.agents/skills/orkestrel-harden/scripts/discovery.ts'

describe('discovery.ts', () => {
	it('collects runtime case titles before comparing gate identities', () => {
		const scratch = createScratch({ prefix: 'discovery-runtime-titles-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				JSON.stringify({ type: 'module', scripts: { test: 'vitest run -t selected' } }),
			)
			scratch.write(
				'vite.config.ts',
				"export default { test: { name: 'core', include: ['tests/*.test.ts'] } }\n",
			)
			scratch.write(
				'tests/cases.test.ts',
				"import { it } from 'vitest'\nfor (const title of ['selected', 'outside']) it(title, () => {})\n",
			)
			const partial = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
			expect(partial.status).toBe(3)
			expect(partial.json?.projects).toEqual([{ name: 'core', files: 1, tests: 2 }])
			expect(partial.json?.ungated).toEqual(['core'])
			scratch.write(
				'package.json',
				JSON.stringify({ type: 'module', scripts: { test: 'vitest run' } }),
			)
			const complete = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
			expect(complete.status).toBe(0)
			expect(complete.json?.projects).toEqual([{ name: 'core', gate: 'test', files: 1, tests: 2 }])
		} finally {
			scratch.destroy()
		}
	})

	it('leaves the setup modules of non-selected projects unevaluated', () => {
		const scratch = createScratch({ prefix: 'discovery-nonselected-setup-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				JSON.stringify({ type: 'module', scripts: { test: 'vitest run' } }),
			)
			scratch.write(
				'vite.config.ts',
				`export default { test: { projects: [
	{ test: { name: 'first', include: ['tests/first.test.ts'] } },
	{ test: { name: 'second', include: ['tests/second.test.ts'], setupFiles: ['tests/setupSecond.ts'] } },
] } }\n`,
			)
			scratch.write('tests/first.test.ts', "import { it } from 'vitest'\nit('first', () => {})\n")
			scratch.write('tests/second.test.ts', "import { it } from 'vitest'\nit('second', () => {})\n")
			scratch.write(
				'tests/setupSecond.ts',
				"import { writeFileSync } from 'node:fs'\nwriteFileSync('second-loaded', 'loaded')\n",
			)
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--projects', 'first', '--json'], {
				cwd: scratch.path,
			})
			expect(run.status).toBe(0)
			expect(run.json?.projects).toEqual([{ name: 'first', gate: 'test', files: 1, tests: 1 }])
			expect(scratch.has('second-loaded')).toBe(false)
			const census = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
			expect(census.status).toBe(0)
			expect(scratch.read('second-loaded')).toBe('loaded')
		} finally {
			scratch.remove('node_modules')
			scratch.destroy()
		}
	})

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
				const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const refused = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
			expect(refused).toMatchObject({ status: 2 })
			expect(refused.stderr).toContain('allowOnly')
		} finally {
			scratch.destroy()
		}
	})
	it('drops inspector and standalone options so a debugging gate lists without waiting', () => {
		const scratch = createScratch({ prefix: 'discovery-inspector-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'vite.config.ts',
				"export default { test: { name: 'core', include: ['tests/*.test.ts'] } }\n",
			)
			scratch.write('tests/a.test.ts', "import { it } from 'vitest'\nit('collects', () => {})\n")
			for (const command of [
				'vitest --inspect-brk --no-file-parallelism',
				'vitest --inspect --no-file-parallelism',
				'vitest --standalone',
			]) {
				scratch.write(
					'package.json',
					JSON.stringify({ type: 'module', scripts: { test: command } }),
				)
				const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
				expect(run).toMatchObject({ status: 0 })
				expect(run.json?.projects).toEqual([{ name: 'core', gate: 'test', files: 1, tests: 1 }])
			}
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
				const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
				const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
				const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const complete = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
				const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
				const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
				const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--config', 'second.config.ts', '--json'], {
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const scoped = runSkillScript(DISCOVERY_SCRIPT, ['--projects', 'core', '--json'], {
				cwd: scratch.path,
			})
			expect(scoped.status).toBe(0)
			expect(scoped.json?.projects).toEqual([
				{ name: 'core', gate: 'test > test:core', files: 1, tests: 1 },
			])
			expect(scratch.read('listings')).toBe('listed\nlisted\nlisted\n')
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			expect(run.json?.empty).toEqual(['absent'])
			expect(run.json?.projects).toContainEqual({
				name: 'absent',
				gate: 'test > test:absent',
				files: 0,
				tests: 0,
			})
		} finally {
			scratch.destroy()
		}
	})

	it('refuses a --projects name no project matches without listing a project outside the named set', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-unmatched-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				'{"type":"module","scripts":{"test":"vitest run --project core"}}',
			)
			scratch.write(
				'vite.config.ts',
				"export default { test: { projects: ['core', 'other'].map((name) => ({ test: { name, include: ['tests/' + name + '.test.ts'] } })) } }\n",
			)
			scratch.write('tests/core.test.ts', "import { it } from 'vitest'\nit('collects', () => {})\n")
			scratch.write(
				'tests/other.test.ts',
				"import { writeFileSync } from 'node:fs'\nimport { it } from 'vitest'\nwriteFileSync('collected', 'yes')\nit('collects', () => {})\n",
			)
			for (const named of ['nosuch', 'core,nosuch', 'no*such']) {
				const run = runSkillScript(DISCOVERY_SCRIPT, ['--projects', named, '--json'], {
					cwd: scratch.path,
				})
				expect.soft(run.status, named + run.stdout + run.stderr).toBe(64)
				expect.soft(run.stderr).toContain(named.includes('*') ? '"no*such"' : '"nosuch"')
				expect.soft(run.stderr).not.toContain('"other"')
				expect.soft(run.stdout).toBe('')
				expect.soft(scratch.has('collected'), named).toBe(false)
			}
			const matched = runSkillScript(DISCOVERY_SCRIPT, ['--projects', 'cor*', '--json'], {
				cwd: scratch.path,
			})
			expect(matched.status).toBe(0)
			expect(matched.json?.projects).toEqual([{ name: 'core', gate: 'test', files: 1, tests: 1 }])
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
			expect(runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path }).status).toBe(0)
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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

	it('lists only the named projects: the universe, the gates, and the rescan', () => {
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--projects', 'core,server', '--json'], {
				cwd: scratch.path,
			})
			expect(scratch.has('collected')).toBe(false)
			expect(run.status).toBe(0)
			expect(run.json?.projects).toEqual([
				{ name: 'core', gate: 'test', files: 1, tests: 1 },
				{ name: 'server', gate: 'test', files: 1, tests: 1 },
			])
			expect(run.json?.undiscovered).toEqual([])
			const control = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
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
			const refused = runSkillScript(DISCOVERY_SCRIPT, [], { cwd: scratch.path })
			expect(refused.status).toBe(2)
			expect(refused.stderr).toContain('Fixture configuration refused')
		} finally {
			scratch.destroy()
		}
	})

	// Budgeted for the whole skills project running beside this checkout-wide census.
	it('reads this checkout: every gated project, its root chain, the workbench, and the skip markers', () => {
		const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: WORKSPACE_ROOT })
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
		const skipIf = isRecord(helpers) && isRecord(helpers.markers) ? helpers.markers['.skipIf'] : 0
		expect(skipIf).toBeGreaterThan(0)
		const text = runSkillScript(DISCOVERY_SCRIPT, [], { cwd: WORKSPACE_ROOT })
		expect(text.status).toBe(0)
		expect(text.stdout).toContain(
			'discovery: probe is an empty workbench; no chain containing " > " names it',
		)
	}, 180_000)

	it.each(DISCOVERY_MARKER_CASES)(
		'counts markers as call forms outside comments and strings: %j',
		(text, markers) => {
			expect(readMarkers(new CodeScanner(text).scan())).toEqual(markers)
		},
	)

	it('counts the marker forms of a collected file and leaves skip and only to lint', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-markers-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				JSON.stringify({ type: 'module', scripts: { test: 'vitest run' } }),
			)
			scratch.write(
				'vite.config.ts',
				"export default { test: { name: 'core', include: ['tests/*.test.ts'] } }\n",
			)
			scratch.write('tests/forms.test.ts', DISCOVERY_MARKER_FIXTURE)
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run.status).toBe(0)
			expect(run.json?.census).toEqual([
				{
					file: 'tests/forms.test.ts',
					projects: ['core'],
					markers: { '.todo': 2, '.skipIf': 1, '.runIf': 1, '.fails': 1, retry: 2, timeout: 3 },
				},
			])
			const text = runSkillScript(DISCOVERY_SCRIPT, [], { cwd: scratch.path })
			expect(text.status).toBe(0)
			expect(text.stdout).toContain(
				'discovery: tests/forms.test.ts .todo×2 .skipIf×1 .runIf×1 .fails×1 retry×2 timeout×3\n',
			)
		} finally {
			scratch.destroy()
		}
	})

	it.each(DISCOVERY_REFUSED_ARGUMENTS)(
		'refuses the equals form and an unread flag with exit 64: %j',
		(...args) => {
			const scratch = createScratch({ prefix: 'orkestrel-discovery-unknown-flag-' })
			try {
				scratch.write('package.json', '{"scripts":{}}')
				scratch.write('vite.config.ts', 'export default {}\n')
				const run = runSkillScript(DISCOVERY_SCRIPT, args, { cwd: scratch.path })
				expect(run.status).toBe(64)
				expect(run.stderr).toContain('is not a flag this script reads')
				expect(run.stdout).toBe('')
			} finally {
				scratch.destroy()
			}
		},
	)

	it('exits 2 naming the Vitest version when its option table lacks a required option', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-help-' })
		try {
			scratch.write('package.json', '{"type":"module","scripts":{"test":"vitest run"}}')
			scratch.write('vite.config.ts', 'export default {}\n')
			scratch.write('node_modules/vitest/vitest.mjs', "console.log('Usage: vitest')\n")
			scratch.write('node_modules/vitest/package.json', '{"name":"vitest","version":"9.9.9"}')
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run.status).toBe(2)
			expect(run.stderr).toContain('Vitest 9.9.9')
			expect(run.stderr).toContain('--reporter, --project, --config, --filesOnly, --staticParse')
			const option: Option = { name: 'reporter', argument: '<name>' }
			expect(readMissingOptions(new Map())).toEqual([
				'--reporter',
				'--project',
				'--config',
				'--filesOnly',
				'--staticParse',
			])
			expect(
				readMissingOptions(
					new Map([
						['--reporter', option],
						['--project', option],
					]),
				),
			).toEqual(['--config', '--filesOnly', '--staticParse'])
		} finally {
			scratch.destroy()
		}
	})

	it('credits a test file to a gate only when node runs it as an argument', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-credit-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'vite.config.ts',
				"export default { test: { name: 'core', include: ['tests/core.test.ts'] } }\n",
			)
			for (const name of ['core', 'orphan'])
				scratch.write(
					`tests/${name}.test.ts`,
					"import { it } from 'vitest'\nit('collects', () => {})\n",
				)
			for (const check of ['oxlint tests/orphan.test.ts', 'git add tests/orphan.test.ts']) {
				scratch.write(
					'package.json',
					JSON.stringify({ type: 'module', scripts: { test: 'vitest run', check } }),
				)
				const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
				expect.soft(run.status, check + run.stderr).toBe(3)
				expect.soft(run.json?.undiscovered, check).toEqual(['tests/orphan.test.ts'])
			}
			for (const check of ['node tests/orphan.test.ts', 'node --test tests/orphan.test.ts']) {
				scratch.write(
					'package.json',
					JSON.stringify({ type: 'module', scripts: { test: 'vitest run', check } }),
				)
				const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
				expect.soft(run.status, check + run.stderr).toBe(0)
				expect.soft(run.json?.undiscovered, check).toEqual([])
			}
		} finally {
			scratch.destroy()
		}
	})

	it('reads the test files a node command runs and no other command credits', () => {
		expect(readFileCredits(['node', 'tests/a.test.ts'])).toEqual(['tests/a.test.ts'])
		expect(readFileCredits(['node', '--test', 'tests/a.test.ts', 'tests/b.test.ts'])).toEqual([
			'tests/a.test.ts',
			'tests/b.test.ts',
		])
		expect(readFileCredits(['node', '--experimental-strip-types', 'tests/a.test.ts'])).toEqual([
			'tests/a.test.ts',
		])
		expect(readFileCredits(['node', 'scripts/check.js', 'tests/a.test.ts'])).toEqual([])
		expect(readFileCredits(['node', '-e', 'run()', 'tests/a.test.ts'])).toEqual([])
		expect(readFileCredits(['oxlint', 'tests/a.test.ts'])).toEqual([])
		expect(readFileCredits(['prettier', '--check', 'tests/a.test.ts'])).toEqual([])
		expect(readFileCredits(['git', 'add', 'tests/a.test.ts'])).toEqual([])
	})

	it('refuses watch, dev, and an unqualified --watch as gates', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-watch-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'vite.config.ts',
				"export default { test: { projects: ['core', 'other'].map((name) => ({ test: { name, include: ['tests/' + name + '.test.ts'] } })) } }\n",
			)
			for (const name of ['core', 'other'])
				scratch.write(
					`tests/${name}.test.ts`,
					"import { it } from 'vitest'\nit('collects', () => {})\n",
				)
			for (const watch of [
				'vitest watch --project other',
				'vitest dev --project other',
				'vitest --watch --project other',
			]) {
				scratch.write(
					'package.json',
					JSON.stringify({
						type: 'module',
						scripts: { test: 'vitest run --project core', 'test:watch': watch },
					}),
				)
				const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
				expect.soft(run.status, watch + run.stderr).toBe(3)
				expect.soft(run.json?.ungated, watch).toEqual(['other'])
			}
			scratch.write(
				'package.json',
				JSON.stringify({
					type: 'module',
					scripts: {
						test: 'vitest run --project core',
						'test:other': 'vitest --watch=false --project other',
					},
				}),
			)
			const gated = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
			expect(gated.status).toBe(0)
			expect(gated.json?.ungated).toEqual([])
		} finally {
			scratch.destroy()
		}
	})

	it('classifies run, watch, maintenance, and related commands', () => {
		const options = new Map<string, Option>()
		for (const text of [
			'vitest watch',
			'vitest dev',
			'vitest --watch',
			'vitest -w --project a',
			'vitest --watch=true',
			'vitest list',
			'vitest bench',
			'vitest --mergeReports',
			'vitest --listTags',
			'vitest --clearCache',
		]) {
			expect
				.soft(readGate(readCommands(text)[0] ?? [], 'test', 'vite.config.ts', options), text)
				.toBeUndefined()
		}
		for (const text of [
			'vitest run',
			'vitest',
			'vitest --watch=false',
			'vitest --watch false',
			'vitest run --watch=false',
		]) {
			expect
				.soft(readGate(readCommands(text)[0] ?? [], 'test', 'vite.config.ts', options), text)
				.toBeDefined()
		}
		expect(() =>
			readGate(['vitest', 'related', 'src/a.ts'], 'test', 'vite.config.ts', options),
		).toThrow('test: Vitest list exposes no related command')
	})

	it.each(DISCOVERY_COMMAND_SHAPES)(
		'reads the gate behind an environment prefix or a redirection: %s',
		(shape) => {
			const scratch = createScratch({ prefix: 'orkestrel-discovery-shape-' })
			try {
				scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
				scratch.write('package.json', JSON.stringify({ type: 'module', scripts: { test: shape } }))
				scratch.write(
					'vite.config.ts',
					"export default { test: { name: 'core', include: ['tests/core.test.ts'] } }\n",
				)
				scratch.write(
					'tests/core.test.ts',
					"import { it } from 'vitest'\nit('collects', () => {})\n",
				)
				const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
				expect(run.status === 0 ? 0 : run.stderr).toBe(0)
				expect(run.json?.projects).toEqual([{ name: 'core', gate: 'test', files: 1, tests: 1 }])
			} finally {
				scratch.destroy()
			}
		},
	)

	it.each(DISCOVERY_NPM_SHAPES)('follows the script an npm call shape names: %s', (shape) => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-npm-shape-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				JSON.stringify({
					type: 'module',
					scripts: { test: shape, 'test:unit': 'vitest run --project core' },
				}),
			)
			scratch.write(
				'vite.config.ts',
				"export default { test: { name: 'core', include: ['tests/core.test.ts'] } }\n",
			)
			scratch.write('tests/core.test.ts', "import { it } from 'vitest'\nit('collects', () => {})\n")
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run.status === 0 ? 0 : run.stderr).toBe(0)
			expect(run.json?.projects).toEqual([
				{ name: 'core', gate: 'test > test:unit', files: 1, tests: 1 },
			])
		} finally {
			scratch.destroy()
		}
	})

	it('splits commands past environment prefixes and redirections', () => {
		expect(readCommands('CI=1 NODE_ENV=test vitest run')).toEqual([['vitest', 'run']])
		expect(readCommands('cross-env CI=1 vitest run --project "a b"')).toEqual([
			['vitest', 'run', '--project', 'a b'],
		])
		expect(readCommands('vitest run > out.txt 2>&1')).toEqual([['vitest', 'run']])
		expect(readCommands('vitest run 2>&1 | tee log.txt')).toEqual([
			['vitest', 'run'],
			['tee', 'log.txt'],
		])
		expect(readCommands('vitest run >> out.txt && echo done')).toEqual([
			['vitest', 'run'],
			['echo', 'done'],
		])
		expect(readCommands('vitest run < in.txt 2> err.txt')).toEqual([['vitest', 'run']])
		expect(readCommands('vitest run &> all.txt')).toEqual([['vitest', 'run']])
		expect(readCommands('CI=1')).toEqual([[]])
	})

	it('lists the script calls of npm run, run-script, test, and t', () => {
		const invocations = listInvocations(
			readCommands(
				'npm run -s a && npm run --silent b -- --x && npm run-script c && npm test -- y && npm t && npm ls',
			),
		)
		expect(invocations.map(({ name, args, shorthand }) => [name, args, shorthand])).toEqual([
			['a', [], false],
			['b', ['--x'], false],
			['c', [], false],
			['test', ['y'], true],
			['test', [], true],
		])
	})

	it('derives gates and file credits in visit order, the earliest chain winning', () => {
		const options = new Map<string, Option>()
		const gates = readGates(
			{
				test: 'npm run a && npm run b',
				a: 'vitest run --project one',
				b: 'vitest run --project two && node tests/x.test.ts',
				first: 'node tests/x.test.ts && node --test tests/y.test.ts tests/z.test.ts',
			},
			'vite.config.ts',
			options,
		)
		expect(gates.units.map(({ chain, projects }) => [chain, projects])).toEqual([
			['test > b', ['two']],
			['test > a', ['one']],
		])
		expect(Object.fromEntries(gates.files)).toEqual({
			'tests/x.test.ts': 'test > b',
			'tests/y.test.ts': 'first',
			'tests/z.test.ts': 'first',
		})
		const shorthand = readGates(
			{ ci: 'npm test', test: 'vitest run --project one' },
			'vite.config.ts',
			options,
		)
		expect(shorthand.units.map(({ chain }) => chain)).toEqual(['ci > test', 'test'])
	})

	it('reports every test and spec file under tests that no project collects', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-spec-' })
		try {
			scratch.link('node_modules', join(WORKSPACE_ROOT, 'node_modules'))
			scratch.write(
				'package.json',
				JSON.stringify({ type: 'module', scripts: { test: 'vitest run' } }),
			)
			scratch.write(
				'vite.config.ts',
				"export default { test: { name: 'core', include: ['tests/core.test.ts'] } }\n",
			)
			for (const file of [
				'tests/core.test.ts',
				'tests/extra.spec.ts',
				'tests/view.test.tsx',
				'tests/tmp/hidden.test.ts',
				'tests/node_modules/skipped.test.ts',
			])
				scratch.write(file, "import { it } from 'vitest'\nit('collects', () => {})\n")
			const run = runSkillScript(DISCOVERY_SCRIPT, ['--json'], { cwd: scratch.path })
			expect(run.status).toBe(3)
			expect(run.json?.undiscovered).toEqual([
				'tests/extra.spec.ts',
				'tests/tmp/hidden.test.ts',
				'tests/view.test.tsx',
			])
		} finally {
			scratch.destroy()
		}
	})

	it('narrows the gates to the named projects and drops a gate that reaches none', () => {
		const options = new Map<string, Option>()
		const gates = readGates(
			{
				all: 'vitest run',
				core: 'vitest run --project core',
				both: 'vitest run --project core --project=other -- --project outside',
				negated: 'vitest run --project !core',
				wild: 'vitest run --project "co*"',
				other: 'vitest run --project other',
			},
			'vite.config.ts',
			options,
		).units
		expect(narrowGates(gates, [])).toBe(gates)
		expect(narrowGates(gates, ['core']).map(({ chain, args }) => [chain, args])).toEqual([
			['all', ['--config', 'vite.config.ts', '--project', 'core']],
			['core', ['--config', 'vite.config.ts', '--project', 'core']],
			['both', ['--config', 'vite.config.ts', '--project', 'core', '--', '--project', 'outside']],
			['wild', ['--config', 'vite.config.ts', '--project', 'core']],
		])
		const patterned = narrowGates(gates, ['cor*'])
		expect(patterned.map(({ chain }) => chain)).toEqual([
			'all',
			'core',
			'both',
			'negated',
			'wild',
			'other',
		])
		expect(patterned.find(({ chain }) => chain === 'all')?.args).toEqual([
			'--config',
			'vite.config.ts',
			'--project',
			'cor*',
		])
		expect(patterned.find(({ chain }) => chain === 'other')?.args).toEqual(
			gates.find(({ chain }) => chain === 'other')?.args,
		)
	})

	it('matches project filters the way Vitest does and swaps project flags', () => {
		expect(matchesProjectFilter(['web'], 'web (chromium)')).toBe(true)
		expect(matchesProjectFilter(['!web'], 'web (chromium)')).toBe(false)
		expect(matchesProjectFilter(['CORE'], 'core')).toBe(true)
		expect(matchesProjectFilter(['src:*'], 'src:core')).toBe(true)
		expect(matchesProjectFilter(['src:*'], 'app:core')).toBe(false)
		expect(matchesProjectFilter(['!a', 'b'], 'b')).toBe(true)
		expect(matchesProjectFilter(['!a'], 'b')).toBe(true)
		expect(matchesProjectFilter([], 'x')).toBe(true)
		expect(matchesWildcard('a.b', 'axb')).toBe(false)
		expect(matchesWildcard('a*c', 'abbc')).toBe(true)
		expect(matchesWildcard('a*c', 'abbd')).toBe(false)
		expect(
			replaceProjects(
				['--config', 'x', '--project', 'a', '--project=b', '--mode', 'm', '--', '--project', 'z'],
				['c', 'd'],
			),
		).toEqual([
			'--config',
			'x',
			'--mode',
			'm',
			'--project',
			'c',
			'--project',
			'd',
			'--',
			'--project',
			'z',
		])
	})

	it('reads flag values, missing values, and unread flags', () => {
		const argv = ['--config', 'vite.config.ts', '--projects', 'a,b', '--json']
		expect(readOption(argv, '--config')).toBe('vite.config.ts')
		expect(readOption(argv, '--absent')).toBeUndefined()
		expect(readOption(['--json'], '--json')).toBeUndefined()
		expect(readOption(['--config', '--json', 'x'], '--config')).toBeUndefined()
		expect(readOption(['--x', '1', '--x', '2'], '--x')).toBe('1')
		expect(
			readMissingFlags(
				['--config', '--json', '--out', 'a', '--projects'],
				['--config', '--out', '--projects'],
			),
		).toEqual(['--config', '--projects'])
		expect(readMissingFlags(['--out', 'a'], ['--config'])).toEqual([])
		expect(
			readUnknownFlags(
				['--config=vite.config.ts', '--json', '--project', 'a', '--projects', 'a'],
				['--config', '--json', '--projects'],
			),
		).toEqual(['--config=vite.config.ts', '--project'])
		expect(readUnknownFlags(['--config', 'x', '--', 'node', '--watch'], ['--config'])).toEqual([])
		expect(readUnknownFlags(['--config', 'x', 'path', '-x'], ['--config'])).toEqual([])
		expect(readUnknownFlags([], [])).toEqual([])
	})

	it('normalizes slashes', () => {
		expect(normalizeSlashes('a\\b\\c.ts')).toBe('a/b/c.ts')
		expect(normalizeSlashes('a/b')).toBe('a/b')
	})

	it('lists files with forward slashes, skipping the excluded names exactly and at any depth', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-walk-' })
		try {
			scratch.write('src/a.ts', '')
			scratch.write('src/deep/b.ts', '')
			scratch.write('src/dist/c.ts', '')
			scratch.write('node_modules/pkg/index.js', '')
			scratch.write('tmp/probe.ts', '')
			const root = normalizeSlashes(scratch.path)
			const paths = listFiles(scratch.path).map((file) => file.path.slice(root.length + 1))
			expect(paths.every((path) => !path.includes('\\'))).toBe(true)
			expect(paths.sort()).toEqual(['src/a.ts', 'src/deep/b.ts'])
			expect(listFiles(scratch.path, new Set()).length).toBe(5)
			expect(listFiles(scratch.path).every((file) => typeof file.modified === 'number')).toBe(true)
			expect(() => listFiles(`${scratch.path}/absent`)).toThrow(/ENOENT/u)
		} finally {
			scratch.destroy()
		}
	})

	it('refuses a missing configuration, a flag with no value, and a checkout with no local Vitest', () => {
		const scratch = createScratch({ prefix: 'orkestrel-discovery-' })
		try {
			expect(
				runSkillScript(DISCOVERY_SCRIPT, ['--config', 'absent.config.ts'], { cwd: WORKSPACE_ROOT })
					.status,
			).toBe(64)
			expect(
				runSkillScript(DISCOVERY_SCRIPT, ['--config', '--json'], { cwd: WORKSPACE_ROOT }).status,
			).toBe(64)
			scratch.write('package.json', '{"scripts":{"test":"vitest run --project a"}}')
			scratch.write('vite.config.ts', 'export default {}\n')
			expect(runSkillScript(DISCOVERY_SCRIPT, [], { cwd: scratch.path }).status).toBe(2)
		} finally {
			scratch.destroy()
		}
	})
})
