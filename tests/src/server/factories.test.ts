import { createMaterializer, createUpstream, Materializer, Upstream } from '@src/server'
import { describe, expect, it } from 'vitest'
import { createRecorder } from '../../setup.js'
import {
	buildPackument,
	createUpstreamServer,
	createWorkspace,
	readErrorCode,
	UPSTREAM_PATHS,
} from '../../setupServer.js'

describe('createMaterializer', () => {
	it('constructs the entity over the host it was given', () => {
		const workspace = createWorkspace()
		try {
			const materializer = createMaterializer({ host: workspace.directory('raw') })
			expect(materializer).toBeInstanceOf(Materializer)
			expect(materializer.emitter.destroyed).toBe(false)
			materializer.destroy()
			expect(materializer.emitter.destroyed).toBe(true)
		} finally {
			workspace.destroy()
		}
	})

	it('threads the listeners and refuses the options the constructor refuses', () => {
		const recorder = createRecorder<readonly []>()
		const materializer = createMaterializer({ on: { destroy: recorder.handler } })
		materializer.destroy()
		expect(recorder.count).toBe(1)
		expect(readErrorCode(() => createMaterializer({ host: 'dist/host*' }))).toBe('INVALID')
	})
})

describe('createUpstream', () => {
	it('constructs the entity and reads through the endpoints it was given', async () => {
		const server = await createUpstreamServer({
			[UPSTREAM_PATHS.router]: { status: 200, body: buildPackument('0.0.8') },
		})
		const upstream = createUpstream({ registry: { base: server.base } })
		try {
			expect(upstream).toBeInstanceOf(Upstream)
			const releases = await upstream.lookup([{ name: '@orkestrel/router', range: '^0.0.8' }])
			expect(releases).toStrictEqual([
				{ name: '@orkestrel/router', range: '^0.0.8', lookup: 'found', latest: '0.0.8' },
			])
		} finally {
			upstream.destroy()
			await server.destroy()
		}
	})

	it('threads the listeners and refuses the options the constructor refuses', () => {
		const recorder = createRecorder<readonly []>()
		const upstream = createUpstream({ on: { destroy: recorder.handler } })
		upstream.destroy()
		expect(recorder.count).toBe(1)
		expect(readErrorCode(() => createUpstream({ concurrency: 0 }))).toBe('INVALID')
		expect(readErrorCode(() => createUpstream({ registry: { base: 'file:///etc/passwd' } }))).toBe(
			'INVALID',
		)
	})
})
