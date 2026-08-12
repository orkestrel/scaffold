import type { AppDefinition, BuildFormat, Environment, Group, SrcDefinition } from './types.js'

/**
 * The three `Environment` values, frozen.
 *
 * @remarks
 * A blueprint's `src` and `app` axes are caller-supplied, so the gate measures
 * each selection against this list and reports it as the accepted candidates
 * when it rejects one. It is also the key order the per-environment matrices
 * are read in.
 */
export const ENVIRONMENTS: readonly Environment[] = Object.freeze(['core', 'browser', 'server'])

/**
 * The seven `Group` values in plan order, frozen.
 *
 * @remarks
 * A compile that names no groups covers every one of them, so this list is the
 * default selection as well as the accepted candidates for a rejected one. The
 * order is the order a plan lists its artifacts in.
 */
export const GROUPS: readonly Group[] = Object.freeze([
	'manifest',
	'configs',
	'source',
	'tests',
	'guides',
	'docs',
	'orchestration',
])

/**
 * The build and export settings each published `src` environment contributes, frozen.
 *
 * @remarks
 * Per environment: the thin configuration files it adds under `configs/src`,
 * its Vitest project label, its `exports` subpath, and the module formats it
 * builds. Core alone occupies the package root, so it is the only environment
 * whose subpath is `.`; browser ships ES only because no CommonJS consumer
 * reaches it.
 */
export const SRC_MATRIX: Readonly<Record<Environment, SrcDefinition>> = Object.freeze({
	core: Object.freeze({
		configs: Object.freeze(['configs/src/vite.core.config.ts', 'configs/src/tsconfig.core.json']),
		project: 'src:core',
		path: '.',
		formats: Object.freeze<BuildFormat[]>(['es', 'cjs']),
	}),
	browser: Object.freeze({
		configs: Object.freeze([
			'configs/src/vite.browser.config.ts',
			'configs/src/tsconfig.browser.json',
		]),
		project: 'src:browser',
		path: './browser',
		formats: Object.freeze<BuildFormat[]>(['es']),
	}),
	server: Object.freeze({
		configs: Object.freeze([
			'configs/src/vite.server.config.ts',
			'configs/src/tsconfig.server.json',
		]),
		project: 'src:server',
		path: './server',
		formats: Object.freeze<BuildFormat[]>(['es', 'cjs']),
	}),
})

/**
 * The configuration and runtime-entry settings each private `app` environment contributes, frozen.
 *
 * @remarks
 * An application environment declares no exports, so it carries a runtime
 * entry instead of a subpath and formats. Core carries none because it is
 * shared logic the other two import rather than a host that runs.
 */
export const APP_MATRIX: Readonly<Record<Environment, AppDefinition>> = Object.freeze({
	core: Object.freeze({
		configs: Object.freeze(['configs/app/tsconfig.core.json']),
		project: 'app:core',
	}),
	browser: Object.freeze({
		configs: Object.freeze([
			'configs/app/vite.browser.config.ts',
			'configs/app/tsconfig.browser.json',
		]),
		project: 'app:browser',
		entry: 'app/browser/index.html',
	}),
	server: Object.freeze({
		configs: Object.freeze([
			'configs/app/vite.server.config.ts',
			'configs/app/tsconfig.server.json',
		]),
		project: 'app:server',
		entry: 'app/server/main.ts',
	}),
})

/** The configuration files a workspace that ships its own executable adds, frozen. */
export const BIN_CONFIGS: readonly string[] = Object.freeze([
	'configs/src/vite.bin.config.ts',
	'configs/src/tsconfig.bin.json',
])

/** The executable entry whose presence makes a workspace `bin`. */
export const BIN_ENTRY_PATH = 'src/bin/main.ts'

/**
 * The paths byte-copied from the vendored data root, frozen.
 *
 * @remarks
 * These are the files the fleet shares verbatim: the root instruction
 * documents, the licence, the canonical orchestration contract every harness
 * bridge points at, the four harness directories, the session hook scripts,
 * the shared policy register, the byte-identical root dotfiles, and the two
 * guide mirrors a generated workspace starts from. A directory entry vendors
 * everything beneath it.
 *
 * A plan carries the subset its target selects, which is why the list is a
 * candidate set rather than a plan: a workspace never mirrors its own guide.
 */
export const HOST_PATHS: readonly string[] = Object.freeze([
	'AGENTS.md',
	'CLAUDE.md',
	'LICENSE',
	'.agents/orchestration.md',
	'.agents/skills',
	'.claude/agents',
	'.claude/rules',
	'.claude/skills',
	'.claude/settings.json',
	'.codex/agents',
	'.codex/config.toml',
	'.cursor/mcp.json',
	'.cursor/rules',
	'.mcp.json',
	'scripts/deps.sh',
	'scripts/cursor.sh',
	'scripts/codex.sh',
	'scripts/ollama.sh',
	'tests/setupPolicy.ts',
	'tests/policy.test.ts',
	'tests/config.test.ts',
	'configs/helpers.ts',
	'.editorconfig',
	'.gitattributes',
	'.gitignore',
	'.oxfmtrc.json',
	'.oxlintrc.json',
	'.oxlintignore',
	'.prettierignore',
	'guides/guide.md',
	'guides/scaffold.md',
])

/**
 * The vendored paths a target receives with its executable bit set, frozen.
 *
 * @remarks
 * Declared rather than read from the staging host's filesystem, because that
 * reading is not portable: Windows carries no executable bit, so a host staged
 * there reports every file non-executable and every target receives hooks it
 * cannot run. Declaring the set here makes one checkout stage one manifest on
 * every host.
 *
 * Every entry is also a {@link HOST_PATHS} member or sits beneath one. A file
 * that must run when a target invokes it belongs here the moment it is vendored.
 */
export const EXECUTABLE_PATHS: readonly string[] = Object.freeze([
	'scripts/codex.sh',
	'scripts/cursor.sh',
	'scripts/deps.sh',
	'scripts/ollama.sh',
])

/**
 * The path prefixes whose contents instruct or wire an agent, frozen.
 *
 * @remarks
 * A path is grouped by what it governs rather than by where it sits: anything
 * beneath one of these prefixes is `orchestration`, and everything else that is
 * not source, tests, guides, docs, or a manifest is `configs`. A vendored path
 * and a foreign path found in a target are classified against the same list, so
 * a new harness directory is admitted once.
 */
export const ORCHESTRATION_PATH_PREFIXES: readonly string[] = Object.freeze([
	'.agents/',
	'.claude/',
	'.codex/',
	'.cursor/',
	'.github/',
	'scripts/',
])

/**
 * The exact root filenames that wire an agent bench rather than the toolchain, frozen.
 *
 * @remarks
 * `.mcp.json` registers MCP servers for the harness. It sits among the root
 * dotfiles but governs agents, so it groups with the harness bridges.
 */
export const ORCHESTRATION_PATH_NAMES: readonly string[] = Object.freeze(['.mcp.json'])

/**
 * The agent file whose marker-bounded package table the catalog verb alone owns.
 *
 * @remarks
 * It is vendored like every other host artifact but claimed by presence rather
 * than content, so a consumer's own edits to the file survive every verb and
 * only the catalog verb rewrites the region inside the markers.
 */
export const CATALOG_AGENT_PATH = '.claude/agents/orkestrel.md'

/** The provisioner skeleton a workspace with declared service vendors is given once. */
export const SERVICE_SCRIPT_PATH = 'scripts/service.sh'

/** The shared Vitest global-setup module whose presence makes a workspace `global`. */
export const GLOBAL_SETUP_PATH = 'tests/setupGlobal.ts'

/** The guide-parity proof whose physical file selects the fixed `guides` project. */
export const GUIDES_TEST_PATH = 'tests/guides.test.ts'

/** The installed-package proof whose presence makes a workspace `integration`. */
export const INTEGRATION_TEST_PATH = 'tests/integration.test.ts'

/** The official-tooling drift proof whose presence makes a workspace `conformance`. */
export const CONFORMANCE_TEST_PATH = 'tests/conformance.test.ts'

/** The live-service readiness module whose presence makes a workspace `service`. */
export const SERVICE_SETUP_PATH = 'tests/setupService.ts'

/** The include the live-service project covers, which is a directory rather than one proof. */
export const SERVICE_TEST_INCLUDE = 'tests/service/**/*.test.ts'

/** The Vite wrapper whose presence makes a workspace `showcase`. */
export const SHOWCASE_CONFIG_PATH = 'configs/app/vite.showcase.config.ts'

/** The bare workspace name syntax: lowercase alphanumeric with hyphens, letter first. */
export const NAME_PATTERN = /^[a-z][a-z0-9-]*$/

/**
 * The runtime dependency name syntax: the `@orkestrel` scope and a bare name.
 *
 * @remarks
 * A dependency name reaches a path, because a workspace's guide mirror is
 * derived from it. Fixing the scope and forbidding everything but the bare name
 * after it is what stops a hand-built name from escaping the directory the
 * mirror belongs in.
 */
export const DEPENDENCY_NAME_PATTERN = /^@orkestrel\/[a-z][a-z0-9-]*$/

/**
 * The development extra name syntax: any valid npm package name.
 *
 * @remarks
 * Wider than a runtime dependency name on purpose. An extra is manifest content
 * and never reaches a path, so it may carry any scope or no scope at all. The
 * single optional `/` is still fixed to the one scope boundary, and neither `..`
 * nor a backslash is admitted, so the shape cannot express a traversal even
 * though it accepts far more names.
 */
export const EXTRA_NAME_PATTERN = /^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/

/** The exact three-component version syntax a blueprint declares. */
export const VERSION_PATTERN = /^(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/

/**
 * The exact caret-pinned pre-1.0 range accepted for an `@orkestrel/*` runtime dependency.
 *
 * @remarks
 * Pre-1.0 means any `0.x`, not `0.0.x`. The narrower form would refuse the first
 * fleet package to reach `0.1.0`, and `catalog` pins to whatever the registry
 * publishes, so a single minor release would block every later run against a
 * workspace that had already been pinned to it.
 */
export const ORKESTREL_RANGE_PATTERN = /^\^0\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/

/** The registry-only semver subset accepted for a development extra's range. */
export const EXTRA_RANGE_PATTERN =
	/^(?:\^|~)?(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*))*)?$/

/** The minimum-Node engine syntax a blueprint declares. */
export const ENGINES_PATTERN = /^>=(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/

/** Exact lowercase hexadecimal bytes: two digits per byte, and empty content is valid. */
export const HEX_PATTERN = /^(?:[0-9a-f]{2})*$/

/** Unicode controls, formatting controls, and line and paragraph separators rejected in text. */
export const CONTROL_CHARACTER_PATTERN = /[\p{Cc}\p{Cf}\p{Zl}\p{Zp}]/u

/** Visible characters a target-relative path and a Markdown path cell both forbid. */
export const INVALID_PATH_CHARACTER_PATTERN = /[<>:"|?*\\]/

/**
 * Maximum bare workspace name length.
 *
 * @remarks
 * The registry caps a whole package name at 214 characters and the generated
 * scope `@orkestrel/` spends 11 of them.
 */
export const MAX_NAME_LENGTH = 203

/** Maximum dependency package name length, scope included, as the registry caps it. */
export const MAX_DEPENDENCY_NAME_LENGTH = 214

/** Maximum length of one declared package range. */
export const MAX_RANGE_LENGTH = 2_048

/** Maximum length of one path, matching the longest a supported filesystem accepts. */
export const MAX_PATH_LENGTH = 32_767

/** Maximum items accepted in one public collection. */
export const MAX_COLLECTION_ITEMS = 1_000

/** Maximum findings one audit can produce from a bounded plan and snapshot. */
export const MAX_AUDIT_FINDINGS = MAX_COLLECTION_ITEMS * 2

/** Maximum bytes accepted for one artifact. */
export const MAX_ARTIFACT_BYTES = 5_242_880

/** Maximum length of the hexadecimal string carrying one artifact's bytes. */
export const MAX_ARTIFACT_HEX_LENGTH = MAX_ARTIFACT_BYTES * 2

/** Maximum bytes accepted for one package or vendored-host manifest. */
export const MAX_MANIFEST_BYTES = 1_048_576

/** Maximum bytes retained across one whole plan or audit. */
export const MAX_TOTAL_ARTIFACT_BYTES = 104_857_600

/** The oldest Node version the generated toolchain supports. */
export const MINIMUM_NODE_VERSION = '22.12.0'

/** The version a workspace starts at. */
export const DEFAULT_VERSION = '0.0.1'

/** The `engines.node` range a workspace starts with. */
export const DEFAULT_ENGINES = `>=${MINIMUM_NODE_VERSION}`

/** The tooling versions scaffold and every generated workspace share. */
export const BASE_DEV_DEPENDENCIES: Readonly<Record<string, string>> = Object.freeze({
	'@microsoft/api-extractor': '^7.58.12',
	'@orkestrel/guide': '^0.0.10',
	'@orkestrel/scaffold': '^0.0.27',
	'@types/node': '^26.2.0',
	oxfmt: '^0.62.0',
	oxlint: '^1.77.0',
	typescript: '^6.0.3',
	vite: '~8.2.0',
	'vite-plugin-dts': '^5.0.3',
	vitest: '^4.1.10',
})

/** The development dependencies a published browser `src` environment adds. */
export const SOURCE_BROWSER_DEV_DEPENDENCIES: Readonly<Record<string, string>> = Object.freeze({
	'@vitest/browser-playwright': '^4.1.10',
	playwright: '^1.62.1',
})

/** The development dependency every private `app` environment adds. */
export const APP_DEV_DEPENDENCIES: Readonly<Record<string, string>> = Object.freeze({
	'@orkestrel/contract': '^0.0.11',
})

/** The development dependencies a private Vue browser application adds. */
export const APP_BROWSER_DEV_DEPENDENCIES: Readonly<Record<string, string>> = Object.freeze({
	...SOURCE_BROWSER_DEV_DEPENDENCIES,
	'@orkestrel/html': '^0.0.3',
	'@vitejs/plugin-vue': '^6.0.8',
	vue: '^3.5.40',
	'vue-tsc': '^3.3.7',
})

/**
 * The development dependency used only by the optional single-file showcase build.
 *
 * @example
 * ```ts
 * import { SHOWCASE_DEV_DEPENDENCIES } from '@orkestrel/scaffold'
 *
 * SHOWCASE_DEV_DEPENDENCIES['vite-plugin-singlefile'] // '^2.3.3'
 * ```
 */
export const SHOWCASE_DEV_DEPENDENCIES: Readonly<Record<string, string>> = Object.freeze({
	'vite-plugin-singlefile': '^2.3.3',
})

/** The development dependencies a private server application adds. */
export const APP_SERVER_DEV_DEPENDENCIES: Readonly<Record<string, string>> = Object.freeze({
	'@orkestrel/emitter': '^0.0.6',
	'@orkestrel/middleware': '^0.0.10',
	'@orkestrel/router': '^0.0.9',
	'@orkestrel/server': '^0.0.11',
})
