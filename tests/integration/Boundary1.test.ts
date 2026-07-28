import { mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, inject, it } from 'vitest'
import { cloneGeneratedConsumer } from '../setupBin.js'
import {
	buildBoundaryCases,
	executeBoundaryCases,
	prepareBoundaryFixtures,
	selectBoundaryCases,
} from '../setupE2E.js'
import { buildTempDirectory } from '../setupServer.js'

describe('generated mixed-workspace boundary shard 1', () => {
	it('rejects the first deterministic half of the complete boundary matrix', async () => {
		const cwd = await buildTempDirectory()
		try {
			const generationRoot = join(cwd.path, 'app', 'server')
			mkdirSync(generationRoot, { recursive: true })
			const packageDirectory = cloneGeneratedConsumer(
				inject('generatedConsumerTemplates'),
				'full',
				generationRoot,
			)
			prepareBoundaryFixtures(packageDirectory, generationRoot)
			const cases = buildBoundaryCases(packageDirectory)
			const first = selectBoundaryCases(cases, 0)
			const second = selectBoundaryCases(cases, 1)
			const count = await executeBoundaryCases(packageDirectory, first)

			expect(count).toBe(first.length)
			expect(count + second.length).toBe(cases.length)
			expect([...first, ...second]).toEqual(cases)
		} finally {
			await cwd.cleanup()
		}
	}, 360_000)
})
