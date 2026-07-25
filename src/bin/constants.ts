import type { Drift, Origin } from '@src/core'
import type { CheckboxChoice } from '@orkestrel/terminal'
import type { Verb } from './types.js'

/** The command-line interface's closed command vocabulary. */
export const KNOWN_VERBS: readonly Verb[] = Object.freeze([
	'new',
	'pull',
	'audit',
	'repair',
	'fleet',
	'catalog',
])

/** Internal artifact origins translated into user-facing labels. */
export const ORIGIN_LABEL: Readonly<Record<Origin, string>> = Object.freeze({
	host: 'template-owned',
	template: 'template-owned',
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
	'repair scope: shared template-owned artifacts only — generated source/tests/configs are never touched'

/** The dry-run note for `new`. */
export const NEW_DRY_RUN_NOTE = 'dry run — pass --apply to write'

/** The fallback message for a malformed command line without an error message. */
export const INVALID_ARGUMENTS_MESSAGE = 'invalid arguments'

/** Shared prompt-cancellation message. */
export const CANCELLED_MESSAGE = 'cancelled — nothing written'

/** Terminal choices for a new package's surfaces. */
export const SURFACE_CHOICES: readonly CheckboxChoice[] = Object.freeze([
	{ name: 'core', value: 'core', description: 'the pure engine' },
	{ name: 'browser', value: 'browser', description: 'DOM-facing surface' },
	{ name: 'server', value: 'server', description: 'node-facing surface' },
])

/** The safety model included in full help. */
export const SAFETY_BANNER = [
	'safety: every verb is a dry run by default.',
	'on a terminal, a write prompts for confirmation; in a script, pass --apply (and --yes to skip the confirm).',
	'every write is confined to the current working directory — cd there first.',
	'TLS trusts the system certificate store automatically (corporate proxies); NODE_EXTRA_CA_CERTS adds custom PEMs.',
].join('\n')

/** Stable command exit-code meanings. */
export const EXIT_CODES: readonly (readonly [string, string])[] = Object.freeze([
	['0', 'clean / success'],
	['1', 'drift or failure'],
	['2', 'usage error'],
])

/** One-line command summaries. */
export const VERB_SUMMARY: Readonly<Record<Verb, string>> = Object.freeze({
	new: 'scaffold a package into ./<name>',
	pull: 'refresh vendored guides/versions, report drift',
	audit: 'whole-plan conformance report',
	repair: 'restore the shared template-owned set',
	fleet: "audit/repair every package under the cwd's immediate children",
	catalog: 'regenerate the fleet package-catalog table',
})

/** Compact command flag references. */
export const VERB_FLAGS: Readonly<Record<Verb, string>> = Object.freeze({
	new: '--surfaces a,b --deps x,y --apply --yes --target <path> --from <path>',
	pull: '--target . --deps x,y --apply --yes --strict',
	audit: '--target . --live --from <path> --groups a,b',
	repair: '--target . --apply --yes --prune --from <path>',
	fleet: '--apply --yes --prune --from <path>',
	catalog: '--from <path> ... --target <repo> --offline --apply --yes',
})

/** Plain-language command flag descriptions. */
export const VERB_FLAG_HELP: Readonly<Record<Verb, readonly (readonly [string, string])[]>> =
	Object.freeze({
		new: [
			['--surfaces a,b', 'which surfaces to include (core, browser, server)'],
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
		audit: [
			['--target .', 'directory to audit (default: current directory)'],
			['--live', 'also check upstream freshness over the network'],
			['--from <path>', 'read the template from a local path instead of the bundled one'],
			['--groups a,b', 'limit the audit to these artifact groups'],
		],
		repair: [
			['--target .', 'directory to repair (default: current directory)'],
			['--apply', 'write the fixes (default is a dry run)'],
			['--yes', 'skip the confirmation question'],
			['--prune', 'also DELETE unexpected files under .claude/agents, .codex/agents, and scripts'],
			['--from <path>', 'read the template from a local path instead of the bundled one'],
		],
		fleet: [
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
			['--target <repo>', 'the repo whose README catalog table gets updated'],
			['--offline', 'skip network lookups (npm registry) for package descriptions'],
			['--apply', 'write the updated table (default is a dry run)'],
			['--yes', 'skip the confirmation question'],
		],
	})

/** Dry-run and confirmation notes per command. */
export const VERB_DRY_RUN_NOTE: Readonly<Record<Verb, string>> = Object.freeze({
	new: 'dry run by default — add --apply to write the files, --yes to skip the question',
	pull: 'dry run by default — add --apply to write the refreshed files, --yes to skip the question',
	audit: 'read-only — audit never writes; pass --live to also check upstream freshness',
	repair: 'dry run by default — add --apply to write, --yes to skip the question',
	fleet:
		'dry run by default — add --apply to write across every package, --yes to skip the question',
	catalog: 'dry run by default — add --apply to write, --yes to skip the question',
})

/** One concrete invocation per command. */
export const VERB_EXAMPLE: Readonly<Record<Verb, string>> = Object.freeze({
	new: 'example: scaffold new widget --surfaces core,server --apply',
	pull: 'example: scaffold pull --apply',
	audit: 'example: scaffold audit --live',
	repair: 'example: scaffold repair --apply',
	fleet: 'example: scaffold fleet --apply --yes',
	catalog: 'example: scaffold catalog --apply',
})

/** Retired commands and their replacements. */
export const RETIRED_VERBS: Readonly<Record<string, string>> = Object.freeze({
	sync: 'pull',
	mirror: 'fleet',
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

/** Non-terminal prune safety note. */
export const PRUNE_SKIPPED =
	'prune skipped — not a terminal; add --apply (or --yes) to delete non-interactively'

/** Degraded unexpected-file scan note. */
export const SCAN_SKIPPED =
	"unexpected-file scanning skipped — couldn't establish the template source"

/** Fleet CI ownership note. */
export const FLEET_CI_SKIPPED =
	"ci.yml: left unchanged — each package customizes its own CI; run 'scaffold repair --apply' inside that package to update it"
