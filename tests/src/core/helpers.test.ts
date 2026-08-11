import type { Finding, Group, Ownership } from '@src/core'
import { describe, expect, it } from 'vitest'
import {
	artifactToHex,
	bytesToHex,
	compareVersions,
	computeBytes,
	computeHash,
	contentToHex,
	extractVersion,
	GROUPS,
	HOST_PATHS,
	inferDrift,
	inferGroup,
	isCollection,
	isDependency,
	manifestToDependencies,
	manifestToName,
	matchesDriftReachability,
	matchesEngines,
	matchesOrchestrationPath,
	matchesRange,
	MAX_MANIFEST_BYTES,
	nameToGuide,
	planToSummary,
	selectGroups,
	selectHostPaths,
	serializeTypeScriptString,
} from '@src/core'
import {
	buildBlueprint,
	buildContentArtifact,
	buildHostArtifact,
	buildHydratedArtifact,
	buildPlan,
	buildPurityCases,
	MANIFEST_SAMPLE,
	RANGE_CASES,
	waitForDelay,
} from '../../setup.js'

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

describe('matchesOrchestrationPath', () => {
	it('reads a harness directory and the exact bench filenames as orchestration', () => {
		expect(matchesOrchestrationPath('.claude/rules/names.md')).toBe(true)
		expect(matchesOrchestrationPath('.agents/orchestration.md')).toBe(true)
		expect(matchesOrchestrationPath('scripts/deps.sh')).toBe(true)
		expect(matchesOrchestrationPath('.mcp.json')).toBe(true)
		expect(matchesOrchestrationPath('.oxlintrc.json')).toBe(false)
		expect(matchesOrchestrationPath('.claudeignore')).toBe(false)
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

describe('serializeTypeScriptString', () => {
	it('escapes every character that can leave a single-quoted literal', () => {
		expect(serializeTypeScriptString("a'b\\c\n\t\u2028\u2029")).toBe(
			"'a\\'b\\\\c\\n\\t\\u2028\\u2029'",
		)
	})
})

describe('selectHostPaths', () => {
	it('drops the workspace’s own guide and keeps every other candidate in order', () => {
		const selected = selectHostPaths(HOST_PATHS, 'scaffold')
		expect(selected).not.toContain('guides/scaffold.md')
		expect(selected).toContain('guides/guide.md')
		expect(selected).toHaveLength(HOST_PATHS.length - 1)
		expect(selected).toStrictEqual(HOST_PATHS.filter((path) => path !== 'guides/scaffold.md'))
	})

	it('keeps every candidate for a workspace that vendors no guide of its own', () => {
		expect(selectHostPaths(HOST_PATHS, 'router')).toStrictEqual(HOST_PATHS)
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
})

describe('extractVersion and compareVersions', () => {
	it('reads only the exact three-component syntax', () => {
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
		expect(matchesEngines('>=22.12.0')).toBe(true)
		expect(matchesEngines('>=24.0.0')).toBe(true)
		expect(matchesEngines('>=22.11.0')).toBe(false)
		expect(matchesEngines('>=20.0.0')).toBe(false)
		expect(matchesEngines('22.12.0')).toBe(false)
		expect(matchesEngines('>=22.12')).toBe(false)
		expect(matchesEngines('^22.12.0')).toBe(false)
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
		expect(manifestToDependencies(oversized)).toStrictEqual([])
	})
})

describe('manifestToDependencies', () => {
	it('reads the fleet packages in section order, first declaration winning', () => {
		expect(manifestToDependencies(MANIFEST_SAMPLE)).toStrictEqual([
			{ name: '@orkestrel/emitter', range: '^0.0.5' },
			{ name: '@orkestrel/guide', range: '^0.0.9' },
		])
	})

	it('answers an empty list for text it cannot read', () => {
		expect(manifestToDependencies('{')).toStrictEqual([])
		expect(manifestToDependencies('[]')).toStrictEqual([])
		expect(manifestToDependencies('{}')).toStrictEqual([])
	})

	it('returns rows that cross this package’s own boundary unchanged', () => {
		const dependencies = manifestToDependencies(MANIFEST_SAMPLE)
		expect(isCollection(dependencies)).toBe(true)
		for (const dependency of dependencies) expect(isDependency(dependency)).toBe(true)
	})

	it('skips a declaration whose name or range is off contract', () => {
		const manifest =
			'{"dependencies":{"@orkestrel/Router":"^0.0.8","@orkestrel/router":"","@orkestrel/guide":9,"@orkestrel/emitter":"^0.0.5"}}'
		expect(manifestToDependencies(manifest)).toStrictEqual([
			{ name: '@orkestrel/emitter', range: '^0.0.5' },
		])
	})
})
