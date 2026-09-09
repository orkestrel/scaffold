import type { GuideReadFunction, GuideRunnerFunction } from '@src/server'
import { isRecord } from '@orkestrel/contract'
import { readInventory } from '@orkestrel/test/server'
import { createVitest } from 'vitest/node'
import { describe, expect, it } from 'vitest'

describe('GuideCommand', () => {
	it('accepts the installed inventory reader and Vitest runner directly', () => {
		expect<GuideReadFunction>(readInventory).toBe(readInventory)
		expect<GuideRunnerFunction>(createVitest).toBe(createVitest)
	})

	it('publishes the server command', async () => {
		const server: unknown = await import('@src/server')
		expect(isRecord(server) && typeof server.GuideCommand === 'function').toBe(true)
	})
})
