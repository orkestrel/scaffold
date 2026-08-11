import {
	chmodSync,
	existsSync,
	linkSync,
	lstatSync,
	mkdirSync,
	renameSync,
	rmSync,
	writeFileSync,
} from 'node:fs'
import { join } from 'node:path'
import { MAX_ARTIFACT_BYTES, MAX_COLLECTION_ITEMS } from '@src/core'
import {
	computeDigest,
	computeFileDigest,
	computeManifestDigest,
	isPhysicalDirectory,
	isExactCaseFile,
	isPhysicalFile,
	isVacant,
	listDirectories,
	listFiles,
	Materializer,
	matchesAnchor,
	matchesExpectation,
	matchesGitPath,
	matchesMissingPath,
	matchesPrecondition,
	matchesProtectedPath,
	matchesSensitivePath,
	MAX_PATH_DEPTH,
	pathToStorage,
	readAnchor,
	readExpectation,
	readFileHex,
	readFileText,
	readHostManifest,
	readManifestEntry,
	readSnapshot,
	resolveContainedPath,
	resolveRealPath,
	stageHost,
} from '@src/server'
import { describe, expect, it } from 'vitest'
import { buildHostArtifact, buildHostileCases, buildPlan } from '../../setup.js'
import {
	buildCheckoutManifest,
	buildManifestEntry,
	buildStagedManifest,
	createCheckout,
	createHostRoot,
	createWorkspace,
	DIGEST_CASES,
	GIT_PATH_CASES,
	PROTECTED_PATH_CASES,
	readErrorCode,
	SENSITIVE_PATH_CASES,
	STORAGE_PATH_CASES,
	WORKSPACE_ROOT,
} from '../../setupServer.js'

describe('matchesMissingPath', () => {
	it('reads only an ENOENT error as absence', () => {
		expect(matchesMissingPath(Object.assign(new Error('gone'), { code: 'ENOENT' }))).toBe(true)
		expect(matchesMissingPath(Object.assign(new Error('denied'), { code: 'EACCES' }))).toBe(false)
		expect(matchesMissingPath(new Error('gone'))).toBe(false)
		expect(matchesMissingPath('ENOENT')).toBe(false)
		expect(matchesMissingPath(undefined)).toBe(false)
	})

	it('answers every hostile value with false and never throws', () => {
		for (const hostile of buildHostileCases()) {
			expect(() => matchesMissingPath(hostile.value)).not.toThrow()
			expect(matchesMissingPath(hostile.value)).toBe(false)
		}
	})
})

describe('path classification', () => {
	for (const matchCase of GIT_PATH_CASES) {
		it(`matchesGitPath answers ${String(matchCase.matched)} for ${matchCase.label}`, () => {
			expect(matchesGitPath(matchCase.path)).toBe(matchCase.matched)
		})
	}

	for (const matchCase of PROTECTED_PATH_CASES) {
		it(`matchesProtectedPath answers ${String(matchCase.matched)} for ${matchCase.label}`, () => {
			expect(matchesProtectedPath(matchCase.path)).toBe(matchCase.matched)
		})
	}

	for (const matchCase of SENSITIVE_PATH_CASES) {
		it(`matchesSensitivePath answers ${String(matchCase.matched)} for ${matchCase.label}`, () => {
			expect(matchesSensitivePath(matchCase.path)).toBe(matchCase.matched)
		})
	}

	it('protects and refuses to vendor every path repository metadata owns', () => {
		for (const matchCase of GIT_PATH_CASES) {
			if (!matchCase.matched) continue
			expect(matchesProtectedPath(matchCase.path)).toBe(true)
			expect(matchesSensitivePath(matchCase.path)).toBe(true)
		}
	})

	it('never protects or refuses a path this package plans and vendors', () => {
		for (const path of ['AGENTS.md', '.claude/rules/names.md', 'configs/src/tsconfig.core.json']) {
			expect(matchesProtectedPath(path)).toBe(false)
			expect(matchesSensitivePath(path)).toBe(false)
		}
	})
})

describe('pathToStorage', () => {
	for (const storageCase of STORAGE_PATH_CASES) {
		it(`maps ${storageCase.label} to its storage name`, () => {
			expect(pathToStorage(storageCase.path)).toBe(storageCase.storage)
		})
	}

	it('produces a name npm packs, never a leading-dot entry', () => {
		for (const storageCase of STORAGE_PATH_CASES) {
			for (const segment of storageCase.storage.split('/')) {
				expect(segment.startsWith('.')).toBe(false)
			}
		}
	})

	it('keeps a dotted root file apart from its undotted sibling', () => {
		expect(pathToStorage('.gitignore')).not.toBe(pathToStorage('gitignore'))
	})
})

describe('computeDigest', () => {
	for (const digestCase of DIGEST_CASES) {
		it(`answers the published digest of ${digestCase.label}`, () => {
			expect(computeDigest(digestCase.content)).toBe(digestCase.digest)
		})
	}

	it('answers the same digits on every call and different digits for different text', () => {
		expect(computeDigest('scaffold')).toBe(computeDigest('scaffold'))
		expect(computeDigest('scaffold')).not.toBe(computeDigest('scaffolds'))
	})
})

describe('computeManifestDigest', () => {
	it('changes when membership changes and holds when it does not', () => {
		const entries = [buildManifestEntry()]
		const first = computeManifestDigest(entries, ['.claude'])
		expect(computeManifestDigest([buildManifestEntry()], ['.claude'])).toBe(first)
		expect(computeManifestDigest(entries, [])).not.toBe(first)
		expect(computeManifestDigest([], ['.claude'])).not.toBe(first)
		expect(computeManifestDigest([buildManifestEntry({ executable: true })], ['.claude'])).not.toBe(
			first,
		)
	})

	it('reads order as part of the membership it authenticates', () => {
		const first = buildManifestEntry({ storage: 'a', destination: 'a' })
		const second = buildManifestEntry({ storage: 'b', destination: 'b' })
		expect(computeManifestDigest([first, second], [])).not.toBe(
			computeManifestDigest([second, first], []),
		)
		expect(computeManifestDigest([], ['a', 'b'])).not.toBe(computeManifestDigest([], ['b', 'a']))
	})

	it('reads exactly the three declared fields and nothing a caller added', () => {
		// Built through a variable so the extra field survives to the runtime call
		// instead of being refused by the excess-property check at the literal.
		const extended = { ...buildManifestEntry(), note: 'added' }
		expect(computeManifestDigest([extended], [])).toBe(
			computeManifestDigest([buildManifestEntry()], []),
		)
	})

	it('leaves the lists it was handed exactly as it found them', () => {
		const entries = [buildManifestEntry()]
		const roots = ['.claude']
		computeManifestDigest(entries, roots)
		expect(entries).toEqual([buildManifestEntry()])
		expect(roots).toEqual(['.claude'])
	})
})

describe('physical shape', () => {
	it('requires every file path segment to match its on-disk case exactly', () => {
		const workspace = createWorkspace()
		try {
			const exact = workspace.write('src/bin/main.ts', 'export {}\n')
			const folded = join(workspace.path, 'src/bin/Main.ts')
			expect(existsSync(exact)).toBe(true)
			expect(isExactCaseFile(exact)).toBe(true)
			expect(isExactCaseFile(folded)).toBe(false)
		} finally {
			workspace.destroy()
		}
	})

	it('accepts a plain file and a plain directory and refuses each other', () => {
		const workspace = createWorkspace()
		try {
			const file = workspace.write('AGENTS.md', 'hi\n')
			const directory = workspace.directory('guides')
			expect(isPhysicalFile(file)).toBe(true)
			expect(isPhysicalDirectory(file)).toBe(false)
			expect(isPhysicalDirectory(directory)).toBe(true)
			expect(isPhysicalFile(directory)).toBe(false)
		} finally {
			workspace.destroy()
		}
	})

	it('refuses an absent path without throwing', () => {
		const workspace = createWorkspace()
		try {
			expect(isPhysicalFile(join(workspace.path, 'absent.md'))).toBe(false)
			expect(isPhysicalDirectory(join(workspace.path, 'absent'))).toBe(false)
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a file that shares its bytes with a second name', () => {
		const workspace = createWorkspace()
		try {
			const file = workspace.write('AGENTS.md', 'hi\n')
			expect(isPhysicalFile(file)).toBe(true)
			linkSync(file, join(workspace.path, 'CLAUDE.md'))
			expect(isPhysicalFile(file)).toBe(false)
			expect(isPhysicalFile(join(workspace.path, 'CLAUDE.md'))).toBe(false)
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a redirected directory rather than following it', () => {
		const workspace = createWorkspace()
		try {
			const real = workspace.directory('guides')
			const link = workspace.link('mirror', real)
			expect(isPhysicalDirectory(real)).toBe(true)
			expect(isPhysicalDirectory(link)).toBe(false)
		} finally {
			workspace.destroy()
		}
	})
})

describe('computeFileDigest', () => {
	it('digests exact file bytes and agrees with the text digest', () => {
		const workspace = createWorkspace()
		try {
			const file = workspace.write('AGENTS.md', 'hi\n')
			expect(computeFileDigest(file)).toBe(computeDigest('hi\n'))
		} finally {
			workspace.destroy()
		}
	})

	it('answers undefined for an absent path, a directory, and a linked file', () => {
		const workspace = createWorkspace()
		try {
			expect(computeFileDigest(join(workspace.path, 'absent.md'))).toBeUndefined()
			expect(computeFileDigest(workspace.directory('guides'))).toBeUndefined()
			const file = workspace.write('AGENTS.md', 'hi\n')
			linkSync(file, join(workspace.path, 'CLAUDE.md'))
			expect(computeFileDigest(file)).toBeUndefined()
		} finally {
			workspace.destroy()
		}
	})

	it('digests content larger than one read buffer', () => {
		const workspace = createWorkspace()
		try {
			const content = 'a'.repeat(200_000)
			const file = workspace.write('big.md', content)
			expect(computeFileDigest(file)).toBe(computeDigest(content))
		} finally {
			workspace.destroy()
		}
	})
})

describe('resolveRealPath', () => {
	it('resolves an existing directory to a path that resolves to itself', () => {
		const workspace = createWorkspace()
		try {
			const resolved = resolveRealPath(workspace.path)
			expect(resolved).toBeDefined()
			expect(resolveRealPath(resolved ?? '')).toBe(resolved)
		} finally {
			workspace.destroy()
		}
	})

	it('keeps the segments that do not exist yet', () => {
		const workspace = createWorkspace()
		try {
			expect(resolveRealPath(join(workspace.path, 'packages', 'new'))).toBe(
				join(resolveRealPath(workspace.path) ?? '', 'packages', 'new'),
			)
		} finally {
			workspace.destroy()
		}
	})

	it('follows a link in the existing prefix to where it really points', () => {
		const workspace = createWorkspace()
		try {
			const real = workspace.directory('real')
			workspace.link('mirror', real)
			expect(resolveRealPath(join(workspace.path, 'mirror', 'new.md'))).toBe(
				join(resolveRealPath(real) ?? '', 'new.md'),
			)
		} finally {
			workspace.destroy()
		}
	})

	it('refuses text that is not a host path', () => {
		expect(resolveRealPath('')).toBeUndefined()
		expect(resolveRealPath('project/nul')).toBeUndefined()
		expect(resolveRealPath('project/a>b')).toBeUndefined()
	})
})

describe('resolveContainedPath', () => {
	it('answers the path the caller named, not a resolved form', () => {
		const workspace = createWorkspace()
		try {
			expect(resolveContainedPath(workspace.path, 'guides/router.md')).toBe(
				join(workspace.path, 'guides', 'router.md'),
			)
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a lexical escape and every off-contract argument', () => {
		const workspace = createWorkspace()
		try {
			expect(resolveContainedPath(workspace.path, '../secrets')).toBeUndefined()
			expect(resolveContainedPath(workspace.path, 'guides/../../secrets')).toBeUndefined()
			expect(resolveContainedPath(workspace.path, '/etc/passwd')).toBeUndefined()
			expect(resolveContainedPath(workspace.path, 'guides\\router.md')).toBeUndefined()
			expect(resolveContainedPath(workspace.path, '')).toBeUndefined()
			expect(resolveContainedPath('', 'guides/router.md')).toBeUndefined()
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a real link that points out of the root', () => {
		const outside = createWorkspace()
		const workspace = createWorkspace()
		try {
			outside.write('secrets.md', 'secret\n')
			workspace.link('escape', outside.path)
			expect(resolveContainedPath(workspace.path, 'escape/secrets.md')).toBeUndefined()
			// The control: the same file reads perfectly well through its own root,
			// so the refusal above is containment rather than an unreadable file.
			expect(readFileHex(outside.path, 'secrets.md')).toBeDefined()
		} finally {
			workspace.destroy()
			outside.destroy()
		}
	})

	it('admits a real link that stays inside the root', () => {
		const workspace = createWorkspace()
		try {
			const real = workspace.directory('real')
			workspace.link('mirror', real)
			workspace.write('real/router.md', '# Router\n')
			expect(resolveContainedPath(workspace.path, 'mirror/router.md')).toBe(
				join(workspace.path, 'mirror', 'router.md'),
			)
		} finally {
			workspace.destroy()
		}
	})
})

describe('isVacant', () => {
	it('accepts an absent target and an empty one', () => {
		const workspace = createWorkspace()
		try {
			expect(isVacant(join(workspace.path, 'absent'))).toBe(true)
			expect(isVacant(workspace.directory('empty'))).toBe(true)
		} finally {
			workspace.destroy()
		}
	})

	it('accepts a target holding nothing but its own repository metadata', () => {
		const workspace = createWorkspace()
		try {
			const target = workspace.directory('checkout')
			workspace.directory('checkout/.git')
			expect(isVacant(target)).toBe(true)
			workspace.write('checkout/README.md', '# Sample\n')
			expect(isVacant(target)).toBe(false)
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a target holding one unrelated dotted entry', () => {
		const workspace = createWorkspace()
		try {
			const target = workspace.directory('checkout')
			workspace.directory('checkout/.github')
			expect(isVacant(target)).toBe(false)
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a metadata name that is a file rather than a directory', () => {
		const workspace = createWorkspace()
		try {
			const target = workspace.directory('checkout')
			workspace.write('checkout/.git', 'gitdir: elsewhere\n')
			expect(isVacant(target)).toBe(false)
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a file, a redirected directory, and text that is not a host path', () => {
		const workspace = createWorkspace()
		try {
			expect(isVacant(workspace.write('AGENTS.md', 'hi\n'))).toBe(false)
			expect(isVacant(workspace.link('mirror', workspace.directory('empty')))).toBe(false)
			expect(isVacant('')).toBe(false)
			expect(isVacant('project/nul')).toBe(false)
		} finally {
			workspace.destroy()
		}
	})
})

describe('listFiles', () => {
	it('answers every descendant file as a sorted root-relative path', () => {
		const workspace = createWorkspace()
		try {
			workspace.write('b.md', 'b\n')
			workspace.write('a/deep/c.md', 'c\n')
			workspace.write('a/b.md', 'b\n')
			workspace.directory('empty')
			expect(listFiles(workspace.path)).toEqual(['a/b.md', 'a/deep/c.md', 'b.md'])
		} finally {
			workspace.destroy()
		}
	})

	it('answers an absent root with the empty list', () => {
		const workspace = createWorkspace()
		try {
			expect(listFiles(join(workspace.path, 'absent'))).toEqual([])
		} finally {
			workspace.destroy()
		}
	})

	it('answers an existing empty root with the empty list', () => {
		const workspace = createWorkspace()
		try {
			expect(listFiles(workspace.directory('empty'))).toEqual([])
		} finally {
			workspace.destroy()
		}
	})

	it('throws INVALID for a root that is not a host path', () => {
		expect(readErrorCode(() => listFiles('project/nul'))).toBe('INVALID')
	})

	it('throws TARGET for a root that is a file', () => {
		const workspace = createWorkspace()
		try {
			const file = workspace.write('AGENTS.md', 'hi\n')
			expect(readErrorCode(() => listFiles(file))).toBe('TARGET')
		} finally {
			workspace.destroy()
		}
	})

	it('throws rather than truncating past the depth one path may carry', () => {
		const workspace = createWorkspace()
		try {
			const shallow = Array.from({ length: MAX_PATH_DEPTH - 2 }, () => 'a').join('/')
			workspace.write(`${shallow}/leaf.md`, 'leaf\n')
			expect(listFiles(workspace.path)).toEqual([`${shallow}/leaf.md`])
			workspace.write(`${shallow}/a/a/a/leaf.md`, 'leaf\n')
			expect(readErrorCode(() => listFiles(workspace.path))).toBe('TARGET')
		} finally {
			workspace.destroy()
		}
	})

	it('lists a redirected directory as one entry rather than walking through it', () => {
		const workspace = createWorkspace()
		try {
			const real = workspace.directory('real')
			workspace.write('real/router.md', '# Router\n')
			workspace.link('mirror', real)
			expect(listFiles(workspace.path)).toEqual(['mirror', 'real/router.md'])
		} finally {
			workspace.destroy()
		}
	})
})

describe('listDirectories', () => {
	it('answers every descendant directory as a sorted root-relative path', () => {
		const workspace = createWorkspace()
		try {
			workspace.write('b/leaf.md', 'leaf\n')
			workspace.directory('a/deep/deeper')
			workspace.write('root.md', 'root\n')
			expect(listDirectories(workspace.path)).toEqual(['a', 'a/deep', 'a/deep/deeper', 'b'])
		} finally {
			workspace.destroy()
		}
	})

	it('reports the directory holding no file that a file walk cannot see', () => {
		const workspace = createWorkspace()
		try {
			workspace.write('filled/leaf.md', 'leaf\n')
			workspace.directory('empty')
			// The bijection: a file inventory reports only the filled branch, so the
			// empty one exists in the tree and nowhere in `listFiles`.
			expect(listFiles(workspace.path)).toEqual(['filled/leaf.md'])
			expect(listDirectories(workspace.path)).toEqual(['empty', 'filled'])
		} finally {
			workspace.destroy()
		}
	})

	it('answers an absent root and an existing empty root with the empty list', () => {
		const workspace = createWorkspace()
		try {
			expect(listDirectories(join(workspace.path, 'absent'))).toEqual([])
			expect(listDirectories(workspace.directory('empty'))).toEqual([])
		} finally {
			workspace.destroy()
		}
	})

	it('throws INVALID for a root that is not a host path', () => {
		expect(readErrorCode(() => listDirectories('project/nul'))).toBe('INVALID')
	})

	it('throws TARGET for a root that is a file', () => {
		const workspace = createWorkspace()
		try {
			const file = workspace.write('AGENTS.md', 'hi\n')
			expect(readErrorCode(() => listDirectories(file))).toBe('TARGET')
		} finally {
			workspace.destroy()
		}
	})

	it('throws rather than truncating past the depth one path may carry', () => {
		const workspace = createWorkspace()
		try {
			const shallow = Array.from({ length: MAX_PATH_DEPTH - 2 }, () => 'a').join('/')
			workspace.directory(shallow)
			expect(listDirectories(workspace.path).length).toBe(MAX_PATH_DEPTH - 2)
			workspace.directory(`${shallow}/a/a/a`)
			expect(readErrorCode(() => listDirectories(workspace.path))).toBe('TARGET')
		} finally {
			workspace.destroy()
		}
	})

	it('neither lists nor walks a redirected directory', () => {
		const workspace = createWorkspace()
		try {
			const real = workspace.directory('real')
			workspace.directory('real/nested')
			workspace.link('mirror', real)
			// The control: the same directories read perfectly well through the path
			// they really sit at, so the omission is the link rather than an unread
			// tree.
			expect(listDirectories(workspace.path)).toEqual(['real', 'real/nested'])
		} finally {
			workspace.destroy()
		}
	})
})

describe('readFileHex and readFileText', () => {
	it('reads exact bytes and the text they decode to', () => {
		const workspace = createWorkspace()
		try {
			workspace.write('AGENTS.md', 'hi\n')
			expect(readFileHex(workspace.path, 'AGENTS.md')).toBe('68690a')
			expect(readFileText(workspace.path, 'AGENTS.md')).toBe('hi\n')
		} finally {
			workspace.destroy()
		}
	})

	it('reads multi-byte content as its exact UTF-8 bytes', () => {
		const workspace = createWorkspace()
		try {
			workspace.write('AGENTS.md', '€\n')
			expect(readFileHex(workspace.path, 'AGENTS.md')).toBe('e282ac0a')
			expect(readFileText(workspace.path, 'AGENTS.md')).toBe('€\n')
		} finally {
			workspace.destroy()
		}
	})

	it('reads an empty file as empty bytes rather than as absence', () => {
		const workspace = createWorkspace()
		try {
			workspace.write('empty.md', '')
			expect(readFileHex(workspace.path, 'empty.md')).toBe('')
			expect(readFileText(workspace.path, 'empty.md')).toBe('')
		} finally {
			workspace.destroy()
		}
	})

	it('answers undefined for an absent path, a directory, and a linked file', () => {
		const workspace = createWorkspace()
		try {
			workspace.directory('guides')
			const file = workspace.write('AGENTS.md', 'hi\n')
			linkSync(file, join(workspace.path, 'CLAUDE.md'))
			expect(readFileHex(workspace.path, 'absent.md')).toBeUndefined()
			expect(readFileHex(workspace.path, 'guides')).toBeUndefined()
			expect(readFileHex(workspace.path, 'AGENTS.md')).toBeUndefined()
			expect(readFileText(workspace.path, 'absent.md')).toBeUndefined()
		} finally {
			workspace.destroy()
		}
	})

	it('reads at the limit it was given and answers undefined one byte past it', () => {
		const workspace = createWorkspace()
		try {
			workspace.write('AGENTS.md', 'hi\n')
			expect(readFileHex(workspace.path, 'AGENTS.md', 3)).toBe('68690a')
			expect(readFileHex(workspace.path, 'AGENTS.md', 2)).toBeUndefined()
		} finally {
			workspace.destroy()
		}
	})

	it('reads bytes that are not valid UTF-8 and refuses to decode them', () => {
		const workspace = createWorkspace()
		try {
			const path = workspace.write('broken.md', '')
			writeFileSync(path, Buffer.from([0xff, 0xfe, 0x00]))
			expect(readFileHex(workspace.path, 'broken.md')).toBe('fffe00')
			expect(readFileText(workspace.path, 'broken.md')).toBeUndefined()
		} finally {
			workspace.destroy()
		}
	})

	it('throws INVALID for a path that leaves its root or a limit outside the ceiling', () => {
		const workspace = createWorkspace()
		try {
			expect(readErrorCode(() => readFileHex(workspace.path, '../secrets'))).toBe('INVALID')
			expect(
				readErrorCode(() => readFileHex(workspace.path, 'AGENTS.md', MAX_ARTIFACT_BYTES + 1)),
			).toBe('INVALID')
			expect(readErrorCode(() => readFileHex(workspace.path, 'AGENTS.md', -1))).toBe('INVALID')
			expect(readErrorCode(() => readFileHex(workspace.path, 'AGENTS.md', 1.5))).toBe('INVALID')
			expect(readErrorCode(() => readFileText(workspace.path, '../secrets'))).toBe('INVALID')
		} finally {
			workspace.destroy()
		}
	})
})

describe('readSnapshot', () => {
	it('maps a file to its bytes, a directory to presence, and omits what is absent', () => {
		const workspace = createWorkspace()
		try {
			workspace.write('AGENTS.md', 'hi\n')
			workspace.directory('guides')
			expect(readSnapshot(workspace.path, ['AGENTS.md', 'guides', 'absent.md'])).toEqual({
				'AGENTS.md': '68690a',
				guides: '',
			})
		} finally {
			workspace.destroy()
		}
	})

	it('answers the empty snapshot for no paths and for an absent target', () => {
		const workspace = createWorkspace()
		try {
			expect(readSnapshot(workspace.path, [])).toEqual({})
			expect(readSnapshot(join(workspace.path, 'absent'), ['AGENTS.md'])).toEqual({})
		} finally {
			workspace.destroy()
		}
	})

	it('tells an empty file apart from an absent one', () => {
		const workspace = createWorkspace()
		try {
			workspace.write('empty.md', '')
			const snapshot = readSnapshot(workspace.path, ['empty.md', 'absent.md'])
			expect(Object.keys(snapshot)).toEqual(['empty.md'])
			expect(snapshot['empty.md']).toBe('')
		} finally {
			workspace.destroy()
		}
	})

	it('throws TARGET rather than omitting a path it cannot read', () => {
		const workspace = createWorkspace()
		try {
			const file = workspace.write('AGENTS.md', 'hi\n')
			linkSync(file, join(workspace.path, 'CLAUDE.md'))
			expect(readErrorCode(() => readSnapshot(workspace.path, ['AGENTS.md']))).toBe('TARGET')
		} finally {
			workspace.destroy()
		}
	})

	it('throws INVALID for an off-contract target or path list', () => {
		const workspace = createWorkspace()
		try {
			expect(readErrorCode(() => readSnapshot('', ['AGENTS.md']))).toBe('INVALID')
			expect(readErrorCode(() => readSnapshot(workspace.path, ['../secrets']))).toBe('INVALID')
			expect(readErrorCode(() => readSnapshot(workspace.path, ['guides/']))).toBe('INVALID')
			expect(
				readErrorCode(() =>
					readSnapshot(
						workspace.path,
						Array.from({ length: MAX_COLLECTION_ITEMS + 1 }, () => 'AGENTS.md'),
					),
				),
			).toBe('INVALID')
		} finally {
			workspace.destroy()
		}
	})

	it('leaves the path list it was handed exactly as it found it', () => {
		const workspace = createWorkspace()
		try {
			workspace.write('AGENTS.md', 'hi\n')
			const paths = ['AGENTS.md', 'absent.md']
			readSnapshot(workspace.path, paths)
			expect(paths).toEqual(['AGENTS.md', 'absent.md'])
		} finally {
			workspace.destroy()
		}
	})
})

describe('readHostManifest', () => {
	it('reads a staged host that agrees with itself', () => {
		const workspace = createWorkspace()
		try {
			const manifest = buildStagedManifest()
			const host = createHostRoot(workspace, 'host', manifest)
			expect(readHostManifest(host)).toEqual(manifest)
		} finally {
			workspace.destroy()
		}
	})

	it('reads an empty membership as a valid manifest', () => {
		const workspace = createWorkspace()
		try {
			const manifest = buildStagedManifest({ entries: [], roots: [] })
			const host = createHostRoot(workspace, 'host', manifest)
			expect(readHostManifest(host)).toEqual(manifest)
		} finally {
			workspace.destroy()
		}
	})

	it('answers undefined for a raw root carrying no manifest', () => {
		const workspace = createWorkspace()
		try {
			workspace.write('raw/AGENTS.md', 'hi\n')
			expect(readHostManifest(join(workspace.path, 'raw'))).toBeUndefined()
			expect(readHostManifest(join(workspace.path, 'absent'))).toBeUndefined()
		} finally {
			workspace.destroy()
		}
	})

	it('throws rather than degrading to a raw root when membership was edited', () => {
		const workspace = createWorkspace()
		try {
			const manifest = buildStagedManifest()
			const host = createHostRoot(workspace, 'host', manifest)
			expect(readHostManifest(host)).toEqual(manifest)
			workspace.write(
				'host/manifest.json',
				JSON.stringify({ ...manifest, entries: [...manifest.entries, buildManifestEntry()] }),
			)
			expect(readErrorCode(() => readHostManifest(host))).toBe('TARGET')
		} finally {
			workspace.destroy()
		}
	})

	it('throws when the digest was replaced with one matching nothing', () => {
		const workspace = createWorkspace()
		try {
			const manifest = buildStagedManifest()
			const host = createHostRoot(workspace, 'host', manifest)
			workspace.write(
				'host/manifest.json',
				JSON.stringify({ ...manifest, digest: computeDigest('') }),
			)
			expect(readErrorCode(() => readHostManifest(host))).toBe('TARGET')
		} finally {
			workspace.destroy()
		}
	})

	it('throws for text that is not JSON and for JSON that is not the declared shape', () => {
		const workspace = createWorkspace()
		try {
			const host = createHostRoot(workspace, 'host', buildStagedManifest())
			workspace.write('host/manifest.json', '{')
			expect(readErrorCode(() => readHostManifest(host))).toBe('TARGET')
			workspace.write('host/manifest.json', '{"entries":[],"roots":[]}')
			expect(readErrorCode(() => readHostManifest(host))).toBe('TARGET')
			workspace.write('host/manifest.json', '[]')
			expect(readErrorCode(() => readHostManifest(host))).toBe('TARGET')
		} finally {
			workspace.destroy()
		}
	})

	it('throws TARGET rather than degrading when the manifest is not valid UTF-8', () => {
		const workspace = createWorkspace()
		try {
			const host = createHostRoot(workspace, 'host', buildStagedManifest())
			writeFileSync(join(host, 'manifest.json'), Buffer.from([0xff, 0xfe, 0x00]))
			expect(readErrorCode(() => readHostManifest(host))).toBe('TARGET')
		} finally {
			workspace.destroy()
		}
	})

	it('throws INVALID for a root that is not a host path', () => {
		expect(readErrorCode(() => readHostManifest('project/nul'))).toBe('INVALID')
	})
})

describe('readManifestEntry', () => {
	it('maps a destination to its storage name and the mode the host reports', () => {
		const workspace = createWorkspace()
		try {
			const source = workspace.write('.gitignore', 'dist\n')
			expect(readManifestEntry('.gitignore', source)).toEqual({
				storage: 'dotfiles/gitignore',
				destination: '.gitignore',
				executable: false,
			})
		} finally {
			workspace.destroy()
		}
	})

	it('reads the executable bit from the file rather than from its name', () => {
		const workspace = createWorkspace()
		try {
			const plain = workspace.write('scripts/plain.sh', '#!/bin/sh\n')
			// The control: a script that was never marked executable must answer
			// false, so an implementation reading the extension instead of the mode
			// fails here.
			expect(readManifestEntry('scripts/plain.sh', plain)?.executable).toBe(false)
			const marked = workspace.write('scripts/codex.sh', '#!/bin/sh\n')
			chmodSync(marked, 0o755)
			// Windows reports no executable bit at all, so the claim is that the
			// helper answers whatever this host actually records.
			expect(readManifestEntry('scripts/codex.sh', marked)?.executable).toBe(
				(lstatSync(marked).mode & 0o111) !== 0,
			)
		} finally {
			workspace.destroy()
		}
	})

	it('answers undefined for an absent path, a directory, and a shared-byte file', () => {
		const workspace = createWorkspace()
		try {
			expect(readManifestEntry('absent.md', join(workspace.path, 'absent.md'))).toBeUndefined()
			expect(readManifestEntry('guides', workspace.directory('guides'))).toBeUndefined()
			const source = workspace.write('AGENTS.md', 'hi\n')
			linkSync(source, join(workspace.path, 'CLAUDE.md'))
			expect(readManifestEntry('AGENTS.md', source)).toBeUndefined()
		} finally {
			workspace.destroy()
		}
	})

	it('answers undefined one byte past the artifact ceiling and reads the ceiling itself', () => {
		const workspace = createWorkspace()
		try {
			const source = workspace.write('big.md', '')
			writeFileSync(source, Buffer.alloc(MAX_ARTIFACT_BYTES))
			expect(readManifestEntry('big.md', source)?.storage).toBe('big.md')
			writeFileSync(source, Buffer.alloc(MAX_ARTIFACT_BYTES + 1))
			expect(readManifestEntry('big.md', source)).toBeUndefined()
		} finally {
			workspace.destroy()
		}
	})
})

describe('stageHost', () => {
	it('stages every vendored path and writes the membership it staged', () => {
		const workspace = createWorkspace()
		try {
			const checkout = createCheckout(workspace, 'checkout')
			const host = join(workspace.path, 'host')
			const expected = buildCheckoutManifest()
			expect(stageHost(checkout, host)).toEqual(expected.entries)
			expect(readHostManifest(host)).toEqual(expected)
		} finally {
			workspace.destroy()
		}
	})

	it('stores exactly the files its manifest declares, and nothing else', () => {
		const workspace = createWorkspace()
		try {
			const checkout = createCheckout(workspace, 'checkout')
			const host = join(workspace.path, 'host')
			const entries = stageHost(checkout, host)
			expect(listFiles(host)).toEqual(
				[...entries.map((entry) => entry.storage), 'manifest.json'].sort(),
			)
			expect(readFileText(host, 'dotfiles/editorconfig')).toBe('.editorconfig\n')
			expect(readFileText(host, 'claude/rules/sample.md')).toBe('.claude/rules/sample.md\n')
		} finally {
			workspace.destroy()
		}
	})

	it('declares the directory holding no file, which no entry can record', () => {
		const workspace = createWorkspace()
		try {
			const checkout = createCheckout(workspace, 'checkout')
			const host = join(workspace.path, 'host')
			const entries = stageHost(checkout, host)
			const manifest = readHostManifest(host)
			expect(manifest?.roots).toContain('.claude/skills')
			expect(entries.some((entry) => entry.destination.startsWith('.claude/skills/'))).toBe(false)
			// The control: a vendored directory that does carry a file is declared as
			// a root and carries an entry, so the empty one is told apart by its
			// entries rather than by its absence from the roots.
			expect(manifest?.roots).toContain('.claude/rules')
			expect(entries.some((entry) => entry.destination.startsWith('.claude/rules/'))).toBe(true)
		} finally {
			workspace.destroy()
		}
	})

	it('declares every directory nested beneath a vendored directory as a root', () => {
		const workspace = createWorkspace()
		try {
			const checkout = createCheckout(workspace, 'checkout')
			workspace.directory('checkout/.claude/skills/orkestrel-falsify/references')
			const host = join(workspace.path, 'host')
			stageHost(checkout, host)
			expect(readHostManifest(host)?.roots).toEqual(
				expect.arrayContaining([
					'.claude/skills',
					'.claude/skills/orkestrel-falsify',
					'.claude/skills/orkestrel-falsify/references',
				]),
			)
		} finally {
			workspace.destroy()
		}
	})

	it('sorts entries by storage name and roots as paths', () => {
		const workspace = createWorkspace()
		try {
			const checkout = createCheckout(workspace, 'checkout')
			const host = join(workspace.path, 'host')
			const entries = stageHost(checkout, host)
			const storage = entries.map((entry) => entry.storage)
			expect(storage).toEqual([...storage].sort())
			const roots = readHostManifest(host)?.roots ?? []
			expect(roots).toEqual([...roots].sort())
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a checkout missing a vendored path, names every one, and creates nothing', () => {
		const workspace = createWorkspace()
		try {
			const checkout = createCheckout(workspace, 'checkout')
			const host = join(workspace.path, 'host')
			workspace.remove('checkout/LICENSE')
			workspace.remove('checkout/.cursor/rules')
			expect(readErrorCode(() => stageHost(checkout, host))).toBe('TARGET')
			expect(isPhysicalDirectory(host)).toBe(false)
			// The control: the same checkout stages cleanly once both paths are back,
			// so the refusal is the missing membership rather than the fixture.
			workspace.write('checkout/LICENSE', 'LICENSE\n')
			workspace.write('checkout/.cursor/rules/sample.md', '.cursor/rules/sample.md\n')
			expect(stageHost(checkout, host).length).toBeGreaterThan(0)
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a host root that is not vacant and leaves what it holds', () => {
		const workspace = createWorkspace()
		try {
			const checkout = createCheckout(workspace, 'checkout')
			const host = workspace.directory('host')
			workspace.write('host/existing.md', 'existing\n')
			expect(readErrorCode(() => stageHost(checkout, host))).toBe('TARGET')
			expect(listFiles(host)).toEqual(['existing.md'])
		} finally {
			workspace.destroy()
		}
	})

	it('refuses an argument that is not a host path and a checkout that is not a directory', () => {
		const workspace = createWorkspace()
		try {
			const checkout = createCheckout(workspace, 'checkout')
			const host = join(workspace.path, 'host')
			expect(readErrorCode(() => stageHost('project/nul', host))).toBe('INVALID')
			expect(readErrorCode(() => stageHost(checkout, 'project/nul'))).toBe('INVALID')
			expect(readErrorCode(() => stageHost(join(workspace.path, 'absent'), host))).toBe('TARGET')
			expect(readErrorCode(() => stageHost(workspace.write('file.md', 'hi\n'), host))).toBe(
				'TARGET',
			)
		} finally {
			workspace.destroy()
		}
	})

	it('skips a credential found beneath a vendored directory and stages its sibling', () => {
		const workspace = createWorkspace()
		try {
			const checkout = createCheckout(workspace, 'checkout')
			workspace.write('checkout/.claude/rules/.npmrc', '//registry:_authToken=secret\n')
			workspace.write('checkout/.claude/rules/names.md', '.claude/rules/names.md\n')
			workspace.write('checkout/.claude/rules/.aws/credentials', 'key\n')
			const host = join(workspace.path, 'host')
			const entries = stageHost(checkout, host)
			const destinations = entries.map((entry) => entry.destination)
			expect(destinations).not.toContain('.claude/rules/.npmrc')
			expect(destinations).not.toContain('.claude/rules/.aws/credentials')
			expect(readHostManifest(host)?.roots).not.toContain('.claude/rules/.aws')
			// The control: the sibling written in the same directory in the same test
			// is staged, so the omission is the deny-list rather than a directory the
			// walk never reached.
			expect(destinations).toContain('.claude/rules/names.md')
		} finally {
			workspace.destroy()
		}
	})

	it('refuses two vendored files that claim one storage name', () => {
		const workspace = createWorkspace()
		try {
			const checkout = createCheckout(workspace, 'checkout')
			workspace.write('checkout/.claude/rules/names.md', 'plain\n')
			workspace.write('checkout/.claude/rules/.names.md', 'dotted\n')
			expect(pathToStorage('.claude/rules/names.md')).toBe(pathToStorage('.claude/rules/.names.md'))
			expect(readErrorCode(() => stageHost(checkout, join(workspace.path, 'host')))).toBe('TARGET')
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a vendored path that is not a plain file and one that leaves the checkout', () => {
		const outside = createWorkspace()
		const workspace = createWorkspace()
		try {
			const checkout = createCheckout(workspace, 'checkout')
			const shared = workspace.write('checkout/.claude/rules/shared.md', 'shared\n')
			linkSync(shared, join(workspace.path, 'checkout', '.claude', 'rules', 'twin.md'))
			expect(readErrorCode(() => stageHost(checkout, join(workspace.path, 'host')))).toBe('TARGET')
			workspace.remove('checkout/.claude/rules/shared.md')
			workspace.remove('checkout/.claude/rules/twin.md')
			workspace.link('checkout/.claude/rules/escape', outside.path)
			expect(readErrorCode(() => stageHost(checkout, join(workspace.path, 'host2')))).toBe(
				'INVALID',
			)
		} finally {
			workspace.destroy()
			outside.destroy()
		}
	})

	it('produces a host a materializer accepts and writes every vendored shape from', () => {
		const workspace = createWorkspace()
		try {
			const checkout = createCheckout(workspace, 'checkout')
			const host = join(workspace.path, 'host')
			stageHost(checkout, host)
			const target = join(workspace.path, 'target')
			const materializer = new Materializer({ host })
			try {
				const result = materializer.materialize(
					buildPlan({
						groups: ['docs', 'orchestration', 'configs'],
						artifacts: [
							buildHostArtifact({ path: 'AGENTS.md', group: 'docs' }),
							buildHostArtifact({ path: '.claude/rules', group: 'orchestration' }),
							buildHostArtifact({ path: '.claude/skills', group: 'orchestration' }),
							buildHostArtifact({ path: '.editorconfig', group: 'configs' }),
						],
					}),
					target,
				)
				expect(result.written).toContain('AGENTS.md')
				expect(readFileText(target, 'AGENTS.md')).toBe('AGENTS.md\n')
				expect(readFileText(target, '.claude/rules/sample.md')).toBe('.claude/rules/sample.md\n')
				expect(readFileText(target, '.editorconfig')).toBe('.editorconfig\n')
				expect(isPhysicalDirectory(join(target, '.claude', 'skills'))).toBe(true)
				expect(listFiles(join(target, '.claude', 'skills'))).toEqual([])
			} finally {
				materializer.destroy()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('writes a manifest whose membership a reader refuses once it is edited', () => {
		const workspace = createWorkspace()
		try {
			const checkout = createCheckout(workspace, 'checkout')
			const host = join(workspace.path, 'host')
			const entries = stageHost(checkout, host)
			const manifest = readHostManifest(host)
			expect(manifest).toBeDefined()
			// The control on the verification itself: the reader that accepted the
			// staged manifest above refuses the same manifest with one entry added,
			// so acceptance is a check rather than a shape the reader cannot fail.
			workspace.write(
				'host/manifest.json',
				JSON.stringify({ ...manifest, entries: [...entries, buildManifestEntry()] }),
			)
			expect(readErrorCode(() => readHostManifest(host))).toBe('TARGET')
		} finally {
			workspace.destroy()
		}
	})
})

describe('write anchors', () => {
	it('captures a directory identity and matches it while it is untouched', () => {
		const workspace = createWorkspace()
		try {
			const target = workspace.directory('project')
			const anchor = readAnchor(target)
			expect(anchor?.path).toBe(target)
			expect(anchor !== undefined && matchesAnchor(anchor)).toBe(true)
		} finally {
			workspace.destroy()
		}
	})

	it('refuses to capture a file, an absent path, and a redirected directory', () => {
		const workspace = createWorkspace()
		try {
			expect(readAnchor(workspace.write('AGENTS.md', 'hi\n'))).toBeUndefined()
			expect(readAnchor(join(workspace.path, 'absent'))).toBeUndefined()
			expect(readAnchor(workspace.link('mirror', workspace.directory('real')))).toBeUndefined()
		} finally {
			workspace.destroy()
		}
	})

	it('reports a directory replaced by another of the same name', () => {
		const workspace = createWorkspace()
		try {
			const target = workspace.directory('project')
			const anchor = readAnchor(target)
			expect(anchor).toBeDefined()
			if (anchor === undefined) return
			renameSync(target, join(workspace.path, 'original'))
			mkdirSync(target)
			expect(matchesAnchor(anchor)).toBe(false)
		} finally {
			workspace.destroy()
		}
	})

	it('reports a directory that is gone', () => {
		const workspace = createWorkspace()
		try {
			const target = workspace.directory('project')
			const anchor = readAnchor(target)
			expect(anchor).toBeDefined()
			if (anchor === undefined) return
			rmSync(target, { recursive: true })
			expect(matchesAnchor(anchor)).toBe(false)
		} finally {
			workspace.destroy()
		}
	})
})

describe('write expectations', () => {
	it('captures absence as a state rather than as a failure', () => {
		const workspace = createWorkspace()
		try {
			const path = join(workspace.path, 'absent.md')
			expect(readExpectation(path)).toEqual({ path, shape: 'absent' })
			expect(matchesExpectation({ path, shape: 'absent' })).toBe(true)
		} finally {
			workspace.destroy()
		}
	})

	it('captures a file with its identity, size, and bytes', () => {
		const workspace = createWorkspace()
		try {
			const path = workspace.write('AGENTS.md', 'hi\n')
			const expectation = readExpectation(path)
			expect(expectation?.shape).toBe('file')
			expect(expectation?.size).toBe(3)
			expect(expectation?.digest).toBe(computeDigest('hi\n'))
			expect(expectation !== undefined && matchesExpectation(expectation)).toBe(true)
		} finally {
			workspace.destroy()
		}
	})

	it('captures a directory without claiming bytes it never read', () => {
		const workspace = createWorkspace()
		try {
			const path = workspace.directory('guides')
			const expectation = readExpectation(path)
			expect(expectation?.shape).toBe('directory')
			expect(expectation?.digest).toBeUndefined()
			expect(expectation?.size).toBeUndefined()
			expect(expectation !== undefined && matchesExpectation(expectation)).toBe(true)
		} finally {
			workspace.destroy()
		}
	})

	it('reports a file whose bytes moved and one that vanished', () => {
		const workspace = createWorkspace()
		try {
			const path = workspace.write('AGENTS.md', 'hi\n')
			const expectation = readExpectation(path)
			expect(expectation).toBeDefined()
			if (expectation === undefined) return
			workspace.write('AGENTS.md', 'bye\n')
			expect(matchesExpectation(expectation)).toBe(false)
			rmSync(path)
			expect(matchesExpectation(expectation)).toBe(false)
		} finally {
			workspace.destroy()
		}
	})

	it('reports an absence that has since been filled', () => {
		const workspace = createWorkspace()
		try {
			const path = join(workspace.path, 'new.md')
			expect(matchesExpectation({ path, shape: 'absent' })).toBe(true)
			workspace.write('new.md', 'hi\n')
			expect(matchesExpectation({ path, shape: 'absent' })).toBe(false)
		} finally {
			workspace.destroy()
		}
	})

	it('refuses to capture a shape it will not write over', () => {
		const workspace = createWorkspace()
		try {
			const file = workspace.write('AGENTS.md', 'hi\n')
			linkSync(file, join(workspace.path, 'CLAUDE.md'))
			expect(readExpectation(file)).toBeUndefined()
			expect(readExpectation(workspace.link('mirror', workspace.directory('real')))).toBeUndefined()
		} finally {
			workspace.destroy()
		}
	})
})

describe('write preconditions', () => {
	it('binds an absent destination to its absence', () => {
		const workspace = createWorkspace()
		try {
			const path = join(workspace.path, 'new.md')
			expect(matchesPrecondition({ path, shape: 'absent' })).toBe(true)
			workspace.write('new.md', 'hi\n')
			expect(matchesPrecondition({ path, shape: 'absent' })).toBe(false)
		} finally {
			workspace.destroy()
		}
	})

	it('binds a file to its bytes, and to presence alone when no digest is stated', () => {
		const workspace = createWorkspace()
		try {
			const path = workspace.write('AGENTS.md', 'hi\n')
			const digest = computeDigest('hi\n')
			expect(matchesPrecondition({ path, shape: 'file', digest })).toBe(true)
			workspace.write('AGENTS.md', 'bye\n')
			expect(matchesPrecondition({ path, shape: 'file', digest })).toBe(false)
			expect(matchesPrecondition({ path, shape: 'file' })).toBe(true)
		} finally {
			workspace.destroy()
		}
	})

	it('accepts a file rewritten to identical bytes, which an expectation refuses', () => {
		const workspace = createWorkspace()
		try {
			const path = workspace.write('AGENTS.md', 'hi\n')
			const expectation = readExpectation(path)
			expect(expectation).toBeDefined()
			if (expectation === undefined) return
			rmSync(path)
			workspace.write('AGENTS.md', 'hi\n')
			expect(matchesPrecondition({ path, shape: 'file', digest: computeDigest('hi\n') })).toBe(true)
			expect(matchesExpectation(expectation)).toBe(false)
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a destination whose shape is not the one stated', () => {
		const workspace = createWorkspace()
		try {
			const directory = workspace.directory('guides')
			expect(matchesPrecondition({ path: directory, shape: 'file' })).toBe(false)
			expect(matchesPrecondition({ path: directory, shape: 'absent' })).toBe(false)
		} finally {
			workspace.destroy()
		}
	})
})

describe('this repository read as a real target', () => {
	it('reads its own checkout through the same helpers a target goes through', () => {
		const snapshot = readSnapshot(WORKSPACE_ROOT, ['package.json', 'AGENTS.md', 'absent.md'])
		expect(Object.keys(snapshot).sort()).toEqual(['AGENTS.md', 'package.json'])
		expect(readFileText(WORKSPACE_ROOT, 'package.json')?.startsWith('{')).toBe(true)
		expect(isVacant(WORKSPACE_ROOT)).toBe(false)
		expect(readHostManifest(WORKSPACE_ROOT)).toBeUndefined()
		expect(listFiles(join(WORKSPACE_ROOT, 'configs', 'src')).length).toBeGreaterThan(0)
	})
})
