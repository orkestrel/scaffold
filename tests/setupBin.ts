import type { SpawnSyncReturns } from 'node:child_process'
import type { TempDirectoryInterface } from './setupServer.js'
import { spawnSync } from 'node:child_process'
import { mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { isRecord, parseJSON } from '@orkestrel/contract'
import type { Audit, Finding, Plan } from '@src/core'
import { stageHost } from '@src/server'
import { buildTempDirectory, WORKSPACE_ROOT } from './setupServer.js'

/** Built scaffold executable exercised by all command-line tests. */
export const BIN_PATH = join(WORKSPACE_ROOT, 'dist/bin/scaffold.js')

/** Interactive repair handoff text whose absence non-terminal tests assert. */
export const REPAIR_HANDOFF_TEXT = 'run repair now?'

/** Shared plan fixture for bin helper tests. */
export const AUDIT_PLAN: Plan = {
	blueprint: {
		name: 'widget',
		keywords: [],
		surfaces: ['core'],
		dependencies: [],
		peers: [],
		extras: [],
		version: '0.0.1',
		engines: '>=22',
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
	'.github/workflows/ci.yml',
	'AGENTS.md',
	'CLAUDE.md',
	'LICENSE',
	'guides/src/guide.md',
	'guides/src/scaffold.md',
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
	'.agents/skills/example/SKILL.md': '---\nname: example\ndescription: Fixture skill.\n---\n',
	'.claude/agents/example.md': '# example agent fixture\n',
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

/** Whether a real fixture path carries an executable permission bit. */
export function isExecutable(path: string): boolean {
	return (statSync(path).mode & 0o111) !== 0
}

/** Resolve the real cross-platform oxfmt JavaScript entrypoint. */
export function resolveOxfmtEntry(): string {
	const require = createRequire(join(WORKSPACE_ROOT, 'package.json'))
	const packagePath = require.resolve('oxfmt/package.json')
	const manifest = parseJSON(readFileSync(packagePath, 'utf8'))
	if (!isRecord(manifest)) throw new Error('expected oxfmt/package.json to parse to a JSON object')
	const bin = manifest.bin
	const entry = isRecord(bin) ? bin.oxfmt : bin
	if (typeof entry !== 'string') {
		throw new Error('expected oxfmt/package.json "bin" to carry an "oxfmt" entry')
	}
	return join(dirname(packagePath), entry)
}

/** Build the generated-minimal centralized-file quartet for one surface entity. */
export function buildSurfaceQuartet(pascal: string): readonly string[] {
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
		['new', name, '--surfaces', 'core', '--apply', '--target', name, '--from', from],
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
