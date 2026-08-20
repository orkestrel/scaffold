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

function manifestDevDependencies(): Readonly<Record<string, string>> {
	const manifest: unknown = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))
	if (typeof manifest !== 'object' || manifest === null) {
		throw new Error('The package manifest is not a record')
	}
	const declared: unknown = Object.getOwnPropertyDescriptor(manifest, 'devDependencies')?.value
	if (typeof declared !== 'object' || declared === null) {
		throw new Error('The package manifest declares no development dependencies')
	}
	const pins: Record<string, string> = {}
	for (const [name, range] of Object.entries(declared)) {
		if (typeof range === 'string') pins[name] = range
	}
	return pins
}

describe('BASE_DEV_DEPENDENCIES', () => {
	// Every generated workspace receives this pin, and a release moves the manifest version in its
	// own commit. Without this the pin and the manifest drift silently and every scaffolded project keeps depending
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

	// Scaffold hands every generated workspace these pins and installs its own from the manifest, so
	// a fleet package listed at one version here and another there ships a toolchain scaffold does
	// not itself run. The self-pin above is exempt: it names the release being prepared, which the
	// manifest carries as a bare version rather than as a dependency of itself.
	it('hands every fleet package the version it installs itself', () => {
		const declared = manifestDevDependencies()
		const disagreed: string[] = []
		for (const [name, range] of Object.entries(BASE_DEV_DEPENDENCIES)) {
			if (!name.startsWith('@orkestrel/') || name === '@orkestrel/scaffold') continue
			const own = declared[name]
			if (own !== undefined && own !== range)
				disagreed.push(`${name}: base ${range}, manifest ${own}`)
		}
		expect(disagreed).toEqual([])
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
