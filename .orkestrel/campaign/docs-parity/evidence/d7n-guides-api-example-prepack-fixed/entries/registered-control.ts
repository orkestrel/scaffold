import { GuideCommand } from '@orkestrel/guide/server'
import { readInventory } from '@orkestrel/test/server'
import { createVitest } from 'vitest/node'

await new GuideCommand({
	root: new URL('../', import.meta.url),
	patterns: ['src/**/*.ts', 'tests/**/*.ts', 'guides/*.md', '*.md'],
	modules: { '@scope/package': ['src/core', 'src/server'] },
	languages: ['ts'],
	language: 'ts',
	reader: readInventory,
	runner: createVitest,
}).execute(async ({ files, report, root, rows }) => {
	const { expect } = await import('vitest')
	const { it } = await import('vitest')
	it('checks the documented inventory', () => {
		expect(root.length).toBeGreaterThan(0)
		expect(Object.keys(files).length).toBeGreaterThan(0)
		expect(rows.length).toBeGreaterThan(0)
		expect(report.input).toEqual([])
	})
})