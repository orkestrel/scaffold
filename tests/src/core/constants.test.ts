import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { BASE_DEV_DEPENDENCIES, ORKESTREL_RANGE_PATTERN } from '@src/core'
import { describe, expect, it } from 'vitest'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..')

function manifestVersion(): string {
	const manifest: unknown = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))
	if (typeof manifest !== 'object' || manifest === null) {
		throw new Error('The package manifest is not a record')
	}
	const version: unknown = Object.getOwnPropertyDescriptor(manifest, 'version')?.value
	if (typeof version !== 'string') throw new Error('The package manifest declares no version')
	return version
}

describe('BASE_DEV_DEPENDENCIES', () => {
	// Every generated workspace receives this pin, and a release moves the manifest version in its
	// own commit. Without this the two drift silently and every scaffolded project keeps depending
	// on the previous scaffold.
	it('pins this package at the version the manifest declares', () => {
		const pinned = BASE_DEV_DEPENDENCIES['@orkestrel/scaffold']
		expect(pinned).toBe(`^${manifestVersion()}`)
	})

	it('pins this package with the range shape the fleet accepts', () => {
		const pinned = BASE_DEV_DEPENDENCIES['@orkestrel/scaffold']
		if (pinned === undefined) throw new Error('The base development dependencies carry no scaffold')
		expect(ORKESTREL_RANGE_PATTERN.test(pinned)).toBe(true)
	})

	// The instrument is only evidence once it has failed. A version the manifest does not declare
	// must be rejected, and a range shape the fleet refuses must be rejected, or neither assertion
	// above is measuring anything.
	it('rejects a pin that does not follow the manifest', () => {
		expect(`^${manifestVersion()}`).not.toBe('^0.0.0')
		expect(ORKESTREL_RANGE_PATTERN.test('^1.0.0')).toBe(false)
		expect(ORKESTREL_RANGE_PATTERN.test(`${manifestVersion()}`)).toBe(false)
	})
})
