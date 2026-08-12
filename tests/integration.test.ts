import { spawnSync } from 'node:child_process'
import {
	existsSync,
	globSync,
	mkdtempSync,
	mkdirSync,
	readFileSync,
	rmSync,
	writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import ts from 'typescript'
import { describe, expect, it } from 'vitest'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const registry =
	spawnSync(npm, ['ping', '--fetch-retries=0', '--fetch-timeout=1000', '--loglevel=silent'], {
		cwd: root,
		stdio: 'ignore',
		timeout: 5_000,
		windowsHide: true,
	}).status === 0

// The two declarations a consumer installs. Both are read, because an example
// is shipped by whichever declaration prints it and a reader hovers over either.
// Each carries controls of its own, and none of them is in either built
// declaration, so every one lies outside the population the instrument covers.
// One control per outcome the rule below can reach, because the instrument has
// one way to report and three ways to say nothing. A false claim must be scored
// a mismatch, which is the proof the comparison can fail at all. A claim the
// rule excludes must be named in the set that excluded it — undriven, glossed,
// or elided — which is the proof the rule reports what it cannot reach instead
// of dropping it. The two false controls in the excluded spellings are the ones
// the previous instrument dropped silently: it named the statement kind alone,
// so a corrected example rewritten with a gloss or an elision left every list
// where it was.
const DECLARATIONS = [
	{
		types: 'dist/src/core/index.d.ts',
		module: 'dist/src/core/index.js',
		controls: [
			// The claim this package shipped before the correction below it, with the
			// value its example only declared. It is false for every blueprint that
			// compiles, and it is the class the previous instrument could not reach.
			[
				"const blueprint = createBlueprint('router', { src: ['core'] })",
				"createCompiler().audit(blueprint, {}).findings.every(({ drift }) => drift === 'missing') // true",
			].join('\n'),
			// A statement rather than an expression, which the rule excludes.
			"if (isGroup('manifest')) inferGroup('AGENTS.md') // 'docs'",
		],
	},
	{
		types: 'dist/src/server/index.d.ts',
		module: 'dist/src/server/index.js',
		controls: [
			"isBranch('main') // false",
			"isBranch('main') // false — a branch name is not a branch",
			"listFiles('./dist/host') // ['definitely-not-a-file', …]",
		],
	},
] as const

// A claim is a line inside a fenced `ts` example whose trailing comment states a
// verdict. That is the population, and every line in it lands in exactly one of
// four sets. It is driven when the verdict parses as a literal and the
// expression the comment sits on closes its own brackets and is an expression
// rather than a statement. Otherwise it is elided, glossed, or undriven, and
// each of those three is asserted as the exact list of lines it holds.
const EXAMPLE = /```ts\n(?<body>[\s\S]*?)```/gu
const CLAIM = /^(?<expression>\S.*?) \/\/ (?<verdict>.+)$/u
const PREFIX = /^\s*\*( |$)/u
const OPENER = /^[A-Za-z_$([]/u
const KEYWORDS = [
	'await',
	'case',
	'catch',
	'class',
	'const',
	'declare',
	'do',
	'else',
	'export',
	'finally',
	'for',
	'function',
	'if',
	'import',
	'let',
	'return',
	'switch',
	'throw',
	'try',
	'var',
	'while',
]
// A verdict this instrument declines to read as a literal. An elided value shows
// a prefix of a shape rather than the whole of one, so there is nothing to
// compare a run against and the line is named rather than scored.
const ELISION = '…'
const ABSENT = '\u0000undefined'

// The child that answers for the claims. It compiles each example block on its
// own, so a block this instrument mis-sliced reports its own refusal instead of
// taking the run down, and it records each claim where the example puts it, so a
// verdict that depends on the lines above it is read after they have run.
const DRIVER = [
	"import { readFileSync } from 'node:fs'",
	"const payload = JSON.parse(readFileSync(0, 'utf8'))",
	'const module = await import(payload.module)',
	'const names = Object.keys(module).filter((name) => /^[A-Za-z_$][\\w$]*$/u.test(name))',
	"const preamble = 'const { ' + names.join(', ') + ' } = module'",
	'const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor',
	'const outcomes = {}',
	'const record = (id, value) => {',
	"	outcomes[id] = { driven: true, encoded: value === undefined ? '\\u0000undefined' : String(JSON.stringify(value)) }",
	'}',
	'for (const block of payload.blocks) {',
	'	let run',
	'	try {',
	"		run = new AsyncFunction('module', 'record', preamble + '\\n' + block.source)",
	'	} catch (error) {',
	'		for (const id of block.claims) outcomes[id] = { driven: false, reason: String(error) }',
	'		continue',
	'	}',
	'	try {',
	'		await run(module, record)',
	'	} catch (error) {',
	'		for (const id of block.claims) {',
	'			if (outcomes[id] === undefined) outcomes[id] = { driven: false, reason: String(error) }',
	'		}',
	'	}',
	'}',
	'process.stdout.write(JSON.stringify(outcomes))',
].join('\n')

describe('installed package consumer', () => {
	it('answers every example its shipped declarations print exactly as printed', () => {
		const workspace = mkdtempSync(join(tmpdir(), 'scaffold-e4-examples-'))
		try {
			const driven: string[] = []
			const undriven: string[] = []
			const elided: string[] = []
			const glossed: string[] = []
			const mismatched: string[] = []
			let shaped = 0
			for (const declaration of DECLARATIONS) {
				const text = readFileSync(resolve(root, declaration.types), 'utf8')
				const bodies = [
					...text
						.replaceAll('\r\n', '\n')
						.split('\n')
						.map((line) => line.replace(PREFIX, ''))
						.join('\n')
						.matchAll(EXAMPLE),
				].map((match) => match.groups?.body ?? '')
				// The controls are appended to the population the driver runs, never to
				// the population extracted from the declaration, so what they prove is a
				// property of the instrument rather than of what the package shipped.
				bodies.push(...declaration.controls)
				const claims: Array<{ readonly text: string; readonly encoded: string }> = []
				const blocks: Array<{ readonly source: string; readonly claims: readonly number[] }> = []
				for (const body of bodies) {
					const lines = body.split('\n')
					const spans: Array<{
						readonly start: number
						readonly end: number
						readonly id: number
					}> = []
					for (const [index, line] of lines.entries()) {
						const match = CLAIM.exec(line.trim())
						const expression = match?.groups?.expression
						const verdict = match?.groups?.verdict
						if (expression === undefined || verdict === undefined) continue
						shaped += 1
						const stated = `${declaration.types}: ${expression} // ${verdict}`
						if (verdict.includes(ELISION)) {
							elided.push(stated)
							continue
						}
						let encoded: string | undefined
						if (verdict === 'undefined') encoded = ABSENT
						else {
							try {
								encoded = JSON.stringify(
									JSON.parse(
										/^(true|false|-?\d+(\.\d+)?)$/u.test(verdict)
											? verdict
											: verdict.replaceAll("'", '"'),
									),
								)
							} catch {
								encoded = undefined
							}
						}
						if (encoded === undefined) {
							glossed.push(stated)
							continue
						}
						// The statement the comment sits on is the shortest run of lines
						// ending here that closes every bracket it opens, so a claim printed
						// across several lines is driven as the one expression it is.
						let opening: number | undefined
						for (let start = index; start >= 0; start -= 1) {
							const joined = [...lines.slice(start, index), expression].join('\n').trim()
							let depth = 0
							let quote = ''
							let escaped = false
							let balanced = true
							for (const character of joined) {
								if (escaped) escaped = false
								else if (character === '\\') escaped = true
								else if (quote !== '') quote = character === quote ? '' : quote
								else if (character === "'" || character === '"' || character === '`') {
									quote = character
								} else if ('(['.includes(character) || character === '{') depth += 1
								else if (')]'.includes(character) || character === '}') depth -= 1
								if (depth < 0) balanced = false
								if (!balanced) break
							}
							if (!balanced || depth !== 0 || quote !== '') continue
							if (!OPENER.test(joined)) break
							if (KEYWORDS.includes(/^[A-Za-z_$][\w$]*/u.exec(joined)?.[0] ?? '')) break
							opening = start
							break
						}
						if (opening === undefined) {
							undriven.push(`${declaration.types}: ${expression}`)
							continue
						}
						// Recorded only once it has a span, so the claim list holds exactly the
						// claims the driver is asked to answer and an unanswered id below is a
						// claim the block reached past rather than one already named here.
						const id = claims.length
						claims.push({ text: expression, encoded })
						spans.push({ start: opening, end: index, id })
					}
					if (spans.length === 0) continue
					const source: string[] = []
					for (const [index, line] of lines.entries()) {
						const span = spans.find((candidate) => candidate.start === index)
						if (span !== undefined) {
							const opening = lines.slice(span.start, span.end)
							const expression = CLAIM.exec(lines[span.end]?.trim() ?? '')?.groups?.expression ?? ''
							source.push(`record(${String(span.id)}, (${[...opening, expression].join('\n')}))`)
							continue
						}
						if (spans.some((candidate) => index > candidate.start && index <= candidate.end))
							continue
						if (/^\s*(import|declare|export)\b/u.test(line)) continue
						source.push(line)
					}
					// An example is TypeScript, so the real compiler erases its types
					// rather than a pattern written here guessing at them.
					blocks.push({
						source: ts.transpileModule(source.join('\n'), {
							compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ESNext },
						}).outputText,
						claims: spans.map((span) => span.id),
					})
				}
				const answered = spawnSync(process.execPath, ['--input-type=module', '--eval', DRIVER], {
					cwd: workspace,
					encoding: 'utf8',
					input: JSON.stringify({
						module: pathToFileURL(resolve(root, declaration.module)).href,
						blocks,
					}),
					timeout: 120_000,
					windowsHide: true,
				})
				expect(answered.stderr).toBe('')
				expect(answered.status).toBe(0)
				const outcomes: unknown = JSON.parse(answered.stdout)
				if (typeof outcomes !== 'object' || outcomes === null) {
					throw new Error(`${declaration.types} produced no outcomes`)
				}
				for (const [index, claim] of claims.entries()) {
					const outcome: unknown = Object.getOwnPropertyDescriptor(outcomes, String(index))?.value
					// The driver answers for every claim in a block it ran, so a claim with
					// no outcome at all is one the block reached past rather than one the
					// module contradicted. It is undriven for the same reason a statement
					// is, and naming it here is what keeps the four sets a partition.
					if (typeof outcome !== 'object' || outcome === null) {
						undriven.push(`${declaration.types}: ${claim.text}`)
						continue
					}
					const encoded: unknown = Object.getOwnPropertyDescriptor(outcome, 'encoded')?.value
					if (typeof encoded !== 'string') {
						undriven.push(`${declaration.types}: ${claim.text}`)
						continue
					}
					driven.push(`${declaration.types}: ${claim.text}`)
					if (encoded !== claim.encoded) {
						mismatched.push(`${claim.text} // ${claim.encoded} answered ${encoded}`)
					}
				}
			}

			// The four sets partition the population rather than sampling it, so no
			// claim-shaped line can leave the rule without arriving in a list below.
			// This is the assertion the lists are exact against: a shipped example
			// that changes spelling moves between two of them and both move.
			expect(driven.length + undriven.length + glossed.length + elided.length).toBe(shaped)
			expect(shaped).toBe(165)

			// Every claim scored false is a control, and nothing the package ships is.
			// This establishes that a driven claim the module contradicts is reported,
			// in both declarations and through the binding the retired claim needed. It
			// establishes nothing about a claim the rule excludes.
			expect(mismatched).toStrictEqual([
				"createCompiler().audit(blueprint, {}).findings.every(({ drift }) => drift === 'missing') // true answered false",
				"isBranch('main') // false answered true",
			])
			// The membership rule, stated as the three exact sets it leaves out. A
			// claim is glossed when its verdict is prose, elided when its verdict shows
			// a prefix of a value, and undriven when the expression the comment sits on
			// is a statement or the block carrying it refused to compile or threw. Each
			// list ends with a control excluded for that list's reason, and each of
			// those controls is false against the build, so no shipped example can
			// change spelling and no exclusion can widen without the list that gains
			// the line moving with it. The lists are long because most shipped verdicts
			// are prose, and reporting that is the point of naming them.
			expect(glossed).toStrictEqual([
				"dist/src/core/index.d.ts: ) // { path: 'README.md', group: 'docs', ownership: 'content', drift: 'stale', observed: '6279650a' }",
				'dist/src/core/index.d.ts: blueprintToDevDependencies(blueprint).typescript // the shared TypeScript pin',
				"dist/src/core/index.d.ts: createBlueprint('Router').name // 'Router' — the gate refuses it, this does not",
				'dist/src/core/index.d.ts: ).length // 1 — the range is not caret-pinned',
				"dist/src/core/index.d.ts: isBlueprint({ name: 'router', src: ['core'] }) // false — not the whole record",
				'dist/src/core/index.d.ts: parseCompilerOptions({ on: { compile: () => {} } }) // the same record',
				'dist/src/core/index.d.ts: planToSummary(plan).computed // the number of computed artifacts',
				'dist/src/core/index.d.ts: selectGroups() // every group, in plan order',
				"dist/src/core/index.d.ts: serializeTypeScriptString(\"it's\") // `'it\\\\'s'`",
				"dist/src/server/index.d.ts: computeFileDigest('/tmp/project/AGENTS.md') // the file's SHA-256",
				'dist/src/server/index.d.ts: computeManifestDigest([], []) // the digest of the empty membership',
				"dist/src/server/index.d.ts: isExactCaseFile('/tmp/project/src/bin/main.ts') // true only for that exact spelling",
				"dist/src/server/index.d.ts: isPhysicalDirectory('/tmp/project') // true for a plain directory",
				"dist/src/server/index.d.ts: isPhysicalFile('/tmp/project/AGENTS.md') // true for a plain file",
				"dist/src/server/index.d.ts: isVacant('./packages/router-new') // true when absent, empty, or `.git` only",
				'dist/src/server/index.d.ts: anchor !== undefined && matchesAnchor(anchor) // true while it is untouched',
				'dist/src/server/index.d.ts: expectation !== undefined && matchesExpectation(expectation) // true while untouched',
				"dist/src/server/index.d.ts: matchesPrecondition({ path: '/tmp/project/new.md', shape: 'absent' }) // true while absent",
				"dist/src/server/index.d.ts: readAnchor('/tmp/project') // { path: '/tmp/project', device: 1, inode: 2 }",
				"dist/src/server/index.d.ts: readHostManifest('./dist/host') // the manifest, or undefined for a raw root",
				"dist/src/server/index.d.ts: resolveRealPath('./packages/new/src') // the real path of `packages`, plus `new/src`",
				"dist/src/server/index.d.ts: stageHost(process.cwd(), 'dist/host').length // the files staged",
				"dist/src/server/index.d.ts: isBranch('main') // false — a branch name is not a branch",
			])
			expect(elided).toStrictEqual([
				"dist/src/server/index.d.ts: listDirectories('./.claude') // ['agents', 'rules', 'skills', …]",
				"dist/src/server/index.d.ts: listFiles('./dist/host') // ['AGENTS.md', 'CLAUDE.md', 'LICENSE', …]",
				"dist/src/server/index.d.ts: readExpectation('/tmp/project/absent.md') // { path: …, shape: 'absent' }",
				"dist/src/server/index.d.ts: readFileHex('/tmp/project', 'AGENTS.md') // '2320416765…'",
				"dist/src/server/index.d.ts: readFileText('/tmp/project', 'package.json') // '{ \"name\": \"@orkestrel/router\", … }'",
				"dist/src/server/index.d.ts: listFiles('./dist/host') // ['definitely-not-a-file', …]",
			])
			expect(undriven).toStrictEqual([
				'dist/src/core/index.d.ts: if (isScaffoldError(error)) error.code',
				"dist/src/core/index.d.ts: if (isGroup('manifest')) inferGroup('AGENTS.md')",
			])
			// Both declarations contribute, and the corrected claim is one of them.
			// The previous instrument read one function in one file.
			expect(driven).toContain(
				"dist/src/core/index.d.ts: createCompiler().audit(blueprint, {}, ['manifest']).findings[0]?.drift",
			)
			expect(driven).toContain("dist/src/server/index.d.ts: isFilesystemPath('project/')")
			expect(driven.filter((claim) => claim.startsWith('dist/src/core/')).length).toBeGreaterThan(
				80,
			)
			expect(driven.filter((claim) => claim.startsWith('dist/src/server/')).length).toBeGreaterThan(
				40,
			)
		} finally {
			rmSync(workspace, { recursive: true, force: true })
		}
	})

	it('drives the built compiler from outside the checkout without a network install', () => {
		const workspace = mkdtempSync(join(tmpdir(), 'scaffold-e4-driver-'))
		const target = join(workspace, 'generated')
		const core = pathToFileURL(resolve(root, 'dist/src/core/index.js')).href
		const server = pathToFileURL(resolve(root, 'dist/src/server/index.js')).href
		const missing = pathToFileURL(resolve(root, 'dist/outside-integration-control.js')).href
		try {
			const control = spawnSync(
				process.execPath,
				['--input-type=module', '--eval', `await import(${JSON.stringify(missing)})`],
				{ cwd: workspace, encoding: 'utf8', windowsHide: true },
			)
			expect(control.status).not.toBe(0)

			const source = [
				`const core = await import(${JSON.stringify(core)})`,
				`const server = await import(${JSON.stringify(server)})`,
				"const blueprint = core.createBlueprint('proof', { src: ['core', 'server'], bin: true, integration: true })",
				'const compiler = core.createCompiler()',
				'const plan = compiler.compile(blueprint).plan',
				"if (plan === undefined) throw new Error('The generated proof blueprint was blocked')",
				'compiler.destroy()',
				`const materializer = server.createMaterializer({ host: ${JSON.stringify(resolve(root, 'dist/host'))} })`,
				`const result = materializer.materialize(plan, ${JSON.stringify(target)})`,
				'materializer.destroy()',
				'process.stdout.write(String(result.written.length))',
			].join('\n')
			const driven = spawnSync(process.execPath, ['--input-type=module', '--eval', source], {
				cwd: workspace,
				encoding: 'utf8',
				windowsHide: true,
			})
			expect(driven.status).toBe(0)
			expect(driven.stderr).toBe('')
			expect(Number(driven.stdout)).toBeGreaterThan(0)
			expect(existsSync(join(target, 'tests/config.test.ts'))).toBe(true)
			expect(existsSync(join(target, 'tests/integration.test.ts'))).toBe(true)
			expect(existsSync(join(target, 'tests/guides.test.ts'))).toBe(false)
			const manifest = readFileSync(join(target, 'package.json'), 'utf8')
			expect(manifest).toContain('"test:config"')
			expect(manifest).toContain('"test:integration"')
			expect(manifest).not.toContain('"test:guides"')
		} finally {
			rmSync(workspace, { recursive: true, force: true })
		}
	})

	it.skipIf(!registry)(
		'installs the packed scaffold and passes one generated core/server workspace through prepublish [requires a reachable npm registry]',
		() => {
			const workspace = mkdtempSync(join(tmpdir(), 'scaffold-e4-install-'))
			const packed = join(workspace, 'packed')
			const consumer = join(workspace, 'consumer')
			const target = join(workspace, 'generated')
			try {
				mkdirSync(packed, { recursive: true })
				mkdirSync(consumer, { recursive: true })
				const pack = spawnSync(
					npm,
					['pack', '--json', '--ignore-scripts', '--pack-destination', packed],
					{ cwd: root, encoding: 'utf8', windowsHide: true },
				)
				expect(pack.status).toBe(0)
				const archives = globSync('*.tgz', { cwd: packed })
				expect(archives).toHaveLength(1)
				const archive = archives[0]
				if (archive === undefined) throw new Error('The package archive was not written')
				writeFileSync(
					join(consumer, 'package.json'),
					'{"name":"scaffold-install-consumer","private":true,"type":"module"}\n',
				)
				const install = spawnSync(
					npm,
					['install', '--ignore-scripts', '--no-audit', '--no-fund', join(packed, archive)],
					{ cwd: consumer, encoding: 'utf8', windowsHide: true },
				)
				expect(install.status).toBe(0)
				writeFileSync(
					join(consumer, 'generate.mjs'),
					[
						"import { createBlueprint, createCompiler } from '@orkestrel/scaffold'",
						"import { createMaterializer } from '@orkestrel/scaffold/server'",
						"const blueprint = createBlueprint('proof', { src: ['core', 'server'], bin: true, integration: true })",
						'const compiler = createCompiler()',
						'const plan = compiler.compile(blueprint).plan',
						"if (plan === undefined) throw new Error('The generated proof blueprint was blocked')",
						'compiler.destroy()',
						'const materializer = createMaterializer()',
						`materializer.materialize(plan, ${JSON.stringify(target)})`,
						'materializer.destroy()',
					].join('\n'),
				)
				const generate = spawnSync(process.execPath, ['generate.mjs'], {
					cwd: consumer,
					encoding: 'utf8',
					windowsHide: true,
				})
				expect(generate.status).toBe(0)
				const dependencies = spawnSync(
					npm,
					['install', '--ignore-scripts', '--no-audit', '--no-fund'],
					{ cwd: target, encoding: 'utf8', windowsHide: true },
				)
				expect(dependencies.status).toBe(0)
				const gates = spawnSync(npm, ['run', 'prepublishOnly'], {
					cwd: target,
					encoding: 'utf8',
					windowsHide: true,
				})
				expect(gates.status).toBe(0)
			} finally {
				rmSync(workspace, { recursive: true, force: true })
			}
		},
		1_200_000,
	)
})
