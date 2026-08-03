import type { Drift, Origin } from '@src/core'
import type { CheckboxChoice } from '@orkestrel/terminal'
import type { Verb } from './types.js'

/** The command-line interface's closed command vocabulary. */
export const KNOWN_VERBS: readonly Verb[] = Object.freeze([
	'new',
	'pull',
	'mirror',
	'audit',
	'repair',
	'fleet',
	'catalog',
])

/** Internal artifact origins translated into user-facing labels. */
export const ORIGIN_LABEL: Readonly<Record<Origin, string>> = Object.freeze({
	host: 'host-owned',
	template: 'starter',
	computed: 'generated',
})

/** Internal drift states translated into user-facing labels. */
export const DRIFT_LABEL: Readonly<Record<Drift, string>> = Object.freeze({
	aligned: 'unchanged',
	stale: 'drifted',
	missing: 'missing',
	foreign: 'unexpected file',
})

/** Dependency freshness states translated into user-facing labels. */
export const FRESHNESS_LABEL: Readonly<Record<string, string>> = Object.freeze({
	current: 'unchanged',
	behind: 'behind',
	missing: 'missing upstream',
	failed: 'fetch failed',
})

/** Materializer actions translated into user-facing labels. */
export const ACTION_LABEL: Readonly<Record<string, string>> = Object.freeze({
	written: 'wrote',
	copied: 'wrote',
	skipped: 'unchanged',
	removed: 'removed',
})

/** Repair's deliberately limited ownership boundary. */
export const REPAIR_SCOPE =
	'repair scope: shared host-owned artifacts only — starter and generated files are never touched'

/** Repair's opt-in generated-canon ownership boundary. */
export const REPAIR_GENERATED_SCOPE =
	'repair scope: shared host-owned and generated artifacts — starter files and package.json are never touched'

/** The dry-run note for `new`. */
export const NEW_DRY_RUN_NOTE = 'dry run — pass --apply to write'

/** The fallback message for a malformed command line without an error message. */
export const INVALID_ARGUMENTS_MESSAGE = 'invalid arguments'

/** Shared prompt-cancellation message. */
export const CANCELLED_MESSAGE = 'cancelled — nothing written'

/** Terminal choices for a new workspace's src and app environments. */
export const ENVIRONMENT_CHOICES: readonly CheckboxChoice[] = Object.freeze([
	{ name: 'core', value: 'core', description: 'the pure engine' },
	{ name: 'browser', value: 'browser', description: 'DOM-facing environment' },
	{ name: 'server', value: 'server', description: 'node-facing environment' },
])

/** The safety model included in full help. */
export const SAFETY_BANNER = [
	'safety: every verb is a dry run by default.',
	'on a terminal, a write prompts for confirmation; in a script, pass --apply (and --yes to skip the confirm).',
	'every write is confined to the current working directory — cd there first.',
	'when Node exposes system-CA controls, TLS adds the OS certificate store; earlier supported Node 22 releases use default roots. NODE_EXTRA_CA_CERTS adds custom PEMs.',
].join('\n')

/** Stable command exit-code meanings. */
export const EXIT_CODES: readonly (readonly [string, string])[] = Object.freeze([
	['0', 'clean / success'],
	['1', 'drift or failure'],
	['2', 'usage error'],
])

/** One-line command summaries. */
export const VERB_SUMMARY: Readonly<Record<Verb, string>> = Object.freeze({
	new: 'scaffold a workspace into ./<name>',
	pull: 'refresh vendored guides/versions, report drift',
	mirror: 'refresh every published Orkestrel package guide',
	audit: 'whole-plan conformance report',
	repair: 'restore host-owned files, plus generated canon with --generated',
	fleet: "audit/repair every workspace under the cwd's immediate children",
	catalog: 'regenerate the fleet package-catalog table',
})

/** Compact command flag references. */
export const VERB_FLAGS: Readonly<Record<Verb, string>> = Object.freeze({
	new: '--src a,b --app a,b --deps x,y --apply --yes --target <path> --from <path>',
	pull: '--target . --deps x,y --apply --yes --strict',
	mirror: '--target . --apply --yes --strict',
	audit: '--target . --live --generated --from <path> --groups a,b',
	repair: '--target . --generated --apply --yes --prune --from <path>',
	fleet: '--generated --apply --yes --prune --from <path>',
	catalog: '--from <path> ... --target <repo> --offline --apply --yes',
})

/** Plain-language command flag descriptions. */
export const VERB_FLAG_HELP: Readonly<Record<Verb, readonly (readonly [string, string])[]>> =
	Object.freeze({
		new: [
			['--src a,b', 'which src environments to include (core, browser, server)'],
			['--app a,b', 'which app environments to include (core, browser, server)'],
			['--deps x,y', '@orkestrel/* dependencies to add (installed as dependencies)'],
			['--apply', 'write the files (default is a dry run)'],
			['--yes', 'skip the confirmation question'],
			['--target <path>', 'destination directory (default: ./<name>)'],
			['--from <path>', 'read the template from a local path instead of the bundled one'],
		],
		pull: [
			['--target .', 'directory to refresh (default: current directory)'],
			['--deps x,y', 'limit the refresh to these dependencies'],
			['--apply', 'write the refreshed files (default is a dry run)'],
			['--yes', 'skip the confirmation question'],
			['--strict', 'fail (exit 1) on any drift, even non-fatal'],
		],
		mirror: [
			['--target .', 'directory whose guide mirror is refreshed (default: current directory)'],
			['--apply', 'write the refreshed guides (default is a dry run)'],
			['--yes', 'skip the confirmation question'],
			['--strict', 'fail immediately when an upstream guide cannot be fetched'],
		],
		audit: [
			['--target .', 'directory to audit (default: current directory)'],
			['--live', 'also check upstream freshness over the network'],
			['--generated', 'include generated canon if the repair hand-off is accepted'],
			['--from <path>', 'read the template from a local path instead of the bundled one'],
			['--groups a,b', 'limit the audit to these artifact groups'],
		],
		repair: [
			['--target .', 'directory to repair (default: current directory)'],
			['--generated', 'also restore generated canon except package.json'],
			['--apply', 'write the fixes (default is a dry run)'],
			['--yes', 'skip the confirmation question'],
			['--prune', 'also DELETE unexpected files under .claude/agents, .codex/agents, and scripts'],
			['--from <path>', 'read the template from a local path instead of the bundled one'],
		],
		fleet: [
			['--generated', 'also restore generated canon except package.json in every package'],
			['--apply', 'write fixes across every package (default is a dry run)'],
			['--yes', 'skip the confirmation question'],
			[
				'--prune',
				'also DELETE unexpected files under .claude/agents, .codex/agents, and scripts, per package',
			],
			['--from <path>', 'read the template from a local path instead of the bundled one'],
		],
		catalog: [
			['--from <path> ...', 'one or more local package paths to include'],
			['--target <repo>', 'the repository whose Orkestrel agent catalog table gets updated'],
			['--offline', 'skip network lookups (npm registry) for package descriptions'],
			['--apply', 'write the updated table (default is a dry run)'],
			['--yes', 'skip the confirmation question'],
		],
	})

/** Dry-run and confirmation notes per command. */
export const VERB_DRY_RUN_NOTE: Readonly<Record<Verb, string>> = Object.freeze({
	new: 'dry run by default — add --apply to write the files, --yes to skip the question',
	pull: 'dry run by default — add --apply to write the refreshed files, --yes to skip the question',
	mirror:
		'dry run by default — add --apply to write every published package guide, --yes to skip the question',
	audit: 'read-only — audit never writes; pass --live to also check upstream freshness',
	repair: 'dry run by default — add --apply to write, --yes to skip the question',
	fleet:
		'dry run by default — add --apply to write across every package, --yes to skip the question',
	catalog: 'dry run by default — add --apply to write, --yes to skip the question',
})

/** One concrete invocation per command. */
export const VERB_EXAMPLE: Readonly<Record<Verb, string>> = Object.freeze({
	new: 'example: scaffold new widget --src core,server --app core,browser --apply',
	pull: 'example: scaffold pull --apply',
	mirror: 'example: scaffold mirror --apply --yes',
	audit: 'example: scaffold audit --live',
	repair: 'example: scaffold repair --apply',
	fleet: 'example: scaffold fleet --apply --yes',
	catalog: 'example: scaffold catalog --apply',
})

/** Message used when a prune scan has no candidates. */
export const PRUNE_EMPTY = 'no unexpected files to delete'

/** Guidance for unexpected files outside a non-pruning repair handoff. */
export const FOREIGN_HINT = "unexpected files found — run 'scaffold repair --prune' to delete them"

/** Interactive dependency prompt. */
export const ORKESTREL_DEPS_PROMPT =
	'@orkestrel dependencies (comma-separated short names, e.g. contract, emitter — installed as dependencies)'

/** Catalog-degraded validation note. */
export const CATALOG_UNRESOLVED_NOTE =
	"couldn't resolve the vendored @orkestrel catalog — validating names by shape only"

/** Catalog block destination in a scaffolded repository. */
export const CATALOG_AGENT_PATH = '.claude/agents/orkestrel.md'

/** Opening marker for the generated package catalog block. */
export const CATALOG_START_MARKER = '<!-- catalog:start -->'

/** Closing marker for the generated package catalog block. */
export const CATALOG_END_MARKER = '<!-- catalog:end -->'

/** Non-terminal prune safety note. */
export const PRUNE_SKIPPED =
	'prune skipped — not a terminal; add --apply (or --yes) to delete non-interactively'

/** Degraded unexpected-file scan note. */
export const SCAN_SKIPPED =
	"unexpected-file scanning skipped — couldn't establish the template source"
