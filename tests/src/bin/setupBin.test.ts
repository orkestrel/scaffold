import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { cloneGeneratedModules, parsePackReport } from '../../setupBin.js'
import { buildTempDirectory } from '../../setupServer.js'

describe('cloneGeneratedModules', () => {
	it('skips optimizer cache only at a node_modules root', async () => {
		const source = await buildTempDirectory()
		const destination = await buildTempDirectory()
		try {
			const modules = join(source.path, 'node_modules')
			const cache = join(modules, '.vite', 'cache-file')
			const payload = join(modules, 'some-pkg', 'dist', '.vite', 'payload-file')
			mkdirSync(join(modules, '.vite'), { recursive: true })
			mkdirSync(join(modules, 'some-pkg', 'dist', '.vite'), { recursive: true })
			writeFileSync(cache, 'optimizer cache\n', 'utf8')
			writeFileSync(payload, 'shipped payload\n', 'utf8')

			const cloned = join(destination.path, 'node_modules')
			cloneGeneratedModules(modules, cloned, false)

			expect(existsSync(join(cloned, '.vite', 'cache-file'))).toBe(false)
			expect(readFileSync(join(cloned, 'some-pkg', 'dist', '.vite', 'payload-file'), 'utf8')).toBe(
				'shipped payload\n',
			)
		} finally {
			await destination.cleanup()
			await source.cleanup()
		}
	})
})

describe('parsePackReport', () => {
	it('normalizes legacy arrays and npm 12 keyed objects', () => {
		const report = { filename: 'orkestrel-scaffold-0.0.16.tgz', files: [{ path: 'package.json' }] }

		expect(parsePackReport(JSON.stringify([report]))).toEqual(report)
		expect(parsePackReport(JSON.stringify({ '@orkestrel/scaffold': report }))).toEqual(report)
	})

	it('fails closed for missing or ambiguous reports', () => {
		expect(parsePackReport('{}')).toBeUndefined()
		expect(parsePackReport('[]')).toBeUndefined()
		expect(parsePackReport('[{},{}]')).toBeUndefined()
		expect(parsePackReport('{"first":{},"second":{}}')).toBeUndefined()
	})
})
