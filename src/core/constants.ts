import type {
	AppDefinition,
	BuildFormat,
	Category,
	CompileStage,
	Freshness,
	Group,
	Origin,
	Environment,
	SrcDefinition,
} from './types.js'

/** The three `Environment` values, frozen — compose with `literalOf(...)` / `parseEnum(...)`. */
export const ENVIRONMENTS: readonly Environment[] = Object.freeze(['core', 'browser', 'server'])

/** The three `Origin` values, frozen. */
export const ORIGINS: readonly Origin[] = Object.freeze(['host', 'template', 'computed'])

/** The seven `Group` values, frozen — the artifact-group selection vocabulary. */
export const GROUPS: readonly Group[] = Object.freeze([
	'manifest',
	'configs',
	'source',
	'tests',
	'guides',
	'docs',
	'orchestration',
])

/** The nine `Category` values, frozen. */
export const CATEGORIES: readonly Category[] = Object.freeze([
	'type',
	'alias',
	'constant',
	'factory',
	'entity',
	'parser',
	'guard',
	'handler',
	'error',
])

/** The four `Freshness` values, frozen — the currency axis `Sync` reports on. */
export const FRESHNESS: readonly Freshness[] = Object.freeze([
	'current',
	'behind',
	'missing',
	'failed',
])

/** The pipeline phases in order, frozen. */
export const COMPILE_STAGES: readonly CompileStage[] = Object.freeze(['draft', 'gate', 'pin'])

/**
 * The per-environment variant matrix as data: per `Environment`, its `configs/src`
 * files, Vitest project label, `exports` subpath, and build formats — the
 * per-environment layer `blueprintToPlan` reads BENEATH the manifest/exports
 * combination rules it applies on top.
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
 * The per-environment application matrix: thin config artifacts, Vitest project
 * label, and executable entry where the environment produces a runtime bundle.
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

/**
 * The byte-copied host artifact paths, frozen.
 *
 * @remarks
 * The root docs (`AGENTS.md` / `CLAUDE.md`), `LICENSE`, `.agents`, `.claude`, `.codex`,
 * the four SessionStart hook scripts (`scripts/deps.sh` / `scripts/cursor.sh` /
 * `scripts/codex.sh` / `scripts/ollama.sh`), the repository coding-law policy module,
 * the line's seven byte-identical root dotfiles, and the two guides-grouped mirrors every repo carries: the line-wide
 * dev-tooling guide (`guides/src/guide.md`) and the
 * scaffold engine's own self-guide (`guides/src/scaffold.md`).
 */
export const HOST_PATHS: readonly string[] = Object.freeze([
	'AGENTS.md',
	'CLAUDE.md',
	'LICENSE',
	'.agents/skills',
	'.claude/agents',
	'.claude/rules',
	'.claude/skills',
	'.claude/settings.json',
	'.codex/agents',
	'.codex/config.toml',
	'scripts/deps.sh',
	'scripts/cursor.sh',
	'scripts/codex.sh',
	'scripts/ollama.sh',
	'tests/setupPolicy.ts',
	'.editorconfig',
	'.gitattributes',
	'.gitignore',
	'.oxfmtrc.json',
	'.oxlintrc.json',
	'.oxlintignore',
	'.prettierignore',
	'guides/src/guide.md',
	'guides/src/scaffold.md',
])

/** The package-name RegExp — lowercase alphanumeric-with-hyphens, letter-first. */
export const NAME_PATTERN = /^[a-z][a-z0-9-]*$/

/** Maximum bare workspace name length beneath the generated `@orkestrel/` scope. */
export const MAX_NAME_LENGTH = 203

/** Maximum dependency package name length, including the canonical scope. */
export const MAX_DEPENDENCY_NAME_LENGTH = 214

/** Maximum general path length accepted at serialized package boundaries. */
export const MAX_PATH_LENGTH = 32_767

/** Unicode controls, formatting controls, and line/paragraph separators rejected at text boundaries. */
export const CONTROL_CHARACTER_PATTERN = /[\p{Cc}\p{Cf}\p{Zl}\p{Zp}]/u

/** Visible characters forbidden by portable paths and Markdown path cells. */
export const INVALID_PATH_CHARACTER_PATTERN = /[<>:"|?*\\]/

/** Maximum package range or endpoint-sized token length. */
export const MAX_RANGE_LENGTH = 2_048

/** Maximum items accepted by one public package collection. */
export const MAX_COLLECTION_ITEMS = 1_000

/** Maximum distinct records or arrays traversed at one untrusted data-only graph boundary. */
export const MAX_DATA_GRAPH_NODES = MAX_COLLECTION_ITEMS * 20

/** Maximum own keys inspected across one untrusted data-only graph boundary. */
export const MAX_DATA_GRAPH_KEYS = MAX_DATA_GRAPH_NODES * 16

/** The exact three-component version syntax accepted by `validateBlueprint`. */
export const VERSION_PATTERN = /^(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/

/** The exact caret-pinned pre-1.0 range accepted for Orkestrel runtime dependencies. */
export const ORKESTREL_RANGE_PATTERN = /^\^0\.0\.(?:0|[1-9]\d*)$/

/** The registry-only semver subset accepted for package-specific development extras. */
export const EXTRA_RANGE_PATTERN =
	/^(?:\^|~)?(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*))*)?$/

/** The minimum-Node engine syntax accepted by `validateBlueprint`. */
export const ENGINES_PATTERN = /^>=(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/

/** The oldest Node version supported by the generated Vite toolchain. */
export const MINIMUM_NODE_VERSION = '22.12.0'

/** Declaration token kept out of template literals so parity scans see only real exports. */
export const EXPORT_KEYWORD = 'export'

/** Constant-declaration token kept out of template literals consumed by parity scans. */
export const CONST_KEYWORD = 'const'

/** Import token kept out of template literals consumed by parity scans. */
export const IMPORT_KEYWORD = 'import'

/** Function-declaration token kept out of template literals consumed by parity scans. */
export const FUNCTION_KEYWORD = 'function'

/** Exact lowercase hexadecimal bytes: two digits per byte, including empty content. */
export const HEX_PATTERN = /^(?:[0-9a-f]{2})*$/

/** Maximum byte size accepted for one scaffold artifact. */
export const MAX_ARTIFACT_BYTES = 5_242_880

/** Maximum UTF-8 bytes accepted for one package or host manifest. */
export const MAX_MANIFEST_BYTES = 1_048_576

/** Maximum aggregate bytes retained by one blueprint, plan, audit, or sync report. */
export const MAX_TOTAL_ARTIFACT_BYTES = 104_857_600

/**
 * Maximum UTF-8 bytes accepted by a public serialized JSON parser.
 *
 * Four aggregate artifact budgets admit the hexadecimal and metadata overhead
 * of the largest supported contracts while bounding allocation before JSON parsing.
 */
export const MAX_SERIALIZED_INPUT_BYTES = MAX_TOTAL_ARTIFACT_BYTES * 4

/** Maximum hexadecimal string length representing one scaffold artifact. */
export const MAX_ARTIFACT_HEX_LENGTH = MAX_ARTIFACT_BYTES * 2

/** Target-aware guide baseline: an absence marker or exact SHA-256 digest. */
export const SYNC_BASELINE_PATTERN = /^(?:absent|[0-9a-f]{64})$/

/**
 * The `@orkestrel/*` dependency-name RegExp — every `Dependency.name` must be
 * scoped to `@orkestrel` and NAME_PATTERN-shaped after the scope, closing the
 * traversal vector a hand-built `../`-laced name would open through
 * `Compiler.#pointerArtifacts`' `guides/src/<short>.md` path derivation.
 */
export const DEPENDENCY_NAME_PATTERN = /^@orkestrel\/[a-z][a-z0-9-]*$/

/**
 * The `extras` dependency-name RegExp — a strict npm package-name shape: an
 * optional single `@scope/` prefix, then lowercase letters, digits, hyphens,
 * dots, and underscores (never leading, never adjacent to the scope slash).
 * Broader than `DEPENDENCY_NAME_PATTERN` on purpose: `extras` names are
 * manifest-content only (`devDependenciesFor` keys `devDependencies` with
 * them, `Compiler.#pointerArtifacts` never reads them for a path), so they
 * carry no traversal vector — no `..`, no backslash, and the single optional
 * `/` is fixed to the one scope boundary, so the shape stays structurally
 * incapable of escaping a derived path even though it accepts any valid npm
 * package name (unscoped or externally-scoped), not just `@orkestrel/*`.
 */
export const EXTRA_NAME_PATTERN = /^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/

/** The starting version the `blueprint` builder fills. */
export const DEFAULT_VERSION = '0.0.1'

/** The `engines.node` range the `blueprint` builder fills. */
export const DEFAULT_ENGINES = `>=${MINIMUM_NODE_VERSION}`

/** The devDependency range generated packages pin `@orkestrel/scaffold` at. */
export const SCAFFOLD_RANGE = '^0.0.2'

/** Tooling versions shared by scaffold and every generated workspace. */
export const BASE_DEV_DEPENDENCIES: Readonly<Record<string, string>> = Object.freeze({
	'@microsoft/api-extractor': '^7.58.12',
	'@orkestrel/guide': '^0.0.5',
	'@orkestrel/scaffold': SCAFFOLD_RANGE,
	'@types/node': '^26.1.1',
	oxfmt: '^0.60.0',
	oxlint: '^1.75.0',
	typescript: '^6.0.3',
	vite: '^8.1.5',
	'vite-plugin-dts': '^5.0.3',
	vitest: '^4.1.10',
})

/** Additional development dependency required by a published browser source environment. */
export const SOURCE_BROWSER_DEV_DEPENDENCIES: Readonly<Record<string, string>> = Object.freeze({
	'@vitest/browser-playwright': '^4.1.10',
	playwright: '^1.61.1',
})

/** Additional development dependencies required by a private Vue browser application. */
export const APP_BROWSER_DEV_DEPENDENCIES: Readonly<Record<string, string>> = Object.freeze({
	...SOURCE_BROWSER_DEV_DEPENDENCIES,
	'@vitejs/plugin-vue': '^6.0.8',
	vue: '^3.5.40',
	'vue-tsc': '^3.3.7',
})

/** Immutable official actions/checkout v6.0.2 commit used by generated CI. */
export const CHECKOUT_ACTION_SHA = 'de0fac2e4500dabe0009e67214ff5f5447ce83dd'

/** Immutable official actions/setup-node v6.4.0 commit used by generated CI. */
export const SETUP_NODE_ACTION_SHA = '48b55a011bda9f5d6aeb4c2d9c7362e8dae4041e'

/** The default id for a `Compiler` orchestrator. */
export const COMPILER_ID = 'compiler'

/** TypeScript module extensions every generated scoped configuration checks. */
export const TYPESCRIPT_EXTENSIONS: readonly string[] = Object.freeze(['cts', 'mts', 'ts', 'tsx'])

/** The fleet's `.oxfmtrc.json` `printWidth` — `formatJson`'s array-collapse threshold. */
export const JSON_PRINT_WIDTH = 100

/** The fleet's `.oxfmtrc.json` `tabWidth` — the column width `formatJson` counts each tab as. */
export const JSON_TAB_WIDTH = 2
