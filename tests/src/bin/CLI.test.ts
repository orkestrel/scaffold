import { relative } from 'node:path'
import { describe, expect, it } from 'vitest'
import { CLI } from '../../../src/bin/CLI.js'
import { createRecorder } from '../../setup.js'
import { buildFromFixture } from '../../setupBin.js'
import {
	buildBlueprintFixture,
	buildGuidePath,
	buildHTTPFixture,
	buildRegistryPath,
	buildWorkspaceTempDirectory,
	respondJSON,
	respondText,
	WORKSPACE_ROOT,
} from '../../setupServer.js'

describe('CLI audit --live', () => {
	it('does not fetch or mark a self-declaring package guide behind', async () => {
		const fixture = await buildHTTPFixture()
		const host = await buildFromFixture()
		const target = await buildWorkspaceTempDirectory()
		const guideRecorder = createRecorder<[name: string]>()
		const versionRecorder = createRecorder<[name: string]>()
		const exitCode = process.exitCode
		try {
			buildBlueprintFixture(target.path, {
				name: '@orkestrel/router',
				src: ['core'],
				dependencies: { '@orkestrel/router': '^0.0.5' },
			})
			fixture.route(buildGuidePath('router'), (_request, response) =>
				respondText(response, 200, 'self guide replacement'),
			)
			fixture.route(buildRegistryPath('@orkestrel/router'), (_request, response) =>
				respondJSON(response, '0.0.5'),
			)
			const cli = new CLI({
				guides: { base: fixture.base },
				registry: { base: fixture.base },
				on: {
					guide: guideRecorder.handler,
					version: versionRecorder.handler,
				},
			})
			process.exitCode = undefined

			await cli.run([
				'audit',
				'--target',
				relative(WORKSPACE_ROOT, target.path),
				'--groups',
				'source',
				'--live',
				'--json',
				'--from',
				host.path,
			])

			expect(fixture.hits.get(buildGuidePath('router')) ?? 0).toBe(0)
			expect(fixture.hits.get(buildRegistryPath('@orkestrel/router'))).toBe(1)
			expect(guideRecorder.count).toBe(0)
			expect(versionRecorder.calls).toEqual([['@orkestrel/router']])
			expect(process.exitCode).toBe(0)
		} finally {
			process.exitCode = exitCode
			await target.cleanup()
			await host.cleanup()
			await fixture.close()
		}
	})
})
