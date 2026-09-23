import { expect, it } from 'vitest'
import { CAPTURE_KEYS, CAPTURE_SCENARIOS } from '../../tests/setup.js'

// Reads the sorted capture population, scenario and subject, so the consolidation can show it unchanged.
it('reads the sorted capture population', () => {
	const pairs = CAPTURE_KEYS.map((key) => `${key.scenario}\t${key.subject}`).sort()
	console.log(`CAPTURE_SCENARIOS sorted:\n${[...CAPTURE_SCENARIOS].sort().join('\n')}`)
	console.log(`CAPTURE_KEYS sorted pairs:\n${pairs.join('\n')}`)
	expect(pairs.length).toBe(CAPTURE_SCENARIOS.length)
})
