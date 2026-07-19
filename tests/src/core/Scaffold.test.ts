import type { ScaffoldInterface } from '@src/core'
import { Scaffold } from '@src/core'
import { describe, expect, it } from 'vitest'

// The Scaffold entity — id assignment (explicit / generated) and independence
// across instances. Factory-level assertions live in factories.test.ts.

describe('Scaffold', () => {
	it('round-trips an explicit id', () => {
		const instance: ScaffoldInterface = new Scaffold({ id: 'example' })

		expect(instance.id).toBe('example')
	})

	it('generates a non-empty id when none is given', () => {
		const instance = new Scaffold()

		expect(typeof instance.id).toBe('string')
		expect(instance.id.length).toBeGreaterThan(0)
	})

	it('gives distinct instances distinct generated ids', () => {
		const a = new Scaffold()
		const b = new Scaffold()

		expect(a.id).not.toBe(b.id)
	})
})
