import { expect, it } from 'vitest'
import { FORM_FLOATING_SPECIMENS, VALIDATION_SPECIMENS } from '../../app/browser/constants.js'
import { DRIVEN_KEYS } from '../../tests/setup.js'

// Reads the rows the validation and floating journeys select through their specimen tables.
it('selects the rows the retired family lists held', () => {
	const validation = new Set(VALIDATION_SPECIMENS.map((specimen) => specimen.name))
	const floating = new Set(FORM_FLOATING_SPECIMENS.map((specimen) => specimen.name))
	expect(DRIVEN_KEYS.filter((key) => validation.has(key.subject)).map((key) => key.scenario)).toStrictEqual(['valid-control-focus', 'invalid-control-focus'])
	expect(DRIVEN_KEYS.filter((key) => floating.has(key.subject)).map((key) => key.scenario)).toStrictEqual(['form-floating-empty-focus'])
})
