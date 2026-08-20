import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
	APP_BROWSER_DEV_DEPENDENCIES,
	APP_DEV_DEPENDENCIES,
	APP_SERVER_DEV_DEPENDENCIES,
	BASE_DEV_DEPENDENCIES,
	DECLARATION_DEV_DEPENDENCIES,
	matchesRange,
	ORKESTREL_RANGE_PATTERN,
	SHOWCASE_DEV_DEPENDENCIES,
	SOURCE_BROWSER_DEV_DEPENDENCIES,
} from '@src/core'
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

	// Scaffold hands generated workspaces these sets and installs its own declared members from the
	// manifest, so a package listed at one version here and another there ships a toolchain scaffold
	// does not itself run. The manifest's development dependencies do not declare the scaffold
	// self-pin, the generated application packages it carries as runtime dependencies,
	// @vitejs/plugin-vue, vue, vue-tsc, or vite-plugin-singlefile, so those keys are outside this
	// comparison. The self-pin is matched to the manifest version above.
	it('hands every generated dependency the version it installs itself', () => {
		const declared = manifestDevDependencies()
		const disagreed: string[] = []
		for (const [set, dependencies] of [
			['base', BASE_DEV_DEPENDENCIES],
			['declaration', DECLARATION_DEV_DEPENDENCIES],
			['source browser', SOURCE_BROWSER_DEV_DEPENDENCIES],
			['app', APP_DEV_DEPENDENCIES],
			['app browser', APP_BROWSER_DEV_DEPENDENCIES],
			['app server', APP_SERVER_DEV_DEPENDENCIES],
			['showcase', SHOWCASE_DEV_DEPENDENCIES],
		] as const) {
			for (const [name, range] of Object.entries(dependencies)) {
				const own = declared[name]
				if (own !== undefined && own !== range) {
					disagreed.push(`${name}: ${set} ${range}, manifest ${own}`)
				}
			}
		}
		expect(disagreed).toEqual([])
	})

	// The generated TypeScript configuration and declaration pipeline are proven only below
	// TypeScript 7, so the shared range must refuse every 7.x release.
	it('keeps generated TypeScript below 7', () => {
		const range = BASE_DEV_DEPENDENCIES.typescript
		if (range === undefined)
			throw new Error('The base development dependencies carry no TypeScript')
		expect(matchesRange(range, '7.0.2')).toBe(false)
	})

	// The instrument is only evidence after it has failed. A version the manifest does not declare
	// must be rejected, and a range shape the fleet refuses must be rejected, or neither assertion
	// above is measuring anything.
	it('rejects a pin that does not follow the manifest', () => {
		expect(`^${manifestVersion()}`).not.toBe('^0.0.0')
		expect(ORKESTREL_RANGE_PATTERN.test('^1.0.0')).toBe(false)
		expect(ORKESTREL_RANGE_PATTERN.test(`${manifestVersion()}`)).toBe(false)
	})
})
