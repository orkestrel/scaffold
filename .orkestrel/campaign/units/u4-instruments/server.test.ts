import type { Duplex } from 'node:stream'
import { createLoopback, requestUpgrade } from '@src/server'
import { createServer } from 'node:http'
import { describe, expect, it } from 'vitest'

describe('server fence values', () => {
	it('drives an upgrade and a refusal', async () => {
		const detached: Duplex[] = []
		const server = createServer((request, response) => {
			response.statusCode = 426
			response.end('upgrade required')
		})
		server.on('upgrade', (request, socket) => {
			detached.push(socket)
			const offered = request.headers['sec-websocket-protocol'] ?? ''
			const selected = offered.split(',')[0]?.trim() ?? ''
			socket.write(
				`HTTP/1.1 101 Switching Protocols\r\nConnection: Upgrade\r\nUpgrade: websocket\r\nSec-WebSocket-Protocol: ${selected}\r\n\r\n`,
			)
		})
		const loopback = await createLoopback(server)
		try {
			const claimed = await requestUpgrade(loopback.port, {
				path: '/socket',
				protocols: ['ledger.v2', 'ledger.v1'],
			})
			expect(claimed).toStrictEqual({ claimed: true, status: undefined, protocol: 'ledger.v2' })
		} finally {
			for (const socket of detached) socket.destroy()
			await loopback.destroy()
		}
	})

	it('reports a plain answer when nothing claims the upgrade', async () => {
		const server = createServer((request, response) => {
			response.statusCode = 426
			response.end('upgrade required')
		})
		const loopback = await createLoopback(server)
		try {
			const answer = await requestUpgrade(loopback.port, { path: '/health' })
			expect(answer).toStrictEqual({ claimed: false, status: 426, protocol: undefined })
		} finally {
			await loopback.destroy()
		}
	})

	it('rejects with the transport error on a closed port', async () => {
		const server = createServer((request, response) => response.end('ok'))
		const loopback = await createLoopback(server)
		const port = loopback.port
		await loopback.destroy()
		const refused: unknown = await requestUpgrade(port).catch((reason: unknown) => reason)
		expect(refused).toBeInstanceOf(Error)
		console.log('refusal code:', refused instanceof Error ? Reflect.get(refused, 'code') : refused)
	})
})
