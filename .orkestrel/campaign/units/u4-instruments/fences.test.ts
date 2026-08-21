import type { Duplex } from 'node:stream'
import { createRecorder, createSignal, waitForAbort } from '@src/core'
import { createLoopback, createScratch, requestUpgrade, supportsFileLinks } from '@src/server'
import { createServer } from 'node:http'
import { describe, expect, it } from 'vitest'

describe('exact fence sequences', () => {
	it('counts listeners through the fence sequence', async () => {
		const instrument = createSignal()
		expect(instrument.count).toBe(0)
		const heard = createRecorder<[event: Event]>()
		instrument.signal.addEventListener('abort', heard.handler)
		expect(instrument.count).toBe(1)
		instrument.signal.addEventListener('abort', heard.handler)
		expect(instrument.count).toBe(1)
		const parked = waitForAbort(instrument.signal)
		expect(instrument.count).toBe(2)
		instrument.controller.abort()
		await parked
		expect(instrument.count).toBe(1)
		expect(heard.count).toBe(1)
		instrument.signal.removeEventListener('abort', heard.handler)
		expect(instrument.count).toBe(0)
	})

	it('answers plainly before an upgrade handler and claims after it', async () => {
		const detached: Duplex[] = []
		const server = createServer((request, response) => {
			response.statusCode = 426
			response.end('upgrade required')
		})
		const loopback = await createLoopback(server)
		try {
			expect(await requestUpgrade(loopback.port, { path: '/socket' })).toStrictEqual({
				claimed: false,
				status: 426,
				protocol: undefined,
			})
			server.on('upgrade', (request, socket) => {
				detached.push(socket)
				socket.write(
					'HTTP/1.1 101 Switching Protocols\r\nConnection: Upgrade\r\nUpgrade: websocket\r\nSec-WebSocket-Protocol: ledger.v2\r\n\r\n',
				)
			})
			expect(
				await requestUpgrade(loopback.port, {
					path: '/socket',
					protocols: ['ledger.v2', 'ledger.v1'],
				}),
			).toStrictEqual({ claimed: true, status: undefined, protocol: 'ledger.v2' })
		} finally {
			for (const socket of detached) socket.destroy()
			await loopback.destroy()
		}
	})

	it('reads a file through a link where the host makes one', () => {
		expect(supportsFileLinks()).toBe(true)
		const scratch = createScratch({ files: { 'source.txt': 'linked' } })
		try {
			scratch.link('gate.txt', 'source.txt')
			expect(scratch.read('gate.txt')).toBe('linked')
		} finally {
			scratch.destroy()
		}
	})
})
