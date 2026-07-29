import { describe, expect, inject, it } from 'vitest'
import { executeGeneratedConsumerGates } from '../setupE2E.js'

describe('generated mixed-workspace consumer gates', () => {
	it('runs the canonical prepublish lifecycle in a fresh full workspace', async () => {
		await expect(
			executeGeneratedConsumerGates(inject('generatedConsumerTemplates')),
		).resolves.toBeUndefined()
	}, 1_260_000)
})
