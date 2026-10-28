// Count one lint rule's hits before it is enabled. Run from the checkout root:
//   node .agents/skills/orkestrel-harden/scripts/measure.ts --rule ID [--options JSON] PATH...
// The script reads the workspace's `.oxlintrc.json` for its `plugins` and `jsPlugins` (a relative
// plugin specifier becomes absolute, so the policy plugin loads from the checkout), writes a
// variant config that enables only `ID` as an error under `tmp/probes/lint/<ID>/.oxlintrc.json`,
// runs the installed oxlint with `--format json` over the named paths from the checkout root, and
// prints `rule=ID hits=N files=N` then one `N<TAB>path` line per file with a hit, most hits first.
// `--options` is a JSON value given to the rule: an array spreads into the rule's arguments after
// `error`, any other value is the one argument. The workspace's `ignorePatterns` and its override
// blocks are not carried over, so a rule measured here reads exactly the named paths with no
// per-file override. A rule that reads `context.cwd` must run from the checkout root, so run the
// script there. Enable only the rule under measure to count a rule the workspace might drop. The
// script refuses a flag it does not read, the `--flag=value` form included.
// Exit 0 when the rule has no hit, 3 when it has, 2 when the linter cannot run, 64 on usage.
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, realpathSync, writeFileSync } from 'node:fs'
import { isAbsolute, join, resolve } from 'node:path'

/** Lists the flags that take a value. */
export const VALUE_FLAGS: readonly string[] = ['--rule', '--options']

/** Lists every flag the script reads, value flags and switches alike. */
export const FLAGS: readonly string[] = VALUE_FLAGS

/** Holds the usage line printed when a call names no rule or no path. */
export const USAGE = 'usage: measure.ts --rule ID [--options JSON] PATH...'

/** Holds the directory, under the working directory, that keeps the variant configs. */
export const PROBE_ROOT = 'tmp/probes/lint'

/** Holds the linter entry, under the working directory, that the script runs. */
export const LINTER_ENTRY = 'node_modules/oxlint/bin/oxlint'

/** Describes the hits per file a lint run found. */
export interface Hits {
	readonly total: number
	readonly files: ReadonlyArray<readonly [string, number]>
}

/**
 * Reads the value that follows a flag.
 *
 * @remarks
 * The first occurrence of a flag wins, a following value that opens with `--` is a missing value,
 * and the `--flag=value` form is not read.
 *
 * @param argv - The arguments after the script path.
 * @param name - The flag, such as `--rule`.
 * @returns The value after the flag, or undefined when the flag is absent, last, or followed by
 * another flag.
 */
export function readOption(argv: readonly string[], name: string): string | undefined {
	const index = argv.indexOf(name)
	const value = index === -1 ? undefined : argv[index + 1]
	return value === undefined || value.startsWith('--') ? undefined : value
}

/**
 * Names the value flags a caller gave with no value.
 *
 * @param argv - The arguments after the script path.
 * @param names - The flags that take a value.
 * @returns Each named flag that appears last or is followed by another flag, in argument order.
 */
export function readMissingFlags(
	argv: readonly string[],
	names: readonly string[],
): readonly string[] {
	return names.filter((name) => argv.includes(name) && readOption(argv, name) === undefined)
}

/**
 * Names the flags a caller gave that the script does not read.
 *
 * @remarks
 * A `--flag=value` argument is unknown, because the script reads no such form. A bare `--` ends the
 * scan.
 *
 * @param argv - The arguments after the script path.
 * @param flags - Every flag the script reads, value flags and switches alike.
 * @returns Each argument that opens with `--` and is not a read flag, in argument order.
 */
export function readUnknownFlags(
	argv: readonly string[],
	flags: readonly string[],
): readonly string[] {
	const end = argv.indexOf('--')
	return (end === -1 ? argv : argv.slice(0, end)).filter(
		(argument) => argument.startsWith('--') && !flags.includes(argument),
	)
}

/**
 * Reads the arguments that are neither a flag nor the value of a value flag.
 *
 * @param argv - The arguments after the script path.
 * @param valueFlags - The flags that take a value.
 * @returns The positional arguments in order.
 */
export function readPositionals(
	argv: readonly string[],
	valueFlags: readonly string[],
): readonly string[] {
	return argv.filter(
		(argument, index) => !argument.startsWith('--') && !valueFlags.includes(argv[index - 1] ?? ''),
	)
}

/**
 * Checks whether a value is a non-null, non-array object.
 *
 * @param value - The value to inspect.
 * @returns True if the value is an object other than null or an array; false otherwise.
 */
export function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Normalizes a host path to forward slashes.
 *
 * @param path - A host path.
 * @returns The same path with every backslash replaced by a slash.
 */
export function normalizeSlashes(path: string): string {
	return path.split('\\').join('/')
}

/**
 * Quotes an untrusted text for a diagnostic, JSON-encoded and cut to a bounded length.
 *
 * @param text - The text to quote.
 * @returns The JSON string literal of the text, ending in an ellipsis inside the quotes when cut.
 */
export function quote(text: string): string {
	return JSON.stringify(text.length > 80 ? `${text.slice(0, 80)}…` : text)
}

/**
 * Parses a JSON text without throwing.
 *
 * @param text - The text to parse.
 * @returns The parsed value, or undefined when the text is not JSON.
 */
export function parseJson(text: string): unknown {
	try {
		return JSON.parse(text)
	} catch {
		return undefined
	}
}

/**
 * Names the directory that holds one rule's variant config.
 *
 * @param rule - The rule id, such as `policy/no-let`.
 * @returns The id with every character outside letters, digits, dots, underscores, and hyphens
 * replaced by a hyphen.
 */
export function nameProbe(rule: string): string {
	return rule.replace(/[^A-Za-z0-9._-]/gu, '-')
}

/**
 * Turns a plugin specifier of the workspace config into one that loads from any directory.
 *
 * @param root - The checkout root the config's relative specifiers resolve against.
 * @param entry - A `jsPlugins` entry: a specifier, or an object with a `specifier`.
 * @returns The entry with a relative specifier made absolute with forward slashes; any other entry
 * unchanged.
 */
export function anchorPlugin(root: string, entry: unknown): unknown {
	if (typeof entry === 'string') return anchorSpecifier(root, entry)
	if (isRecord(entry) && typeof entry.specifier === 'string') {
		return { ...entry, specifier: anchorSpecifier(root, entry.specifier) }
	}
	return entry
}

/**
 * Makes a relative plugin specifier absolute.
 *
 * @param root - The checkout root.
 * @param specifier - A plugin specifier.
 * @returns The absolute forward-slash path when the specifier opens with a dot; otherwise the
 * specifier unchanged.
 */
export function anchorSpecifier(root: string, specifier: string): string {
	return specifier.startsWith('.') && !isAbsolute(specifier)
		? normalizeSlashes(resolve(root, specifier))
		: specifier
}

/**
 * Builds the variant config that enables one rule beside the workspace's plugins.
 *
 * @param root - The checkout root.
 * @param workspace - The parsed workspace `.oxlintrc.json`.
 * @param rule - The rule id.
 * @param options - The rule's arguments after `error`, empty for none.
 * @returns The config object to write as JSON.
 */
export function buildVariant(
	root: string,
	workspace: Record<string, unknown>,
	rule: string,
	options: readonly unknown[],
): Record<string, unknown> {
	const plugins = Array.isArray(workspace.plugins) ? { plugins: workspace.plugins } : {}
	const jsPlugins = Array.isArray(workspace.jsPlugins)
		? { jsPlugins: workspace.jsPlugins.map((entry) => anchorPlugin(root, entry)) }
		: {}
	return {
		...plugins,
		...jsPlugins,
		categories: { correctness: 'off', suspicious: 'off' },
		rules: { [rule]: options.length === 0 ? 'error' : ['error', ...options] },
	}
}

/**
 * Reads the arguments the `--options` value gives the rule.
 *
 * @param text - The JSON text of the option, or undefined when the flag is absent.
 * @returns The arguments after `error`: the array's members, or the one value; undefined when the
 * text is not JSON.
 */
export function readRuleOptions(text: string | undefined): readonly unknown[] | undefined {
	if (text === undefined) return []
	const parsed = parseJson(text)
	if (parsed === undefined) return undefined
	return Array.isArray(parsed) ? parsed : [parsed]
}

/**
 * Reads the hits per file from oxlint's JSON output.
 *
 * @param output - The JSON text oxlint printed.
 * @returns The total and each file with its hits, most hits first and ties by path; undefined when
 * the output is not a report with a `diagnostics` array.
 */
export function readHits(output: string): Hits | undefined {
	const report = parseJson(output)
	if (!isRecord(report) || !Array.isArray(report.diagnostics)) return undefined
	const names = report.diagnostics.flatMap((diagnostic): readonly string[] =>
		isRecord(diagnostic) && typeof diagnostic.filename === 'string'
			? [normalizeSlashes(diagnostic.filename)]
			: [],
	)
	const files = [...new Set(names)]
		.map((name): readonly [string, number] => [
			name,
			names.filter((other) => other === name).length,
		])
		.sort(
			([leftName, left], [rightName, right]) => right - left || leftName.localeCompare(rightName),
		)
	return { total: names.length, files }
}

/**
 * Formats the report the script prints.
 *
 * @param rule - The rule id.
 * @param hits - The hits per file.
 * @returns The summary line and one `N<TAB>path` line per file, separated by line breaks.
 */
export function formatHits(rule: string, hits: Hits): string {
	return [
		`rule=${rule} hits=${String(hits.total)} files=${String(hits.files.length)}`,
		...hits.files.map(([name, count]) => `${String(count)}\t${name}`),
	].join('\n')
}

/**
 * Runs the script on its arguments.
 *
 * @param argv - The arguments after the script path.
 * @returns The exit code: 0 when the rule has no hit, 3 when it has, 2 when the linter cannot run,
 * 64 on usage.
 */
export function main(argv: readonly string[]): number {
	const missing = readMissingFlags(argv, VALUE_FLAGS)
	if (missing.length > 0) {
		console.error(`measure: ${missing.join(', ')} given with no value`)
		return 64
	}
	const unknown = readUnknownFlags(argv, FLAGS)
	if (unknown.length > 0) {
		console.error(`measure: ${unknown.join(', ')} is not a flag this script reads; ${USAGE}`)
		return 64
	}
	const rule = readOption(argv, '--rule')
	const paths = readPositionals(argv, VALUE_FLAGS)
	if (rule === undefined || paths.length === 0) {
		console.error(USAGE)
		return 64
	}
	const options = readRuleOptions(readOption(argv, '--options'))
	if (options === undefined) {
		console.error(`measure: --options ${quote(readOption(argv, '--options') ?? '')} is not JSON`)
		return 64
	}
	const root = process.cwd()
	const configPath = join(root, '.oxlintrc.json')
	const linter = join(root, LINTER_ENTRY)
	const workspace = existsSync(configPath) ? parseJson(readFileSync(configPath, 'utf8')) : undefined
	if (!isRecord(workspace) || !existsSync(linter)) {
		console.error(
			`measure: needs ${quote('.oxlintrc.json')} as JSON and ${quote(LINTER_ENTRY)} under ${quote(root)}; run from the checkout root after npm ci`,
		)
		return 2
	}
	const directory = join(root, PROBE_ROOT, nameProbe(rule))
	mkdirSync(directory, { recursive: true })
	const variant = join(directory, '.oxlintrc.json')
	writeFileSync(variant, JSON.stringify(buildVariant(root, workspace, rule, options), null, '\t'))
	const run = spawnSync(
		process.execPath,
		[linter, '--config', variant, '--format', 'json', ...paths],
		{ cwd: root, encoding: 'utf8', windowsHide: true, maxBuffer: 256 * 1024 * 1024 },
	)
	const hits = run.error === undefined ? readHits(run.stdout) : undefined
	if (hits === undefined) {
		console.error(
			`measure: the linter did not report: ${run.error?.message ?? quote(run.stderr.slice(0, 400))}`,
		)
		return 2
	}
	console.log(formatHits(rule, hits))
	return hits.total === 0 ? 0 : 3
}

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === import.meta.filename) {
	process.exitCode = main(process.argv.slice(2))
}
