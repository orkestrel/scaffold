import type { SpawnSyncReturns } from 'node:child_process'
import type { TempDirectoryInterface } from './setupServer.js'
import { spawnSync } from 'node:child_process'
import { copyFileSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { isRecord, parseJSON } from '@orkestrel/contract'
import type { Audit, Finding, Plan } from '@src/core'
import { stageHost } from '@src/server'
import { buildTempDirectory, WORKSPACE_ROOT } from './setupServer.js'

/** Built scaffold executable exercised by all command-line tests. */
export const BIN_PATH = join(WORKSPACE_ROOT, 'dist/bin/scaffold.js')

/** Whether a real Bash executable is available for vendored-hook boundary tests. */
export const canBash =
	spawnSync('bash', ['--version'], {
		encoding: 'utf8',
		timeout: 5_000,
	}).status === 0

/** Whether the real Cursor CLI can enumerate its configured model catalog. */
export const canCursorModels =
	canBash &&
	spawnSync('agent', ['models'], {
		encoding: 'utf8',
		timeout: 30_000,
	}).status === 0

/** Interactive repair handoff text whose absence non-terminal tests assert. */
export const REPAIR_HANDOFF_TEXT = 'run repair now?'

/** One generated source file used to exercise native lint configuration. */
export interface LintSource {
	readonly path: string
	readonly source: string
}

/** One generated source file whose declared import direction Oxlint rejects. */
export interface RejectedLintSource extends LintSource {
	readonly message: string
}

/** Representative package, alias, query, and conventional relative imports forbidden by Oxlint. */
export const REJECTED_LINT_SOURCES: readonly RejectedLintSource[] = Object.freeze([
	Object.freeze({
		path: 'app/browser/rejected-posix-absolute.ts',
		source: "import '/machine/specific/module.js'\n",
		message: 'imports must not use machine-specific absolute paths',
	}),
	Object.freeze({
		path: 'app/server/rejected-windows-absolute.ts',
		source: "import 'C:/machine/specific/module.js'\n",
		message: 'imports must not use machine-specific absolute paths',
	}),
	Object.freeze({
		path: 'src/core/rejected-computed-import.ts',
		source: "const specifier = 'node:fs'\nvoid import(specifier)\n",
		message: 'Expected a literal string or immutable template literal',
	}),
	Object.freeze({
		path: 'app/core/rejected-server-alias.ts',
		source: "import '@app/server?raw'\n",
		message: 'app/core must remain host-independent',
	}),
	Object.freeze({
		path: 'app/core/rejected-server-relative.ts',
		source: "import '../server/index.js'\n",
		message: 'app/core must remain host-independent',
	}),
	Object.freeze({
		path: 'app/core/rejected-leading-dot-traversal.ts',
		source: "import './../server/index.js'\n",
		message: 'relative import paths must not contain normalized traversal segments',
	}),
	Object.freeze({
		path: 'app/core/rejected-interleaved-dot-traversal.ts',
		source: "import '.././server/index.js'\n",
		message: 'relative import paths must not contain normalized traversal segments',
	}),
	Object.freeze({
		path: 'app/core/rejected-empty-segment.ts',
		source: "import '..//server/index.js'\n",
		message: 'relative import paths must not contain normalized traversal segments',
	}),
	Object.freeze({
		path: 'app/core/rejected-source-server-relative.ts',
		source: "import '../../src/server/index.js'\n",
		message: 'app/core must remain host-independent',
	}),
	Object.freeze({
		path: 'app/core/rejected-node.ts',
		source: "import 'node:http'\n",
		message: 'app/core must remain host-independent',
	}),
	Object.freeze({
		path: 'app/core/rejected-bare-node.ts',
		source: "import 'fs'\n",
		message: 'app/core must remain host-independent',
	}),
	Object.freeze({
		path: 'app/browser/rejected-server-alias.ts',
		source: "import '@src/server#runtime'\n",
		message: 'app/browser must not depend on Node or server-only modules',
	}),
	Object.freeze({
		path: 'app/browser/rejected-server-relative.ts',
		source: "import '../server/index.js'\n",
		message: 'app/browser must not depend on Node or server-only modules',
	}),
	Object.freeze({
		path: 'app/browser/rejected-server-package.ts',
		source: "import '@orkestrel/example/server'\n",
		message: 'app/browser must not depend on Node or server-only modules',
	}),
	Object.freeze({
		path: 'app/browser/rejected-bare-node.ts',
		source: "import 'http'\n",
		message: 'app/browser must not depend on Node or server-only modules',
	}),
	Object.freeze({
		path: 'app/server/rejected-browser-alias.ts',
		source: "import '@app/browser'\n",
		message: 'app/server must not depend on Vue or browser-only modules',
	}),
	Object.freeze({
		path: 'app/server/rejected-browser-relative.ts',
		source: "import '../browser/index.js'\n",
		message: 'app/server must not depend on Vue or browser-only modules',
	}),
	Object.freeze({
		path: 'app/server/rejected-vue.ts',
		source: "import 'vue'\n",
		message: 'app/server must not depend on Vue or browser-only modules',
	}),
	Object.freeze({
		path: 'src/core/rejected-app-alias.ts',
		source: "import '@app/core'\n",
		message: 'src environments must not depend on private app modules',
	}),
	Object.freeze({
		path: 'src/core/rejected-app-relative.ts',
		source: "import '../../app/core/index.js'\n",
		message: 'src environments must not depend on private app modules',
	}),
	Object.freeze({
		path: 'src/core/rejected-server-relative.ts',
		source: "import '../server/index.js'\n",
		message: 'src/core must remain host-independent',
	}),
	Object.freeze({
		path: 'src/core/rejected-stylesheet.pcss.ts',
		source: "import './hostile.pcss'\n",
		message: 'src/core must not import browser stylesheets',
	}),
	Object.freeze({
		path: 'src/browser/rejected-server-alias.ts',
		source: "import '@src/server'\n",
		message: 'src/browser must not depend on Node or server-only modules',
	}),
	Object.freeze({
		path: 'src/browser/rejected-server-relative.ts',
		source: "import '../server/index.js'\n",
		message: 'src/browser must not depend on Node or server-only modules',
	}),
	Object.freeze({
		path: 'src/server/rejected-browser-package.ts',
		source: "import '@orkestrel/example/browser'\n",
		message: 'src/server must not depend on Vue or browser-only modules',
	}),
	Object.freeze({
		path: 'src/server/rejected-browser-relative.ts',
		source: "import '../browser/index.js'\n",
		message: 'src/server must not depend on Vue or browser-only modules',
	}),
	Object.freeze({
		path: 'src/server/rejected-stylesheet.postcss.ts',
		source: "import './hostile.postcss'\n",
		message: 'src/server must not import browser stylesheets',
	}),
])

/** Representative imports permitted by the generated environment direction. */
export const ALLOWED_LINT_SOURCES: readonly LintSource[] = Object.freeze([
	Object.freeze({
		path: 'app/core/allowed-core-package.ts',
		source: "import * as allowed from '@orkestrel/contract'\nvoid allowed\n",
	}),
	Object.freeze({
		path: 'app/browser/allowed-app-core.ts',
		source: "import * as allowed from '@app/core'\nvoid allowed\n",
	}),
	Object.freeze({
		path: 'app/browser/allowed-source-browser.ts',
		source: "import * as allowed from '@src/browser'\nvoid allowed\n",
	}),
	Object.freeze({
		path: 'app/server/allowed-app-core.ts',
		source: "import * as allowed from '@app/core'\nvoid allowed\n",
	}),
	Object.freeze({
		path: 'app/server/allowed-node.ts',
		source: "import * as allowed from 'node:http'\nvoid allowed\n",
	}),
	Object.freeze({
		path: 'src/browser/allowed-source-core.ts',
		source: "import * as allowed from '@src/core'\nvoid allowed\n",
	}),
	Object.freeze({
		path: 'src/server/allowed-source-core.ts',
		source: "import * as allowed from '@src/core'\nvoid allowed\n",
	}),
	Object.freeze({
		path: 'app/core/nested/deeper/allowed-parent.ts',
		source: "import * as allowed from '../../types.js'\nvoid allowed\n",
	}),
])

/** Shared plan fixture for bin helper tests. */
export const AUDIT_PLAN: Plan = {
	blueprint: {
		name: 'widget',
		keywords: [],
		src: ['core'],
		app: [],
		dependencies: [],
		peers: [],
		extras: [],
		version: '0.0.1',
		engines: '>=22.12.0',
		overrides: [],
		engine: false,
	},
	groups: ['manifest'],
	artifacts: [
		{ path: 'AGENTS.md', group: 'manifest', origin: 'host' },
		{
			path: 'src/core/index.ts',
			group: 'source',
			origin: 'template',
			content: 'export {}',
		},
		{
			path: 'src/core/computed.ts',
			group: 'source',
			origin: 'computed',
			content: 'export {}',
		},
	],
}

/** Shared findings fixture for bin helper tests. */
export const AUDIT_FINDINGS: readonly Finding[] = [
	{ path: 'AGENTS.md', group: 'manifest', drift: 'stale' },
	{ path: 'src/core/index.ts', group: 'source', drift: 'missing' },
	{ path: 'src/core/computed.ts', group: 'source', drift: 'stale' },
	{ path: 'unexpected.txt', group: 'manifest', drift: 'foreign' },
	{ path: 'clean.ts', group: 'source', drift: 'aligned' },
]

/** Host artifacts whose installed/default-host copies must remain byte-exact. */
export const HOST_BYTE_EQUAL_PATHS: readonly string[] = [
	'.gitignore',
	'.claude/settings.json',
	'.codex/config.toml',
	'.codex/agents/builder.toml',
	'AGENTS.md',
	'CLAUDE.md',
	'LICENSE',
	'guides/src/guide.md',
	'guides/src/scaffold.md',
	'scripts/deps.sh',
	'tests/setupPolicy.ts',
]

/** Complete raw host fixture used by built-command tests. */
export const HOST_FIXTURE_FILES: Readonly<Record<string, string>> = {
	'AGENTS.md': '# AGENTS fixture\n',
	'CLAUDE.md': '# CLAUDE fixture\n',
	LICENSE: 'MIT fixture license\n',
	'.editorconfig': 'root = true\n# fixture\n',
	'.gitattributes': '* text=auto\n',
	'.gitignore': 'node_modules\n',
	'.oxfmtrc.json': '{}\n',
	'.oxlintrc.json': '{}\n',
	'.oxlintignore': 'dist\n',
	'.prettierignore': 'dist\n',
	'scripts/deps.sh': '#!/bin/sh\necho deps\n',
	'scripts/cursor.sh': '#!/bin/sh\necho cursor\n',
	'scripts/codex.sh': '#!/bin/sh\necho codex\n',
	'scripts/ollama.sh': '#!/bin/sh\necho ollama\n',
	'.github/workflows/ci.yml': 'name: ci-fixture\n',
	'guides/src/guide.md': '# guide fixture\n',
	'guides/src/scaffold.md': '# scaffold self-guide fixture\n',
	'tests/setupPolicy.ts': readFileSync(join(WORKSPACE_ROOT, 'tests/setupPolicy.ts'), 'utf8'),
	'.agents/skills/example/SKILL.md': '---\nname: example\ndescription: Fixture skill.\n---\n',
	'.claude/agents/example.md': '# example agent fixture\n',
	'.claude/rules/example.md': '# example rule fixture\n',
	'.claude/skills/example/SKILL.md': '---\nname: example\ndescription: Fixture skill.\n---\n',
	'.claude/settings.json': '{}\n',
	'.codex/config.toml': 'model = "gpt-5.6-sol"\n',
	'.codex/agents/example.toml':
		'name = "example"\ndescription = "fixture"\ndeveloper_instructions = "fixture"\n',
}

/** Spawn the built command with an isolated current directory. */
export function runBin(
	argv: readonly string[],
	input: string,
	options: { readonly cwd: string; readonly env?: Readonly<Record<string, string>> },
): SpawnSyncReturns<string> {
	return spawnSync(process.execPath, [BIN_PATH, ...argv], {
		cwd: options.cwd,
		input,
		encoding: 'utf8',
		timeout: 15000,
		env: options.env !== undefined ? { ...process.env, ...options.env } : process.env,
	})
}

/** Spawn the built command through its default vendored host resolution. */
export function runDefaultBin(
	argv: readonly string[],
	options?: { readonly cwd?: string },
): SpawnSyncReturns<string> {
	return spawnSync(process.execPath, [BIN_PATH, ...argv], {
		cwd: options?.cwd ?? WORKSPACE_ROOT,
		input: '',
		encoding: 'utf8',
		timeout: 15000,
	})
}

/** Run one generated package script through the current npm executable. */
export function runNpmScript(
	cwd: string,
	script: string,
	timeout = 60_000,
): SpawnSyncReturns<string> {
	const npm = process.env.npm_execpath
	if (npm === undefined) throw new Error('expected npm_execpath while running the npm test script')
	return spawnSync(process.execPath, [npm, 'run', script], {
		cwd,
		encoding: 'utf8',
		timeout,
	})
}

/** Run one real vendored SessionStart hook with caller-controlled environment values. */
export function runHook(
	script: string,
	environment: Readonly<Record<string, string>>,
): SpawnSyncReturns<string> {
	return spawnSync('bash', [join(WORKSPACE_ROOT, 'scripts', script)], {
		cwd: WORKSPACE_ROOT,
		encoding: 'utf8',
		env: { ...process.env, ...environment },
		timeout: 30_000,
	})
}

/**
 * Install one fixed generated consumer from its reviewed lock fixture.
 *
 * The package-under-test self dependency is omitted here because the separate
 * packed-install proof installs and invokes that exact archive. Every tool that
 * compiles, builds, or executes the generated source/app workspace remains
 * byte-for-byte represented by the lock and is installed with `npm ci`.
 */
export function installGeneratedDependencies(
	cwd: string,
	timeout = 180_000,
): SpawnSyncReturns<string> {
	const npm = process.env.npm_execpath
	if (npm === undefined) throw new Error('expected npm_execpath while running the npm test script')
	const manifestPath = join(cwd, 'package.json')
	const manifest = parseJSON(readFileSync(manifestPath, 'utf8'))
	if (!isRecord(manifest) || !isRecord(manifest.devDependencies)) {
		throw new Error('expected generated consumer package.json to declare devDependencies')
	}
	writeFileSync(
		manifestPath,
		`${JSON.stringify(
			{
				...manifest,
				devDependencies: Object.fromEntries(
					Object.entries(manifest.devDependencies).filter(
						([name]) => name !== '@orkestrel/scaffold',
					),
				),
			},
			undefined,
			'\t',
		)}\n`,
		'utf8',
	)
	copyFileSync(
		join(WORKSPACE_ROOT, 'tests/fixtures/consumer-package-lock.json'),
		join(cwd, 'package-lock.json'),
	)
	return spawnSync(process.execPath, [npm, 'ci', '--ignore-scripts', '--no-audit', '--no-fund'], {
		cwd,
		encoding: 'utf8',
		timeout,
	})
}

/** Pack one built package into a caller-owned directory and return the archive path. */
export function packArchive(cwd: string, destination: string): string {
	const npm = process.env.npm_execpath
	if (npm === undefined) throw new Error('expected npm_execpath while running the npm test script')
	const packed = spawnSync(
		process.execPath,
		[npm, 'pack', '--json', '--ignore-scripts', '--pack-destination', destination],
		{
			cwd,
			encoding: 'utf8',
			timeout: 60_000,
		},
	)
	if (packed.status !== 0) {
		throw new Error(
			`npm pack failed: status=${String(packed.status)} error=${String(packed.error)} stdout=${packed.stdout} stderr=${packed.stderr}`,
		)
	}
	const reports = parseJSON(packed.stdout)
	const report = Array.isArray(reports) ? reports[0] : undefined
	if (!isRecord(report) || typeof report.filename !== 'string') {
		throw new Error('expected npm pack --json to return one archive filename')
	}
	return join(destination, report.filename)
}

/** Install one local archive in offline mode using the cache populated by the root install. */
export function installArchive(cwd: string, archive: string): SpawnSyncReturns<string> {
	const npm = process.env.npm_execpath
	if (npm === undefined) throw new Error('expected npm_execpath while running the npm test script')
	return spawnSync(
		process.execPath,
		[npm, 'install', '--offline', '--ignore-scripts', '--no-audit', '--no-fund', archive],
		{
			cwd,
			encoding: 'utf8',
			timeout: 120_000,
		},
	)
}

/** Resolve a JavaScript bin entry from a package physically installed under one root. */
export function resolveInstalledBin(cwd: string, packageName: string, binName: string): string {
	const packagePath = join(cwd, 'node_modules', ...packageName.split('/'), 'package.json')
	const manifest = parseJSON(readFileSync(packagePath, 'utf8'))
	if (!isRecord(manifest)) throw new Error(`expected ${packageName} to have an object manifest`)
	const bin = manifest.bin
	const entry = isRecord(bin) ? bin[binName] : bin
	if (typeof entry !== 'string') {
		throw new Error(`expected ${packageName} to declare the ${binName} bin`)
	}
	return join(dirname(packagePath), entry)
}

/** Return the exact files npm would pack for a generated package without running scripts. */
export function packFiles(cwd: string): readonly string[] {
	const npm = process.env.npm_execpath
	if (npm === undefined) throw new Error('expected npm_execpath while running the npm test script')
	const packed = spawnSync(
		process.execPath,
		[npm, 'pack', '--dry-run', '--json', '--ignore-scripts'],
		{
			cwd,
			encoding: 'utf8',
			timeout: 30_000,
		},
	)
	if (packed.status !== 0) {
		throw new Error(
			`npm pack dry-run failed: status=${String(packed.status)} error=${String(packed.error)} stdout=${packed.stdout} stderr=${packed.stderr}`,
		)
	}
	const reports = parseJSON(packed.stdout)
	const report = Array.isArray(reports) ? reports[0] : undefined
	if (!isRecord(report) || !Array.isArray(report.files)) {
		throw new Error('expected npm pack --dry-run --json to return one file report')
	}
	const paths: string[] = []
	for (const file of report.files) {
		if (!isRecord(file) || typeof file.path !== 'string') {
			throw new Error('expected every npm pack file to carry a string path')
		}
		paths.push(file.path)
	}
	return paths
}

/** Whether a real fixture path carries an executable permission bit. */
export function isExecutable(path: string): boolean {
	return (statSync(path).mode & 0o111) !== 0
}

/** Resolve one installed package's real cross-platform JavaScript bin entrypoint. */
export function resolveToolEntry(packageName: string, binName: string): string {
	const require = createRequire(join(WORKSPACE_ROOT, 'package.json'))
	const packagePath = require.resolve(`${packageName}/package.json`)
	const manifest = parseJSON(readFileSync(packagePath, 'utf8'))
	if (!isRecord(manifest)) {
		throw new Error(`expected ${packageName}/package.json to parse to a JSON object`)
	}
	const bin = manifest.bin
	const entry = isRecord(bin) ? bin[binName] : bin
	if (typeof entry !== 'string') {
		throw new Error(`expected ${packageName}/package.json "bin" to carry a "${binName}" entry`)
	}
	return join(dirname(packagePath), entry)
}

/** Build the generated-minimal centralized-file quartet for one environment entity. */
export function buildEnvironmentQuartet(pascal: string): readonly string[] {
	return ['types.ts', `${pascal}.ts`, 'factories.ts', 'index.ts']
}

/** Build an audit fixture from focused finding inputs. */
export function buildAudit(findings: readonly Finding[]): Audit {
	const drifted = findings.filter((finding) => finding.drift === 'stale').length
	const missing = findings.filter((finding) => finding.drift === 'missing').length
	const foreign = findings.filter((finding) => finding.drift === 'foreign').length
	return {
		findings,
		clean: drifted === 0 && missing === 0 && foreign === 0,
		complete: true,
		questions: [],
		drifted,
		missing,
		foreign,
	}
}

/** Build a complete raw host fixture with optional focused content overrides. */
export async function buildFromFixture(
	overrides?: Readonly<Record<string, string>>,
): Promise<TempDirectoryInterface> {
	const directory = await buildTempDirectory()
	for (const [relative, content] of Object.entries({ ...HOST_FIXTURE_FILES, ...overrides })) {
		const full = join(directory.path, relative)
		mkdirSync(dirname(full), { recursive: true })
		writeFileSync(full, content)
	}
	return directory
}

/** Build the manifest-backed form of the complete host fixture. */
export async function buildStagedHost(): Promise<TempDirectoryInterface> {
	const source = await buildFromFixture()
	const host = await buildTempDirectory()
	try {
		stageHost(source.path, host.path, Object.keys(HOST_FIXTURE_FILES))
		return host
	} catch (error) {
		await host.cleanup()
		throw error
	} finally {
		await source.cleanup()
	}
}

/** Materialize a fresh package through the built command. */
export function scaffoldPackage(cwd: string, name: string, from: string): string {
	const created = runBin(
		['new', name, '--src', 'core', '--apply', '--target', name, '--from', from],
		'',
		{ cwd },
	)
	if (created.status !== 0) {
		throw new Error(`fixture scaffold failed: ${created.stdout}${created.stderr}`)
	}
	return join(cwd, name)
}

/** Build the catalog agent file a catalog command updates. */
export function buildCatalogTarget(cwd: string): string {
	const agents = join(cwd, '.claude', 'agents')
	mkdirSync(agents, { recursive: true })
	writeFileSync(
		join(agents, 'orkestrel.md'),
		['# catalog', '', '<!-- catalog:start -->', 'placeholder', '<!-- catalog:end -->', ''].join(
			'\n',
		),
	)
	return cwd
}

/** Build real local package manifests for an offline catalog fixture. */
export function buildCatalogFrom(directory: string, packages: readonly string[]): void {
	for (const name of packages) {
		const path = join(directory, name)
		mkdirSync(path, { recursive: true })
		writeFileSync(
			join(path, 'package.json'),
			JSON.stringify({ name: `@orkestrel/${name}`, version: '1.0.0' }),
		)
	}
}
