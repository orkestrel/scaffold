import { describe, expect, it } from 'vitest'
import { CLIExitError } from '../../../src/bin/errors.js'

describe('bin exit error', () => {
	it('preserves the requested process code', () => {
		const error = new CLIExitError(2)
		expect(error).toBeInstanceOf(Error)
		expect(error.code).toBe(2)
		expect(error.message).toBe('cli-exit:2')
	})
})
