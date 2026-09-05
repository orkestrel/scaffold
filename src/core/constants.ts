import type { AppDefinition, BuildFormat, Environment, Group, SrcDefinition } from './types.js'
import manifest from '../../package.json' with { type: 'json' }

/**
 * Lists the `Environment` values, frozen.
 *
 * @remarks
 * A blueprint's `src` and `app` axes are caller-supplied, so the gate measures
 * each selection against this list and reports it as the accepted candidates
 * when it rejects one. It is also the key order the per-environment matrices
 * are read in.
 */
export const ENVIRONMENTS: readonly Environment[] = Object.freeze(['core', 'browser', 'server'])

/**
 * Lists the `Group` values in plan order, frozen.
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
 * Holds the build and export settings each published `src` environment contributes, frozen.
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
 * Holds the configuration and runtime-entry settings each private `app` environment
 * contributes, frozen.
 *
 * @remarks
 * An application environment declares no exports, so it carries a runtime
 * entry instead of a subpath and formats. Core carries none because it is
 * shared logic the other environments import rather than a host that runs.
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

/** Lists the configuration files a workspace that ships its own executable adds, frozen. */
export const BIN_CONFIGS: readonly string[] = Object.freeze([
	'configs/src/vite.bin.config.ts',
	'configs/src/tsconfig.bin.json',
])

/** Names the executable entry whose presence makes a workspace `bin`. */
export const BIN_ENTRY_PATH = 'src/bin/main.ts'

/**
 * Lists the paths a target receives from the vendored data root, frozen.
 *
 * @remarks
 * These are the files the fleet shares verbatim, and each target holds a copy
 * of the paths it selects: the licence, the harness permission file, the
 * session-start hooks, the shared policy register, the shared policy proof,
 * the shared policy plugin, the shared configuration leaf and its proof, the
 * byte-identical root dotfiles, and the guide mirrors a generated workspace
 * starts from. A directory entry vendors everything beneath it.
 *
 * A plan carries the subset its target selects, which is why the list is a
 * candidate set rather than a plan: a workspace never mirrors its own guide.
 *
 * Neither the instruction canon nor the bench and MCP wiring is here. A target reads
 * its rules, its skills, its agent roles, its bench configuration, and its MCP
 * registrations from {@link CANON_PATHS} inside the installed package, so no
 * file scaffold leaves in a target names a path the target does not hold.
 * `nameToHostArtifacts` appends {@link CATALOG_AGENT_PATH} to what this list
 * selects, which is what keeps the list itself disjoint from the canon.
 */
export const HOST_PATHS: readonly string[] = Object.freeze([
	'LICENSE',
	'.claude/settings.json',
	'scripts/deps.sh',
	'scripts/cursor.sh',
	'scripts/codex.sh',
	'scripts/ollama.sh',
	'tests/setupPolicy.ts',
	'tests/policy.test.ts',
	'tests/config.test.ts',
	'configs/helpers.ts',
	'configs/policy.ts',
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
 * Lists the instruction-canon paths staged for reading rather than for a target, frozen.
 *
 * @remarks
 * The root instruction documents, the orchestration contract every harness
 * bridge points at, the rule map's rules, the skills, the templates, the
 * transport contracts, the agent roles each harness dispatches, the bench
 * configuration, and the MCP registrations. A directory entry covers everything
 * beneath it.
 *
 * Staging walks these beside {@link HOST_PATHS}, so a release ships them and a
 * reader reaches them two ways: a scaffold checkout sitting beside the
 * repository, or the `node_modules/@orkestrel/scaffold/dist/host/` root inside
 * the installed package. The `AGENTS.md` and `CLAUDE.md` pointers scaffold plans
 * are what name each location.
 *
 * The lists are disjoint by prefix in either direction: no member of either
 * equals or sits beneath a member of the other. Staging depends on that, because
 * the walk covers the union and a path it discovers twice claims one storage
 * name twice, which refuses the stage.
 *
 * The plan claims paths inside the canon deliberately, and each has a reason.
 * `blueprintToDocumentArtifacts` claims `AGENTS.md` and `CLAUDE.md` as this
 * package's own template pointers. `nameToHostArtifacts` claims
 * {@link CATALOG_AGENT_PATH}, because the catalog verb refuses a target that
 * lacks the file and repair restores its absence.
 *
 * A target therefore holds a file at a canon path only where the plan claims it.
 * That is the rule every verb obeys, and it is what makes a copy found anywhere
 * else superseded.
 */
export const CANON_PATHS: readonly string[] = Object.freeze([
	'AGENTS.md',
	'CLAUDE.md',
	'.mcp.json',
	'.agents/orchestration.md',
	'.agents/skills',
	'.agents/templates',
	'.agents/transports',
	'.claude/agents',
	'.claude/rules',
	'.claude/skills',
	'.codex/agents',
	'.codex/config.toml',
	'.cursor/mcp.json',
	'.cursor/rules',
])

/** Names the repository-relative path where the committed vendored-file inventory is served. */
export const HOST_INVENTORY_PATH = 'host.json'

/**
 * Lists the vendored paths whose present bytes belong to each workspace, frozen.
 *
 * @remarks
 * These paths are copied into a workspace when absent and are never compared
 * or replaced while present. A workspace therefore stops receiving later
 * canonical updates to them. `.gitignore` takes that trade because its correct
 * rules differ by workspace, so scaffold cannot own its bytes.
 */
export const WORKSPACE_OWNED_PATHS: readonly string[] = Object.freeze(['.gitignore'])

/**
 * Lists the vendored paths a target receives with its executable bit set, frozen.
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
 * Lists the path prefixes whose contents instruct or wire an agent, frozen.
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
 * Lists the exact root filenames that wire an agent bench rather than the toolchain, frozen.
 *
 * @remarks
 * `.mcp.json` registers MCP servers for the harness. It sits among the root
 * dotfiles but governs agents, so it groups with the harness bridges.
 */
export const ORCHESTRATION_PATH_NAMES: readonly string[] = Object.freeze(['.mcp.json'])

/**
 * Names the agent file whose marker-bounded package table the catalog verb alone owns.
 *
 * @remarks
 * A plan claims it at a canon path, because the catalog verb refuses a target
 * that lacks the file. `nameToHostArtifacts` appends it to the vendored
 * selection, and it reaches a release through the `.claude/agents` directory in
 * {@link CANON_PATHS} rather than through {@link HOST_PATHS}, which is what
 * keeps the two lists disjoint.
 *
 * It is claimed by presence rather than content, so a consumer's own edits to
 * the file survive every verb and only the catalog verb rewrites the region
 * inside the markers.
 */
export const CATALOG_AGENT_PATH = '.claude/agents/orkestrel.md'

/**
 * Names the marker opening the package table inside {@link CATALOG_AGENT_PATH}.
 *
 * @remarks
 * The catalog verb rewrites the region between this marker and
 * {@link CATALOG_CLOSING_MARKER} and leaves every other byte of the file alone,
 * so the writer and every proof that reads the rendered file read the pair from
 * here rather than repeating a literal that only agrees by inspection.
 */
export const CATALOG_OPENING_MARKER = '<!-- orkestrel:catalog -->'

/**
 * Names the marker closing the package table inside {@link CATALOG_AGENT_PATH}.
 *
 * @remarks
 * It pairs with {@link CATALOG_OPENING_MARKER}; a file missing either marker is
 * refused rather than rewritten.
 */
export const CATALOG_CLOSING_MARKER = '<!-- /orkestrel:catalog -->'

/** Names the provisioner skeleton a workspace with declared service vendors is given once. */
export const SERVICE_SCRIPT_PATH = 'scripts/service.sh'

/** Names the shared Vitest global-setup module whose presence makes a workspace `global`. */
export const GLOBAL_SETUP_PATH = 'tests/setupGlobal.ts'

/** Names the guide-parity proof whose presence selects the planned `guides` project. */
export const GUIDES_TEST_PATH = 'tests/guides.test.ts'

/** Names the generated packed-package proof every publishing workspace is planned at. */
export const DISTRIBUTION_TEST_PATH = 'tests/distribution.test.ts'

/**
 * Names the `prepublishOnly` row that runs the packed-package proof against a real registry.
 *
 * @remarks
 * The proof reads `import.meta.env.MODE`, so without `--mode release` it passes
 * on an unreachable registry instead of failing. The row therefore has one home
 * and both the script compiler and the manifest region writer read it from here.
 */
export const RELEASE_PROOF_COMMAND = 'npm run test:distribution -- --mode release'

/**
 * Names the cross-environment composition proof whose presence makes a workspace
 * `integration`.
 */
export const INTEGRATION_TEST_PATH = 'tests/integration.test.ts'

/** Names the manifest path every compiler plan emits with birth ownership. */
export const MANIFEST_PATH = 'package.json'

/** Names the official-tooling drift proof whose presence makes a workspace `conformance`. */
export const CONFORMANCE_TEST_PATH = 'tests/conformance.test.ts'

/** Names the live-service readiness module whose presence makes a workspace `service`. */
export const SERVICE_SETUP_PATH = 'tests/setupService.ts'

/**
 * Names the include the live-service project covers, which is a directory rather than
 * one proof.
 */
export const SERVICE_TEST_INCLUDE = 'tests/service/**/*.test.ts'

/** Names the Vite wrapper whose presence makes a workspace `showcase`. */
export const SHOWCASE_CONFIG_PATH = 'configs/app/vite.showcase.config.ts'

/** Matches the bare workspace name syntax: lowercase alphanumeric with hyphens, letter first. */
export const NAME_PATTERN = /^[a-z][a-z0-9-]*$/

/**
 * Matches the runtime dependency name syntax: the `@orkestrel` scope and a bare name.
 *
 * @remarks
 * A dependency name reaches a path, because a workspace's guide mirror is
 * derived from it. Fixing the scope and forbidding everything but the bare name
 * after it is what stops a hand-built name from escaping the directory the
 * mirror belongs in.
 */
export const DEPENDENCY_NAME_PATTERN = /^@orkestrel\/[a-z][a-z0-9-]*$/

/**
 * Matches the package name syntax for a dependency this package does not publish.
 *
 * @remarks
 * A foreign package is one this package does not publish, so its name reaches
 * no path. It may carry any scope or no scope at all. Each name segment begins
 * with an alphanumeric character after an optional leading `@`, and the name
 * carries at most one `/`. No segment can therefore be `..`, and no backslash
 * is admitted, so the shape cannot express a traversal.
 */
export const FOREIGN_NAME_PATTERN = /^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/

/** Matches the exact `major.minor.patch` version syntax a blueprint declares. */
export const VERSION_PATTERN = /^(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/

/**
 * Matches the exact caret-pinned pre-1.0 range accepted for an `@orkestrel/*` runtime dependency.
 *
 * @remarks
 * Pre-1.0 means any `0.x`, not `0.0.x`. The narrower form would refuse the first
 * fleet package to reach `0.1.0`, and `catalog` pins to whatever the registry
 * publishes, so a single minor release would block every later run against a
 * workspace that had already been pinned to it.
 */
export const ORKESTREL_RANGE_PATTERN = /^\^0\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/

/** Matches the registry-only semver subset accepted for a development extra's range. */
export const EXTRA_RANGE_PATTERN =
	/^(?:\^|~)?(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*))*)?$/

/**
 * Matches the exact `major.minor.patch` floor accepted for a foreign peer's range.
 *
 * @remarks
 * This is independent from {@link ENGINES_PATTERN}. An engine floors the Node
 * runtime a workspace supports, while a peer floors a tool the consumer
 * supplies. Either obligation may change without changing the other.
 */
export const FLOOR_RANGE_PATTERN = /^>=(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/

/** Matches the minimum-Node engine syntax a blueprint declares. */
export const ENGINES_PATTERN = /^>=(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/

/** Matches exact lowercase hexadecimal bytes: two digits per byte, and empty content is valid. */
export const HEX_PATTERN = /^(?:[0-9a-f]{2})*$/

/**
 * Matches the Unicode controls, formatting controls, and line and paragraph separators
 * rejected in text.
 */
export const CONTROL_CHARACTER_PATTERN = /[\p{Cc}\p{Cf}\p{Zl}\p{Zp}]/u

/** Matches the visible characters a target-relative path and a Markdown path cell both forbid. */
export const INVALID_PATH_CHARACTER_PATTERN = /[<>:"|?*\\]/

/**
 * Caps the bare workspace name length.
 *
 * @remarks
 * The registry caps a whole package name at 214 characters and the generated
 * scope `@orkestrel/` spends 11 of them.
 */
export const MAX_NAME_LENGTH = 203

/** Sets the maximum dependency package name length, scope included, as the registry caps it. */
export const MAX_DEPENDENCY_NAME_LENGTH = 214

/** Caps the length of one declared package range. */
export const MAX_RANGE_LENGTH = 2_048

/** Caps the length of one manifest script name or command. */
export const MAX_SCRIPT_LENGTH = 4_096

/** Caps the length of one path, matching the longest a supported filesystem accepts. */
export const MAX_PATH_LENGTH = 32_767

/** Caps the items accepted in one public collection. */
export const MAX_COLLECTION_ITEMS = 1_000

/** Caps the columns one emitted line may occupy, matching `printWidth` in `.oxfmtrc.json`. */
export const PRINT_WIDTH = 100

/** Sets the columns one tab occupies when the formatter measures a line, matching `tabWidth`. */
export const TAB_WIDTH = 2

/** Caps the findings one audit can produce from a bounded plan and snapshot. */
export const MAX_AUDIT_FINDINGS = MAX_COLLECTION_ITEMS * 2

/** Caps the bytes accepted for one artifact. */
export const MAX_ARTIFACT_BYTES = 5_242_880

/** Caps the length of the hexadecimal string carrying one artifact's bytes. */
export const MAX_ARTIFACT_HEX_LENGTH = MAX_ARTIFACT_BYTES * 2

/**
 * Caps the decoded bytes accepted from one registry response.
 *
 * @remarks
 * The 2026-08-21 abbreviated-packument measurements were 8,647,138 bytes for
 * TypeScript, 8,077,438 for Playwright, 2,315,360 for `@types/node`, 2,298,256
 * for Vite, and 1,272,652 for Vitest. The bound leaves headroom above those
 * registry answers.
 */
export const MAX_REGISTRY_BYTES = 33_554_432

/**
 * Caps the decoded bytes accepted across one registry-reading call.
 *
 * @remarks
 * The 2026-08-21 browser-workspace registry set measured about 24 MiB. The
 * bound leaves headroom for that set to grow without making a call unbounded.
 */
export const MAX_TOTAL_REGISTRY_BYTES = 100_663_296

/** Caps the bytes accepted for one package or vendored-host manifest. */
export const MAX_MANIFEST_BYTES = 1_048_576

/** Caps the bytes retained across one whole plan or audit. */
export const MAX_TOTAL_ARTIFACT_BYTES = 104_857_600

/** Names the oldest Node version the generated toolchain supports. */
export const MINIMUM_NODE_VERSION = '22.12.0'

/** Names the version a workspace starts at. */
export const DEFAULT_VERSION = '0.0.1'

/** Names the `engines.node` range a workspace starts with. */
export const DEFAULT_ENGINES = `>=${MINIMUM_NODE_VERSION}`

/** Holds the tooling versions scaffold and every generated workspace share. */
export const BASE_DEV_DEPENDENCIES: Readonly<Record<string, string>> = Object.freeze({
	'@orkestrel/guide': manifest.devDependencies['@orkestrel/guide'],
	'@orkestrel/probe': manifest.devDependencies['@orkestrel/probe'],
	'@orkestrel/scaffold': `^${manifest.version}`,
	'@orkestrel/test': manifest.devDependencies['@orkestrel/test'],
	'@types/node': manifest.devDependencies['@types/node'],
	oxfmt: manifest.devDependencies.oxfmt,
	oxlint: manifest.devDependencies.oxlint,
	typescript: manifest.devDependencies.typescript,
	vite: manifest.devDependencies.vite,
	vitest: manifest.devDependencies.vitest,
})

/**
 * Lists the development dependencies that emit declarations for published source or an
 * executable.
 */
export const DECLARATION_DEV_DEPENDENCIES: Readonly<Record<string, string>> = Object.freeze({
	'@microsoft/api-extractor': manifest.devDependencies['@microsoft/api-extractor'],
	'vite-plugin-dts': manifest.devDependencies['vite-plugin-dts'],
})

/** Lists the development dependencies a published browser `src` environment adds. */
export const SOURCE_BROWSER_DEV_DEPENDENCIES: Readonly<Record<string, string>> = Object.freeze({
	'@vitest/browser-playwright': manifest.devDependencies['@vitest/browser-playwright'],
	playwright: manifest.devDependencies.playwright,
})

/** Names the development dependency every private `app` environment adds. */
export const APP_DEV_DEPENDENCIES: Readonly<Record<string, string>> = Object.freeze({
	'@orkestrel/contract': manifest.dependencies['@orkestrel/contract'],
})

/** Lists the development dependencies a private Vue browser application adds. */
export const APP_BROWSER_DEV_DEPENDENCIES: Readonly<Record<string, string>> = Object.freeze({
	...SOURCE_BROWSER_DEV_DEPENDENCIES,
	'@orkestrel/html': manifest.devDependencies['@orkestrel/html'],
	'@vitejs/plugin-vue': '^6.0.8',
	vue: '^3.5.40',
	'vue-tsc': '^3.3.7',
})

/**
 * Names the development dependency used only by the optional single-file showcase build.
 *
 * @example
 * ```ts
 * import { SHOWCASE_DEV_DEPENDENCIES } from '@orkestrel/scaffold'
 *
 * SHOWCASE_DEV_DEPENDENCIES['vite-plugin-singlefile'] // the showcase plugin range
 * ```
 */
export const SHOWCASE_DEV_DEPENDENCIES: Readonly<Record<string, string>> = Object.freeze({
	'vite-plugin-singlefile': '^2.3.3',
})

/** Lists the development dependencies a private server application adds. */
export const APP_SERVER_DEV_DEPENDENCIES: Readonly<Record<string, string>> = Object.freeze({
	'@orkestrel/emitter': manifest.dependencies['@orkestrel/emitter'],
	'@orkestrel/middleware': '^0.0.16',
	'@orkestrel/router': '^0.0.10',
	'@orkestrel/server': '^0.0.14',
})
