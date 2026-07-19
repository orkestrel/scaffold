import type { ScaffoldInterface } from '@src/core'
import { createScaffold, Scaffold } from '@src/core'
import { describe, expect, expectTypeOf, it } from 'vitest'

// The Scaffold factory — that `createScaffold` returns a working ScaffoldInterface
// backed by a real Scaffold instance.

describe('createScaffold', () => {
	it('returns a Scaffold instance', () => {
		const instance = createScaffold()

		expect(instance).toBeInstanceOf(Scaffold)
	})

	it('honors the id option', () => {
		const instance = createScaffold({ id: 'example' })

		expect(instance.id).toBe('example')
	})

	it('createScaffold returns a ScaffoldInterface', () => {
		expectTypeOf(createScaffold()).toEqualTypeOf<ScaffoldInterface>()
	})
})
