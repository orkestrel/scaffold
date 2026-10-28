import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { isArray, isRecord } from '@orkestrel/contract'
import { createScratch } from '@orkestrel/test/server'
import {
	readCensusTexts,
	readJsonColumn,
	runSkillScript,
	MAP_SCRIPT,
} from '../../../../setupServer.js'
import {
	buildMatcher,
	isText,
	listFiles,
	normalizeSlashes,
	readList,
	readMissingFlags,
	readOption,
	readUnknownFlags,
	scanFences,
} from '../../../../../.agents/skills/orkestrel-scout/scripts/map.ts'

describe('map.ts', () => {
	it('maps a tree, headings outside fences, exports, a census, and unresolved anchors in one call', () => {
		const scratch = createScratch({ prefix: 'orkestrel-map-' })
		try {
			scratch.write('docs/a.md', '# Title\n\n## Real\n\n```md\n# Not a heading\n```\n\ntext TERM\n')
			scratch.write(
				'src/x.ts',
				"export function run(): void {}\nexport const NAME = 'x'\nconst hidden = 1\nexport * from './y.ts'\n",
			)
			scratch.write(
				'notes.md',
				'See `docs/a.md` § Real and `docs/a.md` § Missing, then § Nowhere.\n',
			)
			const run = runSkillScript(
				MAP_SCRIPT,
				[
					'--tree',
					'docs',
					'src',
					'--headings',
					'docs',
					'--exports',
					'src',
					'--census',
					'TERM',
					'--paths',
					'docs,src',
					'--anchors',
					'notes.md',
					'--json',
				],
				{ cwd: scratch.path },
			)
			expect(run.status).toBe(0)
			const tree = run.json?.tree
			if (!isArray(tree)) throw new Error('The map carries no tree')
			expect(tree.map((row) => (isRecord(row) ? row.path : ''))).toEqual(['docs/a.md', 'src/x.ts'])
			expect(
				tree.every(
					(row) => isRecord(row) && typeof row.lines === 'number' && typeof row.bytes === 'number',
				),
			).toBe(true)
			const headings = run.json?.headings
			if (!isArray(headings)) throw new Error('The map carries no headings')
			expect(headings.map((row) => (isRecord(row) ? row.text : ''))).toEqual(['# Title', '## Real'])
			const exports = run.json?.exports
			if (!isArray(exports)) throw new Error('The map carries no exports')
			expect(exports.map((row) => (isRecord(row) ? row.text : ''))).toEqual([
				'function run',
				'const NAME',
				"export * from './y.ts'",
			])
			const census = run.json?.census
			if (!isArray(census)) throw new Error('The map carries no census')
			expect(isRecord(census[0]) && isArray(census[0].rows) && census[0].rows.length === 1).toBe(
				true,
			)
			const anchors = run.json?.anchors
			if (!isArray(anchors)) throw new Error('The map carries no anchors')
			expect(anchors.map((row) => (isRecord(row) ? row.heading : ''))).toEqual([
				'Missing',
				'Nowhere',
			])
		} finally {
			scratch.destroy()
		}
	})

	it('lists the files that name a path, writes a map into a directory it creates, and prints text by default', () => {
		const scratch = createScratch({ prefix: 'orkestrel-map-refs-' })
		try {
			scratch.write('docs/a.md', '# Title\n')
			scratch.write('notes.md', 'See `docs/a.md` and a.md again.\n')
			scratch.write('other.md', 'nothing here\n')
			const refs = runSkillScript(MAP_SCRIPT, ['--refs', 'docs/a.md', '--json'], {
				cwd: scratch.path,
			})
			expect(refs.status).toBe(0)
			const rows = refs.json?.refs
			if (!isArray(rows)) throw new Error('The map carries no refs')
			expect(rows.map((row) => (isRecord(row) ? row.path : ''))).toEqual(['notes.md'])
			const written = runSkillScript(MAP_SCRIPT, ['--tree', 'docs', '--out', 'tmp/units/map.txt'], {
				cwd: scratch.path,
			})
			expect(written.status).toBe(0)
			expect(written.stdout).toContain('map: wrote tmp/units/map.txt')
			expect(readFileSync(join(scratch.path, 'tmp/units/map.txt'), 'utf8')).toContain('## Tree')
			const text = runSkillScript(MAP_SCRIPT, ['--headings', 'docs'], { cwd: scratch.path })
			expect(text.status).toBe(0)
			expect(text.stdout).toContain('## Headings\ndocs/a.md:1\t# Title')
		} finally {
			scratch.destroy()
		}
	})

	it('lists every key of a frontmatter block, a TOML file, and a YAML file, nested keys dotted and block scalars whole', () => {
		const scratch = createScratch({ prefix: 'orkestrel-map-front-' })
		try {
			scratch.write(
				'role.md',
				'---\nname: grok\nmodel: sonnet\ntools: Bash, Read\nmetadata:\n  type: project\ndescription: >-\n  first line\n  second line\n---\n\n# Body\n\nkey: not a field\n',
			)
			scratch.write(
				'role.toml',
				'name = "grok"\nmodel = "gpt-5.6-terra"\ndeveloper_instructions = """\nkey = inside\n"""\n[interface]\ndisplay = "Scout"\n',
			)
			scratch.write(
				'openai.yaml',
				"interface:\n  display_name: 'Scout'\n  default_prompt: 'Use $orkestrel-scout'\n",
			)
			const run = runSkillScript(
				MAP_SCRIPT,
				['--frontmatter', 'role.md', 'role.toml', 'openai.yaml', '--json'],
				{ cwd: scratch.path },
			)
			expect(run.status).toBe(0)
			const rows = run.json?.frontmatter
			if (!isArray(rows)) throw new Error('The map carries no frontmatter')
			const texts = rows.map((row) =>
				isRecord(row) ? `${String(row.path)} ${String(row.text)}` : '',
			)
			expect(texts).toContain('role.md name: grok')
			expect(texts).toContain('role.md tools: Bash, Read')
			expect(texts).not.toContain('role.md key: not a field')
			expect(texts).toContain('role.md metadata.type: project')
			expect(texts).toContain('role.md description: >- first line second line')
			expect(texts).toContain('role.toml model: "gpt-5.6-terra"')
			expect(texts).not.toContain('role.toml key: inside')
			expect(texts).toContain('role.toml interface.display: "Scout"')
			expect(texts).toContain('openai.yaml interface:')
			expect(texts).toContain("openai.yaml interface.display_name: 'Scout'")
			expect(texts).toContain("openai.yaml interface.default_prompt: 'Use $orkestrel-scout'")
			const lines = rows.map((row) =>
				isRecord(row) ? `${String(row.path)}:${String(row.line)}` : '',
			)
			expect(lines).toContain('openai.yaml:3')
			expect(lines).toContain('role.md:6')
		} finally {
			scratch.destroy()
		}
	})

	it('extends a key with the lines indented under it and drops the rest', () => {
		const scratch = createScratch({ prefix: 'orkestrel-map-yaml-' })
		try {
			scratch.write(
				'list.yaml',
				'  orphan\nitems:\n  - first\n  - second\nparent:\n    child: x\n  stray\n',
			)
			const run = runSkillScript(MAP_SCRIPT, ['--frontmatter', 'list.yaml', '--json'], {
				cwd: scratch.path,
			})
			expect(run.status).toBe(0)
			const rows = run.json?.frontmatter
			if (!isArray(rows)) throw new Error('The map carries no frontmatter')
			const texts = rows.map((row) => (isRecord(row) ? String(row.text) : ''))
			expect(texts).toStrictEqual(['items: - first - second', 'parent:', 'parent.child: x'])
			expect(texts.some((text) => text.includes('orphan') || text.includes('stray'))).toBe(false)
		} finally {
			scratch.destroy()
		}
	})

	it('refuses a call with no mode or a flag with no value', () => {
		const scratch = createScratch({ prefix: 'orkestrel-map-usage-' })
		try {
			expect(runSkillScript(MAP_SCRIPT, [], { cwd: scratch.path }).status).toBe(64)
			expect(runSkillScript(MAP_SCRIPT, ['--refs', '--json'], { cwd: scratch.path }).status).toBe(
				64,
			)
			expect(
				runSkillScript(MAP_SCRIPT, ['--tree', '.', '--out'], { cwd: scratch.path }).status,
			).toBe(64)
			const census = runSkillScript(MAP_SCRIPT, ['--tree', '.', '--census', '--vn-drag-color'], {
				cwd: scratch.path,
			})
			expect(census.status).toBe(64)
			expect(census.stderr).toContain('--census given with no value')
			expect(census.stdout).toBe('')
		} finally {
			scratch.destroy()
		}
	})

	it('refuses an unknown flag and the equals form before it reads anything', () => {
		const scratch = createScratch({ prefix: 'orkestrel-map-flags-' })
		try {
			scratch.write('docs/a.md', '# Title\n')
			for (const argv of [
				['--tree', 'docs', '--bogus'],
				['--tree=docs'],
				['--headings', 'docs', '--json=true'],
				['--tree', 'docs', '--out=tmp/map.txt'],
			]) {
				const run = runSkillScript(MAP_SCRIPT, argv, { cwd: scratch.path })
				expect({ argv, status: run.status }).toEqual({ argv, status: 64 })
				expect(run.stdout).toBe('')
			}
			expect(scratch.has('tmp')).toBe(false)
		} finally {
			scratch.destroy()
		}
	})

	it('hides the lines inside tilde, four-backtick, and indented fences from a heading list', () => {
		const scratch = createScratch({ prefix: 'orkestrel-map-fences-' })
		try {
			scratch.write(
				'docs/fences.md',
				[
					'# Top',
					'~~~',
					'# tilde comment',
					'~~~',
					'## After tilde',
					'````md',
					'```',
					'# inside four',
					'```',
					'# still inside',
					'````',
					'## After four',
					'  ```',
					'  # indented inside',
					'  ```',
					'## After indented',
					'',
				].join('\n'),
			)
			const run = runSkillScript(MAP_SCRIPT, ['--headings', 'docs', '--json'], {
				cwd: scratch.path,
			})
			expect(run.status).toBe(0)
			expect(readJsonColumn(run.json?.headings, 'text')).toEqual([
				'# Top',
				'## After tilde',
				'## After four',
				'## After indented',
			])
		} finally {
			scratch.destroy()
		}
	})

	it('keeps a heading inside a fence out of the anchors an unresolved reference is judged against', () => {
		const scratch = createScratch({ prefix: 'orkestrel-map-fence-anchors-' })
		try {
			scratch.write('docs/a.md', '# Title\n\n~~~\n## Hidden\n~~~\n')
			scratch.write('notes.md', 'See `docs/a.md` § Title and `docs/a.md` § Hidden.\n')
			const run = runSkillScript(MAP_SCRIPT, ['--anchors', 'notes.md', '--json'], {
				cwd: scratch.path,
			})
			expect(run.status).toBe(0)
			expect(readJsonColumn(run.json?.anchors, 'heading')).toEqual(['Hidden'])
		} finally {
			scratch.destroy()
		}
	})

	it('compares a census term without regard to case only under --ignore-case', () => {
		const scratch = createScratch({ prefix: 'orkestrel-map-case-' })
		try {
			scratch.write('docs/c.md', 'Term one\nTERM two\nterm three\nnothing\n')
			const exact = runSkillScript(MAP_SCRIPT, ['--census', 'Term', '--paths', 'docs', '--json'], {
				cwd: scratch.path,
			})
			const folded = runSkillScript(
				MAP_SCRIPT,
				['--census', 'Term', '--paths', 'docs', '--ignore-case', '--json'],
				{ cwd: scratch.path },
			)
			expect(exact.status).toBe(0)
			expect(readCensusTexts(exact.json?.census)).toEqual(['Term one'])
			expect(readCensusTexts(folded.json?.census)).toEqual(['Term one', 'TERM two', 'term three'])
		} finally {
			scratch.destroy()
		}
	})

	it('reads every export form its pattern lists and none it does not', () => {
		const scratch = createScratch({ prefix: 'orkestrel-map-exports-' })
		try {
			scratch.write(
				'src/e.ts',
				[
					'export default function main() {}',
					'export async function load() {}',
					'export abstract class Base {}',
					'export default abstract class Other {}',
					'export function* gen() {}',
					'export let counter = 0',
					'export interface Shape {}',
					'export type Alias = string',
					'export enum Color {}',
					'export namespace Space {}',
					'export const NAME = 1',
					"export * from './y.ts'",
					'export default function () {}',
					'export { a, b }',
					'  export function indented() {}',
					'export declare const D: number',
					'',
				].join('\n'),
			)
			const run = runSkillScript(MAP_SCRIPT, ['--exports', 'src', '--json'], { cwd: scratch.path })
			expect(run.status).toBe(0)
			expect(readJsonColumn(run.json?.exports, 'text')).toEqual([
				'function main',
				'function load',
				'class Base',
				'class Other',
				'function* gen',
				'let counter',
				'interface Shape',
				'type Alias',
				'enum Color',
				'namespace Space',
				'const NAME',
				"export * from './y.ts'",
			])
		} finally {
			scratch.destroy()
		}
	})

	it('narrows a refs walk to the paths it is given', () => {
		const scratch = createScratch({ prefix: 'orkestrel-map-narrow-' })
		try {
			scratch.write('docs/a.md', '# Title\n')
			scratch.write('src/n.md', 'See docs/a.md here.\n')
			scratch.write('other/n.md', 'See docs/a.md there.\n')
			const all = runSkillScript(MAP_SCRIPT, ['--refs', 'docs/a.md', '--json'], {
				cwd: scratch.path,
			})
			const narrow = runSkillScript(
				MAP_SCRIPT,
				['--refs', 'docs/a.md', '--paths', 'src', '--json'],
				{ cwd: scratch.path },
			)
			expect([...readJsonColumn(all.json?.refs, 'path')].sort()).toEqual(['other/n.md', 'src/n.md'])
			expect(readJsonColumn(narrow.json?.refs, 'path')).toEqual(['src/n.md'])
		} finally {
			scratch.destroy()
		}
	})

	it('ends a section reference at each listed terminator word and runs on past an unlisted one', () => {
		const scratch = createScratch({ prefix: 'orkestrel-map-anchors-' })
		try {
			scratch.write('docs/a.md', '# Real\n')
			const terminators = [
				'and',
				'or',
				'names',
				'fixes',
				'owns',
				'states',
				'binds',
				'governs',
				'decides',
				'before',
				'after',
			]
			scratch.write(
				'notes.md',
				[
					'See `docs/a.md` § Real and then nothing.',
					'Case `docs/a.md` § REAL.',
					...terminators.map((word, index) => `Rule § Term${index} ${word} more`),
					'Quoted § "Quoted Name", then',
					'(§ Two Words)',
					'| § Cell |',
					'§ Foo then bar',
					'§ Last Heading',
					'See `missing.md` § Anything.',
					'',
				].join('\n'),
			)
			const run = runSkillScript(MAP_SCRIPT, ['--anchors', 'notes.md', '--json'], {
				cwd: scratch.path,
			})
			expect(run.status).toBe(0)
			expect(readJsonColumn(run.json?.anchors, 'heading')).toEqual([
				...terminators.map((_word, index) => `Term${index}`),
				'Quoted Name',
				'Two Words',
				'Cell',
				'Foo then bar',
				'Last Heading',
				'Anything',
			])
			expect(readJsonColumn(run.json?.anchors, 'target').at(-1)).toBe('missing.md')
		} finally {
			scratch.destroy()
		}
	})
})

describe('the fence scan', () => {
	it('marks the fence lines and the lines between them for a backtick, a tilde, and an indented fence', () => {
		expect(scanFences(['# a', '```', '# b', '```', '# c'])).toEqual([
			false,
			true,
			true,
			true,
			false,
		])
		expect(scanFences(['~~~ js', '# b', '~~~', '# c'])).toEqual([true, true, true, false])
		expect(scanFences(['   ```', '# b', '   ```', '# c'])).toEqual([true, true, true, false])
		expect(scanFences([])).toEqual([])
	})

	it('closes a fence only on a run of the same character at least as long', () => {
		expect(scanFences(['````', '# a', '```', '# b', '````', '# c'])).toEqual([
			true,
			true,
			true,
			true,
			true,
			false,
		])
		expect(scanFences(['```', '# a', '`````', '# b'])).toEqual([true, true, true, false])
		expect(scanFences(['```', '~~~', '# a', '```', '# b'])).toEqual([true, true, true, true, false])
		expect(scanFences(['~~~', '```', '# a', '~~~', '# b'])).toEqual([true, true, true, true, false])
	})

	it('runs an unclosed fence to the end and reads an indent of four spaces as no fence', () => {
		expect(scanFences(['# a', '```', '# b', '# c'])).toEqual([false, true, true, true])
		expect(scanFences(['    ```', '# a'])).toEqual([false, false])
		expect(scanFences(['``', '# a'])).toEqual([false, false])
	})
})

describe('the census matcher and the text filter', () => {
	it('matches a term exactly or without regard to case', () => {
		expect(buildMatcher('Term', false)('a Term here')).toBe(true)
		expect(buildMatcher('Term', false)('a term here')).toBe(false)
		expect(buildMatcher('Term', true)('a TERM here')).toBe(true)
		expect(buildMatcher('Term', true)('other')).toBe(false)
	})

	it('reads a binary extension and the generated host manifest as no text', () => {
		for (const path of ['a.png', 'a/b.woff2', 'x.tgz', 'host.json', 'dist/host.json']) {
			expect({ path, text: isText(path) }).toEqual({ path, text: false })
		}
		for (const path of ['a.md', 'a.ts', 'a.json', 'host.json.md']) {
			expect({ path, text: isText(path) }).toEqual({ path, text: true })
		}
	})
})

describe('the argument readers', () => {
	it('reads a flag value, a list up to the next flag, and treats a following flag as a missing value', () => {
		const argv = ['--tree', 'a', 'b', '--json', '--out']
		expect(readOption(['--paths', 'a,b', '--json'], '--paths')).toBe('a,b')
		expect(readOption(argv, '--absent')).toBeUndefined()
		expect(readOption(['--refs', '--json'], '--refs')).toBeUndefined()
		expect(readOption(['--x', '1', '--x', '2'], '--x')).toBe('1')
		expect(readList(argv, '--tree')).toEqual(['a', 'b'])
		expect(readList(argv, '--absent')).toEqual([])
		expect(readList(['--tree'], '--tree')).toEqual([])
		expect(readMissingFlags(argv, ['--tree', '--out'])).toEqual(['--out'])
		expect(readMissingFlags(['--out', 'a'], ['--tree'])).toEqual([])
	})

	it('names an unread flag and the equals form, and stops at the command separator', () => {
		expect(readUnknownFlags(['--tree=docs', '--json', '--bogus'], ['--tree', '--json'])).toEqual([
			'--tree=docs',
			'--bogus',
		])
		expect(readUnknownFlags(['--tree', 'a', '--', '--watch'], ['--tree'])).toEqual([])
		expect(readUnknownFlags([], [])).toEqual([])
	})
})

describe('the tree walk', () => {
	it('lists files with forward slashes, skipping the excluded names exactly and at any depth', () => {
		const scratch = createScratch({ prefix: 'orkestrel-map-walk-' })
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
			expect(() => listFiles(`${scratch.path}/absent`)).toThrow(/ENOENT/u)
			expect(normalizeSlashes('a\\b\\c.ts')).toBe('a/b/c.ts')
		} finally {
			scratch.destroy()
		}
	})
})
