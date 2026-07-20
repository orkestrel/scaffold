/** The three `Surface` values, frozen — compose with `literalOf(...)` / `parseEnum(...)`. */
export const SURFACES = Object.freeze(['core', 'browser', 'server'] as const)

/** The three `Origin` values, frozen. */
export const ORIGINS = Object.freeze(['host', 'template', 'computed'] as const)

/** The seven `Group` values, frozen — the artifact-group selection vocabulary. */
export const GROUPS = Object.freeze([
	'manifest',
	'configs',
	'source',
	'tests',
	'guides',
	'docs',
	'orchestration',
] as const)

/** The four `Category` values, frozen. */
export const CATEGORIES = Object.freeze(['type', 'constant', 'factory', 'entity'] as const)

/** The four `Freshness` values, frozen — the currency axis `Sync` reports on. */
export const FRESHNESS = Object.freeze(['current', 'behind', 'missing', 'failed'] as const)

/** The pipeline phases in order, frozen. */
export const COMPILE_STAGES = Object.freeze(['draft', 'gate', 'pin'] as const)

/**
 * The per-surface variant matrix as data: per `Surface`, its `configs/src`
 * files, Vitest project label, `exports` subpath, and build formats — the
 * per-surface layer `blueprintToPlan` reads BENEATH the manifest/exports
 * combination rules it applies on top.
 */
export const SURFACE_MATRIX = Object.freeze({
	core: Object.freeze({
		configs: Object.freeze([
			'configs/src/vite.core.config.ts',
			'configs/src/tsconfig.core.json',
		] as const),
		project: 'src:core',
		path: '.',
		formats: Object.freeze(['es', 'cjs'] as const),
	}),
	browser: Object.freeze({
		configs: Object.freeze([
			'configs/src/vite.browser.config.ts',
			'configs/src/tsconfig.browser.json',
		] as const),
		project: 'src:browser',
		path: './browser',
		formats: Object.freeze(['es'] as const),
	}),
	server: Object.freeze({
		configs: Object.freeze([
			'configs/src/vite.server.config.ts',
			'configs/src/tsconfig.server.json',
		] as const),
		project: 'src:server',
		path: './server',
		formats: Object.freeze(['es', 'cjs'] as const),
	}),
} as const)

/**
 * The byte-copied host artifact paths, frozen.
 *
 * @remarks
 * The root docs (`AGENTS.md` / `CLAUDE.md`), `LICENSE`, `.claude`, the three
 * SessionStart hook scripts (`scripts/deps.sh` / `scripts/cursor.sh` /
 * `scripts/ollama.sh`), the line's seven byte-identical root dotfiles,
 * `.github/workflows/ci.yml`, and the two guides-grouped mirrors every repo
 * carries: the line-wide dev-tooling guide (`guides/src/guide.md`) and the
 * scaffold engine's own self-guide (`guides/src/scaffold.md`).
 */
export const HOST_PATHS = Object.freeze([
	'AGENTS.md',
	'CLAUDE.md',
	'LICENSE',
	'.claude',
	'scripts/deps.sh',
	'scripts/cursor.sh',
	'scripts/ollama.sh',
	'.editorconfig',
	'.gitattributes',
	'.gitignore',
	'.oxfmtrc.json',
	'.oxlintrc.json',
	'.oxlintignore',
	'.prettierignore',
	'.github/workflows/ci.yml',
	'guides/src/guide.md',
	'guides/src/scaffold.md',
] as const)

/** The package-name RegExp — lowercase alphanumeric-with-hyphens, letter-first. */
export const NAME_PATTERN = /^[a-z][a-z0-9-]*$/

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
export const DEFAULT_ENGINES = '>=22'

/** The devDependency range generated packages pin `@orkestrel/scaffold` at. */
export const SCAFFOLD_RANGE = '^0.0.2'

/** The default id for a `Compiler` orchestrator. */
export const COMPILER_ID = 'compiler'

/** The fleet's `.oxfmtrc.json` `printWidth` — `formatJson`'s array-collapse threshold. */
export const JSON_PRINT_WIDTH = 100

/** The fleet's `.oxfmtrc.json` `tabWidth` — the column width `formatJson` counts each tab as. */
export const JSON_TAB_WIDTH = 2
