import { globSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve, sep } from 'node:path'
import { describe, expect, it } from 'vitest'
import { createSource } from '@orkestrel/guide'

const ROOT = fileURLToPath(new URL('../../', import.meta.url))
const files: Record<string, string> = {}
for (const path of globSync('app/**/*.ts', { cwd: ROOT })) {
	files[path.split(sep).join('/')] = readFileSync(resolve(ROOT, path), 'utf8')
}

describe('probe', () => {
	it('reflects declarations', () => {
		const core = createSource({ files, module: 'app/core' })
		const browser = createSource({ files, module: 'app/browser' })
		const names = (rows: readonly { readonly name: string }[]): readonly string[] => rows.map((r) => r.name)
		console.info('CORE EXPORTS', core.exports().length, JSON.stringify(names(core.exports())))
		console.info('CORE HIDDEN', JSON.stringify(names(core.hidden())))
		console.info('BROWSER EXPORTS', browser.exports().length, JSON.stringify(names(browser.exports())))
		console.info('BROWSER HIDDEN', JSON.stringify(names(browser.hidden())))
		expect(true).toBe(true)
	})
})
