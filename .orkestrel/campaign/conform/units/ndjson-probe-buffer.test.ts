// Throwaway instrument for the ndjson conformance round: what this host does when the
// `this.#buffer += chunk` append in `src/core/NDJSONParser.ts` passes the engine's maximum
// string length. The guide and the README now state that the append throws a `RangeError`
// there, so the sentence is read off this run rather than off the engine's documentation.
// Control: an append well inside the limit returns normally, so a throw at the boundary is
// the boundary rather than the instrument.

import { constants } from 'node:buffer'
import { describe, expect, it } from 'vitest'

describe('string append at the maximum string length', () => {
	it('appends normally well inside the limit', () => {
		let buffer = 'x'.repeat(1_000_000)

		buffer += buffer

		expect(buffer.length).toBe(2_000_000)
	})

	it('reports what the append throws past the limit', () => {
		let buffer = 'x'.repeat(1_000_000)
		let thrown: unknown
		let reached = buffer.length

		try {
			for (let step = 0; step < 20; step += 1) {
				buffer += buffer
				reached = buffer.length
			}
		} catch (error) {
			thrown = error
		}

		console.log('MAX_STRING_LENGTH:', constants.MAX_STRING_LENGTH)
		console.log('last length reached:', reached)
		console.log('thrown:', thrown instanceof Error ? `${thrown.name}: ${thrown.message}` : thrown)
		expect(thrown).toBeInstanceOf(RangeError)
	})
})
