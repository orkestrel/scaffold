import { describe, expect, it } from 'vitest'
import { isHostManifest, isManifestEntry, isMissingPathError, isPortablePath } from '@src/server'
import { hostManifestOf } from '../../setupServer.js'

describe('isPortablePath', () => {
	it('accepts safe relative POSIX paths', () => {
		expect(isPortablePath('agents/skills/harden/SKILL.md')).toBe(true)
		expect(isPortablePath('.agents')).toBe(true)
	})

	it('rejects non-strings, empty paths, traversal, drive, backslash, empty, and NUL segments', () => {
		for (const path of [
			'',
			'/absolute',
			'C:/absolute',
			'../escape',
			'agents/../escape',
			'agents\\escape',
			'agents//escape',
			'agents/\0escape',
			'agents/a?.md',
			'agents/trailing.',
			'agents/trailing ',
			'agents/CON',
			'agents/aux.txt',
			'agents/CONIN$',
			'agents/conout$.txt',
			`agents/${String.fromCharCode(0x7f)}escape`,
			`agents/${String.fromCharCode(0x85)}escape`,
		]) {
			expect(isPortablePath(path)).toBe(false)
		}
		expect(isPortablePath(null)).toBe(false)
		expect(isPortablePath([])).toBe(false)
	})
})

describe('isMissingPathError', () => {
	it('accepts only an Error carrying the exact ENOENT code', () => {
		const missing = new Error('missing')
		Object.defineProperty(missing, 'code', { value: 'ENOENT' })
		const denied = new Error('denied')
		Object.defineProperty(denied, 'code', { value: 'EACCES' })

		expect(isMissingPathError(missing)).toBe(true)
		expect(isMissingPathError(denied)).toBe(false)
		expect(isMissingPathError({ code: 'ENOENT' })).toBe(false)
		expect(isMissingPathError(undefined)).toBe(false)
	})

	it('is total for a hostile code getter', () => {
		const hostile = new Error('hostile')
		Object.defineProperty(hostile, 'code', {
			get() {
				throw new Error('hostile code')
			},
		})

		expect(() => isMissingPathError(hostile)).not.toThrow()
		expect(isMissingPathError(hostile)).toBe(false)
	})
})

describe('isManifestEntry', () => {
	it('accepts a full, well-shaped manifest entry', () => {
		expect(
			isManifestEntry({ storage: 'gitignore', destination: '.gitignore', executable: false }),
		).toBe(true)
	})

	it('rejects missing, mistyped, extra, and non-record fields', () => {
		expect(isManifestEntry({ storage: 'gitignore', destination: '.gitignore' })).toBe(false)
		expect(
			isManifestEntry({ storage: 'gitignore', destination: '.gitignore', executable: 'false' }),
		).toBe(false)
		expect(isManifestEntry({ storage: 1, destination: '.gitignore', executable: false })).toBe(
			false,
		)
		expect(
			isManifestEntry({
				storage: 'gitignore',
				destination: '.gitignore',
				executable: false,
				extra: 'unexpected',
			}),
		).toBe(false)
		expect(isManifestEntry(null)).toBe(false)
		expect(isManifestEntry(['gitignore'])).toBe(false)
	})

	it('rejects unsafe storage and destination paths', () => {
		for (const path of [
			'/absolute',
			'C:/absolute',
			'../escape',
			'agents/../escape',
			'agents\\escape',
			'agents//escape',
			'agents/\0escape',
		]) {
			expect(
				isManifestEntry({
					storage: path,
					destination: '.agents/skills/harden/SKILL.md',
					executable: false,
				}),
			).toBe(false)
			expect(
				isManifestEntry({
					storage: 'agents/skills/harden/SKILL.md',
					destination: path,
					executable: false,
				}),
			).toBe(false)
		}
	})

	it('is total for hostile and revoked proxy entries', () => {
		const hostile = new Proxy(
			{},
			{
				ownKeys() {
					throw new Error('hostile ownKeys')
				},
			},
		)
		const revoked = Proxy.revocable({}, {})
		revoked.revoke()

		expect(() => isManifestEntry(hostile)).not.toThrow()
		expect(isManifestEntry(hostile)).toBe(false)
		expect(() => isManifestEntry(revoked.proxy)).not.toThrow()
		expect(isManifestEntry(revoked.proxy)).toBe(false)
	})
})

describe('isHostManifest', () => {
	it('accepts only the exact complete manifest shape', () => {
		const manifest = hostManifestOf(
			[{ storage: 'agents/a', destination: '.agents/a', executable: false }],
			['.agents'],
		)

		expect(isHostManifest(manifest)).toBe(true)
		expect(isHostManifest(manifest.entries)).toBe(false)
		expect(isHostManifest({ ...manifest, extra: true })).toBe(false)
		expect(isHostManifest({ entries: manifest.entries, roots: ['../escape'] })).toBe(false)
	})

	it('is total for hostile getters and revoked proxy manifests', () => {
		const hostile = new Proxy(
			{ entries: [], roots: [] },
			{
				get() {
					throw new Error('hostile get')
				},
			},
		)
		const revoked = Proxy.revocable({}, {})
		revoked.revoke()

		expect(() => isHostManifest(hostile)).not.toThrow()
		expect(isHostManifest(hostile)).toBe(false)
		expect(() => isHostManifest(revoked.proxy)).not.toThrow()
		expect(isHostManifest(revoked.proxy)).toBe(false)
	})
})
