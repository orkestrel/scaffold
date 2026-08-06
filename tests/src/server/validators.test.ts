import { describe, expect, it } from 'vitest'
import {
	isCatalogAllowance,
	isHostManifest,
	isFilesystemPath,
	isManifestEntry,
	isMissingPathError,
	isPortablePath,
	isSensitiveHostPath,
	isTerminalText,
	MAX_FILESYSTEM_DEPTH,
	MAX_HOST_ENTRIES,
	MAX_PATH_SEGMENT_BYTES,
} from '@src/server'
import { hostManifestOf } from '../../setupServer.js'

describe('isCatalogAllowance', () => {
	it('accepts only one bounded Float64 cell with a non-shared intrinsic backing buffer', () => {
		expect(isCatalogAllowance(new Float64Array([MAX_HOST_ENTRIES]))).toBe(true)
		expect(isCatalogAllowance(new Float64Array([MAX_HOST_ENTRIES + 1]))).toBe(false)

		const shared = new Float64Array(new SharedArrayBuffer(Float64Array.BYTES_PER_ELEMENT))
		Object.defineProperty(shared, 'buffer', {
			value: new ArrayBuffer(Float64Array.BYTES_PER_ELEMENT),
		})
		expect(isCatalogAllowance(shared)).toBe(false)
	})
})

describe('isPortablePath', () => {
	it('accepts safe relative POSIX paths', () => {
		expect(isPortablePath('agents/skills/harden/SKILL.md')).toBe(true)
		expect(isPortablePath('.agents')).toBe(true)
		expect(isPortablePath('a'.repeat(MAX_PATH_SEGMENT_BYTES))).toBe(true)
		expect(isPortablePath(Array(MAX_FILESYSTEM_DEPTH).fill('a').join('/'))).toBe(true)
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
			'a'.repeat(MAX_PATH_SEGMENT_BYTES + 1),
			`agents/${'😀'.repeat(64)}`,
			Array(MAX_FILESYSTEM_DEPTH + 1)
				.fill('a')
				.join('/'),
		]) {
			expect(isPortablePath(path)).toBe(false)
		}
		expect(isPortablePath(null)).toBe(false)
		expect(isPortablePath([])).toBe(false)
	})
})

describe('terminal-safe external strings and paths', () => {
	it('accepts ordinary Unicode while rejecting terminal controls and separators', () => {
		expect(isTerminalText('résumé/資料')).toBe(true)
		expect(isFilesystemPath('C:\\résumé\\資料')).toBe(true)
		expect(isFilesystemPath(`C:\\${'a'.repeat(MAX_PATH_SEGMENT_BYTES)}`)).toBe(true)
		expect(isFilesystemPath(`C:\\${'a'.repeat(MAX_PATH_SEGMENT_BYTES + 1)}`)).toBe(false)
		expect(
			isFilesystemPath(
				Array(MAX_FILESYSTEM_DEPTH + 1)
					.fill('a')
					.join('/'),
			),
		).toBe(false)
		for (const control of ['\0', '\n', '\r', '\u001b', '\u0085', '\u2028', '\u2029', '\u202e']) {
			expect(isTerminalText(`before${control}after`)).toBe(false)
			expect(isFilesystemPath(`before${control}after`)).toBe(false)
			expect(isPortablePath(`before${control}after`)).toBe(false)
		}
	})
})

describe('isSensitiveHostPath', () => {
	it('rejects credential roots and secret descendants without matching ordinary governance paths', () => {
		for (const path of [
			'.git/config',
			'.aws/sso/cache/token.json',
			'safe/.env/token',
			'.docker/config.json',
			'.kube/config',
			'.config/gcloud/application_default_credentials.json',
			'.local/share/keyrings/login.keyring',
		]) {
			expect(isSensitiveHostPath(path)).toBe(true)
		}
		expect(isSensitiveHostPath('.github/workflows/ci.yml')).toBe(false)
		expect(isSensitiveHostPath('.agents/skills/example/SKILL.md')).toBe(false)
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
		expect(
			isHostManifest({ entries: manifest.entries, roots: ['../escape'], digest: manifest.digest }),
		).toBe(false)
	})

	it('rejects symbol-extended records and oversized arrays without reading their elements', () => {
		const digest = hostManifestOf([], []).digest
		const entry = {
			storage: 'agents/a',
			destination: '.agents/a',
			executable: false,
			[Symbol('extra')]: true,
		}
		expect(isManifestEntry(entry)).toBe(false)
		expect(isHostManifest({ entries: [], roots: [], digest, [Symbol('extra')]: true })).toBe(false)

		const entries = new Array(MAX_HOST_ENTRIES + 1)
		Object.defineProperty(entries, '0', {
			get: () => {
				throw new Error('oversized entries must not be traversed')
			},
		})
		const roots = new Array(MAX_HOST_ENTRIES + 1)
		Object.defineProperty(roots, '0', {
			get: () => {
				throw new Error('oversized roots must not be traversed')
			},
		})
		expect(() => isHostManifest({ entries, roots: [], digest })).not.toThrow()
		expect(isHostManifest({ entries, roots: [], digest })).toBe(false)
		expect(() => isHostManifest({ entries: [], roots, digest })).not.toThrow()
		expect(isHostManifest({ entries: [], roots, digest })).toBe(false)
	})

	it('rejects caller-owned array methods, symbols, sparse indices, and invalid elements', () => {
		const digest = hostManifestOf([], []).digest
		const entries: unknown[] = [{ invalid: true }]
		Object.defineProperty(entries, 'every', {
			value: () => true,
		})
		const roots = ['.agents']
		Object.defineProperty(roots, Symbol('extra'), {
			value: true,
		})
		expect(isHostManifest({ entries, roots: [], digest })).toBe(false)
		expect(isHostManifest({ entries: [], roots, digest })).toBe(false)
		expect(isHostManifest({ entries: new Array(1), roots: [], digest })).toBe(false)
	})

	it('is total for hostile getters and revoked proxy manifests', () => {
		const hostile = {
			get entries(): readonly never[] {
				throw new Error('hostile get')
			},
			roots: [],
		}
		const revoked = Proxy.revocable({}, {})
		revoked.revoke()

		expect(() => isHostManifest(hostile)).not.toThrow()
		expect(isHostManifest(hostile)).toBe(false)
		expect(() => isHostManifest(revoked.proxy)).not.toThrow()
		expect(isHostManifest(revoked.proxy)).toBe(false)
	})
})
