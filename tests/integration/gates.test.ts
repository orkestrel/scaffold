import { spawnSync } from 'node:child_process'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { describe, expect, inject, it } from 'vitest'
import { executeGeneratedConsumerGates } from '../setupE2E.js'
import { WORKSPACE_ROOT } from '../setupServer.js'

describe('generated mixed-workspace consumer gates', () => {
	it('runs the canonical prepublish lifecycle in a fresh full workspace', async () => {
		await expect(
			executeGeneratedConsumerGates(inject('generatedConsumerTemplates')),
		).resolves.toBeUndefined()
	}, 1_260_000)

	it('loads the built server export through native ESM and CommonJS', () => {
		const esm = pathToFileURL(join(WORKSPACE_ROOT, 'dist', 'src', 'server', 'index.js')).href
		const cjs = join(WORKSPACE_ROOT, 'dist', 'src', 'server', 'index.cjs')
		const expected = join(WORKSPACE_ROOT, 'dist', 'host')
		const source = [
			"import { createRequire } from 'node:module'",
			`const imported = await import(${JSON.stringify(esm)})`,
			`const required = createRequire(import.meta.url)(${JSON.stringify(cjs)})`,
			'process.stdout.write(JSON.stringify([imported.hostRoot(), required.hostRoot()]))',
		].join('\n')
		const result = spawnSync(process.execPath, ['--input-type=module', '--eval', source], {
			cwd: WORKSPACE_ROOT,
			encoding: 'utf8',
		})

		expect(result.error).toBeUndefined()
		expect(result.status).toBe(0)
		expect(result.stderr).toBe('')
		expect(result.stdout).toBe(JSON.stringify([expected, expected]))
	})
})
