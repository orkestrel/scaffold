import type { HostFile } from '@src/core'
import {
	chmodSync,
	existsSync,
	globSync,
	linkSync,
	lstatSync,
	readFileSync,
	renameSync,
	rmSync,
	writeFileSync,
} from 'node:fs'
import { once } from 'node:events'
import { join } from 'node:path'
import { Worker } from 'node:worker_threads'
import {
	contentToHex,
	EXECUTABLE_PATHS,
	HOST_PATHS,
	isDeferredPath,
	MAX_ARTIFACT_BYTES,
	MAX_COLLECTION_ITEMS,
} from '@src/core'
import {
	computeDigest,
	computeFileDigest,
	computeManifestDigest,
	filesToHost,
	hexToDigest,
	isHost,
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
	matchesExecutablePath,
	matchesProtectedPath,
	matchesSensitivePath,
	MAX_PATH_DEPTH,
	pathToStorage,
	readAnchor,
	readExpectation,
	readFileHex,
	readFileText,
	readHostFloor,
	readHostManifest,
	readManifestEntry,
	readSnapshot,
	resolveContainedPath,
	resolveRealPath,
	stageBytes,
	stageHost,
	stageInventory,
} from '@src/server'
import { describe, expect, it } from 'vitest'
import { buildHostArtifact, buildHostileCases, buildPlan } from '../../setup.js'
import {
	buildCheckoutManifest,
	buildVendoredPlan,
	buildManifestEntry,
	buildStagedManifest,
	buildVendoredManifest,
	CASE_FOLDING,
	createCheckout,
	createHostRoot,
	DIGEST_CASES,
	GIT_PATH_CASES,
	listExecutablePaths,
	PROTECTED_PATH_CASES,
	readErrorCode,
	SCRATCH_PREFIX,
	SENSITIVE_PATH_CASES,
	STORAGE_PATH_CASES,
	WORKSPACE_ROOT,
} from '../../setupServer.js'
import { createScratch } from '@orkestrel/test/server'

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

describe('matchesExecutablePath', () => {
	it('answers true for a declared path under either separator', () => {
		for (const path of EXECUTABLE_PATHS) {
			expect(matchesExecutablePath(path)).toBe(true)
			expect(matchesExecutablePath(path.replaceAll('/', '\\'))).toBe(true)
		}
	})

	it('answers false for every path the declaration does not name', () => {
		// Drawn from outside the declared set, including the shapes a predicate that
		// guessed from the directory or the extension would admit.
		for (const path of ['AGENTS.md', 'scripts', 'scripts/plain.sh', 'scripts/codex.sh.bak', '']) {
			expect(matchesExecutablePath(path)).toBe(false)
		}
	})

	it('declares exactly the vendored paths this repository records as executable', () => {
		// The drift guard. A new hook vendored without a declaration ships at 0644
		// into every target and dies when the target invokes it, which is the defect
		// this declaration exists to stop. Read from git's index, so the assertion
		// holds on a host that carries no executable bit as well as on one that does.
		const tracked = listExecutablePaths().filter((path) =>
			HOST_PATHS.some((vendored) => path === vendored || path.startsWith(`${vendored}/`)),
		)
		expect(tracked).toEqual([...EXECUTABLE_PATHS].sort())
		expect(tracked.length).toBeGreaterThan(0)
	})
})

describe('vendored imports', () => {
	it('keeps every vendored JavaScript and TypeScript module independent of Orkestrel packages', () => {
		const orkestrelImportPattern =
			/\b(?:from\s*|(?:import|require)\s*\(\s*)(['"`])@orkestrel\/[^'"`]+\1/u
		const paths = HOST_PATHS.flatMap((path) => {
			const source = join(WORKSPACE_ROOT, path)
			if (!existsSync(source)) return []
			if (lstatSync(source).isDirectory()) {
				// No vendored directory holds an eligible module; this branch covers future modules.
				return globSync('**/*.{ts,mts,cts,js,mjs,cjs}', { cwd: source }).map((nested) =>
					join(path, nested),
				)
			}
			// Only JavaScript and TypeScript module extensions can carry resolvable imports.
			return /\.[cm]?[jt]s$/u.test(path) ? [path] : []
		}).sort()
		const imported: string[] = []
		expect(orkestrelImportPattern.test("import { value } from '@orkestrel/test/server'")).toBe(true)
		expect(orkestrelImportPattern.test('await import(`@orkestrel/test/server`)')).toBe(true)
		expect(paths.length).toBeGreaterThan(0)
		expect(paths).toContain('tests/config.test.ts')
		for (const path of paths) {
			const content = readFileSync(join(WORKSPACE_ROOT, path), 'utf8')
			if (orkestrelImportPattern.test(content)) imported.push(path)
		}
		expect(imported).toEqual([])
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

describe('hexToDigest', () => {
	it('digests the exact bytes represented by hexadecimal text', () => {
		expect(hexToDigest('')).toBe(computeDigest(''))
		expect(hexToDigest('68690a')).toBe(computeDigest('hi\n'))
	})

	it('refuses text that does not state exact lowercase hexadecimal bytes', () => {
		expect(readErrorCode(() => hexToDigest('0'))).toBe('INVALID')
		expect(readErrorCode(() => hexToDigest('FF'))).toBe('INVALID')
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
		expect(
			computeManifestDigest(
				[buildManifestEntry({ digest: computeDigest('changed') })],
				['.claude'],
			),
		).not.toBe(first)
	})

	it('reads order as part of the membership it authenticates', () => {
		const first = buildManifestEntry({ storage: 'a', destination: 'a' })
		const second = buildManifestEntry({ storage: 'b', destination: 'b' })
		expect(computeManifestDigest([first, second], [])).not.toBe(
			computeManifestDigest([second, first], []),
		)
		expect(computeManifestDigest([], ['a', 'b'])).not.toBe(computeManifestDigest([], ['b', 'a']))
	})

	it('reads exactly the declared fields and nothing a caller added', () => {
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
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const exact = workspace.write('src/bin/main.ts', 'export {}\n')
			const folded = join(workspace.path, 'src/bin/Main.ts')
			const absent = join(workspace.path, 'src/bin/absent.ts')
			expect(existsSync(exact)).toBe(true)
			expect(isExactCaseFile(exact)).toBe(true)
			expect(isExactCaseFile(folded)).toBe(false)
			expect(isExactCaseFile(absent)).toBe(false)
			// The limit, executable rather than stated in prose, and stated against the
			// host this run measured rather than the host the suite was written on.
			// Where the directory folds case the recased name resolves, so the refusal
			// above is a case verdict no existence check could produce. Where it does
			// not, that name is absent, the refusals are one condition, and
			// the assertions above would equally hold for a guard that only called
			// `existsSync` — the gap a case-folding host closes.
			expect(existsSync(folded)).toBe(CASE_FOLDING)
			expect(existsSync(absent)).toBe(false)
		} finally {
			workspace.destroy()
		}
	})

	it('accepts a plain file and a plain directory and refuses each other', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const file = workspace.write('AGENTS.md', 'hi\n')
			const directory = workspace.ensure('guides')
			expect(isPhysicalFile(file)).toBe(true)
			expect(isPhysicalDirectory(file)).toBe(false)
			expect(isPhysicalDirectory(directory)).toBe(true)
			expect(isPhysicalFile(directory)).toBe(false)
		} finally {
			workspace.destroy()
		}
	})

	it('refuses an absent path without throwing', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			expect(isPhysicalFile(join(workspace.path, 'absent.md'))).toBe(false)
			expect(isPhysicalDirectory(join(workspace.path, 'absent'))).toBe(false)
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a file that shares its bytes with a second name', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
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
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const real = workspace.ensure('guides')
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
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const file = workspace.write('AGENTS.md', 'hi\n')
			expect(computeFileDigest(file)).toBe(computeDigest('hi\n'))
		} finally {
			workspace.destroy()
		}
	})

	it('answers undefined for an absent path, a directory, and a linked file', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			expect(computeFileDigest(join(workspace.path, 'absent.md'))).toBeUndefined()
			expect(computeFileDigest(workspace.ensure('guides'))).toBeUndefined()
			const file = workspace.write('AGENTS.md', 'hi\n')
			linkSync(file, join(workspace.path, 'CLAUDE.md'))
			expect(computeFileDigest(file)).toBeUndefined()
		} finally {
			workspace.destroy()
		}
	})

	it('digests content larger than one read buffer', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
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
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const resolved = resolveRealPath(workspace.path)
			expect(resolved).toBeDefined()
			expect(resolveRealPath(resolved ?? '')).toBe(resolved)
		} finally {
			workspace.destroy()
		}
	})

	it('keeps the segments that do not exist yet', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			expect(resolveRealPath(join(workspace.path, 'packages', 'new'))).toBe(
				join(resolveRealPath(workspace.path) ?? '', 'packages', 'new'),
			)
		} finally {
			workspace.destroy()
		}
	})

	it('follows a link in the existing prefix to where it really points', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const real = workspace.ensure('real')
			workspace.link('mirror', real)
			expect(resolveRealPath(join(workspace.path, 'mirror', 'new.md'))).toBe(
				join(resolveRealPath(real) ?? '', 'new.md'),
			)
		} finally {
			workspace.destroy()
		}
	})

	it('resolves the target of a dangling link and keeps its absent suffix', () => {
		const outside = createScratch({ prefix: SCRATCH_PREFIX })
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			workspace.link('mirror', join(outside.path, 'absent'))
			expect(resolveRealPath(join(workspace.path, 'mirror'))).toBe(
				join(resolveRealPath(outside.path) ?? '', 'absent'),
			)
			expect(resolveRealPath(join(workspace.path, 'mirror', 'new.md'))).toBe(
				join(resolveRealPath(outside.path) ?? '', 'absent', 'new.md'),
			)
			// The control is a plain absent name, outside the redirected population.
			// It proves the same suffix preservation without exercising a link.
			expect(resolveRealPath(join(workspace.path, 'absent', 'new.md'))).toBe(
				join(resolveRealPath(workspace.path) ?? '', 'absent', 'new.md'),
			)
		} finally {
			workspace.destroy()
			outside.destroy()
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
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			expect(resolveContainedPath(workspace.path, 'guides/router.md')).toBe(
				join(workspace.path, 'guides', 'router.md'),
			)
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a lexical escape and every off-contract argument', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
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
		const outside = createScratch({ prefix: SCRATCH_PREFIX })
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
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

	it('decides dangling links by their target containment', () => {
		const outside = createScratch({ prefix: SCRATCH_PREFIX })
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			workspace.link('escape', join(outside.path, 'absent'))
			expect(resolveContainedPath(workspace.path, 'escape/router.md')).toBeUndefined()
			expect(resolveContainedPath(workspace.path, 'escape')).toBeUndefined()
			workspace.link('future', join(workspace.path, 'inside/future.md'))
			expect(resolveContainedPath(workspace.path, 'future')).toBe(join(workspace.path, 'future'))
			// The control is a plain absent path, outside the link population.
			expect(resolveContainedPath(workspace.path, 'guides/router.md')).toBe(
				join(workspace.path, 'guides', 'router.md'),
			)
		} finally {
			workspace.destroy()
			outside.destroy()
		}
	})

	// A relative link target is the one vector this suite cannot build on Windows.
	// Node resolves a junction's target with `path.resolve(linkPath, '..', target)`
	// and that collapse is lexical: it eats `..` as a string without following the
	// link the segment sits behind. `hop/../secret` therefore names a sibling of the
	// link on Windows and the traversal never crosses `hop` at all, so the escape
	// this refusal answers cannot be expressed there. The containment law itself is
	// measured on every host by the test below it.
	it.skipIf(process.platform === 'win32')(
		'refuses a dangling link whose target crosses a link with parent traversal',
		() => {
			const outside = createScratch({ prefix: SCRATCH_PREFIX })
			const workspace = createScratch({ prefix: SCRATCH_PREFIX })
			try {
				workspace.link('hop', outside.ensure('deep'))
				workspace.link('link', 'hop/../secret')
				const admitted = resolveContainedPath(workspace.path, 'link')
				if (admitted !== undefined) writeFileSync(admitted, 'escaped\n')
				expect({
					admitted,
					inside: existsSync(join(workspace.path, 'secret')),
					outside: existsSync(join(outside.path, 'secret')),
					bytes: existsSync(join(outside.path, 'secret')) ? outside.read('secret') : undefined,
				}).toEqual({ admitted: undefined, inside: false, outside: false, bytes: undefined })
			} finally {
				workspace.destroy()
				outside.destroy()
			}
		},
	)

	it('refuses a dangling link that leaves the root and admits one that stays inside', () => {
		const outside = createScratch({ prefix: SCRATCH_PREFIX })
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			workspace.link('straight', join(outside.path, 'absent'))
			expect(resolveContainedPath(workspace.path, 'straight')).toBeUndefined()
			workspace.link('future', join(workspace.path, 'inside/future.md'))
			expect(resolveContainedPath(workspace.path, 'future')).toBe(join(workspace.path, 'future'))
		} finally {
			workspace.destroy()
			outside.destroy()
		}
	})

	it('admits a real link that stays inside the root', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const real = workspace.ensure('real')
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
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			expect(isVacant(join(workspace.path, 'absent'))).toBe(true)
			expect(isVacant(workspace.ensure('empty'))).toBe(true)
		} finally {
			workspace.destroy()
		}
	})

	it('accepts a target holding nothing but its own repository metadata', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const target = workspace.ensure('checkout')
			workspace.ensure('checkout/.git')
			expect(isVacant(target)).toBe(true)
			workspace.write('checkout/README.md', '# Sample\n')
			expect(isVacant(target)).toBe(false)
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a target holding one unrelated dotted entry', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const target = workspace.ensure('checkout')
			workspace.ensure('checkout/.github')
			expect(isVacant(target)).toBe(false)
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a metadata name that is a file rather than a directory', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const target = workspace.ensure('checkout')
			workspace.write('checkout/.git', 'gitdir: elsewhere\n')
			expect(isVacant(target)).toBe(false)
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a file, a redirected directory, and text that is not a host path', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			expect(isVacant(workspace.write('AGENTS.md', 'hi\n'))).toBe(false)
			expect(isVacant(workspace.link('mirror', workspace.ensure('empty')))).toBe(false)
			expect(isVacant('')).toBe(false)
			expect(isVacant('project/nul')).toBe(false)
		} finally {
			workspace.destroy()
		}
	})
})

describe('listFiles', () => {
	it('answers every descendant file as a sorted root-relative path', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			workspace.write('b.md', 'b\n')
			workspace.write('a/deep/c.md', 'c\n')
			workspace.write('a/b.md', 'b\n')
			workspace.ensure('empty')
			expect(listFiles(workspace.path)).toEqual(['a/b.md', 'a/deep/c.md', 'b.md'])
		} finally {
			workspace.destroy()
		}
	})

	it('answers an absent root with the empty list', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			expect(listFiles(join(workspace.path, 'absent'))).toEqual([])
		} finally {
			workspace.destroy()
		}
	})

	it('answers an existing empty root with the empty list', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			expect(listFiles(workspace.ensure('empty'))).toEqual([])
		} finally {
			workspace.destroy()
		}
	})

	it('throws INVALID for a root that is not a host path', () => {
		expect(readErrorCode(() => listFiles('project/nul'))).toBe('INVALID')
	})

	it('throws TARGET for a root that is a file', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const file = workspace.write('AGENTS.md', 'hi\n')
			expect(readErrorCode(() => listFiles(file))).toBe('TARGET')
		} finally {
			workspace.destroy()
		}
	})

	it('throws rather than truncating past the depth one path may carry', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
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
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const real = workspace.ensure('real')
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
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			workspace.write('b/leaf.md', 'leaf\n')
			workspace.ensure('a/deep/deeper')
			workspace.write('root.md', 'root\n')
			expect(listDirectories(workspace.path)).toEqual(['a', 'a/deep', 'a/deep/deeper', 'b'])
		} finally {
			workspace.destroy()
		}
	})

	it('reports the directory holding no file that a file walk cannot see', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			workspace.write('filled/leaf.md', 'leaf\n')
			workspace.ensure('empty')
			// The bijection: a file inventory reports only the filled branch, so the
			// empty one exists in the tree and nowhere in `listFiles`.
			expect(listFiles(workspace.path)).toEqual(['filled/leaf.md'])
			expect(listDirectories(workspace.path)).toEqual(['empty', 'filled'])
		} finally {
			workspace.destroy()
		}
	})

	it('answers an absent root and an existing empty root with the empty list', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			expect(listDirectories(join(workspace.path, 'absent'))).toEqual([])
			expect(listDirectories(workspace.ensure('empty'))).toEqual([])
		} finally {
			workspace.destroy()
		}
	})

	it('throws INVALID for a root that is not a host path', () => {
		expect(readErrorCode(() => listDirectories('project/nul'))).toBe('INVALID')
	})

	it('throws TARGET for a root that is a file', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const file = workspace.write('AGENTS.md', 'hi\n')
			expect(readErrorCode(() => listDirectories(file))).toBe('TARGET')
		} finally {
			workspace.destroy()
		}
	})

	it('throws rather than truncating past the depth one path may carry', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const shallow = Array.from({ length: MAX_PATH_DEPTH - 2 }, () => 'a').join('/')
			workspace.ensure(shallow)
			expect(listDirectories(workspace.path).length).toBe(MAX_PATH_DEPTH - 2)
			workspace.ensure(`${shallow}/a/a/a`)
			expect(readErrorCode(() => listDirectories(workspace.path))).toBe('TARGET')
		} finally {
			workspace.destroy()
		}
	})

	it('neither lists nor walks a redirected directory', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const real = workspace.ensure('real')
			workspace.ensure('real/nested')
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
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			workspace.write('AGENTS.md', 'hi\n')
			expect(readFileHex(workspace.path, 'AGENTS.md')).toBe('68690a')
			expect(readFileText(workspace.path, 'AGENTS.md')).toBe('hi\n')
		} finally {
			workspace.destroy()
		}
	})

	it('reads multi-byte content as its exact UTF-8 bytes', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			workspace.write('AGENTS.md', '€\n')
			expect(readFileHex(workspace.path, 'AGENTS.md')).toBe('e282ac0a')
			expect(readFileText(workspace.path, 'AGENTS.md')).toBe('€\n')
		} finally {
			workspace.destroy()
		}
	})

	it('reads an empty file as empty bytes rather than as absence', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			workspace.write('empty.md', '')
			expect(readFileHex(workspace.path, 'empty.md')).toBe('')
			expect(readFileText(workspace.path, 'empty.md')).toBe('')
		} finally {
			workspace.destroy()
		}
	})

	it('answers undefined for an absent path, a directory, and a linked file', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			workspace.ensure('guides')
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
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			workspace.write('AGENTS.md', 'hi\n')
			expect(readFileHex(workspace.path, 'AGENTS.md', 3)).toBe('68690a')
			expect(readFileHex(workspace.path, 'AGENTS.md', 2)).toBeUndefined()
		} finally {
			workspace.destroy()
		}
	})

	it('reads bytes that are not valid UTF-8 and refuses to decode them', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
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
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
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
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			workspace.write('AGENTS.md', 'hi\n')
			workspace.ensure('guides')
			expect(readSnapshot(workspace.path, ['AGENTS.md', 'guides', 'absent.md'])).toEqual({
				'AGENTS.md': '68690a',
				guides: '',
			})
		} finally {
			workspace.destroy()
		}
	})

	it('answers the empty snapshot for no paths and for an absent target', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			expect(readSnapshot(workspace.path, [])).toEqual({})
			expect(readSnapshot(join(workspace.path, 'absent'), ['AGENTS.md'])).toEqual({})
		} finally {
			workspace.destroy()
		}
	})

	it('tells an empty file apart from an absent one', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
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
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const file = workspace.write('AGENTS.md', 'hi\n')
			linkSync(file, join(workspace.path, 'CLAUDE.md'))
			expect(readErrorCode(() => readSnapshot(workspace.path, ['AGENTS.md']))).toBe('TARGET')
		} finally {
			workspace.destroy()
		}
	})

	it('throws INVALID for an off-contract target or path list', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
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
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
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
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const manifest = buildStagedManifest()
			const host = createHostRoot(workspace, 'host', manifest)
			expect(readHostManifest(host)).toEqual(manifest)
		} finally {
			workspace.destroy()
		}
	})

	it('reads an empty membership as a valid manifest', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const manifest = buildStagedManifest({ entries: [], roots: [] })
			const host = createHostRoot(workspace, 'host', manifest)
			expect(readHostManifest(host)).toEqual(manifest)
		} finally {
			workspace.destroy()
		}
	})

	it('answers undefined for a raw root carrying no manifest', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			workspace.write('raw/AGENTS.md', 'hi\n')
			expect(readHostManifest(join(workspace.path, 'raw'))).toBeUndefined()
			expect(readHostManifest(join(workspace.path, 'absent'))).toBeUndefined()
		} finally {
			workspace.destroy()
		}
	})

	it('throws rather than degrading to a raw root when membership was edited', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
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
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
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
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
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
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
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

describe('readHostFloor', () => {
	it('reads the default host floor and hydrates as the default materializer does', () => {
		const floor = readHostFloor()
		expect(isHost(floor)).toBe(true)
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		const packaged = new Materializer()
		const valued = new Materializer({ host: floor })
		try {
			const plan = buildVendoredPlan()
			expect(valued.audit(plan, workspace.path)).toEqual(packaged.audit(plan, workspace.path))
		} finally {
			packaged.destroy()
			valued.destroy()
			workspace.destroy()
		}
	})

	it('refuses an unreadable root, manifest, or declared file with TARGET', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			expect(readErrorCode(() => readHostFloor(join(workspace.path, 'absent')))).toBe('TARGET')
			expect(readErrorCode(() => readHostFloor(workspace.ensure('raw')))).toBe('TARGET')

			const malformed = createHostRoot(workspace, 'malformed', buildVendoredManifest())
			workspace.write('malformed/manifest.json', '{')
			expect(readErrorCode(() => readHostFloor(malformed))).toBe('TARGET')

			const missing = createHostRoot(workspace, 'missing', buildVendoredManifest())
			rmSync(join(missing, 'AGENTS.md'))
			expect(readErrorCode(() => readHostFloor(missing))).toBe('TARGET')

			const changed = createHostRoot(workspace, 'changed', buildVendoredManifest())
			workspace.write('changed/AGENTS.md', 'changed\n')
			expect(readErrorCode(() => readHostFloor(changed))).toBe('TARGET')
		} finally {
			workspace.destroy()
		}
	})
})

describe('readManifestEntry', () => {
	it('maps a destination to its storage name and its declared executable bit', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const source = workspace.write('.gitignore', 'dist\n')
			expect(readManifestEntry('.gitignore', source)).toEqual({
				storage: 'dotfiles/gitignore',
				destination: '.gitignore',
				executable: false,
				digest: computeDigest('dist\n'),
			})
		} finally {
			workspace.destroy()
		}
	})

	it('reads the executable bit from the declaration rather than from the host mode', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			// A declared path staged from a source carrying no executable bit still
			// answers true. This is the Windows publish, where every mode reads 0644:
			// reading the mode here declared the hooks dead and shipped them.
			const declared = workspace.write('scripts/codex.sh', '#!/bin/sh\n')
			chmodSync(declared, 0o644)
			expect((lstatSync(declared).mode & 0o111) !== 0).toBe(false)
			expect(readManifestEntry('scripts/codex.sh', declared)?.executable).toBe(true)
			// The control, drawn from outside the declared set rather than from
			// another declared path: an undeclared script carrying the bit answers
			// false, so the helper is reading the declaration and not the extension,
			// the directory, or the mode.
			const undeclared = workspace.write('scripts/plain.sh', '#!/bin/sh\n')
			chmodSync(undeclared, 0o755)
			expect(readManifestEntry('scripts/plain.sh', undeclared)?.executable).toBe(false)
		} finally {
			workspace.destroy()
		}
	})

	it('answers the same entry for one path on every host', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const source = workspace.write('scripts/deps.sh', '#!/bin/sh\n')
			chmodSync(source, 0o644)
			const restrictive = readManifestEntry('scripts/deps.sh', source)
			chmodSync(source, 0o755)
			// The entry a checkout stages is a function of the path alone, so the same
			// checkout produces the same manifest on a host with executable bits and
			// on one without. Nothing below the mode changed between these reads.
			expect(readManifestEntry('scripts/deps.sh', source)).toEqual(restrictive)
		} finally {
			workspace.destroy()
		}
	})

	it('answers undefined for an absent path, a directory, and a shared-byte file', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			expect(readManifestEntry('absent.md', join(workspace.path, 'absent.md'))).toBeUndefined()
			expect(readManifestEntry('guides', workspace.ensure('guides'))).toBeUndefined()
			const source = workspace.write('AGENTS.md', 'hi\n')
			linkSync(source, join(workspace.path, 'CLAUDE.md'))
			expect(readManifestEntry('AGENTS.md', source)).toBeUndefined()
		} finally {
			workspace.destroy()
		}
	})

	it('answers undefined one byte past the artifact ceiling and reads the ceiling itself', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
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

describe('filesToHost', () => {
	const manifest = buildVendoredManifest()
	const floor = {
		manifest,
		bytes: Object.fromEntries(
			manifest.entries.map((entry) => [entry.destination, contentToHex(`${entry.destination}\n`)]),
		),
	}

	it('overlays host-owned live files while keeping deferred floor bytes', () => {
		const files: readonly HostFile[] = [
			{ path: 'AGENTS.md', lookup: 'found', hex: contentToHex('live agents\n') },
			{ path: '.claude/rules/names.md', lookup: 'found', hex: contentToHex('live names\n') },
			{ path: 'scripts/codex.sh', lookup: 'found', hex: contentToHex('live script\n') },
		]
		const assembled = filesToHost(files, floor)
		expect(assembled?.manifest.entries.map((entry) => entry.destination)).toEqual(
			manifest.entries.map((entry) => entry.destination),
		)
		expect(assembled?.bytes['AGENTS.md']).toBe(contentToHex('live agents\n'))
		expect(assembled?.bytes['guides/guide.md']).toBe(floor.bytes['guides/guide.md'])
		expect(assembled?.bytes['.claude/agents/orkestrel.md']).toBe(
			floor.bytes['.claude/agents/orkestrel.md'],
		)
	})

	it('assembles a whole host from an all-found fill', () => {
		const files: readonly HostFile[] = manifest.entries.map((entry) => ({
			path: entry.destination,
			lookup: 'found',
			hex: contentToHex(`${entry.destination}\n`),
		}))
		const assembled = filesToHost(files, floor)
		expect(assembled).toEqual({
			manifest,
			bytes: Object.fromEntries(
				manifest.entries.map((entry) => [
					entry.destination,
					contentToHex(`${entry.destination}\n`),
				]),
			),
		})
		// The emitted membership digests itself, so a reader can verify the value
		// against the same law a staged root is verified against.
		expect(assembled?.manifest.digest).toBe(
			computeManifestDigest(assembled?.manifest.entries ?? [], assembled?.manifest.roots ?? []),
		)
	})

	it('keeps the release order and the storage and executable declarations it fixed', () => {
		const files: readonly HostFile[] = [...manifest.entries]
			.reverse()
			.map((entry) => ({ path: entry.destination, lookup: 'found', hex: contentToHex('moved\n') }))
		const assembled = filesToHost(files, floor)
		expect(assembled?.manifest.entries.map((entry) => entry.storage)).toEqual(
			manifest.entries.map((entry) => entry.storage),
		)
		expect(assembled?.manifest.entries.map((entry) => entry.executable)).toEqual(
			manifest.entries.map((entry) => entry.executable),
		)
		// Host-owned digests follow the live fill. Deferred digests follow the floor
		// bytes that their owning surfaces replace later.
		for (const entry of assembled?.manifest.entries ?? []) {
			expect(entry.digest).toBe(
				isDeferredPath(entry.destination)
					? floor.manifest.entries.find((one) => one.destination === entry.destination)?.digest
					: computeDigest('moved\n'),
			)
		}
	})

	it('answers undefined for a row that produced no answer', () => {
		const found: readonly HostFile[] = manifest.entries.map((entry) => ({
			path: entry.destination,
			lookup: 'found',
			hex: contentToHex(`${entry.destination}\n`),
		}))
		expect(filesToHost(found, floor)).toBeDefined()
		for (const lookup of ['missing', 'unmatched', 'failed'] as const) {
			const spoiled: readonly HostFile[] = [
				{ path: 'AGENTS.md', lookup, note: 'the read produced no answer' },
				...found.slice(1),
			]
			expect(filesToHost(spoiled, floor)).toBeUndefined()
		}
	})

	it('answers undefined for a path the release never declared', () => {
		const smuggled: readonly HostFile[] = [
			{ path: 'AGENTS.md', lookup: 'found', hex: contentToHex('AGENTS.md\n') },
			{ path: 'smuggled.md', lookup: 'found', hex: contentToHex('smuggled\n') },
		]
		expect(filesToHost(smuggled, floor)).toBeUndefined()
	})

	it('answers undefined when a host-owned path is absent from the fill', () => {
		const partial: readonly HostFile[] = [
			{ path: 'AGENTS.md', lookup: 'found', hex: contentToHex('AGENTS.md\n') },
		]
		expect(filesToHost(partial, floor)).toBeUndefined()
	})
})

describe('stageBytes', () => {
	it('fills a root under the storage names the manifest declares', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const manifest = buildVendoredManifest()
			const host = {
				manifest,
				bytes: Object.fromEntries(
					manifest.entries.map((entry) => [
						entry.destination,
						contentToHex(`${entry.destination}\n`),
					]),
				),
			}
			const root = workspace.ensure('filled')
			const staged = stageBytes(
				host,
				root,
				manifest.entries.map((entry) => entry.destination),
			)
			expect(staged).toEqual(manifest.entries)
			expect([...listFiles(root)].sort()).toEqual(
				manifest.entries.map((entry) => entry.storage).sort(),
			)
			expect(readFileSync(join(root, 'claude/rules/names.md'), 'utf8')).toBe(
				'.claude/rules/names.md\n',
			)
			for (const entry of manifest.entries) {
				expect(computeFileDigest(join(root, entry.storage))).toBe(entry.digest)
			}
		} finally {
			workspace.destroy()
		}
	})

	// Skipped on win32 because `chmodSync(path, 0o755)` leaves the mode at 666
	// there, so the assertion would measure the platform rather than the helper.
	it.skipIf(process.platform === 'win32')('gives an entry the bit its manifest declares', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const manifest = buildVendoredManifest()
			const host = {
				manifest,
				bytes: Object.fromEntries(
					manifest.entries.map((entry) => [
						entry.destination,
						contentToHex(`${entry.destination}\n`),
					]),
				),
			}
			const root = workspace.ensure('filled')
			stageBytes(host, root, ['scripts/codex.sh', 'AGENTS.md'])
			expect(lstatSync(join(root, 'scripts/codex.sh')).mode & 0o111).toBe(0o111)
			expect(lstatSync(join(root, 'AGENTS.md')).mode & 0o111).toBe(0)
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a destination the host does not declare or does not carry', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const manifest = buildVendoredManifest()
			const bytes = Object.fromEntries(
				manifest.entries.map((entry) => [
					entry.destination,
					contentToHex(`${entry.destination}\n`),
				]),
			)
			const root = workspace.ensure('filled')
			expect(readErrorCode(() => stageBytes({ manifest, bytes }, root, ['smuggled.md']))).toBe(
				'TARGET',
			)
			const rest = Object.fromEntries(
				Object.entries(bytes).filter(([destination]) => destination !== 'AGENTS.md'),
			)
			expect(readErrorCode(() => stageBytes({ manifest, bytes: rest }, root, ['AGENTS.md']))).toBe(
				'TARGET',
			)
			expect(listFiles(root)).toEqual([])
		} finally {
			workspace.destroy()
		}
	})

	it('refuses bytes that miss the digest their entry declares, and a root off contract', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const manifest = buildVendoredManifest()
			const bytes = Object.fromEntries(
				manifest.entries.map((entry) => [
					entry.destination,
					contentToHex(`${entry.destination}\n`),
				]),
			)
			const root = workspace.ensure('filled')
			// The control: the same call with the declared bytes stages the file, so
			// the refusal below is a digest verdict rather than a staging failure.
			expect(stageBytes({ manifest, bytes }, root, ['AGENTS.md'])).toEqual([manifest.entries[0]])
			expect(
				readErrorCode(() =>
					stageBytes(
						{ manifest, bytes: { ...bytes, 'AGENTS.md': contentToHex('AGENTS.md \n') } },
						workspace.ensure('other'),
						['AGENTS.md'],
					),
				),
			).toBe('TARGET')
			expect(
				readErrorCode(() => stageBytes({ manifest, bytes }, 'project/nul', ['AGENTS.md'])),
			).toBe('INVALID')
		} finally {
			workspace.destroy()
		}
	})
})

describe('stageHost', () => {
	it('declares the digest of the bytes staged after the source changes', async () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const checkout = createCheckout(workspace, 'checkout')
			for (let index = 0; index < 256; index += 1) {
				workspace.write(
					`checkout/.claude/rules/interleave-${String(index).padStart(3, '0')}.md`,
					`${String(index)}\n`,
				)
			}
			const host = join(workspace.path, 'host')
			const target = join(checkout, 'tests', 'setupPolicy.ts')
			const staged = join(host, 'AGENTS.md')
			const worker = new Worker(
				`const { existsSync, watch, writeFileSync } = require('node:fs')
const { parentPort, workerData } = require('node:worker_threads')
const watcher = watch(workerData.root, { recursive: true }, () => {
	if (!existsSync(workerData.staged)) return
	watcher.close()
	writeFileSync(workerData.target, workerData.content)
	parentPort.postMessage('changed')
})
parentPort.postMessage('ready')`,
				{
					eval: true,
					workerData: {
						root: workspace.path,
						staged,
						target,
						content: 'changed after digest\n',
					},
				},
			)
			try {
				expect(await once(worker, 'message')).toStrictEqual(['ready'])
				const changed = once(worker, 'message')
				const entries = stageHost(checkout, host)
				expect(await changed).toStrictEqual(['changed'])
				const entry = entries.find((candidate) => candidate.destination === 'tests/setupPolicy.ts')
				expect(entry?.digest).toBe(computeFileDigest(join(host, entry?.storage ?? 'absent')))
			} finally {
				await worker.terminate()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('records the exact digest of every staged file', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const checkout = createCheckout(workspace, 'checkout')
			const entries = stageHost(checkout, join(workspace.path, 'host'))
			for (const entry of entries) {
				expect(entry.digest).toBe(computeFileDigest(join(checkout, entry.destination)))
			}
		} finally {
			workspace.destroy()
		}
	})

	it('stages every vendored path and writes the membership it staged', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
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
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
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
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
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
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const checkout = createCheckout(workspace, 'checkout')
			workspace.ensure('checkout/.claude/skills/orkestrel-falsify/references')
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
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
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
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const checkout = createCheckout(workspace, 'checkout')
			const host = join(workspace.path, 'host')
			workspace.remove('checkout/LICENSE')
			workspace.remove('checkout/.cursor/rules')
			expect(readErrorCode(() => stageHost(checkout, host))).toBe('TARGET')
			expect(isPhysicalDirectory(host)).toBe(false)
			// The control: the same checkout stages cleanly after both paths are back,
			// so the refusal is the missing membership rather than the fixture.
			workspace.write('checkout/LICENSE', 'LICENSE\n')
			workspace.write('checkout/.cursor/rules/sample.md', '.cursor/rules/sample.md\n')
			expect(stageHost(checkout, host).length).toBeGreaterThan(0)
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a host root that is not vacant and leaves what it holds', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const checkout = createCheckout(workspace, 'checkout')
			const host = workspace.ensure('host')
			workspace.write('host/existing.md', 'existing\n')
			expect(readErrorCode(() => stageHost(checkout, host))).toBe('TARGET')
			expect(listFiles(host)).toEqual(['existing.md'])
		} finally {
			workspace.destroy()
		}
	})

	it('refuses an argument that is not a host path and a checkout that is not a directory', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
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
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
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
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
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
		const outside = createScratch({ prefix: SCRATCH_PREFIX })
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
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
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
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

	it('writes a manifest whose membership a reader refuses after it is edited', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
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

describe('stageInventory', () => {
	it('writes the same validated inventory that host staging derives', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const checkout = createCheckout(workspace, 'checkout')
			const path = join(workspace.path, 'host.json')
			const expected = buildCheckoutManifest()
			expect(stageInventory(checkout, path)).toEqual(expected)
			expect(readFileSync(path, 'utf8')).toBe(`${JSON.stringify(expected, null, '\t')}\n`)
		} finally {
			workspace.destroy()
		}
	})

	it('replaces an earlier inventory and refuses an invalid path', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const checkout = createCheckout(workspace, 'checkout')
			const path = workspace.write('host.json', 'stale\n')
			expect(stageInventory(checkout, path)).toEqual(buildCheckoutManifest())
			expect(readErrorCode(() => stageInventory(checkout, 'project/nul'))).toBe('INVALID')
		} finally {
			workspace.destroy()
		}
	})
})

describe('write anchors', () => {
	it('captures a directory identity and matches it while it is untouched', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const target = workspace.ensure('project')
			const anchor = readAnchor(target)
			expect(anchor?.path).toBe(target)
			expect(anchor !== undefined && matchesAnchor(anchor)).toBe(true)
		} finally {
			workspace.destroy()
		}
	})

	it('refuses to capture a file, an absent path, and a redirected directory', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			expect(readAnchor(workspace.write('AGENTS.md', 'hi\n'))).toBeUndefined()
			expect(readAnchor(join(workspace.path, 'absent'))).toBeUndefined()
			expect(readAnchor(workspace.link('mirror', workspace.ensure('real')))).toBeUndefined()
		} finally {
			workspace.destroy()
		}
	})

	it('reports a directory swapped in by rename', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const target = workspace.ensure('project')
			const anchor = readAnchor(target)
			expect(anchor).toBeDefined()
			if (anchor === undefined) return
			const replacement = workspace.ensure('replacement')
			const replacementAnchor = readAnchor(replacement)
			expect(replacementAnchor).toBeDefined()
			if (replacementAnchor === undefined) return
			expect(
				replacementAnchor.device === anchor.device && replacementAnchor.inode === anchor.inode,
			).toBe(false)
			// The original moves aside rather than being replaced in place. Windows
			// refuses a rename onto an existing directory, and holding the original
			// allocated elsewhere also stops the filesystem reissuing its inode to the
			// replacement, which ext4 does and which would make the anchor match again
			// for a reason that has nothing to do with the swap.
			renameSync(target, join(workspace.path, 'retired'))
			renameSync(replacement, target)
			expect(matchesAnchor(anchor)).toBe(false)
		} finally {
			workspace.destroy()
		}
	})

	it('reports a path replaced by a symlink to a directory', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const target = workspace.ensure('project')
			const anchor = readAnchor(target)
			expect(anchor).toBeDefined()
			if (anchor === undefined) return
			const replacement = workspace.ensure('replacement')
			rmSync(target, { recursive: true })
			workspace.link('project', replacement)
			expect(lstatSync(target).isSymbolicLink()).toBe(true)
			expect(matchesAnchor(anchor)).toBe(false)
		} finally {
			workspace.destroy()
		}
	})

	it('reports a directory that is gone', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const target = workspace.ensure('project')
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
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const path = join(workspace.path, 'absent.md')
			expect(readExpectation(path)).toEqual({ path, shape: 'absent' })
			expect(matchesExpectation({ path, shape: 'absent' })).toBe(true)
		} finally {
			workspace.destroy()
		}
	})

	it('captures a file with its identity, size, and bytes', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
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
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const path = workspace.ensure('guides')
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
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
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
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
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
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const file = workspace.write('AGENTS.md', 'hi\n')
			linkSync(file, join(workspace.path, 'CLAUDE.md'))
			expect(readExpectation(file)).toBeUndefined()
			expect(readExpectation(workspace.link('mirror', workspace.ensure('real')))).toBeUndefined()
		} finally {
			workspace.destroy()
		}
	})
})

describe('write preconditions', () => {
	it('binds an absent destination to its absence', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
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
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
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
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
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
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const directory = workspace.ensure('guides')
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
