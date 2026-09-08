
// This package's own section. Every check before it reads a name — from the guide text or
// from the barrel — and a name that resolves proves nothing about the sentence beside it,
// so a fence whose comment claims a value the code contradicts passes all of them. The
// cases here read what the barrels resolve at runtime, what each implementation publishes,
// and the values the flagship fences claim. Change a fence, change the transcription
// beside it.

const ROOT = fileURLToPath(root)
const WORKBENCH = fileURLToPath(new URL('../tmp/probe', import.meta.url))

// The claim the guide tells a reader to run verbatim. The same literal appears in
// `guides/probe.md`, in the `Claim` contract's own `@example`, and here; the transcription case
// reads each of them out of their files and refuses any difference, so this copy cannot drift
// away from what a consumer copies.
const CLAIM: Claim = {
	project: 'configs/src/tsconfig.core.json',
	case: {
		files: [{ path: 'src/core/greeting.ts', text: "export const GREETING = 'hi'\n" }],
		test: {
			path: 'tmp/probe/greeting.test.ts',
			text: "import { expect, test } from 'vitest'\nimport { GREETING } from '../../src/core/greeting.js'\ntest('greets', () => expect(GREETING).toBe('hi'))\n",
		},
	},
	control: {
		files: [{ path: 'src/core/greeting.ts', text: "export const GREETING: number = 'hi'\n" }],
		test: {
			path: 'tmp/probe/greeting.test.ts',
			text: "import { expect, test } from 'vitest'\nimport { GREETING } from '../../src/core/greeting.js'\ntest('greets', () => expect(GREETING).toBe('hi'))\n",
		},
		stage: 'type',
		reason: 'a string literal assigned to a number must not compile',
	},
}

const OPENING = 'const claim: Claim = {'
const DIGEST = '0806fb30f428edb8ea85adfb4b355441'
const DEFAULT_DESCRIPTION = 'The @orkestrel/probe package.'

// Each published class beside the contracts it declares it implements, inherited ones included,
// because an interface body carries only its own members.
const IMPLEMENTATIONS: ReadonlyArray<readonly [string, readonly string[]]> = [
	['Probe', ['ProbeInterface']],
	['ProbeServer', ['ProbeServerInterface']],
	['TypeStage', ['StageInterface', 'TypeStageInterface']],
	['LintStage', ['StageInterface']],
	['RuntimeStage', ['StageInterface']],
	['Overlay', ['OverlayInterface']],
]

/** Reads one inventoried file's text, in the same root-relative spelling the readers key on. */
function readWorkspaceText(path: string): string {
	return requireValue(files[path], `Missing file: ${path}`)
}

// Takes an object literal out of a document, from the line that opens it to the first later line
// that is a lone `}`. Every copy of the flagship claim sits at the left margin of its own document,
// which is what makes the terminator unambiguous without parsing the language around it.
function extractLiteral(text: string, opening: string): string {
	const lines = text.split('\n')
	const start = lines.findIndex((line) => line === opening)
	if (start === -1) return ''
	const end = lines.findIndex((line, index) => index > start && line === '}')
	if (end === -1) return ''
	return lines.slice(start, end + 1).join('\n')
}

// Strips the TSDoc gutter from a comment block, so a documented example can be compared against the
// same text written as ordinary source.
function stripComment(text: string): string {
	return text
		.split('\n')
		.map((line) => line.replace(/^\s*\* ?/, ''))
		.join('\n')
}

// Reads the documentation comment declared for one exported symbol. The body pattern refuses a
// comment terminator, so the match starts at the comment attached to the declaration rather than at
// the first comment in the file.
function extractComment(source: string, symbol: string): string {
	const declaration = new RegExp(
		`/\\*\\*((?:[^*]|\\*(?!/))*)\\*/\\s*export\\s+(?:declare\\s+)?(?:abstract\\s+)?(?:async\\s+)?(?:function|const|class|interface|type)\\s+${symbol}\\b`,
	)
	const block = declaration.exec(source)?.[1]
	return block === undefined ? '' : stripComment(block)
}

// Takes the lines of one interface's own body, from its opening line to its closing brace.
function extractBody(source: string, symbol: string): readonly string[] {
	const opening = new RegExp(`^export interface ${symbol}\\b[^\\n]*\\{$`, 'm')
	const start = opening.exec(source)
	if (start?.index === undefined) return []
	const body = source.slice(start.index).split('\n')
	const end = body.findIndex((line, index) => index > 0 && line === '}')
	return body.slice(1, end === -1 ? undefined : end)
}

// Reads the readonly data properties one interface declares in its own body. These belong in the
// guide's surface row rather than in its method table, and they still reach a class prototype as
// getters, so the implementation sweep counts them.
function extractProperties(source: string, symbol: string): readonly string[] {
	return extractBody(source, symbol)
		.map((line) => /^\treadonly ([A-Za-z_][A-Za-z0-9_]*)[?]?:/.exec(line)?.[1])
		.filter((name): name is string => name !== undefined)
}

// Reads the call-signature members one interface declares in its own body, ignoring the members it
// inherits and the readonly data properties that belong in the guide's surface tables.
function extractMembers(source: string, symbol: string): readonly string[] {
	return extractBody(source, symbol)
		.map((line) => /^\t([A-Za-z_][A-Za-z0-9_]*)\(/.exec(line)?.[1])
		.filter((name): name is string => name !== undefined)
}

// Takes one heading's slice of a document, up to the next heading at the same or a higher level.
function extractSection(text: string, heading: string): string {
	const level = heading.split(' ')[0]?.length ?? 2
	const start = text.indexOf(`${heading}\n`)
	if (start === -1) return ''
	const rest = text.slice(start + heading.length)
	const next = new RegExp(`\\n#{1,${level}} `).exec(rest)
	return next === null ? rest : rest.slice(0, next.index)
}

const GUIDE = readWorkspaceText(GUIDE_SPEC)
const CORE_TYPES = readWorkspaceText('src/core/types.ts')
const SERVER_TYPES = readWorkspaceText('src/server/types.ts')
const MANIFEST: unknown = JSON.parse(readWorkspaceText('package.json'))
const reflected = createSource({ files, module: own.source })

// Returns whichever contract file declares one interface. The package splits its contracts across
// its environments, and a lookup that guessed would compare a class against an empty body.
function readContract(symbol: string): string {
	return extractBody(CORE_TYPES, symbol).length > 0 ? CORE_TYPES : SERVER_TYPES
}

describe('guides parity', () => {
	// The reflected surface is the population of record, and these are the values behind it. Every
	// name a barrel resolves at runtime is one that surface names, and every one of them resolves to
	// a value, so a barrel row that names a module the reflection never read fails here rather than
	// shipping.
	it('resolves every value the barrels publish', () => {
		const published = reflected.surface().map((symbol) => symbol.name)
		expect(published.length).toBeGreaterThan(0)
		for (const entry of [core, server]) {
			for (const [name, value] of Object.entries(entry)) {
				expect(value, `${name} resolved to undefined`).toBeDefined()
				expect(published, `${name} is reachable from no barrel`).toContain(name)
			}
		}
	})

	// The compiler agrees a class is at least its interface, and nothing in the language says it is
	// no more than that. This reads the prototype the barrel resolves and compares it against the
	// interfaces the class declares it implements, so public behavior no contract declares — and no
	// guide row therefore documents — fails here rather than shipping.
	it('publishes exactly the members each implementation declares it implements', () => {
		const resolved = new Map<string, unknown>([...Object.entries(core), ...Object.entries(server)])
		expect(IMPLEMENTATIONS.length).toBeGreaterThan(0)
		for (const [name, contracts] of IMPLEMENTATIONS) {
			const implementation = resolved.get(name)
			expect(isConstructor(implementation), `${name} did not resolve to a class`).toBe(true)
			if (!isConstructor(implementation)) continue
			const declared = contracts.flatMap((contract) => {
				const source = readContract(contract)
				return [...extractMembers(source, contract), ...extractProperties(source, contract)]
			})
			expect(declared.length, `${name} declares no members`).toBeGreaterThan(0)
			expect(
				Object.getOwnPropertyNames(implementation.prototype)
					.filter((member) => member !== 'constructor')
					.sort(),
			).toStrictEqual([...new Set(declared)].sort())
		}
	})

	// Wider than the Surface-function sweep the drop-in runs: every barrelled export carries a
	// worked block, a type and a constant included, because a consumer meets each of them in an
	// editor rather than in the guide.
	it('carries a documented example for every barrelled export', () => {
		const exampled = new Set(reflected.examples().map((example) => example.name))
		const published = reflected.surface().map((symbol) => symbol.name)
		expect(published.length).toBeGreaterThan(0)
		expect(published.filter((name) => !exampled.has(name))).toStrictEqual([])
	})

	it('names the guard the tool actually applies to an arriving claim', () => {
		const remarks = extractComment(readWorkspaceText('src/core/shapers.ts'), 'CLAIM_SHAPE')
		const named = /admits a call with\s+`([^`]+)`/.exec(remarks)?.[1]
		expect(named).toBe('isClaim')
		expect(readWorkspaceText('src/server/ProbeServer.ts')).toContain(
			`if (!${String(named)}(input))`,
		)
	})

	it('ships registry metadata and a README that are not the scaffold default', () => {
		expect(MANIFEST).toMatchObject({
			name: '@orkestrel/probe',
			description: expect.not.stringContaining(DEFAULT_DESCRIPTION),
			keywords: expect.arrayContaining([expect.any(String)]),
		})
		const readme = readWorkspaceText('README.md')
		expect(readme).toContain('dist/bin/main.js')
		expect(readme).toContain('prove')
		expect(readme).toContain('receipt')
	})
})

describe('guides fences', () => {
	it('states the same claim in the guide, the contract, and this proof', () => {
		const transcribed = extractLiteral(
			readWorkspaceText('tests/guides.test.ts'),
			`${OPENING.replace('claim', 'CLAIM')}`,
		)
		expect(transcribed).not.toBe('')
		const documented = extractLiteral(GUIDE, OPENING)
		const contract = extractLiteral(extractComment(CORE_TYPES, 'Claim'), OPENING)
		expect(documented).toBe(contract)
		expect(documented).toBe(transcribed.replace('const CLAIM: Claim = {', OPENING))
	})

	it('states the constants at the values it publishes', () => {
		const constants = extractSection(GUIDE, '### Constants')
		expect(constants).toContain("`['type', 'lint', 'runtime']`")
		expect(PROBE_STAGES).toStrictEqual(['type', 'lint', 'runtime'])
		expect(constants).toContain("`['claimant', 'workspace', 'instrument']`")
		expect(core.PROBE_PARTIES).toStrictEqual(['claimant', 'workspace', 'instrument'])
		expect(constants).toContain("`'probe'`")
		expect(RECEIPT_PREFIX).toBe('probe')
		expect(constants).toContain("`':'`")
		expect(RECEIPT_SEPARATOR).toBe(':')
	})

	// The failure table is the guide's own copy of the ownership and condition axes, so it is read
	// against the tuples the package publishes rather than against a memory of them. Each declared
	// value appears in the column that carries it, and no row invents a value neither tuple declares.
	it('names every declared party and condition in the failure table', () => {
		const rows = [...extractSection(GUIDE, '## Failures').matchAll(/^\| `([^`]+)` +\| `([^`]+)`/gm)]
		expect(rows.length).toBeGreaterThan(0)
		const parties = new Set(rows.map((row) => row[1] ?? ''))
		const codes = new Set(rows.map((row) => row[2] ?? ''))
		expect([...parties].sort()).toStrictEqual([...core.PROBE_PARTIES].sort())
		expect([...codes].sort()).toStrictEqual([...core.PROBE_ERROR_CODES].sort())
	})

	// The guide states what `verdict.digest` covers. `prove` computes it with `computeDigest` over
	// the case and the control, read against the workspace, so these assertions read the same
	// function through the same inputs and would break if either sentence went false again.
	it('digests the reason and the workspace the guide says it digests', () => {
		const body = { case: CLAIM.case, control: CLAIM.control }
		const reworded = {
			case: CLAIM.case,
			control: { ...CLAIM.control, reason: 'the falsifier, restated in other words' },
		}
		// A claim carrying an absolute string, which is the member the workspace rewrite reaches.
		const anchored = {
			case: {
				files: [],
				test: { path: 'tmp/probe/anchored.test.ts', text: '/srv/checkout/src/core/greeting.ts' },
			},
			control: CLAIM.control,
		}

		// The instrument reproduces the token the flagship fence documents, so the assertions below
		// are read against the digest the package really ships.
		expect(computeDigest(ROOT, body)).toBe(DIGEST)
		// Two claims differing only in the reason's prose are two claims.
		expect(computeDigest(ROOT, reworded)).not.toBe(DIGEST)
		// The flagship claim carries no absolute string, so its digest is the same in any workspace.
		expect(computeDigest('/srv/checkout', body)).toBe(DIGEST)
		// A claim that carries one is read against the workspace it runs in.
		expect(computeDigest('/srv/checkout', anchored)).not.toBe(computeDigest('/opt/other', anchored))
	})

	it('earns the receipt the guide documents', { timeout: 300_000 }, async () => {
		// `tmp` is ignored by version control, so a fresh clone of a consumer's repository holds no
		// `tmp/probe`, and the flagship claim declares its test there. The deletion belongs before
		// construction rather than before `prove`: arming creates that directory for its own controls
		// and tidies it away again, so the claim below runs against exactly what a consumer's first
		// claim runs against.
		rmSync(WORKBENCH, { force: true, recursive: true })
		expect(existsSync(WORKBENCH)).toBe(false)
		const probe = new Probe({ workspace: ROOT, deadline: 120_000 })
		try {
			const verdict = await probe.prove(CLAIM)
			expect(verdict.receipt).toBeDefined()
			expect(verdict.digest).toBe(DIGEST)
			expect(verdict.reason).toBe(CLAIM.control.reason)
			const receipt = verdict.receipt ?? ''
			// The guide's parsing rule, applied to the token the run returned: the prefix, the digest,
			// the stage, and a field per tool, then a remainder carrying the project path and its digest.
			const fields = receipt.split(RECEIPT_SEPARATOR)
			const remainder = fields.slice(6).join(RECEIPT_SEPARATOR)
			const boundary = remainder.lastIndexOf('@')
			expect(fields.slice(0, 3)).toStrictEqual([RECEIPT_PREFIX, DIGEST, 'type'])
			// Read against the workspace's installed manifests rather than against the verdict's own
			// toolchain member, so a token built from the wrong versions cannot agree with itself.
			for (const name of ['typescript', 'oxlint', 'vitest'] as const) {
				const installed = readWorkspaceManifest(ROOT, name).contents.version
				expect(fields).toContain(`${name}@${String(installed)}`)
			}
			expect(remainder.slice(0, boundary)).toBe('configs/src/tsconfig.core.json')
			expect(remainder.slice(boundary + 1)).toMatch(/^[0-9a-f]{32}$/)
			expect(GUIDE).toContain(`verdict.digest // '${DIGEST}'`)
			expect(GUIDE).toContain(`verdict.receipt // '${receipt}'`)
		} finally {
			await probe.destroy()
		}
	})
})
