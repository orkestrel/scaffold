import type { CatalogEntry, Finding, Group, Ownership } from '@src/core'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { isRecord } from '@orkestrel/contract'
import { describe, expect, it } from 'vitest'
import {
	artifactToFinding,
	artifactToHex,
	bytesToHex,
	CANON_PATHS,
	catalogToLayers,
	compareVersions,
	computeBytes,
	computeHash,
	computeTotal,
	contentToHex,
	GUIDES_TEST_PATH,
	extractRangeMajor,
	EXECUTABLE_PATHS,
	extractVersion,
	GROUPS,
	HOST_PATHS,
	REFERENCE_PATHS,
	renderSkillPointer,
	inferDrift,
	inferGroup,
	isCanonPath,
	isCollection,
	isDeferredPath,
	isDependency,
	isFinding,
	isFloorPath,
	isRetainedPath,
	iterateAnswers,
	manifestToDependencies,
	manifestToName,
	matchesDriftReachability,
	matchesEngines,
	matchesOrchestrationPath,
	matchesPrintWidth,
	matchesRange,
	MAX_MANIFEST_BYTES,
	nameToGuide,
	planToSummary,
	PRINT_WIDTH,
	scanManifestTokens,
	selectGroups,
	selectHostPaths,
	serializeTypeScriptString,
	TAB_WIDTH,
	WORKSPACE_OWNED_PATHS,
} from '@src/core'
import {
	buildBlueprint,
	buildCatalogEntry,
	buildContentArtifact,
	buildHostArtifact,
	buildHydratedArtifact,
	buildLazyCase,
	buildMissingCase,
	buildPlan,
	buildPurityCases,
	buildSparse,
	createClosableList,
	createEndlessList,
	DIFFERING_HEX,
	doubleValue,
	MANIFEST_SAMPLE,
	MATCHING_HEX,
	OWNERSHIPS,
	PLANNED_TEXT,
	RANGE_CASES,
	readLazily,
	refuseClose,
	refuseObject,
} from '../../setup.js'
import { createRecorder, waitForDelay } from '@orkestrel/test'

describe('purity', () => {
	for (const purityCase of buildPurityCases()) {
		it(`${purityCase.helper} repeats its answer and leaves its input untouched`, () => {
			const before = purityCase.inputs.map((input) => JSON.stringify(input))
			const first = purityCase.call()
			const second = purityCase.call()
			expect(second).toStrictEqual(first)
			expect(purityCase.inputs.map((input) => JSON.stringify(input))).toStrictEqual(before)
		})
	}

	it('answers identically after real time has passed', async () => {
		const purityCases = buildPurityCases()
		const before = purityCases.map((purityCase) => purityCase.call())
		await waitForDelay(20)
		expect(purityCases.map((purityCase) => purityCase.call())).toStrictEqual(before)
	})
})

describe('bytesToHex', () => {
	it('writes two lowercase digits per byte and nothing for no bytes', () => {
		expect(bytesToHex(new Uint8Array([0x68, 0x69, 0x0a]))).toBe('68690a')
		expect(bytesToHex(new Uint8Array([0x00, 0xff]))).toBe('00ff')
		expect(bytesToHex(new Uint8Array())).toBe('')
	})
})

describe('contentToHex and computeBytes', () => {
	it('encodes text as its exact UTF-8 bytes', () => {
		expect(contentToHex('hi\n')).toBe('68690a')
		expect(contentToHex('')).toBe('')
		expect(contentToHex('€')).toBe('e282ac')
	})

	it('counts the bytes the encoder writes, for every text', () => {
		const texts: readonly string[] = ['', 'hi\n', '€', '😀', '\uD800', 'mixed €😀 text']
		for (const text of texts) expect(computeBytes(text)).toBe(contentToHex(text).length / 2)
	})
})

describe('computeHash', () => {
	it('answers sixteen deterministic digits that follow the text', () => {
		expect(computeHash('')).toBe('cbf29ce484222325')
		expect(computeHash('scaffold')).toBe(computeHash('scaffold'))
		expect(computeHash('scaffold')).not.toBe(computeHash('scaffole'))
		expect(computeHash('scaffold')).toHaveLength(16)
	})
})

describe('computeHash and computeBytes over code points', () => {
	it('folds a surrogate pair as its two code units and a lone surrogate as one', () => {
		// Digests of the FNV-1a fold over UTF-16 code units, recorded from the loop that indexed them.
		expect(computeHash('a😀b')).toBe('72aaf0fb746e9b41')
		expect(computeHash('a\uD83Db')).toBe('75009316f14c2993')
		expect(computeBytes('a😀b')).toBe(6)
		expect(computeBytes('a\uD83Db')).toBe(5)
	})
})

describe('computeTotal', () => {
	it('adds the numbers it is given and answers zero for none', () => {
		expect(computeTotal([65_536, 65_536, 12])).toBe(131_084)
		expect(computeTotal([0.5, 0.5])).toBe(1)
		expect(computeTotal([-3, 3])).toBe(0)
		expect(computeTotal([])).toBe(0)
	})

	it('leaves the list it reads untouched', () => {
		const values = [1, 2, 3]
		computeTotal(values)
		expect(values).toStrictEqual([1, 2, 3])
	})
})

// The generator is the body of a `for…of` loop that yields each answer and returns after the first
// refusal, so its reads and closes are the loop's. Each case hands it a list whose iterator records
// its steps and its closes beside the reads of its entries.
describe('iterateAnswers', () => {
	it('yields the answer to each value in source order and leaves an iterator that ended alone', () => {
		const closable = createClosableList(
			2,
			new Map([
				[0, () => 1],
				[1, () => 2],
			]),
		)

		expect(Array.from(iterateAnswers(closable.list, doubleValue))).toStrictEqual([2, 4])
		expect(closable.calls).toStrictEqual(['iter', 'next', 'get:0', 'next', 'get:1', 'next'])
		expect(Array.from(iterateAnswers([], doubleValue))).toStrictEqual([])
	})

	it('requests the iterator once, when the first answer is read, and steps it only as answers are read', () => {
		const closable = createClosableList(
			3,
			new Map([
				[0, () => 1],
				[1, () => 2],
				[2, () => 3],
			]),
		)
		const answers = iterateAnswers(closable.list, doubleValue)

		expect(closable.calls).toStrictEqual([])
		expect(answers.next()).toStrictEqual({ done: false, value: 2 })
		expect(closable.calls).toStrictEqual(['iter', 'next', 'get:0'])
		expect(answers.next()).toStrictEqual({ done: false, value: 4 })
		expect(closable.calls).toStrictEqual(['iter', 'next', 'get:0', 'next', 'get:1'])
	})

	it('yields the first refusal, reads no further and closes the iterator once', () => {
		const closable = createClosableList(
			3,
			new Map([
				[0, () => 1],
				[1, () => 2],
				[2, () => 3],
			]),
		)

		expect(
			Array.from(iterateAnswers(closable.list, (value) => (value === 2 ? undefined : value))),
		).toStrictEqual([1, undefined])
		expect(closable.calls).toStrictEqual(['iter', 'next', 'get:0', 'next', 'get:1', 'return'])
	})

	it('surfaces a close that raises or answers a non-object after a refusal', () => {
		const closeFailure = createClosableList(1, new Map([[0, () => 1]]), { close: refuseClose })
		const closeValue = createClosableList(1, new Map([[0, () => 1]]), { close: () => 5 })

		expect(() => Array.from(iterateAnswers(closeFailure.list, () => undefined))).toThrow(EvalError)
		expect(() => Array.from(iterateAnswers(closeValue.list, () => undefined))).toThrow(TypeError)
		expect(closeFailure.calls).toStrictEqual(['iter', 'next', 'get:0', 'return'])
	})

	it('keeps the error of an answer that throws over a close that raises, and closes once', () => {
		const closable = createClosableList(2, new Map([[0, () => 1]]), { close: refuseClose })

		expect(() =>
			Array.from(
				iterateAnswers(closable.list, () => {
					throw new RangeError('answer')
				}),
			),
		).toThrow(RangeError)
		expect(closable.calls).toStrictEqual(['iter', 'next', 'get:0', 'return'])
	})

	it('reads a hole as an undefined value and a list without an iterator as a refusal to start', () => {
		const sparse = buildSparse<number>(2, new Map([[1, 5]]))
		const missing = [1, 2]
		Object.defineProperty(missing, Symbol.iterator, { value: undefined })

		expect(Array.from(iterateAnswers(sparse, (value) => [value]))).toStrictEqual([[undefined], [5]])
		expect(() => Array.from(iterateAnswers(missing, doubleValue))).toThrow(TypeError)
	})

	it('follows an iterator that yields more or fewer values than the list length reports', () => {
		const longer = Object.defineProperty([1], Symbol.iterator, {
			value: function* () {
				yield 1
				yield 2
				yield 3
			},
		})
		const shorter = Object.defineProperty([1, 2, 3], Symbol.iterator, {
			value: function* () {
				yield 9
			},
		})

		expect(Array.from(iterateAnswers(longer, doubleValue))).toStrictEqual([2, 4, 6])
		expect(Array.from(iterateAnswers(shorter, doubleValue))).toStrictEqual([18])
	})

	it('reads an infinite source only as far as its first refusal', () => {
		const seen = createRecorder<readonly [number]>()
		expect(
			Array.from(
				iterateAnswers(createEndlessList(7), (value) => {
					seen.handler(value)
					return seen.count < 3 ? value : undefined
				}),
			),
		).toStrictEqual([7, 7, undefined])
		expect(seen.count).toBe(3)
	})
})

describe('matchesOrchestrationPath', () => {
	it('reads a harness directory and the exact bench filenames as orchestration', () => {
		expect(matchesOrchestrationPath('.claude/rules/names.md')).toBe(true)
		expect(matchesOrchestrationPath('.agents/orchestration.md')).toBe(true)
		expect(matchesOrchestrationPath('scripts/deps.sh')).toBe(true)
		expect(matchesOrchestrationPath('.mcp.json')).toBe(true)
		expect(matchesOrchestrationPath('.oxlintrc.json')).toBe(false)
		expect(matchesOrchestrationPath('.claudeignore')).toBe(false)
	})

	it('classifies the owned scripts root with its members', () => {
		expect(matchesOrchestrationPath('scripts')).toBe(true)
		expect(matchesOrchestrationPath('scripts/deps.sh')).toBe(true)
		expect(matchesOrchestrationPath('scripts-other')).toBe(false)
	})
})

describe('isDeferredPath', () => {
	it('matches only the catalog agent and Markdown guide mirrors', () => {
		expect(isDeferredPath('.claude/agents/orkestrel.md')).toBe(true)
		expect(isDeferredPath('guides/guide.md')).toBe(true)
		expect(isDeferredPath('guides/nested/router.md')).toBe(true)
		expect(isDeferredPath('.claude/agents/other.md')).toBe(false)
		expect(isDeferredPath('guides/guide.MD')).toBe(false)
		expect(isDeferredPath('docs/guide.md')).toBe(false)
	})
})

describe('isCanonPath', () => {
	it('matches every canon member and everything beneath a canon directory', () => {
		for (const path of CANON_PATHS) expect(isCanonPath(path)).toBe(true)
		expect(isCanonPath('.claude/rules/names.md')).toBe(true)
		expect(isCanonPath('.agents/skills/orkestrel-falsify/SKILL.md')).toBe(true)
		expect(isCanonPath('.agents/transports/codex.md')).toBe(true)
		expect(isCanonPath('.codex/agents/planner.md')).toBe(true)
		expect(isCanonPath('.cursor/rules/orkestrel.mdc')).toBe(true)
		expect(isCanonPath('.mcp.json')).toBe(true)
		// The catalog file sits beneath a canon directory and the plan claims it
		// anyway, so canon membership and being planned are separate readings.
		expect(isCanonPath('.claude/agents/orkestrel.md')).toBe(true)
	})

	it('refuses a vendored path beside a canon member and a prefix lookalike', () => {
		expect(isCanonPath('.claude/settings.json')).toBe(false)
		expect(isCanonPath('scripts/deps.sh')).toBe(false)
		// The control the directory rule needs: a sibling whose name opens with a
		// canon member's name is outside it, so the match is a segment boundary
		// rather than a string prefix.
		expect(isCanonPath('.claude/rulesets/names.md')).toBe(false)
		expect(isCanonPath('AGENTS.md.bak')).toBe(false)
		expect(isCanonPath('')).toBe(false)
	})

	// The host, canon, and reference lists partition the staged membership.
	// They are disjoint by prefix in every direction, because the stager walks their union
	// and a path discovered twice claims one storage name twice.
	it('shares no member with the vendored set, in either direction', () => {
		expect(REFERENCE_PATHS).toStrictEqual(['guides'])
		for (const paths of [HOST_PATHS, CANON_PATHS, REFERENCE_PATHS]) {
			for (const others of [HOST_PATHS, CANON_PATHS, REFERENCE_PATHS]) {
				if (paths === others) continue
				expect(
					paths.filter((path) =>
						others.some((other) => path === other || path.startsWith(`${other}/`)),
					),
				).toStrictEqual([])
			}
		}
		expect(isCanonPath('guides/router.md')).toBe(false)
		expect(HOST_PATHS.filter((path) => isCanonPath(path))).toStrictEqual([])
		expect(
			CANON_PATHS.filter((canon) =>
				HOST_PATHS.some((host) => canon === host || canon.startsWith(`${host}/`)),
			),
		).toStrictEqual([])
		// The control each reading needs, drawn from outside both lists: a path
		// beneath a canon member and a path beneath a vendored member each report.
		// The second reading's prefix arm is pinned by a path beneath the owned scripts root.
		expect(['.claude/rules/names.md'].filter((path) => isCanonPath(path))).toHaveLength(1)
		expect(
			['scripts/deps.sh'].filter((canon) =>
				HOST_PATHS.some((host) => canon === host || canon.startsWith(`${host}/`)),
			),
		).toHaveLength(1)
	})

	it('keeps the guides proof package-owned', () => {
		expect(GUIDES_TEST_PATH).toBe('tests/guides.test.ts')
		expect(HOST_PATHS).not.toContain(GUIDES_TEST_PATH)
		expect(EXECUTABLE_PATHS).not.toContain(GUIDES_TEST_PATH)
		expect(isCanonPath(GUIDES_TEST_PATH)).toBe(false)
		expect(HOST_PATHS).toContain('scripts')
		expect(HOST_PATHS).not.toContain('scripts/deps.sh')
		expect(EXECUTABLE_PATHS).toContain('scripts/deps.sh')
	})
})

describe('isRetainedPath', () => {
	it('matches a workspace-owned path and a deferred path', () => {
		for (const path of WORKSPACE_OWNED_PATHS) expect(isRetainedPath(path)).toBe(true)
		expect(isRetainedPath('.claude/agents/orkestrel.md')).toBe(true)
		expect(isRetainedPath('guides/router.md')).toBe(true)
	})

	it('refuses a vendored path whose bytes the plan claims', () => {
		expect(isRetainedPath('LICENSE')).toBe(false)
		expect(isRetainedPath('scripts/deps.sh')).toBe(false)
		// A canon path is kept by the overlay rather than by presence, so it is
		// outside this reading even though the other path predicate accepts it.
		expect(isRetainedPath('AGENTS.md')).toBe(false)
		expect(isRetainedPath('')).toBe(false)
	})
})

describe('isFloorPath', () => {
	it('matches a deferred path and every canon destination', () => {
		expect(isFloorPath('.claude/agents/orkestrel.md')).toBe(true)
		expect(isFloorPath('guides/router.md')).toBe(true)
		for (const path of CANON_PATHS) expect(isFloorPath(path)).toBe(true)
		expect(isFloorPath('.claude/rules/names.md')).toBe(true)
	})

	it('refuses a host-owned destination a live fill replaces', () => {
		expect(isFloorPath('scripts/deps.sh')).toBe(false)
		expect(isFloorPath('.claude/settings.json')).toBe(false)
		// A workspace-owned path is retained by presence rather than by the floor,
		// so the sibling reading accepts it and this one does not.
		expect(isFloorPath('.gitignore')).toBe(false)
		expect(isFloorPath('')).toBe(false)
	})
})

describe('inferGroup', () => {
	const groups: ReadonlyArray<readonly [string, Group]> = [
		['package.json', 'manifest'],
		['package-lock.json', 'manifest'],
		['.mcp.json', 'orchestration'],
		['.claude/rules/names.md', 'orchestration'],
		['scripts/deps.sh', 'orchestration'],
		['src/core/index.ts', 'source'],
		['app/server/main.ts', 'source'],
		['tests/setup.ts', 'tests'],
		['guides/README.md', 'guides'],
		['docs/design.md', 'docs'],
		['LICENSE', 'docs'],
		['AGENTS.md', 'docs'],
		['.editorconfig', 'configs'],
		['configs/src/vite.core.config.ts', 'configs'],
	]

	for (const [path, group] of groups) {
		it(`reads ${path} as ${group}`, () => {
			expect(inferGroup(path)).toBe(group)
		})
	}
})

describe('nameToGuide', () => {
	it('derives one mirror path per name', () => {
		expect(nameToGuide('@orkestrel/router')).toBe('guides/router.md')
		expect(nameToGuide('scaffold')).toBe('guides/scaffold.md')
	})
})

describe('matchesPrintWidth', () => {
	// The formatter counts a tab as its own configured width, so the predicate is
	// measured against lines whose character count and column count disagree.
	it('measures columns rather than characters, at the boundary', () => {
		const fits = '\t'.repeat(4) + 'a'.repeat(PRINT_WIDTH - 4 * TAB_WIDTH)
		expect(fits).toHaveLength(PRINT_WIDTH - 4 * TAB_WIDTH + 4)
		expect(matchesPrintWidth(fits)).toBe(true)
		expect(matchesPrintWidth(`${fits}a`)).toBe(false)
	})

	it('accepts an empty line and rejects one that is only tabs', () => {
		expect(matchesPrintWidth('')).toBe(true)
		expect(matchesPrintWidth('\t'.repeat(PRINT_WIDTH / TAB_WIDTH))).toBe(true)
		expect(matchesPrintWidth('\t'.repeat(PRINT_WIDTH / TAB_WIDTH + 1))).toBe(false)
	})

	// The constants exist so every emitter measures one width. They are a second
	// copy of a fact the vendored formatter already holds, so the copy is checked
	// against the original rather than trusted.
	it('carries the width the vendored formatter is configured with', () => {
		const vendored: unknown = JSON.parse(readFileSync(resolve('.oxfmtrc.json'), 'utf8'))
		if (!isRecord(vendored)) throw new Error('Expected the vendored formatter configuration')
		expect(vendored.printWidth).toBe(PRINT_WIDTH)
		expect(vendored.tabWidth).toBe(TAB_WIDTH)
	})
})

describe('serializeTypeScriptString', () => {
	it('escapes every character that can leave a single-quoted literal', () => {
		expect(serializeTypeScriptString("a'b\\c\n\t\u2028\u2029")).toBe(
			"'a\\'b\\\\c\\n\\t\\u2028\\u2029'",
		)
	})
})

describe('serializeTypeScriptString surrogates', () => {
	it('keeps a surrogate pair whole and escapes a lone surrogate or control character', () => {
		expect(serializeTypeScriptString('😀')).toBe("'😀'")
		expect(serializeTypeScriptString('😀x')).toBe("'😀x'")
		expect(serializeTypeScriptString('\uD83D')).toBe("'\\ud83d'")
		expect(serializeTypeScriptString('\uDC00')).toBe("'\\udc00'")
		expect(serializeTypeScriptString('\uD83D\u0001')).toBe("'\\ud83d\\u0001'")
		expect(serializeTypeScriptString('')).toBe("''")
	})
})

describe('selectHostPaths', () => {
	it('drops the workspace’s own guide and keeps every other candidate in order', () => {
		const candidates = [...HOST_PATHS, 'guides/guide.md', 'guides/scaffold.md']
		const selected = selectHostPaths(candidates, 'scaffold')
		expect(selected).not.toContain('guides/scaffold.md')
		expect(selected).toContain('guides/guide.md')
		expect(selected).toStrictEqual(candidates.filter((path) => path !== 'guides/scaffold.md'))
	})

	it('keeps every candidate for a workspace that vendors no guide of its own', () => {
		expect(selectHostPaths(HOST_PATHS, 'router')).toStrictEqual(HOST_PATHS)
	})

	// The selection reads `HOST_PATHS` alone, so no canon member reaches it: a
	// target reads those files from the package it installs, and the compiler
	// appends the catalog file to the host selection while the pointers arrive as
	// content-owned template artifacts. The retained paths
	// are the neighbours each moved path left behind, so a removal that took a
	// sibling with it is visible here rather than in a length.
	it('selects no canon member and retains the vendored paths beside them', () => {
		const selected = selectHostPaths(HOST_PATHS, 'router')
		expect(selected.filter((path) => isCanonPath(path))).toStrictEqual([])
		for (const path of [
			'AGENTS.md',
			'.claude/AGENTS.md',
			'.agents/orchestration.md',
			'.claude/rules',
			'.claude/agents',
			'.claude/agents/orkestrel.md',
			'.codex/agents',
			'.codex/config.toml',
			'.cursor/mcp.json',
			'.cursor/rules',
			'.mcp.json',
		]) {
			expect(selected).not.toContain(path)
		}
		for (const path of ['.claude/settings.json', 'scripts', 'configs/policy.ts', 'LICENSE']) {
			expect(selected).toContain(path)
		}
	})
})

describe('selectGroups', () => {
	it('reads a selection as membership and takes its order from the plan', () => {
		expect(selectGroups(['tests', 'manifest', 'tests'])).toStrictEqual(['manifest', 'tests'])
		expect(selectGroups()).toStrictEqual(GROUPS)
		expect(selectGroups([])).toStrictEqual([])
	})
})

describe('artifactToHex', () => {
	it('answers the bytes an artifact claims, and nothing where it claims none', () => {
		expect(artifactToHex(buildHydratedArtifact())).toBe(contentToHex('MIT\n'))
		expect(artifactToHex(buildContentArtifact())).toBe(contentToHex('# Sample\n'))
		expect(artifactToHex(buildHostArtifact())).toBeUndefined()
	})
})

describe('inferDrift', () => {
	it('never compares a birth-owned artifact', () => {
		const artifact = buildHostArtifact({ ownership: 'birth' })
		expect(inferDrift(artifact)).toBe('aligned')
		expect(inferDrift(artifact, contentToHex('anything\n'))).toBe('aligned')
	})

	it('compares only existence for a presence-owned artifact', () => {
		const artifact = buildHostArtifact()
		expect(inferDrift(artifact)).toBe('missing')
		expect(inferDrift(artifact, contentToHex('anything\n'))).toBe('aligned')
	})

	it('compares bytes for a content-owned artifact', () => {
		const artifact = buildContentArtifact()
		expect(inferDrift(artifact, contentToHex('# Sample\n'))).toBe('aligned')
		expect(inferDrift(artifact, contentToHex('# Stale\n'))).toBe('stale')
		expect(inferDrift(artifact)).toBe('missing')
	})

	it('binds every ownership and observation to its reachable verdict', () => {
		for (const ownership of ['content', 'presence', 'birth'] satisfies readonly Ownership[]) {
			const artifact = buildContentArtifact({ ownership })
			for (const observed of [
				undefined,
				contentToHex('# Sample\n'),
				contentToHex('# Stale\n'),
			] satisfies ReadonlyArray<string | undefined>) {
				const drift = inferDrift(artifact, observed)
				const finding: Finding =
					drift === 'stale'
						? {
								path: artifact.path,
								group: artifact.group,
								ownership,
								drift,
								observed: observed ?? '',
							}
						: drift === 'missing'
							? { path: artifact.path, group: artifact.group, ownership, drift }
							: observed === undefined
								? { path: artifact.path, group: artifact.group, ownership, drift }
								: { path: artifact.path, group: artifact.group, ownership, drift, observed }
				expect(matchesDriftReachability(ownership, finding)).toBe(true)
			}
		}

		const unreachable: Finding = {
			path: 'README.md',
			group: 'docs',
			ownership: 'birth',
			drift: 'stale',
			observed: contentToHex('# Stale\n'),
		}
		expect(matchesDriftReachability('birth', unreachable)).toBe(false)
	})
})

describe('catalogToLayers', () => {
	it('orders the rounds by the edges rather than by the order it was handed', () => {
		// The rows arrive in reverse publish order on purpose. An implementation that
		// returned its input grouped by arrival would pass a forward-ordered fixture
		// and fail this one, so the assertion is about the edges and not the array.
		const entries: readonly CatalogEntry[] = [
			{
				name: '@orkestrel/agent',
				lookup: 'found',
				version: '0.0.3',
				dependencies: [{ name: '@orkestrel/tool', range: '^0.0.2' }],
				peers: [],
			},
			{
				name: '@orkestrel/tool',
				lookup: 'found',
				version: '0.0.2',
				dependencies: [{ name: '@orkestrel/contract', range: '^0.0.1' }],
				peers: [],
			},
			{
				name: '@orkestrel/contract',
				lookup: 'found',
				version: '0.0.1',
				dependencies: [],
				peers: [],
			},
			{ name: '@orkestrel/reason', lookup: 'found', version: '0.0.5', dependencies: [], peers: [] },
		]
		expect(catalogToLayers(entries)).toStrictEqual([
			['@orkestrel/contract', '@orkestrel/reason'],
			['@orkestrel/tool'],
			['@orkestrel/agent'],
		])
	})

	it('places a dependent one layer after a peer-only edge, and needs the peer spread to do it', () => {
		// The negative control: with the `...entry.peers` spread removed from
		// `catalogToLayers`, middleware never sees the edge to server and both
		// packages land in the same first round instead.
		const entries: readonly CatalogEntry[] = [
			{
				name: '@orkestrel/middleware',
				lookup: 'found',
				version: '0.0.18',
				dependencies: [],
				peers: [{ name: '@orkestrel/server', range: '^0.0.18' }],
			},
			{
				name: '@orkestrel/server',
				lookup: 'found',
				version: '0.0.18',
				dependencies: [],
				peers: [],
			},
		]
		expect(catalogToLayers(entries)).toStrictEqual([
			['@orkestrel/server'],
			['@orkestrel/middleware'],
		])
	})

	it('omits a cycle instead of ordering it', () => {
		// The negative control. Two packages that depend on each other cannot be
		// published in rounds, and an instrument that always answers with every name
		// would report an order here. Absence is the report.
		const entries: readonly CatalogEntry[] = [
			{
				name: '@orkestrel/left',
				lookup: 'found',
				version: '0.0.1',
				dependencies: [{ name: '@orkestrel/right', range: '^0.0.1' }],
				peers: [],
			},
			{
				name: '@orkestrel/right',
				lookup: 'found',
				version: '0.0.1',
				dependencies: [{ name: '@orkestrel/left', range: '^0.0.1' }],
				peers: [],
			},
			{ name: '@orkestrel/free', lookup: 'found', version: '0.0.1', dependencies: [], peers: [] },
		]
		expect(catalogToLayers(entries)).toStrictEqual([['@orkestrel/free']])
	})

	it('counts only an edge to a package this catalog publishes', () => {
		// An edge leaving the fleet and an edge to a row that found no version both
		// constrain nothing, so neither delays its dependent past the first round.
		const entries: readonly CatalogEntry[] = [
			{
				name: '@orkestrel/agent',
				lookup: 'found',
				version: '0.0.3',
				dependencies: [
					{ name: 'zod', range: '^3.0.0' },
					{ name: '@orkestrel/queue', range: '^0.0.1' },
				],
				peers: [],
			},
			{ name: '@orkestrel/queue', lookup: 'missing', note: 'The package is not published.' },
			{ name: '@orkestrel/router', lookup: 'failed', note: 'The registry did not answer.' },
		]
		expect(catalogToLayers(entries)).toStrictEqual([['@orkestrel/agent']])
	})

	it('answers with no layer for no catalog', () => {
		expect(catalogToLayers([])).toStrictEqual([])
	})

	it('refuses a hole in the entries as the entry it reads as', () => {
		const entries = buildSparse<CatalogEntry>(
			2,
			new Map([
				[
					1,
					{
						name: '@orkestrel/free',
						lookup: 'found',
						version: '1.0.0',
						dependencies: [],
						peers: [],
					},
				],
			]),
		)

		expect(() => catalogToLayers(entries)).toThrow(TypeError)
	})
})

describe('planToSummary', () => {
	it('tallies the artifacts by origin and carries the blueprint’s axes', () => {
		const plan = buildPlan({
			blueprint: buildBlueprint({ src: ['core', 'server'], app: ['core'] }),
			groups: ['manifest', 'docs'],
			artifacts: [
				buildHostArtifact(),
				buildHydratedArtifact(),
				buildContentArtifact(),
				buildContentArtifact({ path: 'README.md', origin: 'template' }),
			],
		})
		expect(planToSummary(plan)).toStrictEqual({
			name: 'sample',
			src: ['core', 'server'],
			app: ['core'],
			groups: ['manifest', 'docs'],
			host: 2,
			template: 1,
			computed: 1,
		})
	})

	it('refuses a hole in the artifacts as the artifact it reads as', () => {
		const plan = buildPlan({ artifacts: buildSparse(2, new Map([[1, buildContentArtifact()]])) })

		expect(() => planToSummary(plan)).toThrow(TypeError)
	})

	// A `for…of` loop tallied every artifact the iterator of the list yielded, however long the list
	// said it was, so the computed tally is what the iterator yielded beyond host and template.
	it.each([
		[
			'more artifacts than the list is long',
			Object.defineProperty([], Symbol.iterator, {
				value: function* () {
					yield buildHostArtifact()
					yield buildHostArtifact()
					yield buildContentArtifact()
				},
			}),
			{ host: 2, template: 0, computed: 1 },
		],
		[
			'fewer artifacts than the list is long',
			Object.defineProperty(
				[buildHostArtifact(), buildHostArtifact(), buildHostArtifact()],
				Symbol.iterator,
				{
					value: function* () {
						yield buildContentArtifact()
					},
				},
			),
			{ host: 0, template: 0, computed: 1 },
		],
		[
			'the same artifacts in another order',
			Object.defineProperty([buildHostArtifact(), buildContentArtifact()], Symbol.iterator, {
				value: function* () {
					yield buildContentArtifact({ path: 'README.md', origin: 'template' })
					yield buildContentArtifact()
				},
			}),
			{ host: 0, template: 1, computed: 1 },
		],
	])('tallies what the iterator yields when it yields %s', (_label, artifacts, tally) => {
		expect(planToSummary(buildPlan({ artifacts }))).toMatchObject(tally)
	})
})

describe('extractVersion and compareVersions', () => {
	it('reads only the exact major.minor.patch syntax', () => {
		expect(extractVersion('0.0.23')).toStrictEqual([0, 0, 23])
		expect(extractVersion('1.2.3-beta.1')).toBeUndefined()
		expect(extractVersion('01.2.3')).toBeUndefined()
		expect(extractVersion('1.2')).toBeUndefined()
		expect(extractVersion('')).toBeUndefined()
	})

	it('orders by numeric component and never by which side failed to parse', () => {
		expect(compareVersions('0.0.9', '0.0.10')).toBe(-1)
		expect(compareVersions('0.0.10', '0.0.9')).toBe(1)
		expect(compareVersions('1.2.3', '1.2.3')).toBe(0)
		expect(compareVersions('1.2.3', 'unreadable')).toBe(1)
		expect(compareVersions('unreadable', '1.2.3')).toBe(-1)
		expect(compareVersions('alpha', 'beta')).toBe(-1)
		expect(compareVersions('alpha', 'alpha')).toBe(0)
	})
})

describe('extractRangeMajor', () => {
	it('projects canonical majors and admitted full-version forms', () => {
		expect(extractRangeMajor('^6')).toBe(6)
		expect(extractRangeMajor('^0')).toBe(0)
		expect(extractRangeMajor('^6.0.3')).toBe(6)
		expect(extractRangeMajor('~6.4.0')).toBe(6)
		expect(extractRangeMajor('6.5.1')).toBe(6)
		expect(extractRangeMajor('^6.0.0-beta.1')).toBe(6)
	})

	it('answers nothing for off-form text', () => {
		expect(extractRangeMajor('6')).toBeUndefined()
		expect(extractRangeMajor('~6')).toBeUndefined()
		expect(extractRangeMajor('^6.0')).toBeUndefined()
		expect(extractRangeMajor('>=6.0.0')).toBeUndefined()
		expect(extractRangeMajor('01.2.3')).toBeUndefined()
		expect(extractRangeMajor('^^6')).toBeUndefined()
		expect(extractRangeMajor('')).toBeUndefined()
	})
})

describe('matchesRange', () => {
	for (const rangeCase of RANGE_CASES) {
		it(`${rangeCase.satisfied ? 'admits' : 'refuses'} ${rangeCase.latest} under ${rangeCase.range}`, () => {
			expect(matchesRange(rangeCase.range, rangeCase.latest)).toBe(rangeCase.satisfied)
		})
	}

	it('satisfies a prerelease only by an identical string', () => {
		expect(matchesRange('1.2.3-beta.1', '1.2.3-beta.1')).toBe(true)
		expect(matchesRange('1.2.3-beta.1', '1.2.3-beta.2')).toBe(false)
		expect(matchesRange('~1.2.3-beta.1', '1.2.3-beta.2')).toBe(false)
		expect(matchesRange('^1.2.3', '1.2.4-beta.1')).toBe(false)
	})

	it('never admits an unreadable range, even handed the same text on both sides', () => {
		expect(matchesRange('^unreadable', '1.2.3')).toBe(false)
		expect(matchesRange('^1.2.3', 'unreadable')).toBe(false)
		expect(matchesRange('', '1.2.3')).toBe(false)
		expect(matchesRange('not-a-range', 'not-a-range')).toBe(false)
		expect(matchesRange('', '')).toBe(false)
		expect(matchesRange('^unreadable', '^unreadable')).toBe(false)
		expect(matchesRange('1.2.3.4', '1.2.3.4')).toBe(false)
		expect(matchesRange('^^1.2.3', '^1.2.3')).toBe(false)
	})
})

describe('matchesEngines', () => {
	it('accepts the declared floor syntax at or above the supported minimum', () => {
		expect(matchesEngines('>=22.18.0')).toBe(true)
		expect(matchesEngines('>=24.0.0')).toBe(true)
		expect(matchesEngines('>=22.17.0')).toBe(false)
		expect(matchesEngines('>=22.12.0')).toBe(false)
		expect(matchesEngines('>=20.0.0')).toBe(false)
		expect(matchesEngines('22.18.0')).toBe(false)
		expect(matchesEngines('>=22.18')).toBe(false)
		expect(matchesEngines('^22.18.0')).toBe(false)
	})
})

describe('manifestToName', () => {
	it('answers the declared name and nothing for text it cannot read', () => {
		expect(manifestToName(MANIFEST_SAMPLE)).toBe('@orkestrel/sample')
		expect(manifestToName('{')).toBeUndefined()
		expect(manifestToName('[]')).toBeUndefined()
		expect(manifestToName('{"name":42}')).toBeUndefined()
		expect(manifestToName('{"name":""}')).toBeUndefined()
		expect(manifestToName('{}')).toBeUndefined()
	})

	it('refuses a manifest larger than the ceiling it reads within', () => {
		const oversized = `{"name":"@orkestrel/sample","filler":"${'a'.repeat(MAX_MANIFEST_BYTES)}"}`
		expect(manifestToName(oversized)).toBeUndefined()
		expect(manifestToDependencies(oversized)).toStrictEqual({
			runtime: [],
			development: [],
			peer: [],
		})
	})
})

describe('manifestToDependencies', () => {
	it('keeps each fleet declaration in its owning section', () => {
		expect(manifestToDependencies(MANIFEST_SAMPLE)).toStrictEqual({
			runtime: [{ name: '@orkestrel/emitter', range: '^0.0.5' }],
			development: [
				{ name: '@orkestrel/emitter', range: '^9.9.9' },
				{ name: '@orkestrel/guide', range: '^0.0.9' },
			],
			peer: [],
		})
	})

	it('answers empty sections for text it cannot read', () => {
		const empty = { runtime: [], development: [], peer: [] }
		expect(manifestToDependencies('{')).toStrictEqual(empty)
		expect(manifestToDependencies('[]')).toStrictEqual(empty)
		expect(manifestToDependencies('{}')).toStrictEqual(empty)
	})

	it('returns rows that cross this package’s own boundary unchanged', () => {
		const dependencies = manifestToDependencies(MANIFEST_SAMPLE)
		for (const section of [dependencies.runtime, dependencies.development, dependencies.peer]) {
			expect(isCollection(section)).toBe(true)
			for (const dependency of section) expect(isDependency(dependency)).toBe(true)
		}
	})

	it('skips a declaration whose name or range is off contract', () => {
		const manifest =
			'{"dependencies":{"@orkestrel/Router":"^0.0.8","@orkestrel/router":"","@orkestrel/guide":9,"@orkestrel/emitter":"^0.0.5"}}'
		expect(manifestToDependencies(manifest)).toStrictEqual({
			runtime: [{ name: '@orkestrel/emitter', range: '^0.0.5' }],
			development: [],
			peer: [],
		})
	})
})

describe('scanManifestTokens', () => {
	it('reads strings and braces in order with the object depth after each', () => {
		const tokens = scanManifestTokens('{"a": {"b": "c"}, "d": 1}')
		expect(tokens?.map((token) => [token.text, token.depth])).toStrictEqual([
			['{', 1],
			['"a"', 1],
			['{', 2],
			['"b"', 2],
			['"c"', 2],
			['}', 1],
			['"d"', 1],
			['}', 0],
		])
	})

	it('offsets the value a key introduces and none for a string with no colon', () => {
		const text = '{"a" :\n  "b", "c": {}}'
		const tokens = scanManifestTokens(text) ?? []
		const keys = tokens.filter((token) => token.value !== undefined)
		expect(keys.map((token) => token.text)).toStrictEqual(['"a"', '"c"'])
		expect(keys.map((token) => text.charAt(token.value ?? -1))).toStrictEqual(['"', '{'])
		expect(tokens.find((token) => token.text === '"b"')?.value).toBeUndefined()
		expect(tokens.map((token) => token.index)).toStrictEqual([0, 1, 9, 14, 19, 20, 21])
	})

	it('treats a brace, a colon, and an escaped quote inside a string as text', () => {
		const tokens = scanManifestTokens('{"a{": "}\\"b", "[": 1}') ?? []
		expect(tokens.map((token) => token.text)).toStrictEqual(['{', '"a{"', '"}\\"b"', '"["', '}'])
		expect(tokens.map((token) => token.depth)).toStrictEqual([1, 1, 1, 1, 0])
	})

	it('ignores arrays when it counts depth', () => {
		const tokens = scanManifestTokens('{"a": [{"b": 1}], "c": ["d"]}') ?? []
		expect(tokens.map((token) => [token.text, token.depth])).toStrictEqual([
			['{', 1],
			['"a"', 1],
			['{', 2],
			['"b"', 2],
			['}', 1],
			['"c"', 1],
			['"d"', 1],
			['}', 0],
		])
	})

	it('answers undefined for a string that is never closed, and nothing for text without any', () => {
		expect(scanManifestTokens('{"a')).toBeUndefined()
		expect(scanManifestTokens('{"a": "b\\"}')).toBeUndefined()
		expect(scanManifestTokens('"\\')).toBeUndefined()
		expect(scanManifestTokens('')).toStrictEqual([])
		expect(scanManifestTokens('1, [2] true')).toStrictEqual([])
	})

	it('reads the same tokens however the text is spaced', () => {
		const compact = scanManifestTokens('{"a":{"b":"c"}}') ?? []
		const spaced = scanManifestTokens('{\n\t"a" : {\n\t\t"b" :  "c"\n\t}\n}') ?? []
		expect(spaced.map((token) => [token.text, token.depth])).toStrictEqual(
			compact.map((token) => [token.text, token.depth]),
		)
	})
})

describe('artifactToFinding producer matrix', () => {
	// The instrument's population is every finding the producer can reach: every
	// ownership tier by every observation state a target can present.
	// Its control is drawn from outside that population, because a control sampled
	// from inside it could only show the producer disagreeing with itself, and the
	// question here is what the producer never reaches at all.
	it('reaches every verdict shape, and the guard admits one it never reaches', () => {
		const outcomes = OWNERSHIPS.flatMap((ownership) =>
			(
				[
					['absent', undefined],
					['matching', MATCHING_HEX],
					['differing', DIFFERING_HEX],
				] as const
			).map(([state, observed]) => {
				const finding = artifactToFinding(
					buildContentArtifact({ ownership, content: PLANNED_TEXT }),
					observed,
				)
				// Soundness in the direction the guard does promise: the producer never
				// emits a finding the guard rejects.
				expect(isFinding(finding)).toBe(true)
				const verdict = `${finding.ownership}/${finding.drift}/${finding.observed === undefined ? 'no observed' : 'observed'}`
				return { cell: `${ownership} ${state} -> ${verdict}`, verdict }
			}),
		)
		const cells = outcomes.map(({ cell }) => cell)
		const verdicts = outcomes.map(({ verdict }) => verdict)
		expect(cells).toStrictEqual([
			'content absent -> content/missing/no observed',
			'content matching -> content/aligned/observed',
			'content differing -> content/stale/observed',
			'presence absent -> presence/missing/no observed',
			'presence matching -> presence/aligned/observed',
			'presence differing -> presence/aligned/observed',
			'birth absent -> birth/aligned/no observed',
			'birth matching -> birth/aligned/observed',
			'birth differing -> birth/aligned/observed',
		])
		expect([...new Set(verdicts)].sort()).toStrictEqual([
			'birth/aligned/no observed',
			'birth/aligned/observed',
			'content/aligned/observed',
			'content/missing/no observed',
			'content/stale/observed',
			'presence/aligned/observed',
			'presence/missing/no observed',
		])

		// The control. A birth-owned path reported stale is outside the population
		// above: birth ownership is never compared, so the producer reports it
		// aligned whatever the target holds.
		const control = {
			path: 'package.json',
			group: 'manifest',
			ownership: 'birth',
			drift: 'stale',
			observed: MATCHING_HEX,
		}
		expect(isFinding(control)).toBe(true)
		expect(verdicts).not.toContain('birth/stale/observed')

		// What the control established: the guard's population is strictly wider
		// than the producer's, so the gap the `Finding` and `isFinding` remarks
		// describe is measured rather than assumed, and a consumer that treats a
		// guarded finding as a verdict some audit reached is wrong on real input.
		// What it did not establish: nothing about what happens next. It does not
		// show this verdict reaching a write, because `repair` re-derives every
		// finding and refuses a caller's audit that disagrees, and it names one
		// member of the gap rather than enumerating it.
	})
})

describe('renderSkillPointer', () => {
	// The frontmatter is what a harness reads to discover and trigger the skill, so
	// the pointer keeps it byte for byte, folded description included, and replaces
	// only the body. The expected body is the brief's text, not the template read back.
	it('keeps a folded frontmatter block byte for byte and appends the filled body', () => {
		const frontmatter = [
			'---',
			'name: orkestrel-harden',
			'description: >-',
			'  Hardens one package against its rules. Use when a package needs its',
			'  placement, names, and tests brought to the contract.',
			'---',
		].join('\n')
		const canonical = `${frontmatter}\n\n# Harden a package\n\nRead the rules first.\n`
		const expected = [
			frontmatter,
			'',
			'# Load the canonical skill',
			'',
			'This file is a pointer the `@orkestrel/scaffold` package writes into every fleet workspace; the',
			'skill itself ships with that package. Read the canonical `SKILL.md` completely and follow it:',
			'',
			'- beside a scaffold checkout, `../scaffold/.agents/skills/orkestrel-harden/SKILL.md`;',
			'- otherwise, `node_modules/@orkestrel/scaffold/dist/host/agents/skills/orkestrel-harden/SKILL.md`.',
			'',
			'Resolve every path the canonical skill names against the same root; under `node_modules` each',
			'segment drops its opening dot. Run a script the skill names through its built twin, as this',
			"repository's `AGENTS.md` states. This pointer carries no process of its own; the authority order is",
			'`.agents/orchestration.md` § Authority.',
			'',
		].join('\n')
		expect(renderSkillPointer(canonical, 'orkestrel-harden')).toBe(expected)
	})

	it('splits a CRLF canonical text into the same pointer as its LF form', () => {
		const canonical =
			'---\nname: orkestrel-polish\ndescription: Polishes a package. Use to finish.\n---\n\n# Polish\n'
		const pointer = renderSkillPointer(canonical, 'orkestrel-polish')
		expect(pointer).toBeDefined()
		expect(renderSkillPointer(canonical.replaceAll('\n', '\r\n'), 'orkestrel-polish')).toBe(pointer)
		expect(pointer).not.toContain('\r')
		expect(pointer).toContain('`../scaffold/.agents/skills/orkestrel-polish/SKILL.md`')
		expect(pointer).not.toContain('{{')
	})

	it('returns undefined when the canonical text opens with no complete frontmatter block', () => {
		expect(renderSkillPointer('# Harden a package\n', 'orkestrel-harden')).toBeUndefined()
		expect(renderSkillPointer('', 'orkestrel-harden')).toBeUndefined()
		expect(renderSkillPointer('---\nname: orkestrel-harden\n', 'orkestrel-harden')).toBeUndefined()
		expect(
			renderSkillPointer('\n---\nname: orkestrel-harden\n---\n', 'orkestrel-harden'),
		).toBeUndefined()
	})
})

// A `for…of` loop reads one entry, works on it, and stops at the first failure, where a copy of the
// list reads every entry first. Each case runs the helper over a list of two recorded entries and
// pins the constructor it raised and the entries it read, as the loop the helper replaced gave them.
describe('helpers over a caller-supplied list read one entry at a time', () => {
	it.each([
		buildLazyCase(
			'the entries a catalog is layered over',
			(shape) =>
				readLazily(
					shape,
					buildCatalogEntry,
					(entries) => catalogToLayers(entries),
					refuseObject(buildCatalogEntry),
				),
			{
				hole: { outcome: 'TypeError', reads: [1] },
				refused: { outcome: 'RangeError', reads: [1] },
				dense: { outcome: 'return', reads: [0, 1, 0, 1] },
			},
		),
		buildLazyCase('the artifacts a plan is summarized over', (shape) =>
			readLazily(
				shape,
				buildContentArtifact,
				(artifacts) => planToSummary(buildPlan({ artifacts })),
				refuseObject(buildContentArtifact),
			),
		),
	])('reads $label one entry at a time', ({ read, hole, refused, refusal, dense }) => {
		expect(read('hole-before-entry')).toStrictEqual(hole)
		expect(read('hole-before-refusal')).toStrictEqual(refused)
		expect(read('refusal-before-entry')).toStrictEqual(refusal)
		expect(read('dense-pair')).toStrictEqual(dense)
	})
})

// A `for…of` loop takes the iterator a list names and refuses a list that names none, where
// `Array.from` and `values()` fall back to the indexes and answer. Each case runs the helper over a
// list whose `Symbol.iterator` is `undefined` and pins the constructor and the entries read first.
describe('helpers over a list without an iterator refuse it as the loop did', () => {
	it.each([
		// The first pass filters the entries, which reads each one, before the iterator is taken.
		buildMissingCase(
			'the entries a catalog is layered over',
			buildCatalogEntry,
			(entries) => catalogToLayers(entries),
			[0, 1],
		),
		buildMissingCase('the artifacts a plan is summarized over', buildContentArtifact, (artifacts) =>
			planToSummary(buildPlan({ artifacts })),
		),
	])('refuses $label after the reads it names', ({ read, reads }) => {
		expect(read()).toStrictEqual({ outcome: 'TypeError', reads })
	})

	it('refuses bytes without an iterator and follows bytes with another', () => {
		const missing = new Uint8Array([0x68, 0x69])
		Object.defineProperty(missing, Symbol.iterator, { value: undefined })
		const replaced = new Uint8Array([0x68, 0x69])
		Object.defineProperty(replaced, Symbol.iterator, {
			value: function* () {
				yield 0xab
			},
		})

		expect(() => bytesToHex(missing)).toThrow(TypeError)
		expect(bytesToHex(replaced)).toBe('ab')
		expect(bytesToHex(new Uint8Array([0x68, 0x69]))).toBe('6869')
	})
})
