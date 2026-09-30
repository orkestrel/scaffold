import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { isArray, isRecord } from '@orkestrel/contract'
import { createScratch } from '@orkestrel/test/server'
import { runSkillScript } from '../../../../setupServer.js'

const SCRIPT = '.agents/skills/orkestrel-scout/scripts/map.ts'

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
				SCRIPT,
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
			const refs = runSkillScript(SCRIPT, ['--refs', 'docs/a.md', '--json'], { cwd: scratch.path })
			expect(refs.status).toBe(0)
			const rows = refs.json?.refs
			if (!isArray(rows)) throw new Error('The map carries no refs')
			expect(rows.map((row) => (isRecord(row) ? row.path : ''))).toEqual(['notes.md'])
			const written = runSkillScript(SCRIPT, ['--tree', 'docs', '--out', 'tmp/units/map.txt'], {
				cwd: scratch.path,
			})
			expect(written.status).toBe(0)
			expect(written.stdout).toContain('map: wrote tmp/units/map.txt')
			expect(readFileSync(join(scratch.path, 'tmp/units/map.txt'), 'utf8')).toContain('## Tree')
			const text = runSkillScript(SCRIPT, ['--headings', 'docs'], { cwd: scratch.path })
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
				SCRIPT,
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

	it('refuses a call with no mode or a flag with no value', () => {
		const scratch = createScratch({ prefix: 'orkestrel-map-usage-' })
		try {
			expect(runSkillScript(SCRIPT, [], { cwd: scratch.path }).status).toBe(64)
			expect(runSkillScript(SCRIPT, ['--refs', '--json'], { cwd: scratch.path }).status).toBe(64)
			expect(runSkillScript(SCRIPT, ['--tree', '.', '--out'], { cwd: scratch.path }).status).toBe(
				64,
			)
		} finally {
			scratch.destroy()
		}
	})
})
