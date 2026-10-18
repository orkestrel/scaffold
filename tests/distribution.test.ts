import { spawnSync } from 'node:child_process'
import { existsSync, globSync, readdirSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { delimiter, dirname, join, relative, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import {
	CANON_PATHS,
	blueprintToConfigArtifacts,
	blueprintToTestArtifacts,
	compareVersions,
	Compiler,
	createBlueprint,
	DISTRIBUTION_TEST_PATH,
	HOST_PATHS,
	MINIMUM_NPM_VERSION,
	REFERENCE_PATHS,
	RELEASE_PROOF_COMMAND,
	replaceManifestRanges,
} from '@src/core'
import { listFiles, Materializer, pathToStorage } from '@src/server'
import { createTeardown, requireValue } from '@orkestrel/test'
import { isRecord, isString, parseJSON } from '@orkestrel/contract'
import { createScratch } from '@orkestrel/test/server'
import { execute, executeSync, readVariable } from '@orkestrel/process/server'
import { transformWithOxc } from 'vite'
import { describe, expect, it } from 'vitest'
import { computeStamp } from '../configs/helpers.js'
import {
	buildReleaseScenarios,
	buildSkillRun,
	buildEnvironment,
	createUpstreamServer,
	CLAIM_DRIVER,
	CLAIM_ELISION,
	CLAIM_EXAMPLE,
	CLAIM_LINE,
	CLAIM_PREFIX,
	countClaims,
	createDistributionScratch,
	DECLARATION_CASES,
	installGeneratedWorkspace,
	GENERATED_VUE_SETUP_FILES,
	installPackedScaffold,
	locateClaimOpening,
	NPM_LAUNCHER,
	NPM_REGISTRY,
	parseClaimVerdict,
	provisionNpm,
	readManifestVersion,
	readNpmFloor,
	readNpmVersion,
	parseVitestReport,
	RELEASE_MODE,
	spawnNpm,
	WORKSPACE_ROOT,
} from './setupServer.js'

describe('installed package consumer', () => {
	it('runs the complete selection through a packed CLI adopter and repairs its wrapper', async () => {
		const started = performance.now()
		const teardown = createTeardown()
		const workspace = createDistributionScratch('propagation-adopter-')
		teardown.add(() => workspace.destroy())
		console.info(`adopter: scratch ${workspace.path}`)
		const environment = buildEnvironment({
			npm_config_prefer_offline: 'true',
			npm_config_legacy_peer_deps: 'false',
			npm_config_strict_peer_deps: 'false',
		})
		const signal = AbortSignal.timeout(590_000)
		try {
			expect(dirname(workspace.path)).toBe(tmpdir())
			const archive = installPackedScaffold(workspace, environment)
			console.info('adopter: pack and consumer install: exit 0')
			const target = join(workspace.path, 'generated')
			const entry = join(
				workspace.path,
				'consumer/node_modules/@orkestrel/scaffold/dist/bin/main.js',
			)
			const generated = await execute(
				{
					file: process.execPath,
					arguments: [
						entry,
						'new',
						'paper',
						'--target',
						target,
						'--src',
						'core,browser',
						'--app',
						'core,browser',
						'--styles',
						'--themes',
						'--showcase',
						'--extend',
						'browser:vue,styles:print',
						'--offline',
						'--json',
					],
				},
				{ workspace: workspace.path, environment, signal, timeout: 60_000, strict: false },
			)
			console.info(
				`adopter: generate: exit ${String(generated.code)}\n${generated.stdout}${generated.stderr}`,
			)
			expect(generated.failed).toBe(false)
			expect(generated.code).toBe(0)
			const manifest = parseJSON(requireValue(workspace.read('generated/package.json')))
			if (!isRecord(manifest) || !isRecord(manifest.devDependencies)) {
				throw new Error('The adopter declares no development dependencies')
			}
			// Install the release being proved instead of the registry version the emitted range names.
			const emitted = manifest.devDependencies['@orkestrel/scaffold']
			expect(emitted).toBe(
				`^${readManifestVersion(readFileSync(join(WORKSPACE_ROOT, 'package.json'), 'utf8'))}`,
			)
			const specifier = `file:${relative(target, archive).replaceAll('\\', '/')}`
			workspace.write(
				'generated/package.json',
				`${JSON.stringify({ ...manifest, devDependencies: { ...manifest.devDependencies, '@orkestrel/scaffold': specifier } }, undefined, '\t')}\n`,
			)
			const admitted = provisionNpm({
				floor: readNpmFloor(manifest),
				prefix: workspace.ensure('npm'),
				environment,
			})
			const installed = await spawnNpm(
				['install', '--ignore-scripts', '--prefer-offline', '--no-audit', '--no-fund'],
				{ workspace: target, environment: admitted.environment, signal },
			)
			console.info(
				`adopter: install: exit ${String(installed.code)}\n${installed.stdout}${installed.stderr}`,
			)
			expect(installed.truncated).toBe(false)
			expect(installed.failed).toBe(false)
			expect(installed.code).toBe(0)
			expect(parseJSON(requireValue(workspace.read('generated/package-lock.json')))).toMatchObject({
				packages: { 'node_modules/@orkestrel/scaffold': { resolved: specifier } },
			})
			const refused = await execute(
				{
					file: process.execPath,
					arguments: [entry, 'repair', '--target', target, '--offline', '--json'],
				},
				{ workspace: target, signal, strict: false, timeout: 60_000 },
			)
			console.info(
				`adopter: file range control: exit ${String(refused.code)}\n${refused.stdout}${refused.stderr}`,
			)
			expect(refused.code).toBe(1)
			expect(parseJSON(refused.stdout)).toMatchObject({
				error: { code: 'FETCH', message: 'A declared dependency names no concrete floor.' },
			})
			// Offline repair reads the declared floor; the tarball override belongs only to installation.
			workspace.write('generated/package.json', `${JSON.stringify(manifest, undefined, '\t')}\n`)
			expect(parseJSON(requireValue(workspace.read('generated/package.json')))).toMatchObject({
				devDependencies: { '@orkestrel/scaffold': emitted },
			})
			if (!isRecord(manifest.scripts)) {
				throw new Error('The adopter declares no scripts')
			}
			expect(Object.hasOwn(manifest.scripts, 'test:setup:browser')).toBe(true)
			expect(Object.hasOwn(manifest.scripts, 'test:setup')).toBe(false)
			for (const script of [
				'lint:check',
				'check',
				'build',
				'test:src',
				'test:app',
				...Object.keys(manifest.scripts).filter((name) => name === 'test:setup:browser'),
				'test:config',
				'test:policy',
				'test:journey',
				'test:journey:vue',
				'build:showcase',
				'build:showcase:vue',
			]) {
				const step = performance.now()
				const run = await spawnNpm(['run', script], {
					workspace: target,
					environment: admitted.environment,
					signal,
				})
				console.info(
					`adopter: ${script}: exit ${String(run.code)}, ${String(Math.round(performance.now() - step))} ms\n${run.stdout}${run.stderr}`,
				)
				expect(run.truncated).toBe(false)
				expect(run.failed, `${script}\n${run.stdout}${run.stderr}`).toBe(false)
				expect(run.code).toBe(0)
			}
			for (const mode of ['browser', 'vue']) {
				const page = requireValue(workspace.read(`generated/showcase/${mode}.html`))
				const stamps = [
					...page.matchAll(/^[\t ]*<meta name="build-id" content="([a-f0-9]{64})" \/>\r?\n/gmu),
				]
				expect(stamps).toHaveLength(1)
				const stamp = requireValue(stamps[0])
				expect(stamp[1]).toBe(computeStamp(page))
				console.info(`adopter: showcase/${mode}.html: stamp ${String(stamp[1])}`)
			}
			workspace.write(
				'generated/tmp/consume.ts',
				[
					"import { build } from 'vite'",
					"import { fileURLToPath } from 'node:url'",
					"const built = await build({ configFile: false, logLevel: 'silent', build: { write: false, cssMinify: false, lib: { entry: fileURLToPath(new URL('./sheets.ts', import.meta.url)), formats: ['es'] } } })",
					'const bundles = Array.isArray(built) ? built : [built]',
					"const sheets = bundles.flatMap((bundle) => 'output' in bundle ? bundle.output.filter((item) => item.type === 'asset' && item.fileName.endsWith('.css')).map((item) => item.source) : [])",
					'console.log(JSON.stringify(sheets))',
				].join('\n'),
			)
			workspace.write(
				'generated/tmp/sheets.ts',
				"import '@orkestrel/paper/styles'\nimport '@orkestrel/paper/print'\nimport '@orkestrel/paper/styles/themes'\n",
			)
			const consumed = await execute(
				{ file: process.execPath, arguments: ['tmp/consume.ts'] },
				{ workspace: target, signal, strict: false, timeout: 60_000 },
			)
			console.info(
				`adopter: CSS consumer: exit ${String(consumed.code)}\n${consumed.stdout}${consumed.stderr}`,
			)
			expect(consumed.failed).toBe(false)
			expect(consumed.code).toBe(0)
			expect(parseJSON(consumed.stdout)).toEqual([
				expect.stringContaining('@layer theme, reset, base, elements, components, utilities;'),
			])
			const wrapper = 'configs/src/vite.print.config.ts'
			const original = readFileSync(join(target, wrapper))
			workspace.remove(`generated/${wrapper}`)
			expect(workspace.has(`generated/${wrapper}`)).toBe(false)
			const repaired = await execute(
				{
					file: process.execPath,
					arguments: [entry, 'repair', '--target', target, '--offline', '--json'],
				},
				{ workspace: target, signal, strict: false, timeout: 60_000 },
			)
			console.info(
				`adopter: repair: exit ${String(repaired.code)}\n${repaired.stdout}${repaired.stderr}`,
			)
			expect(repaired.failed).toBe(false)
			expect(repaired.code).toBe(0)
			expect(readFileSync(join(target, wrapper))).toEqual(original)
			workspace.write(
				`generated/${wrapper}`,
				`${original.toString('utf8')}\n// Adopter drift control.\n`,
			)
			const audited = await execute(
				{
					file: process.execPath,
					arguments: [entry, 'audit', '--target', target, '--offline', '--json'],
				},
				{ workspace: target, signal, strict: false, timeout: 60_000 },
			)
			console.info(
				`adopter: stale audit: exit ${String(audited.code)}\n${audited.stdout}${audited.stderr}`,
			)
			expect(audited.expired).toBe(false)
			expect(audited.code).toBe(1)
			expect(parseJSON(audited.stdout)).toMatchObject({
				findings: expect.arrayContaining([
					expect.objectContaining({ path: wrapper, drift: 'stale' }),
				]),
			})
		} finally {
			await teardown.destroy()
			console.info(
				`adopter: wall time ${String(Math.round(performance.now() - started))} ms; scratch removed: ${String(!existsSync(workspace.path))}`,
			)
		}
	}, 600_000)

	it('stages exactly the declared vendored host inventory', () => {
		// Directory members are expanded into exact declared membership. A vendored inventory
		// change must move this declaration; a file present only because work happened in the checkout
		// must not enter the published host.
		const expanded = [
			'AGENTS.md',
			'LICENSE',
			'.agents/orchestration.md',
			'.agents/skills/enterprise-bootstrap/SKILL.md',
			'.agents/skills/enterprise-bootstrap/agents/openai.yaml',
			'.agents/skills/enterprise-bootstrap/references/bootstrap-reference.md',
			'.agents/skills/enterprise-bootstrap/references/color-modes.md',
			'.agents/skills/enterprise-bootstrap/references/components.md',
			'.agents/skills/enterprise-bootstrap/references/frontend-design.md',
			'.agents/skills/enterprise-bootstrap/references/inputs.md',
			'.agents/skills/enterprise-bootstrap/references/inspection.md',
			'.agents/skills/enterprise-bootstrap/references/responsive-layout.md',
			'.agents/skills/enterprise-bootstrap/references/utilities.md',
			'.agents/skills/orkestrel-align/SKILL.md',
			'.agents/skills/orkestrel-align/agents/openai.yaml',
			'.agents/skills/orkestrel-align/references/fleet.md',
			'.agents/skills/orkestrel-align/references/integration.md',
			'.agents/skills/orkestrel-build/SKILL.md',
			'.agents/skills/orkestrel-build/agents/openai.yaml',
			'.agents/skills/orkestrel-debrief/SKILL.md',
			'.agents/skills/orkestrel-debrief/agents/openai.yaml',
			'.agents/skills/orkestrel-debrief/references/field-testing.md',
			'.agents/skills/orkestrel-debrief/references/instruction-audit.md',
			'.agents/skills/orkestrel-debrief/references/retention.md',
			'.agents/skills/orkestrel-dispatch/SKILL.md',
			'.agents/skills/orkestrel-dispatch/agents/openai.yaml',
			'.agents/skills/orkestrel-dispatch/references/bench.md',
			'.agents/skills/orkestrel-dispatch/references/launch.md',
			'.agents/skills/orkestrel-dispatch/scripts/bench.ts',
			'.agents/skills/orkestrel-dispatch/scripts/brief.ts',
			'.agents/skills/orkestrel-dispatch/scripts/cite.ts',
			'.agents/skills/orkestrel-dispatch/scripts/helpers.ts',
			'.agents/skills/orkestrel-dispatch/scripts/launch.ts',
			'.agents/skills/orkestrel-dispatch/scripts/login.ts',
			'.agents/skills/orkestrel-dispatch/scripts/result.ts',
			'.agents/skills/orkestrel-dispatch/scripts/sweep.ts',
			'.agents/skills/orkestrel-falsify/SKILL.md',
			'.agents/skills/orkestrel-falsify/agents/openai.yaml',
			'.agents/skills/orkestrel-falsify/references/brief.md',
			'.agents/skills/orkestrel-falsify/references/reconcile.md',
			'.agents/skills/orkestrel-harden/SKILL.md',
			'.agents/skills/orkestrel-harden/agents/openai.yaml',
			'.agents/skills/orkestrel-harden/references/centralization.md',
			'.agents/skills/orkestrel-harden/references/contract.md',
			'.agents/skills/orkestrel-harden/references/hardening.md',
			'.agents/skills/orkestrel-harden/references/research.md',
			'.agents/skills/orkestrel-harden/scripts/discovery.ts',
			'.agents/skills/orkestrel-journey/SKILL.md',
			'.agents/skills/orkestrel-journey/agents/openai.yaml',
			'.agents/skills/orkestrel-journey/references/captures.md',
			'.agents/skills/orkestrel-journey/references/decide.md',
			'.agents/skills/orkestrel-journey/references/layer.md',
			'.agents/skills/orkestrel-journey/references/recorded.md',
			'.agents/skills/orkestrel-journey/references/statechart.md',
			'.agents/skills/orkestrel-journey/references/styles.md',
			'.agents/skills/orkestrel-polish/SKILL.md',
			'.agents/skills/orkestrel-polish/agents/openai.yaml',
			'.agents/skills/orkestrel-polish/references/capture-harness.md',
			'.agents/skills/orkestrel-publish/SKILL.md',
			'.agents/skills/orkestrel-publish/agents/openai.yaml',
			'.agents/skills/orkestrel-publish/references/release.md',
			'.agents/skills/orkestrel-publish/references/wave.md',
			'.agents/skills/orkestrel-publish/references/window.md',
			'.agents/skills/orkestrel-publish/scripts/compare.ts',
			'.agents/skills/orkestrel-publish/scripts/pins.ts',
			'.agents/skills/orkestrel-publish/scripts/wave.ts',
			'.agents/skills/orkestrel-publish/scripts/window.ts',
			'.agents/skills/orkestrel-scout/SKILL.md',
			'.agents/skills/orkestrel-scout/agents/openai.yaml',
			'.agents/skills/orkestrel-scout/scripts/map.ts',
			'.agents/templates/brief.md',
			'.agents/transports/claude-cli.md',
			'.agents/transports/codex.md',
			'.agents/transports/cursor.md',
			'.claude/AGENTS.md',
			'.claude/agents/analyst.md',
			'.claude/agents/astra.md',
			'.claude/agents/builder.md',
			'.claude/agents/checker.md',
			'.claude/agents/distiller.md',
			'.claude/agents/grok.md',
			'.claude/agents/opus.md',
			'.claude/agents/orkestrel.md',
			'.claude/agents/planner.md',
			'.claude/agents/researcher.md',
			'.claude/agents/reviewer.md',
			'.claude/agents/scout.md',
			'.claude/agents/verifier.md',
			'.claude/rules/application.md',
			'.claude/rules/architecture.md',
			'.claude/rules/browser.md',
			'.claude/rules/documentation.md',
			'.claude/rules/names.md',
			'.claude/rules/patterns.md',
			'.claude/rules/portability.md',
			'.claude/rules/quality.md',
			'.claude/rules/styles.md',
			'.claude/rules/tests.md',
			'.claude/rules/typescript.md',
			'.claude/rules/workspace.md',
			'.claude/rules/writing.md',
			'.claude/settings.json',
			'.claude/skills/enterprise-bootstrap/SKILL.md',
			'.claude/skills/orkestrel-align/SKILL.md',
			'.claude/skills/orkestrel-build/SKILL.md',
			'.claude/skills/orkestrel-debrief/SKILL.md',
			'.claude/skills/orkestrel-dispatch/SKILL.md',
			'.claude/skills/orkestrel-falsify/SKILL.md',
			'.claude/skills/orkestrel-harden/SKILL.md',
			'.claude/skills/orkestrel-journey/SKILL.md',
			'.claude/skills/orkestrel-polish/SKILL.md',
			'.claude/skills/orkestrel-publish/SKILL.md',
			'.claude/skills/orkestrel-scout/SKILL.md',
			'.codex/agents/analyst.toml',
			'.codex/agents/astra.toml',
			'.codex/agents/builder.toml',
			'.codex/agents/checker.toml',
			'.codex/agents/distiller.toml',
			'.codex/agents/grok.toml',
			'.codex/agents/opus.toml',
			'.codex/agents/orkestrel.toml',
			'.codex/agents/planner.toml',
			'.codex/agents/researcher.toml',
			'.codex/agents/reviewer.toml',
			'.codex/agents/scout.toml',
			'.codex/agents/verifier.toml',
			'.codex/config.toml',
			'configs/helpers.ts',
			'configs/policy.ts',
			'.cursor/mcp.json',
			'.cursor/rules/orchestration.mdc',
			'.editorconfig',
			'.gitattributes',
			'.gitignore',
			'.mcp.json',
			'.oxfmtrc.json',
			'.oxlintignore',
			'.oxlintrc.json',
			'.prettierignore',
			'guides/README.md',
			'guides/abort.md',
			'guides/agent.md',
			'guides/brief.md',
			'guides/browser.md',
			'guides/budget.md',
			'guides/codec.md',
			'guides/console.md',
			'guides/contract.md',
			'guides/csv.md',
			'guides/database.md',
			'guides/emitter.md',
			'guides/form.md',
			'guides/guide.md',
			'guides/html.md',
			'guides/indexeddb.md',
			'guides/interpret.md',
			'guides/lsp.md',
			'guides/markdown.md',
			'guides/mcp.md',
			'guides/middleware.md',
			'guides/msg.md',
			'guides/ndjson.md',
			'guides/ollama.md',
			'guides/pool.md',
			'guides/probe.md',
			'guides/process.md',
			'guides/program.md',
			'guides/qualifier.md',
			'guides/queue.md',
			'guides/rater.md',
			'guides/reason.md',
			'guides/relation.md',
			'guides/router.md',
			'guides/scaffold.md',
			'guides/sea.md',
			'guides/server.md',
			'guides/sqlite.md',
			'guides/sse.md',
			'guides/supervisor.md',
			'guides/table.md',
			'guides/template.md',
			'guides/terminal.md',
			'guides/test.md',
			'guides/timeout.md',
			'guides/tool.md',
			'guides/toolbox.md',
			'guides/websocket.md',
			'guides/worker.md',
			'guides/workflow.md',
			'guides/workspace.md',
			'scripts/browsers.sh',
			'scripts/codex.sh',
			'scripts/cursor.sh',
			'scripts/deps.sh',
			'scripts/npm.sh',
			'scripts/ollama.sh',
			'tests/config.test.ts',
			'tests/policy.test.ts',
			'tests/setupPolicy.ts',
		]
		// A release stages the vendored set, the instruction canon, and the reference
		// guides, so containment runs against all three lists. Reading `HOST_PATHS` alone
		// reports every canon and reference destination as undeclared.
		// A canon file the checkout no longer holds stays a canon path so a target's copy reports
		// foreign, but the stager ships nothing for it, so it is absent from the declaration.
		const staged = [...HOST_PATHS, ...CANON_PATHS, ...REFERENCE_PATHS].filter((path) =>
			existsSync(path),
		)
		for (const path of staged) {
			expect(
				expanded.some((destination) => destination === path || destination.startsWith(`${path}/`)),
			).toBe(true)
		}
		for (const destination of expanded) {
			expect(
				staged.some((path) => destination === path || destination.startsWith(`${path}/`)),
			).toBe(true)
		}
		expect(listFiles(resolve(WORKSPACE_ROOT, 'dist/host'))).toEqual(
			[...expanded.map((path) => pathToStorage(path)), 'manifest.json'].sort(),
		)
	})

	it('answers every example its shipped declarations print exactly as printed', async () => {
		const workspace = createDistributionScratch('scaffold-e4-examples-')
		try {
			// Each awaited declaration appends the readings its driver run answered.
			const readings: Array<{
				readonly types: string
				readonly printed: number
				readonly tally: number
				readonly driven: readonly string[]
				readonly undriven: readonly string[]
				readonly elided: readonly string[]
				readonly glossed: readonly string[]
				readonly mismatched: readonly string[]
			}> = []
			for (const declaration of DECLARATION_CASES) {
				const text = readFileSync(resolve(WORKSPACE_ROOT, declaration.types), 'utf8')
				const extracted = [
					...text
						.replaceAll('\r\n', '\n')
						.split('\n')
						.map((line) => line.replace(CLAIM_PREFIX, ''))
						.join('\n')
						.matchAll(CLAIM_EXAMPLE),
				].map((match) => match.groups?.body ?? '')
				// The controls are appended to the population the driver runs, never to
				// the population extracted from the declaration, so what they prove is a
				// property of the instrument rather than of what the package shipped.
				// The count is taken before the controls join, so it reads what the declaration
				// printed alone: a rule that narrowed to the controls still leaves the
				// declaration at zero.
				const printed = countClaims(extracted)
				const bodies = [...extracted, ...declaration.controls]
				const scans = bodies.map((body) => {
					const lines = body.split('\n')
					const found = lines.flatMap(
						(
							line,
							index,
						): ReadonlyArray<{
							readonly bucket: 'elided' | 'glossed' | 'undriven' | 'claim'
							readonly stated: string
							readonly claim:
								| {
										readonly text: string
										readonly encoded: string
										readonly start: number
										readonly end: number
								  }
								| undefined
						}> => {
							const match = CLAIM_LINE.exec(line.trim())
							const expression = match?.groups?.expression
							const verdict = match?.groups?.verdict
							if (expression === undefined || verdict === undefined) return []
							const stated = `${declaration.types}: ${expression} // ${verdict}`
							if (verdict.includes(CLAIM_ELISION)) {
								return [{ bucket: 'elided', stated, claim: undefined }]
							}
							const encoded = parseClaimVerdict(verdict)
							if (encoded === undefined) {
								return [{ bucket: 'glossed', stated, claim: undefined }]
							}
							// The statement the comment sits on is the shortest run of lines
							// ending at the claim's own line that closes every bracket it opens,
							// so a claim printed across several lines is driven as the one
							// expression it is.
							const opening = locateClaimOpening(lines, index, expression)
							return opening === undefined
								? [
										{
											bucket: 'undriven',
											stated: `${declaration.types}: ${expression}`,
											claim: undefined,
										},
									]
								: [
										{
											bucket: 'claim',
											stated,
											claim: { text: expression, encoded, start: opening, end: index },
										},
									]
						},
					)
					return {
						lines,
						found,
						claims: found.flatMap(({ claim }) => (claim === undefined ? [] : [claim])),
					}
				})
				// A claim is numbered by its place in the declaration's whole list, so the list holds
				// exactly the claims the driver is asked to answer and an unanswered id below is a
				// claim the block reached past rather than one this list already names.
				const claims = scans.flatMap((scan) => scan.claims)
				// Each awaited transform appends the block the driver compiles on its own.
				const blocks: Array<{ readonly source: string; readonly claims: readonly number[] }> = []
				for (const [position, scan] of scans.entries()) {
					if (scan.claims.length === 0) continue
					const before = scans
						.slice(0, position)
						.reduce((total, own) => total + own.claims.length, 0)
					const spans = scan.claims.map((claim, order) => ({
						start: claim.start,
						end: claim.end,
						id: before + order,
					}))
					const source = scan.lines.flatMap((line, index) => {
						const span = spans.find((candidate) => candidate.start === index)
						if (span !== undefined) {
							const opening = scan.lines.slice(span.start, span.end)
							const expression =
								CLAIM_LINE.exec(scan.lines[span.end]?.trim() ?? '')?.groups?.expression ?? ''
							return [`record(${String(span.id)}, (${[...opening, expression].join('\n')}))`]
						}
						if (spans.some((candidate) => index > candidate.start && index <= candidate.end))
							return []
						return /^\s*(import|declare|export)\b/u.test(line) ? [] : [line]
					})
					// An example is TypeScript, so the transformer this workspace already
					// declares erases its types rather than a pattern in this file guessing at
					// them. The name it is transformed under carries the extension, which is
					// what selects the TypeScript syntax it strips.
					const transformed = await transformWithOxc(source.join('\n'), 'example.ts', {
						target: 'esnext',
					})
					blocks.push({
						source: transformed.code,
						claims: spans.map((span) => span.id),
					})
				}
				const answered = spawnSync(
					process.execPath,
					['--input-type=module', '--eval', CLAIM_DRIVER],
					{
						cwd: workspace.path,
						encoding: 'utf8',
						input: JSON.stringify({
							module: pathToFileURL(resolve(WORKSPACE_ROOT, declaration.module)).href,
							blocks,
						}),
						timeout: 120_000,
						windowsHide: true,
					},
				)
				expect(answered.stderr).toBe('')
				expect(answered.status).toBe(0)
				const outcomes: unknown = JSON.parse(answered.stdout)
				if (!isRecord(outcomes)) {
					throw new Error(`${declaration.types} produced no outcomes`)
				}
				// The driver answers for every claim in a block it ran, so a claim with
				// no outcome at all is one the block reached past rather than one the
				// module contradicted. It is undriven for the same reason a statement
				// is, and naming it in that set is what keeps the sets a partition.
				const answers = claims.map((claim, index) => {
					const outcome: unknown = Object.getOwnPropertyDescriptor(outcomes, String(index))?.value
					const encoded: unknown = isRecord(outcome)
						? Object.getOwnPropertyDescriptor(outcome, 'encoded')?.value
						: undefined
					return { claim, encoded }
				})
				const answeredClaims = answers.flatMap(({ claim, encoded }) =>
					isString(encoded) ? [{ claim, encoded }] : [],
				)
				readings.push({
					types: declaration.types,
					printed,
					tally: countClaims(bodies),
					driven: answeredClaims.map(({ claim }) => `${declaration.types}: ${claim.text}`),
					undriven: [
						...scans.flatMap(({ found }) =>
							found.filter(({ bucket }) => bucket === 'undriven').map(({ stated }) => stated),
						),
						...answers
							.filter(({ encoded }) => !isString(encoded))
							.map(({ claim }) => `${declaration.types}: ${claim.text}`),
					],
					elided: scans.flatMap(({ found }) =>
						found.filter(({ bucket }) => bucket === 'elided').map(({ stated }) => stated),
					),
					glossed: scans.flatMap(({ found }) =>
						found.filter(({ bucket }) => bucket === 'glossed').map(({ stated }) => stated),
					),
					mismatched: answeredClaims
						.filter(({ claim, encoded }) => encoded !== claim.encoded)
						.map(({ claim, encoded }) => `${claim.text} // ${claim.encoded} answered ${encoded}`),
				})
			}
			const driven = readings.flatMap((reading) => reading.driven)
			const undriven = readings.flatMap((reading) => reading.undriven)
			const elided = readings.flatMap((reading) => reading.elided)
			const glossed = readings.flatMap((reading) => reading.glossed)
			const mismatched = readings.flatMap((reading) => reading.mismatched)
			const printing = readings
				.filter((reading) => reading.printed > 0)
				.map((reading) => reading.types)
			const tallies = readings.map((reading) => reading.tally)

			// The sets partition the population rather than sampling it, so no
			// claim-shaped line can leave the rule without arriving in a list below.
			// This is the assertion the lists are exact against: a shipped example
			// that changes spelling moves from one list to another and both move.
			expect(driven.length + undriven.length + glossed.length + elided.length).toBe(
				tallies.reduce((total, tally) => total + tally, 0),
			)
			// Named rather than tallied, because the population grows whenever a shipped
			// declaration documents another example and a number pinned to it goes stale on
			// the next one. What stays fixed is the declaration list, so this asserts that
			// every declaration the package ships printed a claim-shaped line of its own: an
			// extractor that goes silent on a declaration drops that name from the remainder and
			// the failure says which one, while an added example moves nothing. It catches silence,
			// not thinning: any nonzero remainder keeps the declaration's name, so a rule that
			// narrows over what a declaration prints without silencing it moves nothing in that set.
			// The driven-count floors that follow are what catch a partial narrowing, by
			// pinning each declaration's driven claims above a bound.
			expect(printing).toStrictEqual(DECLARATION_CASES.map((declaration) => declaration.types))

			// Every claim scored false is a control, and nothing the package ships is.
			// This establishes that a driven claim the module contradicts is reported,
			// in both declarations and through the binding the retired claim needed. It
			// establishes nothing about a claim the rule excludes.
			expect(mismatched).toStrictEqual([
				"new Compiler().audit(blueprint, {}).findings.every(({ drift }) => drift === 'missing') // true answered false",
				"isBranch('main') // false answered true",
			])
			// The membership rule, stated as the exact sets it leaves out. A
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
				'dist/src/core/index.d.ts: layers[0] // the names that depend on nothing else in the fleet',
				'dist/src/core/index.d.ts: scaffolding.plan?.artifacts // every planned file, in group order',
				'dist/src/core/index.d.ts: scaffolding.stages // one CompileRecord per stage that ran',
				'dist/src/core/index.d.ts: ).length // 1 — the range is not caret-pinned',
				"dist/src/core/index.d.ts: extractRangeMajor('^6') // the declared major",
				"dist/src/core/index.d.ts: isBlueprint({ name: 'router', src: ['core'] }) // false — not the whole record",
				'dist/src/core/index.d.ts: parseCompilerOptions({ on: { compile: () => {} } }) // the same record',
				"dist/src/core/index.d.ts: parseExtension('browser:vue') // { surface: 'browser', name: 'vue', axes: [] }",
				"dist/src/core/index.d.ts: parseExtension('styles:print') // { surface: 'styles', name: 'print' }",
				'dist/src/core/index.d.ts: planToSummary(plan).computed // the number of computed artifacts',
				'dist/src/core/index.d.ts: replacePlanRanges(plan, pins) // the plan carrying the resolved writable ranges',
				'dist/src/core/index.d.ts: selectGroups() // every group, in plan order',
				"dist/src/core/index.d.ts: serializeTypeScriptString(\"it's\") // `'it\\\\'s'`",
				"dist/src/core/index.d.ts: SHOWCASE_DEV_DEPENDENCIES['vite-plugin-singlefile'] // the showcase plugin range",
				"dist/src/server/index.d.ts: computeFileDigest('/tmp/project/AGENTS.md') // the file's SHA-256",
				'dist/src/server/index.d.ts: computeManifestDigest([], [], []) // the digest of the empty membership',
				"dist/src/server/index.d.ts: isExactCaseFile('/tmp/project/src/bin/main.ts') // true only for that exact spelling",
				"dist/src/server/index.d.ts: isPhysicalDirectory('/tmp/project') // true for a plain directory",
				"dist/src/server/index.d.ts: isPhysicalFile('/tmp/project/AGENTS.md') // true for a plain file",
				"dist/src/server/index.d.ts: isVacant('./packages/router-new') // true when absent, empty, or `.git` only",
				'dist/src/server/index.d.ts: anchor !== undefined && matchesAnchor(anchor) // true while it is untouched',
				'dist/src/server/index.d.ts: expectation !== undefined && matchesExpectation(expectation) // true while untouched',
				"dist/src/server/index.d.ts: matchesPrecondition({ path: '/tmp/project/new.md', shape: 'absent' }) // true while absent",
				'dist/src/server/index.d.ts: result.written // every path created',
				"dist/src/server/index.d.ts: anchor !== undefined && typeof anchor.device === 'bigint' && typeof anchor.inode === 'bigint' // true for a physical directory",
				"dist/src/server/index.d.ts: readHostFloor().manifest // the installed floor's verified membership",
				"dist/src/server/index.d.ts: readHostManifest('./dist/host') // the manifest, or undefined for a raw root",
				"dist/src/server/index.d.ts: readSurfaceBaseline('.') // the recorded collisions, if the inventory exists",
				"dist/src/server/index.d.ts: readSurfaceCollisions('./guides').get('Shared') // the guides claiming Shared, if it collides",
				"dist/src/server/index.d.ts: resolveRealPath('./packages/new/src') // the real path of `packages`, plus `new/src`",
				"dist/src/server/index.d.ts: stageHost(process.cwd(), 'dist/host') // one ManifestEntry per file staged",
				"dist/src/server/index.d.ts: stageInventory(process.cwd(), 'host.json') // the committed host inventory",
				"dist/src/server/index.d.ts: isBranch('main') // false — a branch name is not a branch",
			])
			expect(elided).toStrictEqual([
				"dist/src/server/index.d.ts: listDirectories('./.claude') // ['agents', 'rules', 'skills', …]",
				"dist/src/server/index.d.ts: listFiles('./dist/host') // ['AGENTS.md', 'LICENSE', 'agents', …]",
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
				"dist/src/core/index.d.ts: new Compiler().audit(blueprint, {}, ['manifest']).findings[0]?.drift",
			)
			expect(driven).toContain("dist/src/server/index.d.ts: isFilesystemPath('project/')")
			expect(driven.filter((claim) => claim.startsWith('dist/src/core/')).length).toBeGreaterThan(
				80,
			)
			expect(driven.filter((claim) => claim.startsWith('dist/src/server/')).length).toBeGreaterThan(
				40,
			)
		} finally {
			workspace.destroy()
		}
	})

	it('drives the built compiler from outside the checkout without a network install', () => {
		const workspace = createScratch({ prefix: 'scaffold-e4-driver-' })
		const target = join(workspace.path, 'generated')
		const core = pathToFileURL(resolve(WORKSPACE_ROOT, 'dist/src/core/index.js')).href
		const server = pathToFileURL(resolve(WORKSPACE_ROOT, 'dist/src/server/index.js')).href
		const missing = pathToFileURL(
			resolve(WORKSPACE_ROOT, 'dist/outside-integration-control.js'),
		).href
		try {
			const control = spawnSync(
				process.execPath,
				['--input-type=module', '--eval', `await import(${JSON.stringify(missing)})`],
				{ cwd: workspace.path, encoding: 'utf8', windowsHide: true },
			)
			expect(control.status).not.toBe(0)

			const source = [
				`const core = await import(${JSON.stringify(core)})`,
				`const server = await import(${JSON.stringify(server)})`,
				"const blueprint = core.createBlueprint('proof', { src: ['core', 'server'], bin: true, integration: true })",
				'const compiler = new core.Compiler()',
				'const plan = compiler.compile(blueprint).plan',
				"if (plan === undefined) throw new Error('The generated proof blueprint was blocked')",
				'compiler.destroy()',
				`const materializer = new server.Materializer({ host: ${JSON.stringify(resolve(WORKSPACE_ROOT, 'dist/host'))} })`,
				`const result = materializer.materialize(plan, ${JSON.stringify(target)})`,
				'materializer.destroy()',
				'process.stdout.write(String(result.written.length))',
			].join('\n')
			const driven = spawnSync(process.execPath, ['--input-type=module', '--eval', source], {
				cwd: workspace.path,
				encoding: 'utf8',
				windowsHide: true,
			})
			expect(driven.status).toBe(0)
			expect(driven.stderr).toBe('')
			expect(Number(driven.stdout)).toBeGreaterThan(0)
			expect(workspace.has('generated/tests/config.test.ts')).toBe(true)
			expect(workspace.has('generated/tests/integration.test.ts')).toBe(true)
			expect(workspace.has('generated/tests/guides.test.ts')).toBe(false)
			const manifest = requireValue(workspace.read('generated/package.json'))
			expect(manifest).toContain('"test:config"')
			expect(manifest).toContain('"test:integration"')
			expect(manifest).not.toContain('"test:guides"')
		} finally {
			workspace.destroy()
		}
	})

	it('skips generated entry drives when no installed entry matches their filters', async () => {
		const workspace = createDistributionScratch('scaffold-empty-drives-')
		const fixture = await createUpstreamServer({
			'/-/ping': { status: 200, body: '{}', type: 'application/json' },
		})
		try {
			const blueprint = createBlueprint('proof', { src: ['browser'] })
			for (const artifact of [
				...blueprintToConfigArtifacts(blueprint),
				...blueprintToTestArtifacts(blueprint),
			]) {
				if (
					artifact.origin === 'template' &&
					(artifact.path === 'tests/distribution.test.ts' ||
						artifact.path === 'configs/browsers.ts')
				)
					workspace.write(artifact.path, artifact.content)
			}
			workspace.link('node_modules', resolve('node_modules'))
			workspace.write(
				'package.json',
				'{"name":"empty-drives","version":"1.0.0","type":"module","files":["index.css"],"exports":{".":"./index.css"}}',
			)
			workspace.write('index.css', ':root { color: black; }\n')
			workspace.write(
				'vite.config.ts',
				"export default { test: { name: 'distribution', include: ['tests/distribution.test.ts'], hookTimeout: 30000 } }\n",
			)
			const run = await execute(
				{
					file: process.execPath,
					arguments: [
						resolve('node_modules/vitest/vitest.mjs'),
						'run',
						'--config',
						'vite.config.ts',
						'--project',
						'distribution',
						'-t',
						'publishes what it declares',
						'--reporter=json',
						'--reporter=verbose',
						'--outputFile.json=report.json',
					],
				},
				{
					workspace: workspace.path,
					environment: { ...process.env, npm_config_registry: fixture.base + '/' },
					timeout: 60_000,
					strict: false,
				},
			)
			expect(run.code).toBe(0)
			expect(run.stdout).toContain('No installed entry supports Node import')
			expect(run.stdout).toContain('No installed entry supports Node require')
			expect(run.stdout).toContain('No installed entry supports a browser')
			expect(fixture.paths).toContain('/-/ping')
			const files = requireValue(parseVitestReport(requireValue(workspace.read('report.json'))))
			expect(
				files
					.flatMap((file) => file.cases)
					.filter(
						(entry) =>
							isString(entry.title) && entry.title.startsWith('publishes what it declares'),
					)
					.map((entry) => ({ title: entry.title, status: entry.status })),
			).toStrictEqual([
				{ title: 'publishes what it declares to a Node import, and no more', status: 'skipped' },
				{ title: 'publishes what it declares to a Node require, and no more', status: 'skipped' },
				{
					title: 'publishes what it declares to a real browser [requires a browser]',
					status: 'skipped',
				},
			])
		} finally {
			await fixture.destroy()
			workspace.destroy()
		}
	}, 90_000)

	// The mode channel end to end. Vitest runs a project in the mode it was invoked with only when
	// the project's factory returns that mode, and nothing else in a generated workspace carries it,
	// so this drives a generated configuration and its generated distribution proof through the
	// command `prepublishOnly` runs. The registry is a loopback fixture that refuses `npm ping`,
	// which puts both branches of the proof's registry gate under one host. The workspace runs on
	// this checkout's installed toolchain, linked rather than installed: the subject is the
	// configuration and the proof, and the refusing registry could install nothing.
	it('fails the release run of a generated distribution proof on a refusing registry and skips the ordinary run', async () => {
		const workspace = createDistributionScratch('scaffold-release-mode-')
		const refusal = await createUpstreamServer({
			'/-/ping': { status: 503, body: '{"error":"refused"}', type: 'application/json' },
		})
		try {
			const compiler = new Compiler()
			const plan = compiler.compile(createBlueprint('proof', { src: ['core'] })).plan
			compiler.destroy()
			if (plan === undefined) throw new Error('The generated proof blueprint was blocked')
			const generated = join(workspace.path, 'generated')
			const materializer = new Materializer({ host: resolve(WORKSPACE_ROOT) })
			materializer.materialize(plan, generated)
			materializer.destroy()
			workspace.ensure('generated/node_modules')
			for (const name of readdirSync(resolve(WORKSPACE_ROOT, 'node_modules'))) {
				if (name.startsWith('.') && name !== '.bin') continue
				workspace.link(
					`generated/node_modules/${name}`,
					resolve(WORKSPACE_ROOT, 'node_modules', name),
				)
			}

			// The generated manifest runs the proof with the command the release row names, so the
			// following runs are that command and the same command without its mode.
			const manifest = parseJSON(requireValue(workspace.read('generated/package.json')))
			if (!isRecord(manifest) || !isRecord(manifest.scripts)) {
				throw new Error('The generated manifest declares no scripts')
			}
			const prepublish = manifest.scripts.prepublishOnly
			if (!isString(prepublish))
				throw new Error('The generated manifest declares no prepublishOnly')
			expect(prepublish.endsWith(` && ${RELEASE_PROOF_COMMAND}`)).toBe(true)
			const [file, ...command] = RELEASE_PROOF_COMMAND.split(' ')
			if (file === undefined) throw new Error('The release row names no executable')
			const ordinary = command.slice(0, command.indexOf('--') + 1)
			expect(command.slice(ordinary.length)).toStrictEqual(['--mode', 'release'])

			const admitted = provisionNpm({
				floor: readNpmFloor(manifest),
				prefix: workspace.ensure('npm'),
			})
			const environment = { ...admitted.environment, npm_config_registry: `${refusal.base}/` }
			const proof = resolve(generated, DISTRIBUTION_TEST_PATH)
			const configuration = requireValue(workspace.read('generated/vite.config.ts'))
			const source = requireValue(workspace.read(`generated/${DISTRIBUTION_TEST_PATH}`))
			// The controls are the rival runs `buildReleaseScenarios` lists after the release and
			// ordinary runs: each fails a release run without reaching the proof's registry gate.
			const scenarios = buildReleaseScenarios(command, ordinary, configuration, source)
			// Each awaited scenario appends its label and what its run reported.
			const logged: Array<readonly [string, unknown]> = []
			for (const scenario of scenarios) {
				for (const [path, content] of Object.entries(scenario.files)) {
					workspace.write(`generated/${path}`, content)
				}
				const pinged = refusal.paths.filter((path) => path === '/-/ping').length
				const report = `tmp/${scenario.label}.json`
				const run = await execute(
					{
						file,
						arguments: [...scenario.arguments, '--reporter=json', `--outputFile.json=${report}`],
					},
					{ workspace: generated, environment, timeout: scenario.timeout, strict: false },
				)
				workspace.write('generated/vite.config.ts', configuration)
				workspace.write(`generated/${DISTRIBUTION_TEST_PATH}`, source)
				const text = workspace.read(`generated/${report}`)
				const files = text === undefined ? undefined : parseVitestReport(text)
				logged.push([
					scenario.label,
					{
						// A run the timeout or a signal ended never reached the proof's verdict, and a run
						// that never asked the fixture answers something other than its refusal.
						expired: run.expired,
						signal: run.signal,
						pinged: refusal.paths.filter((path) => path === '/-/ping').length - pinged,
						code: run.code,
						files: files?.map((entry) => ({
							proof: resolve(entry.name) === proof,
							status: entry.status,
							message: entry.message,
							statuses: [...new Set(entry.cases.map((item) => item.status))].sort(),
						})),
					},
				])
			}
			const readings = new Map(logged)
			// Release fails during suite setup after collection, so Vitest marks its cases skipped.
			// The ordinary run executes the registry-independent cases and skips the rest.
			const failed = {
				expired: false,
				signal: null,
				pinged: 1,
				code: 1,
				files: [
					{
						proof: true,
						status: 'failed',
						message:
							'The release gate requires a reachable npm registry, and npm ping did not answer',
						statuses: ['skipped'],
					},
				],
			}
			expect(readings.get('release')).toStrictEqual(failed)
			expect(readings.get('ordinary')).toStrictEqual({
				expired: false,
				signal: null,
				pinged: 1,
				code: 0,
				files: [{ proof: true, status: 'passed', message: '', statuses: ['passed', 'skipped'] }],
			})
			const rivals = ['malformed', 'collection', 'assertion', 'timeout']
			expect(rivals.map((label) => readings.get(label))).not.toContainEqual(failed)
		} finally {
			await refusal.destroy()
			workspace.destroy()
		}
	}, 600_000)

	it('installs a preserved peer beside an exact co-peer witness and rejects the narrowed control', () => {
		const workspace = createDistributionScratch('scaffold-peer-install-')
		const packed = workspace.ensure('packed')
		const cache = workspace.ensure('cache')
		// npm reads its peer-resolution policy from the environment and from every
		// `.npmrc` on the host, so forwarding `process.env` unchanged answers with
		// the host's policy rather than this fixture's. Under
		// `npm_config_legacy_peer_deps=true` the refused graph installs and the
		// refusal below fails for a reason outside this package. Pin both peer
		// settings to npm's defaults so the answer is the test's. An environment
		// variable outranks every `.npmrc`, and no command line this case builds carries the
		// flags that would outrank it in turn.
		const environment = {
			...process.env,
			npm_config_cache: cache,
			npm_config_legacy_peer_deps: 'false',
			npm_config_strict_peer_deps: 'false',
		}
		try {
			workspace.write('packages/peer/package.json', '{"name":"peer-contract","version":"1.0.0"}\n')
			const manifest = `{
	"name": "preserved-range",
	"version": "1.0.0",
	"devDependencies": {
		"peer-contract": "^1.0.0"
	},
	"peerDependencies": {
		"peer-contract": ">=1.0.0"
	}
}
`
			const preserved = replaceManifestRanges(manifest, {
				runtime: [],
				development: [{ name: 'peer-contract', range: '^1.0.1' }],
			})
			if (preserved === undefined) throw new Error('The preserved package manifest was refused')
			expect(preserved).toContain('"peer-contract": "^1.0.1"')
			expect(preserved).toContain('"peer-contract": ">=1.0.0"')
			workspace.write('packages/preserved/package.json', preserved)
			workspace.write(
				'packages/control/package.json',
				preserved
					.replace('"name": "preserved-range"', '"name": "narrowed-range"')
					.replace('"peer-contract": ">=1.0.0"', '"peer-contract": "^2.0.0"'),
			)
			workspace.write(
				'packages/witness/package.json',
				'{"name":"co-peer-witness","version":"1.0.0","peerDependencies":{"peer-contract":"1.0.0"}}\n',
			)

			for (const source of ['peer', 'preserved', 'control', 'witness']) {
				const pack = spawnSync(
					NPM_LAUNCHER.command,
					['pack', '--json', '--ignore-scripts', '--pack-destination', packed, '--cache', cache],
					{
						cwd: join(workspace.path, 'packages', source),
						encoding: 'utf8',
						env: environment,
						windowsHide: true,
						shell: NPM_LAUNCHER.shell,
					},
				)
				expect(pack.status).toBe(0)
			}

			const archives = globSync('*.tgz', { cwd: packed })
			const peer = archives.find((archive) => archive.startsWith('peer-contract-'))
			const preservedArchive = archives.find((archive) => archive.startsWith('preserved-range-'))
			const control = archives.find((archive) => archive.startsWith('narrowed-range-'))
			const witness = archives.find((archive) => archive.startsWith('co-peer-witness-'))
			if (
				peer === undefined ||
				preservedArchive === undefined ||
				control === undefined ||
				witness === undefined
			) {
				throw new Error('The peer resolver fixture did not pack every package')
			}

			const accepted = workspace.ensure('accepted')
			workspace.write(
				'accepted/package.json',
				`${JSON.stringify({
					name: 'accepted-peer-graph',
					version: '1.0.0',
					private: true,
					dependencies: {
						'peer-contract': `file:${relative(accepted, join(packed, peer)).replaceAll('\\', '/')}`,
						'preserved-range': `file:${relative(accepted, join(packed, preservedArchive)).replaceAll('\\', '/')}`,
						'co-peer-witness': `file:${relative(accepted, join(packed, witness)).replaceAll('\\', '/')}`,
					},
				})}\n`,
			)
			const installed = spawnSync(
				NPM_LAUNCHER.command,
				['install', '--offline', '--ignore-scripts', '--no-audit', '--no-fund', '--cache', cache],
				{
					cwd: accepted,
					encoding: 'utf8',
					env: environment,
					windowsHide: true,
					shell: NPM_LAUNCHER.shell,
				},
			)
			expect(installed.status, `${installed.stdout}\n${installed.stderr}`).toBe(0)

			const refused = workspace.ensure('refused')
			workspace.write(
				'refused/package.json',
				`${JSON.stringify({
					name: 'refused-peer-graph',
					version: '1.0.0',
					private: true,
					dependencies: {
						'peer-contract': `file:${relative(refused, join(packed, peer)).replaceAll('\\', '/')}`,
						'narrowed-range': `file:${relative(refused, join(packed, control)).replaceAll('\\', '/')}`,
						'co-peer-witness': `file:${relative(refused, join(packed, witness)).replaceAll('\\', '/')}`,
					},
				})}\n`,
			)
			const rejected = spawnSync(
				NPM_LAUNCHER.command,
				['install', '--offline', '--ignore-scripts', '--no-audit', '--no-fund', '--cache', cache],
				{
					cwd: refused,
					encoding: 'utf8',
					env: environment,
					windowsHide: true,
					shell: NPM_LAUNCHER.shell,
				},
			)
			// A child that never ran its resolver reports the same refusal this
			// assertion is looking for: a killed one returns `status: null` with a
			// signal and renders nothing, and a spawn fault returns `status: null`
			// with an error, so `not.toBe(0)` accepts either. Assert the resolver ran
			// and exited on its own, so a harness fault fails as a harness fault and
			// carries its diagnosis instead of reading as npm's answer.
			expect(rejected.error).toBeUndefined()
			expect(rejected.signal).toBeNull()
			expect(rejected.status, `${rejected.stdout}\n${rejected.stderr}`).not.toBe(0)
			expect(`${rejected.stdout}\n${rejected.stderr}`).toContain('ERESOLVE')
		} finally {
			workspace.destroy()
		}
	})

	it.skipIf(!NPM_REGISTRY.reachable && !RELEASE_MODE)(
		'installs the packed scaffold and passes one generated core/server workspace through prepublish [requires a reachable npm registry]',
		() => {
			if (!NPM_REGISTRY.reachable) {
				throw new Error('The distribution release gate requires a reachable npm registry.')
			}
			const workspace = createDistributionScratch('scaffold-e4-install-')
			const consumer = workspace.ensure('consumer')
			const cache = workspace.ensure('cache')
			// Pinned for the reason the refused-peer fixture above pins it: an npm
			// environment variable outranks every `.npmrc`, so a host carrying a peer
			// policy would otherwise answer for this install. This one asserts successes
			// rather than a refusal, so `npm_config_strict_peer_deps=true` is the
			// direction that would red it.
			const environment = {
				...process.env,
				npm_config_cache: cache,
				npm_config_legacy_peer_deps: 'false',
				npm_config_strict_peer_deps: 'false',
			}
			try {
				const archive = installPackedScaffold(workspace, environment)

				// The self-pin every generated workspace inherits is inlined into the
				// built core at build time, and the manifest beside it is packed from the
				// same file. Reading both out of the installed copy is what proves the
				// pack carried a matching pair: an artifact built before a version bump
				// ships the previous pin while the manifest beside it names the new one,
				// and nothing inside the checkout can see that.
				const installedManifest = 'consumer/node_modules/@orkestrel/scaffold/package.json'
				const installedText = requireValue(workspace.read(installedManifest))
				workspace.write(
					'consumer/coherence.mjs',
					[
						"import { BASE_DEV_DEPENDENCIES } from '@orkestrel/scaffold'",
						"process.stdout.write(BASE_DEV_DEPENDENCIES['@orkestrel/scaffold'])",
					].join('\n'),
				)
				const coherence = spawnSync(process.execPath, ['coherence.mjs'], {
					cwd: consumer,
					encoding: 'utf8',
					windowsHide: true,
				})
				expect(coherence.status).toBe(0)
				expect(coherence.stdout).toBe(`^${readManifestVersion(installedText)}`)

				// The control. Moving the installed manifest's version without rebuilding
				// must leave the artifact's pin where it was, or the equality above read
				// one mechanism twice and could never have failed. The mutation lands in
				// the scratch install and is restored before the run continues.
				const mutated = installedText.replace(
					JSON.stringify(readManifestVersion(installedText)),
					'"0.0.0"',
				)
				expect(mutated).not.toBe(installedText)
				workspace.write(installedManifest, mutated)
				const controlled = spawnSync(process.execPath, ['coherence.mjs'], {
					cwd: consumer,
					encoding: 'utf8',
					windowsHide: true,
				})
				workspace.write(installedManifest, installedText)
				expect(controlled.status).toBe(0)
				expect(controlled.stdout).toBe(coherence.stdout)
				expect(controlled.stdout).not.toBe(`^${readManifestVersion(mutated)}`)

				const generated = installGeneratedWorkspace(
					workspace,
					archive,
					"createBlueprint('proof', { src: ['core', 'server'], bin: true, integration: true })",
					environment,
				)
				// The re-pin's claims. The compiler emitted the version this checkout declares,
				// so the range that was replaced is the one the release would have served; and the
				// install resolved the local archive, so the following gate chain runs against these
				// bytes rather than against the previous release.
				expect(generated.pin.range).toBe(`^${generated.pin.version}`)
				expect(generated.pin.resolved).toBe(generated.pin.specifier)
				const gates = spawnSync(NPM_LAUNCHER.command, ['run', 'prepublishOnly'], {
					cwd: generated.path,
					encoding: 'utf8',
					env: generated.environment,
					windowsHide: true,
					shell: NPM_LAUNCHER.shell,
				})
				expect(gates.status, `${gates.stdout}\n${gates.stderr}`).toBe(0)
			} finally {
				workspace.destroy()
			}
		},
		1_200_000,
	)

	// The same machinery over the other axis. A workspace declaring app environments and no src
	// publishes nothing, so it vendors no `configs/src/` wrapper and emits no `prepublishOnly`,
	// and the vendored proofs it does run must pass without a published face to read. Every other
	// generated workspace in this file declares a src axis, so this case is the one that runs the
	// vendored set against a workspace carrying none. What it does not reach is a browser-carrying
	// workspace's gate chain, which vendors `configs/browsers.ts` and registers Playwright projects
	// this blueprint never materializes.
	it.skipIf(!NPM_REGISTRY.reachable && !RELEASE_MODE)(
		'installs the packed scaffold and passes one generated app-only workspace through its gates [requires a reachable npm registry]',
		() => {
			if (!NPM_REGISTRY.reachable) {
				throw new Error('The distribution release gate requires a reachable npm registry.')
			}
			const workspace = createDistributionScratch('scaffold-e4-app-install-')
			const cache = workspace.ensure('cache')
			// Pinned for the reason the preceding case pins it: an npm environment variable outranks
			// every `.npmrc`, so a host carrying a peer policy would otherwise answer for this install.
			const environment = {
				...process.env,
				npm_config_cache: cache,
				npm_config_legacy_peer_deps: 'false',
				npm_config_strict_peer_deps: 'false',
			}
			try {
				const archive = installPackedScaffold(workspace, environment)
				const generated = installGeneratedWorkspace(
					workspace,
					archive,
					"createBlueprint('proof', { app: ['core', 'server'] })",
					environment,
				)
				// The re-pin's claims, read for the reason the preceding case reads them.
				expect(generated.pin.range).toBe(`^${generated.pin.version}`)
				expect(generated.pin.resolved).toBe(generated.pin.specifier)
				const scripts: unknown = Object.getOwnPropertyDescriptor(
					generated.manifest,
					'scripts',
				)?.value
				if (!isRecord(scripts)) {
					throw new Error('The generated manifest declares no scripts')
				}
				// A private workspace declares no `prepublishOnly`: the distribution proof measures a
				// packed tarball and this workspace publishes none. Its chain is therefore assembled
				// from the scripts it does declare, in the order the repository fixes the gates. The
				// assertion is what ties the chain to the manifest: a release that gives a private
				// workspace a `prepublishOnly` reddens this reading rather than leaving the case
				// running a chain the workspace no longer owns.
				expect(Object.getOwnPropertyDescriptor(scripts, 'prepublishOnly')).toBeUndefined()
				for (const gate of ['format:check', 'lint:check', 'check', 'build', 'test']) {
					expect(Object.getOwnPropertyDescriptor(scripts, gate)?.value).toEqual(expect.any(String))
					const run = spawnSync(NPM_LAUNCHER.command, ['run', gate], {
						cwd: generated.path,
						encoding: 'utf8',
						env: generated.environment,
						windowsHide: true,
						shell: NPM_LAUNCHER.shell,
					})
					expect(run.status, `${gate}\n${run.stdout}\n${run.stderr}`).toBe(0)
				}
			} finally {
				workspace.destroy()
			}
		},
		1_200_000,
	)

	it.skipIf(!NPM_REGISTRY.reachable && !RELEASE_MODE)(
		'renders a Vue SFC through the generated browser setup project [requires a reachable npm registry]',
		() => {
			if (!NPM_REGISTRY.reachable) {
				throw new Error('The distribution release gate requires a reachable npm registry.')
			}
			const workspace = createDistributionScratch('scaffold-vue-setup-install-')
			const environment = {
				...process.env,
				npm_config_cache: workspace.ensure('cache'),
				npm_config_legacy_peer_deps: 'false',
				npm_config_strict_peer_deps: 'false',
			}
			try {
				const archive = installPackedScaffold(workspace, environment)
				const generated = installGeneratedWorkspace(
					workspace,
					archive,
					"createBlueprint('proof', { app: ['browser'], setup: ['browser'], extensions: [{ surface: 'browser', name: 'vue', axes: ['app'] }] })",
					environment,
				)
				for (const [path, content] of Object.entries(GENERATED_VUE_SETUP_FILES)) {
					workspace.write(`generated/${path}`, content)
				}
				const proof = executeSync(
					{
						file: process.execPath,
						arguments: [
							join(generated.path, 'node_modules', 'vitest', 'vitest.mjs'),
							'run',
							'--config',
							'vite.config.ts',
							'--no-cache',
							'--reporter=verbose',
							'--reporter=json',
							'--outputFile.json=tmp/setup-vue-results.json',
							'--project',
							'setup:browser',
						],
					},
					{ workspace: generated.path, environment: generated.environment, strict: false },
				)
				expect(proof.code, `${proof.stdout}\n${proof.stderr}`).toBe(0)
				expect(proof.stdout).toContain('setup:browser')
				expect(proof.stdout).toContain('tests/setupBrowser.test.ts')
				const report = parseVitestReport(
					requireValue(workspace.read('generated/tmp/setup-vue-results.json')),
				)
				if (report === undefined) {
					throw new Error('The generated browser proof wrote no test results.')
				}
				const paired = report.find(
					(entry) => resolve(entry.name) === resolve(generated.path, 'tests/setupBrowser.test.ts'),
				)
				if (paired === undefined) {
					throw new Error('The generated browser proof reported no paired setup cases.')
				}
				const assertions = paired.cases.filter(
					(item) => item.title === 'renders the Vue component through the browser setup helper',
				)
				expect(assertions).toEqual([
					expect.objectContaining({
						title: 'renders the Vue component through the browser setup helper',
						status: 'passed',
					}),
				])
			} finally {
				workspace.destroy()
			}
		},
		1_200_000,
	)

	// Node refuses to strip types for a file under `node_modules`, so a target runs the built twin
	// of a skill script rather than its canon. The twin resolves its template from its own location,
	// which only the installed copy can prove.
	it.skipIf(!NPM_REGISTRY.reachable && !RELEASE_MODE)(
		'runs the built twin of a skill script from the installed package [requires a reachable npm registry]',
		() => {
			if (!NPM_REGISTRY.reachable) {
				throw new Error('The distribution release gate requires a reachable npm registry.')
			}
			const workspace = createDistributionScratch('scaffold-skill-twin-')
			const cache = workspace.ensure('cache')
			// Pinned for the reason the core/server install case pins it: an npm environment variable
			// outranks every `.npmrc`, so a host carrying a peer policy would otherwise answer for it.
			const environment = {
				...process.env,
				npm_config_cache: cache,
				npm_config_legacy_peer_deps: 'false',
				npm_config_strict_peer_deps: 'false',
			}
			try {
				installPackedScaffold(workspace, environment)
				const consumer = workspace.ensure('consumer')
				workspace.ensure('consumer/.git')
				const run = spawnSync(
					process.execPath,
					[
						'node_modules/@orkestrel/scaffold/dist/agents/skills/orkestrel-dispatch/scripts/brief.js',
						'--unit',
						'twin',
						'--lane',
						'units',
					],
					{ cwd: consumer, encoding: 'utf8', windowsHide: true },
				)
				expect(run.status, `${run.stdout}\n${run.stderr}`).toBe(0)
				const answer = buildSkillRun(run.status, run.stdout, run.stderr).json
				if (!isRecord(answer) || !isString(answer.brief) || !isString(answer.template)) {
					throw new Error(`The twin printed no brief and template: ${run.stdout}`)
				}
				expect(answer.brief).toBe(join('tmp', 'units', 'twin-brief.md'))
				expect(answer.template.endsWith(join('dist', 'agents', 'templates', 'brief.md'))).toBe(true)
				expect(requireValue(workspace.read('consumer/tmp/units/twin-brief.md'))).toContain(
					'Unit twin',
				)
				// A twin that spawns a sibling names the `.js` beside it, not the `.ts` the checkout runs.
				const dry = spawnSync(
					process.execPath,
					[
						'node_modules/@orkestrel/scaffold/dist/agents/skills/orkestrel-publish/scripts/wave.js',
						'--visit',
						'--dry-run',
					],
					{ cwd: consumer, encoding: 'utf8', windowsHide: true },
				)
				expect(dry.status, `${dry.stdout}\n${dry.stderr}`).toBe(0)
				expect(dry.stdout).toContain(
					join('dist', 'agents', 'skills', 'orkestrel-publish', 'scripts', 'compare.js'),
				)
				expect(dry.stdout).not.toContain('compare.ts')
			} finally {
				workspace.destroy()
			}
		},
		600_000,
	)

	// Moved out of the `setup` project, which makes no network call: this case provisions
	// npm from the registry, so it belongs beside the install proof that consumes the same
	// helper. It runs only where the ambient npm is beneath the declared floor, which is
	// the one host state that has anything to provision.
	it.skipIf(compareVersions(readNpmVersion(), MINIMUM_NPM_VERSION) >= 0)(
		'provisions the floor and resolves that copy when the ambient npm is beneath it [inapplicable where the ambient npm already satisfies the floor, which leaves nothing to provision]',
		() => {
			const workspace = createDistributionScratch('scaffold-e4-provision-')
			try {
				const prefix = workspace.ensure('npm')
				const admitted = provisionNpm({ floor: MINIMUM_NPM_VERSION, prefix })
				// The second mechanism: the version the provisioned package declares of itself,
				// read from its manifest rather than from a run. A resolution reporting the
				// ambient npm, or provisioning one version and reporting another, disagrees with
				// it.
				const installed: unknown = JSON.parse(
					readFileSync(join(prefix, 'node_modules', 'npm', 'package.json'), 'utf8'),
				)
				expect(installed).toMatchObject({ version: admitted.version })
				expect(compareVersions(admitted.version, MINIMUM_NPM_VERSION)).toBeGreaterThanOrEqual(0)
				expect(admitted.version).not.toBe(readNpmVersion())
				// The environment is what carries the selection into a nested `npm run`, so the
				// provisioned directory must be the first entry `PATH` offers.
				expect(requireValue(readVariable(admitted.environment, 'PATH')).split(delimiter)[0]).toBe(
					join(prefix, 'node_modules', '.bin'),
				)
			} finally {
				workspace.destroy()
			}
		},
		300_000,
	)
})
