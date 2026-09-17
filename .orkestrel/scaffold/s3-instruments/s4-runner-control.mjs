// Rejects an empty collection through the same runner used by the retained reds.
// This control selects no case, outside the runner's named-case population.
import assert from 'node:assert/strict'
import { runCase } from './s4-run-case.mjs'

assert.throws(
	() => runCase('empty collection', '^s4-absent-case$', 'passed'),
	/The run did not execute exactly the named case/u,
)
console.log('The named-case runner refuses an empty collection despite Vitest exiting 0.')
