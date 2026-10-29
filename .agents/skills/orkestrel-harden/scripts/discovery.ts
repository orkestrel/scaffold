// Let Vitest select each gate's tests, then compare its identities with each config/mode universe.
// Run from the checkout root:
//   node .agents/skills/orkestrel-harden/scripts/discovery.ts [--config vite.config.ts] [--projects a,b] [--json]
// Each value is a separate argument: `--flag=value` and any flag the script does not read exit 64.
// Roots are the package scripts no `npm run` invokes; `npm test` runs the root `test`, which stays a
// root. Follow root chains and forwarded arguments through `npm run [-s|--silent] NAME`,
// `npm run-script`, `npm test`, and `npm t`. Read a command past an environment prefix, `cross-env`,
// and a redirection. A gate is a Vitest run; list, bench, watch, dev, `--watch` without `=false`, and
// the mergeReports, listTags, and clearCache invocations are not gates. A test file counts as gated
// by a command only when `node` runs it as an argument (`node FILE`, `node --test FILE`).
// Collect an unfiltered full listing for each config/mode/root/dir, including the base config. Pass
// gate arguments verbatim except the reporter, output-file, coverage, color, cache, silent, UI,
// watch, run-mode, inspector, and standalone options; use filesOnly for file selection and full
// collection with --staticParse=false for name, tag, line, and shard selection, so runtime titles,
// setup modules, and the worker sequencer participate. Compare file/project/name/line/column
// identities without renaming projects. Preserve duplicate names within a listing and merge across
// units. Exit 2 naming the Vitest version when the option table lacks a required option.
// With --projects, list only the named projects: the universe, each gate listing, each project
// reading, the units enumerated, and the empty-project rescan carry the names, and a gate that
// reaches none of them is not listed. An exact name never lists a project outside the set, and the
// refusal for a name that matches none lists no other project either. A name holding `*` or opening
// with `!` is a Vitest pattern the script cannot match beforehand, so a gate that names projects
// keeps its own and a listing for such a name can reach projects beyond the names. Exit 64 for a
// name no project in the config matches, and skip the undiscovered scan.
// Flag ungated projects, empty chained projects, and undiscovered files under tests/ (the test
// and spec names, any extension). Report marker counts for the forms that need a ruling (`.todo`,
// `.skipIf`, `.runIf`, `.fails`, a `retry` option, a timeout option or a numeric last argument),
// read as call forms outside comments and strings; `vitest/no-focused-tests` and `vitest/no-disabled-tests` refuse `.only` and `.skip`. Report empty
// standalone workbenches without a flag: an empty project no chain containing " > " names.
// Retry when test files change during collection; refuse another change during that retry.
// Exit 0 with no flag, 3 with a flag, 2 for missing Vitest, an option table without a required
// option, unsupported related commands, CLI/help/argument/listing/output failures, repeated
// test-file changes, or filesystem/JSON errors; exit 64 on usage.
import { spawnSync } from 'node:child_process'
import {
	existsSync,
	mkdtempSync,
	readdirSync,
	readFileSync,
	realpathSync,
	rmSync,
	statSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, join, relative, resolve } from 'node:path'

/** Names the Vitest entry the census runs. */
export const VITEST = 'node_modules/vitest/vitest.mjs'

/** Lists the marker names the census counts, in report order. */
export const MARKERS: readonly string[] = [
	'.todo',
	'.skipIf',
	'.runIf',
	'.fails',
	'retry',
	'timeout',
]

/** Lists the options the scraped Vitest help table must hold before a listing runs. */
export const REQUIRED_OPTIONS: readonly string[] = [
	'--reporter',
	'--project',
	'--config',
	'--filesOnly',
	'--staticParse',
]

/** Lists the flags this script reads, value flags and switches alike. */
export const FLAGS: readonly string[] = ['--config', '--projects', '--json']

/** Holds the usage line printed on a usage refusal. */
export const USAGE = 'usage: discovery.ts [--config vite.config.ts] [--projects a,b] [--json]'

/** Names the options a gate listing drops, because they change the run and not the selection. */
export const OMITTED = new Set([
	'reporter',
	'outputFile',
	'coverage',
	'color',
	'cache',
	'silent',
	'ui',
	'watch',
	'run',
	'inspect',
	'inspectBrk',
	'standalone',
])

/** Bounds one listing, so an option that waits for input exits 2 naming its gate. */
export const LISTING_TIMEOUT = 600_000

/** Caps the characters of a name an error message echoes. */
export const NAME_LIMIT = 80

/** Names the directories a tree walk skips by default, so build output and notes stay unread. */
export const SKIPPED_DIRECTORIES: ReadonlySet<string> = new Set([
	'node_modules',
	'.git',
	'dist',
	'tmp',
	'.orkestrel',
	'.idea',
])

/** Names the only directories the undiscovered scan skips. */
export const UNDISCOVERED_SKIPS: ReadonlySet<string> = new Set(['node_modules', '.git'])

/** Matches the test file names the modification snapshot watches. */
export const TEST_FILE_PATTERN = /\.test\.[cm]?[jt]sx?$/u

/** Matches the test and spec file names the undiscovered scan reports. */
export const DISCOVERABLE_PATTERN = /\.(?:test|spec)\.[cm]?[jt]sx?$/u

/** Matches a test file path a `node` command can run as an argument. */
export const TEST_ARGUMENT_PATTERN = /^(?:tests|src|app)\/[A-Za-z0-9_./-]+\.test\.[cm]?ts$/u

/** Matches one command token, keeping a quoted run, an `&`-form redirection, or a separator whole. */
export const COMMAND_TOKEN_PATTERN = /\d*[<>]&[\d-]+|&>>?|(?:[^\s"';&|]+|"[^"]*"|'[^']*')+|[;&|]+/gu

/** Matches a redirection operator that takes the next token as its target. */
export const REDIRECT_OPERATOR_PATTERN = /^(?:\d*>>?|\d*<|&>>?)$/u

/** Matches a redirection that carries its target or duplicates a descriptor. */
export const REDIRECT_TARGET_PATTERN = /^(?:(?:\d*>>?|\d*<|&>>?)[^\s<>&]\S*|\d*[<>]&[\d-]+)$/u

/** Matches a leading `NAME=value` environment assignment. */
export const ENVIRONMENT_PATTERN = /^[A-Za-z_][A-Za-z0-9_]*=/u

/** Matches a `--watch` switch that is not turned off in its own token. */
export const WATCH_PATTERN = /^(?:--watch|--watch=(?!false$).*|-w)$/u

/** Matches the reporting and cache-maintenance switches that make an invocation no gate. */
export const MAINTENANCE_PATTERN =
	/^(?:--mergeReports|--merge-reports|--listTags|--list-tags|--clearCache|--clear-cache)(?:=|$)/u

/** Matches the options and filters that make a gate select tests by name, tag, line, or shard. */
export const FULL_PATTERN =
	/^(?:-t|--testNamePattern|--test-name-pattern|--tagsFilter|--tags-filter|--shard|--(?:no-)?allowOnly|--(?:no-)?allow-only|--(?:no-)?strictTags|--(?:no-)?strict-tags)(?:=|$)/u

/** Matches a numeric literal token such as a timeout argument. */
export const NUMBER_PATTERN = /^\d[\d_]*(?:\.\d+)?(?:e\d+)?$/iu

/** Matches the quoted string literals the scanner keeps whole. */
export const STRING_PATTERN = /^(?:'(?:\\[\s\S]|[^'\\\r\n])*'|"(?:\\[\s\S]|[^"\\\r\n])*")/u

/** Matches a regular expression literal opening at a slash. */
export const REGEX_PATTERN = /^\/(?:\\.|\[(?:\\.|[^\]\\\r\n])*\]|[^/\\[\r\n])+\/[a-z]*/u

/** Matches an identifier or a number as one scanner word. */
export const WORD_PATTERN = /^(?:[\p{ID_Start}_$][\p{ID_Continue}$]*|\d[\w.]*)/u

/** Names the keywords after which a slash opens a regular expression. */
export const REGEX_KEYWORDS: ReadonlySet<string> = new Set([
	'return',
	'typeof',
	'case',
	'throw',
	'in',
	'of',
	'void',
	'delete',
	'yield',
	'await',
	'else',
	'do',
	'instanceof',
	'new',
])

/** Lists the tokens that open a bracket group. */
export const OPENERS: readonly string[] = ['(', '[', '{']

/** Lists the tokens that close a bracket group. */
export const CLOSERS: readonly string[] = [')', ']', '}']

/** Names the calls whose first argument list precedes the registration call. */
export const ARGUMENT_MODIFIERS: ReadonlySet<string> = new Set(['each', 'skipIf', 'runIf', 'for'])

/** Names the registration modifiers that need a ruling when a test file carries them. */
export const CHAIN_MARKERS: ReadonlySet<string> = new Set(['todo', 'skipIf', 'runIf', 'fails'])

/** Names the identifiers that open a test registration. */
export const REGISTRARS: ReadonlySet<string> = new Set(['it', 'test', 'describe', 'suite'])

/** Describes one Vitest command-line option read from the help table. */
export interface Option {
	readonly name: string
	readonly argument: string | undefined
}

/** Describes one test a listing collected, with the gate that names it. */
export interface Collected {
	readonly file: string
	readonly projectName: string
	readonly name: string | undefined
	readonly line: number | undefined
	readonly column: number | undefined
	readonly gate?: string | undefined
}

/** Holds one listing's tests and whether Vitest matched the project filter it was given. */
export interface Listed {
	readonly entries: readonly Collected[]
	readonly matched: boolean
}

/** Holds the tokens a gate command keeps and the position the option reader has reached. */
export interface Selection {
	readonly selected: readonly string[]
	readonly skip: number
	readonly closed: boolean
}

/** Holds the gates the root scripts reach and the files `node` commands run. */
export interface Gates {
	readonly units: readonly Gate[]
	readonly files: ReadonlyMap<string, string>
}

/** Names one config, mode, root, and dir combination a listing runs under. */
export interface Unit {
	readonly config: string | undefined
	readonly mode: string | undefined
	readonly root?: string | undefined
	readonly dir?: string | undefined
}

/** Describes one Vitest run a root script chain reaches. */
export interface Gate extends Unit {
	readonly projects: readonly string[]
	readonly chain: string
	readonly args: readonly string[]
	readonly full: boolean
}

/** Holds one unit's tests with the gate that names each and the projects it lists empty. */
export interface Listing extends Unit {
	readonly collected: readonly Collected[]
	readonly empty: readonly string[]
}

/** Pairs one unit's listing with the projects that collected a test in it. */
export interface UnitResult {
	readonly listing: Listing
	readonly populated: readonly string[]
}

/** States whether one project collected a test and whether the report calls it empty. */
export interface ProjectResult {
	readonly project: string
	readonly populated: boolean
	readonly empty: boolean
}

/** Describes one `npm` script call a command makes. */
export interface Invocation {
	readonly name: string
	readonly args: readonly string[]
	readonly ancestors: readonly string[]
	readonly shorthand: boolean
}

/** Describes one script a root chain visits, with the commands its forwarded arguments extend. */
export interface Visit {
	readonly chain: string
	readonly commands: ReadonlyArray<readonly string[]>
}

/** Describes one project row the report prints. */
export interface Project {
	readonly name: string
	readonly gate: string | undefined
	readonly files: number
	readonly tests: number
	readonly units?: readonly Unit[]
}

/** Holds one collected file with its projects and marker counts. */
export interface Census {
	readonly file: string
	readonly projects: readonly string[]
	readonly markers: Readonly<Record<string, number>>
}

/** Describes one scanner token: a word, a punctuation mark, or a whole literal. */
export interface CodeToken {
	readonly kind: 'word' | 'punct' | 'string' | 'template' | 'regex'
	readonly text: string
}

/** Holds the tokens of one source text and the index each opening bracket closes at. */
export interface CodeScan {
	readonly tokens: readonly CodeToken[]
	readonly closes: ReadonlyMap<number, number>
}

/** Holds the modifier names of a registration chain and the index of its registration call. */
export interface Chain {
	readonly names: readonly string[]
	readonly call: number
}

/** Names a run of tokens from a start index up to, and excluding, an end index. */
export interface Span {
	readonly start: number
	readonly end: number
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
 * Reads the value that follows a flag.
 *
 * @remarks
 * The first occurrence of a flag wins, a following value that opens with `--` is a missing value,
 * and the `--flag=value` form is not read.
 *
 * @param argv - The arguments after the script path.
 * @param name - The flag, such as `--config`.
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
 * Reads the arguments before a bare `--`. A `--flag=value` argument is unknown, because the script
 * reads `--flag value` pairs only.
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

/** Describes one file a tree walk found, with the modification time the snapshot reads. */
export interface WalkedFile {
	readonly path: string
	readonly modified: number
}

/**
 * Lists every regular file beneath a directory, skipping the named directories at any depth.
 *
 * @param directory - The directory to walk.
 * @param skipped - The directory names to skip. Default: {@link SKIPPED_DIRECTORIES}.
 * @returns Each file's forward-slash path and modification time, in walk order.
 * @throws Thrown when `directory` does not exist or cannot be read; check `existsSync` first.
 */
export function listFiles(
	directory: string,
	skipped: ReadonlySet<string> = SKIPPED_DIRECTORIES,
): readonly WalkedFile[] {
	const files: WalkedFile[] = []
	const pending = [directory]
	while (pending.length > 0) {
		const current = pending.pop()
		if (current === undefined) break
		for (const entry of readdirSync(current, { withFileTypes: true })) {
			if (skipped.has(entry.name)) continue
			const path = join(current, entry.name)
			if (entry.isDirectory()) pending.push(path)
			else if (entry.isFile()) {
				files.push({ path: normalizeSlashes(path), modified: statSync(path).mtimeMs })
			}
		}
	}
	return files
}

/**
 * Describes a name for an error message, JSON-encoded and length-capped.
 *
 * @param name - The untrusted name to echo.
 * @returns The encoded name, cut where it exceeds the cap.
 */
export function describeName(name: string): string {
	return JSON.stringify(name.length > NAME_LIMIT ? `${name.slice(0, NAME_LIMIT)}…` : name)
}

/**
 * Reads the Vitest option table the installed CLI prints for its list command.
 *
 * @returns Each option keyed by its long, kebab, negated, and short spellings.
 * @throws Thrown when the help command fails.
 */
export function readCLIOptions(): ReadonlyMap<string, Option> {
	const help = spawnSync(process.execPath, [VITEST, 'list', '--help', '--expand-help'], {
		encoding: 'utf8',
		windowsHide: true,
	})
	if (help.status !== 0) throw new Error(help.stderr || 'Cannot read Vitest CLI options')
	// A later line that names the same flag replaces the earlier option at the earlier position.
	return new Map(
		help.stdout.split(/\r\n|\n/u).flatMap((line): Array<readonly [string, Option]> => {
			const match = /^\s+(?:(-\w), )?--([\w.-]+)(?: ([<[][^\n]*?[>\]]))?\s{2}/u.exec(line)
			const name = match?.[2]
			if (name === undefined) return []
			const option = { name: name.replace(/^no-/u, ''), argument: match?.[3] }
			return [
				[`--${name}`, option],
				...(name.startsWith('no-') ? [[`--${name.slice(3)}`, option] as const] : []),
				[`--${name.replace(/[A-Z]/gu, (letter) => `-${letter.toLowerCase()}`)}`, option],
				...(match?.[1] === undefined ? [] : [[match[1], option] as const]),
			]
		}),
	)
}

/**
 * Names the required options an option table lacks.
 *
 * @param options - The table `readCLIOptions` returned.
 * @returns Each required option the table does not hold, in required order.
 */
export function readMissingOptions(options: ReadonlyMap<string, Option>): readonly string[] {
	return REQUIRED_OPTIONS.filter((name) => !options.has(name))
}

/**
 * Reads the installed Vitest version.
 *
 * @returns The version string, or `unknown` when the manifest names none.
 */
export function readVitestVersion(): string {
	const parsed: unknown = JSON.parse(readFileSync('node_modules/vitest/package.json', 'utf8'))
	return typeof parsed === 'object' &&
		parsed !== null &&
		'version' in parsed &&
		typeof parsed.version === 'string'
		? parsed.version
		: 'unknown'
}

/**
 * Skips the options of a `node` command so the first non-option token is the runner.
 *
 * @remarks
 * An option that takes a value consumes the token after it, so that token is never read as a runner.
 *
 * @param command - The command tokens.
 * @param index - The index to start reading options at.
 * @returns The index of the first non-option token, or -1 for an eval, print, or check command.
 */
export function skipRunnerOptions(command: readonly string[], index: number): number {
	const skipped = [...command.entries()].reduce<{
		readonly next: number
		readonly found: number | undefined
	}>(
		(state, [position, option]) => {
			if (state.found !== undefined || position < state.next) return state
			if (!option.startsWith('-')) return { ...state, found: position }
			if (['-e', '--eval', '-p', '--print', '-c', '--check'].includes(option)) {
				return { ...state, found: -1 }
			}
			return {
				...state,
				next:
					position +
					([
						'-r',
						'--require',
						'--import',
						'--loader',
						'--experimental-loader',
						'--max-old-space-size',
						'--max_old_space_size',
						'-p',
						'--package',
					].includes(option)
						? 2
						: 1),
			}
		},
		{ next: index, found: undefined },
	)
	return skipped.found ?? skipped.next
}

/**
 * Finds the Vitest runner in a command.
 *
 * @param command - The command tokens, past any environment prefix.
 * @returns The runner's index, or -1 when the command does not run Vitest.
 */
export function findRunner(command: readonly string[]): number {
	const executable = basename(command[0] ?? '').replace(/\.(?:exe|cmd)$/u, '')
	const start =
		executable === 'npm'
			? command[1] === 'exec'
				? 2
				: -1
			: executable === 'node' || executable === 'npx'
				? 1
				: 0
	const index = start > 0 ? skipRunnerOptions(command, start) : start
	if (index < 0) return -1
	return ['vitest', 'vitest.mjs', 'vitest.js'].includes(
		basename(command[index] ?? '').replace(/\.cmd$/u, ''),
	)
		? index
		: -1
}

/**
 * Keeps the tokens of a gate command that select tests and drops the run-mode options.
 *
 * @remarks
 * The first `--` ends the options, so the rest of the arguments pass verbatim. A runner option that
 * takes a value consumes the argument after it, so a step below `skip` reads nothing.
 *
 * @param argv - The tokens after the Vitest runner and verb.
 * @param options - The option table `readCLIOptions` returned.
 * @returns The tokens to pass to a listing.
 */
export function readSelection(
	argv: readonly string[],
	options: ReadonlyMap<string, Option>,
): readonly string[] {
	return argv.reduce<Selection>(
		(state, token, index) => {
			if (state.closed || index < state.skip) return state
			if (token === '--') {
				return { ...state, selected: state.selected.concat(argv.slice(index)), closed: true }
			}
			if (!token.startsWith('-')) return { ...state, selected: [...state.selected, token] }
			const equals = token.indexOf('=')
			const flag = equals < 0 ? token : token.slice(0, equals)
			const positive = flag.replace(/^--no-/u, '--')
			const option = options.get(positive) ?? options.get(positive.split('.').slice(0, 1).join('.'))
			if (option === undefined || !OMITTED.has(option.name.split('.')[0] ?? '')) {
				return { ...state, selected: [...state.selected, token] }
			}
			const next = argv[index + 1]
			const valued =
				!flag.startsWith('--no-') &&
				equals < 0 &&
				next !== undefined &&
				!next.startsWith('-') &&
				(option.argument !== undefined || next === 'true' || next === 'false')
			return { ...state, skip: index + (valued ? 2 : 1) }
		},
		{ selected: [], skip: 0, closed: false },
	).selected
}

/**
 * Reads every value a named flag carries before the first `--`.
 *
 * @param argv - The tokens to read.
 * @param names - The flag spellings to read.
 * @returns Each value of the flag in either the `--flag value` or the `--flag=value` form.
 */
export function readArguments(
	argv: readonly string[],
	names: readonly string[],
): readonly string[] {
	const end = argv.indexOf('--')
	return (end < 0 ? argv : argv.slice(0, end)).flatMap((token, index) => {
		const equals = token.indexOf('=')
		if (!names.includes(equals < 0 ? token : token.slice(0, equals))) return []
		const value = equals < 0 ? argv[index + 1] : token.slice(equals + 1)
		return value !== undefined && !value.startsWith('-') ? [value] : []
	})
}

/**
 * Reads the script table of the package manifest in the working directory.
 *
 * @returns Each script name with its command text.
 */
export function readScripts(): Readonly<Record<string, string>> {
	const parsed: unknown = JSON.parse(readFileSync('package.json', 'utf8'))
	if (typeof parsed !== 'object' || parsed === null) return {}
	const scripts = Object.fromEntries(Object.entries(parsed)).scripts
	if (typeof scripts !== 'object' || scripts === null) return {}
	return Object.fromEntries(
		Object.entries(scripts).flatMap(([key, value]) =>
			typeof value === 'string' ? [[key, value] as const] : [],
		),
	)
}

/**
 * Drops the redirections from a command's tokens.
 *
 * @param tokens - The raw command tokens, quotes still attached.
 * @returns The tokens without a redirection operator, its target, or a descriptor duplication.
 */
export function stripRedirections(tokens: readonly string[]): readonly string[] {
	return tokens.filter((token, index) => {
		const previous = tokens[index - 1]
		return (
			!(previous !== undefined && REDIRECT_OPERATOR_PATTERN.test(previous)) &&
			!REDIRECT_OPERATOR_PATTERN.test(token) &&
			!REDIRECT_TARGET_PATTERN.test(token)
		)
	})
}

/**
 * Drops the leading `cross-env` word and `NAME=value` assignments from a command's tokens.
 *
 * @param tokens - The command tokens.
 * @returns The tokens from the first word that is neither, empty when the command is only a prefix.
 */
export function stripEnvironment(tokens: readonly string[]): readonly string[] {
	const start = tokens.findIndex(
		(token) => token !== 'cross-env' && !ENVIRONMENT_PATTERN.test(token),
	)
	return start < 0 ? [] : tokens.slice(start)
}

/**
 * Splits a script's text into its commands.
 *
 * @param text - The script text, with `;`, `&`, and `|` separating commands.
 * @returns The commands as tokens, past redirections and environment prefixes, quotes removed.
 */
export function readCommands(text: string): ReadonlyArray<readonly string[]> {
	const tokens = [...text.matchAll(COMMAND_TOKEN_PATTERN)].map((match) => match[0])
	// A separator token ends a command, so the commands are the runs of tokens between the cuts.
	const cuts = tokens.flatMap((token, index) => (/^[;&|]+$/u.test(token) ? [index] : []))
	return [-1, ...cuts].map((cut, at) =>
		stripEnvironment(stripRedirections(tokens.slice(cut + 1, cuts[at] ?? tokens.length))).map(
			(token) => token.replace(/["']/gu, ''),
		),
	)
}

/**
 * Lists the script calls the commands make.
 *
 * @remarks
 * Reads `npm run [-s|--silent] NAME`, `npm run-script NAME`, `npm test`, and `npm t`; the last two
 * are shorthand, which runs a script a person also starts directly. Arguments after `--` forward.
 *
 * @param commands - The commands to read.
 * @returns One invocation per script call.
 */
export function listInvocations(commands: ReadonlyArray<readonly string[]>): readonly Invocation[] {
	return commands.flatMap((command): Invocation[] => {
		const index = command.indexOf('npm')
		if (index < 0) return []
		const verb = command[index + 1]
		const separator = command.indexOf('--', index + 2)
		const args = separator < 0 ? [] : command.slice(separator + 1)
		if (verb === 'test' || verb === 't') {
			return [{ name: 'test', args, ancestors: [], shorthand: true }]
		}
		if (verb !== 'run' && verb !== 'run-script') return []
		const name = (
			separator < 0 ? command.slice(index + 2) : command.slice(index + 2, separator)
		).find((token) => !token.startsWith('-'))
		return name === undefined ? [] : [{ name, args, ancestors: [], shorthand: false }]
	})
}

/**
 * Walks the scripts a root reaches, last-pushed first, each script once per forwarded arguments.
 *
 * @param commands - The commands of every script, by name.
 * @param root - The root script the chain starts at.
 * @param pending - The invocations left to visit.
 * @param visited - The name and argument keys already visited.
 * @returns One visit per script reached, in visit order.
 */
export function walkInvocations(
	commands: Readonly<Record<string, ReadonlyArray<readonly string[]>>>,
	root: string,
	pending: readonly Invocation[],
	visited: ReadonlySet<string>,
): readonly Visit[] {
	const invocation = pending.at(-1)
	if (invocation === undefined) return []
	const rest = pending.slice(0, -1)
	const { name, args, ancestors } = invocation
	const key = JSON.stringify([name, args])
	if (visited.has(key) || ancestors.includes(name)) {
		return walkInvocations(commands, root, rest, visited)
	}
	const seen = new Set([...visited, key])
	const script = commands[name]
	if (script === undefined) return walkInvocations(commands, root, rest, seen)
	const expanded = script.map((command, index) =>
		index === script.length - 1 ? [...command, ...args] : command,
	)
	const children = listInvocations(expanded).map((entry) => ({
		...entry,
		ancestors: [...ancestors, name],
	}))
	return [
		{ chain: root === name ? name : `${root} > ${name}`, commands: expanded },
		...walkInvocations(commands, root, [...rest, ...children], seen),
	]
}

/**
 * Checks whether a command's options name a reporting or cache-maintenance invocation.
 *
 * @param before - The tokens before the first `--`.
 * @returns True if a maintenance switch is present and not turned off.
 */
export function isMaintenance(before: readonly string[]): boolean {
	return before.some(
		(token, position) =>
			MAINTENANCE_PATTERN.test(token) &&
			!token.endsWith('=false') &&
			before[position + 1] !== 'false',
	)
}

/**
 * Checks whether a command's options start watch mode.
 *
 * @param before - The tokens before the first `--`.
 * @returns True if `--watch` or `-w` is present and not turned off.
 */
export function isWatching(before: readonly string[]): boolean {
	return before.some(
		(token, position) => WATCH_PATTERN.test(token) && before[position + 1] !== 'false',
	)
}

/**
 * Reads the gate a command makes, or none when the command does not run a test selection.
 *
 * @param command - The command tokens.
 * @param chain - The root chain label.
 * @param config - The base config path, forward-slashed and relative.
 * @param options - The option table `readCLIOptions` returned.
 * @returns The gate, or undefined for a command that is no Vitest run or no gate.
 * @throws Thrown for a `related` command, which `vitest list` cannot select.
 */
export function readGate(
	command: readonly string[],
	chain: string,
	config: string,
	options: ReadonlyMap<string, Option>,
): Gate | undefined {
	const index = findRunner(command)
	if (index < 0) return undefined
	const verb = command[index + 1]
	if (verb === 'list' || verb === 'bench' || verb === 'watch' || verb === 'dev') return undefined
	const tokens = command.slice(index + (verb === 'run' ? 2 : 1))
	const separator = tokens.indexOf('--')
	const before = separator < 0 ? tokens : tokens.slice(0, separator)
	if (isMaintenance(before) || isWatching(before)) return undefined
	if (verb === 'related') {
		throw new Error(`${chain}: Vitest list exposes no related command or --related option`)
	}
	const flags = readSelection(tokens, options)
	const mode = readArguments(flags, ['--mode'])[0]
	const directory = readArguments(flags, ['--root', '-r'])[0]
	const dir = readArguments(flags, ['--dir'])[0]
	const configured = readArguments(flags, ['--config', '-c'])[0]
	const path = configured ?? (directory === undefined && dir === undefined ? config : undefined)
	return {
		config:
			path === undefined ? undefined : normalizeSlashes(relative(process.cwd(), resolve(path))),
		mode: mode === 'test' ? undefined : mode,
		...(directory === undefined ? {} : { root: directory }),
		...(dir === undefined ? {} : { dir }),
		projects: readArguments(flags, ['--project']),
		chain,
		args: configured === undefined && path !== undefined ? ['--config', path, ...flags] : flags,
		full: before.some((flag) => FULL_PATTERN.test(flag) || /:\d+(?:-\d+)?$/u.test(flag)),
	}
}

/**
 * Reads the test files a `node` command runs as its arguments.
 *
 * @param command - The command tokens.
 * @returns The test file arguments of `node FILE` or `node --test FILE...`; none for any other runner.
 */
export function readFileCredits(command: readonly string[]): readonly string[] {
	if (basename(command[0] ?? '').replace(/\.exe$/u, '') !== 'node') return []
	const first = skipRunnerOptions(command, 1)
	if (first < 0) return []
	const candidates = command.includes('--test')
		? command.slice(first)
		: command.slice(first, first + 1)
	return candidates.filter((argument) => TEST_ARGUMENT_PATTERN.test(argument))
}

/**
 * Reads the gates and node-run test files every root script chain reaches.
 *
 * @param scripts - The package scripts by name.
 * @param config - The base config path, forward-slashed and relative.
 * @param options - The option table `readCLIOptions` returned.
 * @returns The gates in visit order, and the earliest chain that runs each test file with `node`.
 */
export function readGates(
	scripts: Readonly<Record<string, string>>,
	config: string,
	options: ReadonlyMap<string, Option>,
): Gates {
	const commands = Object.fromEntries(
		Object.entries(scripts).map(([name, text]) => [name, readCommands(text)]),
	)
	// A shorthand call (`npm test`) runs a script a person also starts directly, so it stays a root.
	const invoked = new Set(
		Object.values(commands)
			.flatMap(listInvocations)
			.filter((entry) => !entry.shorthand)
			.map((entry) => entry.name),
	)
	const visits = Object.keys(scripts)
		.filter((name) => !invoked.has(name))
		.flatMap((root) =>
			walkInvocations(
				commands,
				root,
				[{ name: root, args: [], ancestors: [], shorthand: false }],
				new Set(),
			),
		)
	const units = visits.flatMap((visit) =>
		visit.commands.flatMap((command) => {
			const gate = readGate(command, visit.chain, config, options)
			return gate === undefined ? [] : [gate]
		}),
	)
	// A Map keeps the last entry of a key, so the reversed credits leave the earliest chain.
	const files = new Map(
		visits
			.flatMap((visit) =>
				visit.commands.flatMap((command) =>
					findRunner(command) >= 0
						? []
						: readFileCredits(command).map((file): [string, string] => [file, visit.chain]),
				),
			)
			.toReversed(),
	)
	return { units, files }
}

/**
 * Checks whether a project name is a literal name and not a Vitest pattern.
 *
 * @param name - The project name or pattern.
 * @returns True if the name holds no `*` and does not open with `!`.
 */
export function isConcreteName(name: string): boolean {
	return !name.includes('*') && !name.startsWith('!')
}

/**
 * Checks whether a name matches a wildcard pattern the way Vitest matches a project filter.
 *
 * @param pattern - The pattern, where `*` matches any run of characters.
 * @param name - The name to test.
 * @returns True if the whole name matches, ignoring case.
 */
export function matchesWildcard(pattern: string, name: string): boolean {
	const body = pattern
		.split('*')
		.map((part) => part.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&'))
		.join('.*')
	return new RegExp(`^${body}$`, 'iu').test(name)
}

/**
 * Checks whether a gate's project filters reach a project name.
 *
 * @remarks
 * A browser instance name such as `web (chromium)` is also tested by its base name, because Vitest
 * keeps every instance of a project whose base name a positive filter matches and drops them all
 * when a negative filter matches it.
 *
 * @param filters - The gate's `--project` values, where a leading `!` negates.
 * @param name - The concrete project name.
 * @returns True if no negative filter matches and some positive filter does, or none is positive.
 */
export function matchesProjectFilter(filters: readonly string[], name: string): boolean {
	const names = [name, name.replace(/ \([^)]*\)$/u, '')]
	const negative = filters
		.filter((filter) => filter.startsWith('!'))
		.map((filter) => filter.slice(1))
	const positive = filters.filter((filter) => !filter.startsWith('!'))
	if (negative.some((pattern) => names.some((candidate) => matchesWildcard(pattern, candidate)))) {
		return false
	}
	return (
		positive.length === 0 ||
		positive.some((pattern) => names.some((candidate) => matchesWildcard(pattern, candidate)))
	)
}

/**
 * Replaces the `--project` flags of a gate's arguments.
 *
 * @param args - The gate arguments.
 * @param projects - The project names to pass in place of the existing flags.
 * @returns The arguments with one `--project NAME` pair per name, before any bare `--`.
 */
export function replaceProjects(
	args: readonly string[],
	projects: readonly string[],
): readonly string[] {
	const end = args.indexOf('--')
	const head = end < 0 ? args : args.slice(0, end)
	const tail = end < 0 ? [] : args.slice(end)
	const kept = head.filter(
		(token, index) =>
			token !== '--project' && !token.startsWith('--project=') && head[index - 1] !== '--project',
	)
	return [...kept, ...projects.flatMap((project) => ['--project', project]), ...tail]
}

/**
 * Narrows the gates to the named projects, so no listing runs for a project outside the names.
 *
 * @remarks
 * A gate with no project filter lists the named projects alone. A gate that names projects lists the
 * named ones its filters reach and is dropped when it reaches none. A pattern among the names
 * (`*`, or a leading `!`) cannot be matched beforehand, so a gate that names projects keeps them.
 *
 * @param gates - The gates the root chains reach.
 * @param named - The `--projects` names, empty for no narrowing.
 * @returns The gates to list, each with its narrowed arguments.
 */
export function narrowGates(gates: readonly Gate[], named: readonly string[]): readonly Gate[] {
	if (named.length === 0) return gates
	const concrete = named.filter(isConcreteName)
	const patterned = concrete.length < named.length
	return gates.flatMap((gate): Gate[] => {
		if (gate.projects.length === 0) return [{ ...gate, args: replaceProjects(gate.args, named) }]
		if (patterned) return [gate]
		const reached = concrete.filter((name) => matchesProjectFilter(gate.projects, name))
		return reached.length === 0 ? [] : [{ ...gate, args: replaceProjects(gate.args, reached) }]
	})
}

/**
 * Lists the tests one Vitest listing collects.
 *
 * @param args - The arguments to pass after `vitest list`.
 * @param full - True to collect each test with its name and location; false for files only.
 * @param cache - The listings already read, keyed by their arguments.
 * @returns The tests and whether the project filter matched, or undefined when Vitest refuses.
 */
export function listCollected(
	args: readonly string[],
	full: boolean,
	cache: Map<string, Listed>,
): Listed | undefined {
	const parameters = [
		...(full ? ['--includeTaskLocation', '--staticParse=false'] : ['--filesOnly']),
		...args,
	]
	const key = JSON.stringify(parameters)
	const cached = cache.get(key)
	if (cached !== undefined) return cached
	const directory = mkdtempSync(join(tmpdir(), 'discovery-'))
	const listing = join(directory, 'listing.json')
	try {
		const result = spawnSync(
			process.execPath,
			[VITEST, 'list', `--json=${listing}`, ...parameters],
			{
				encoding: 'utf8',
				maxBuffer: 64 * 1024 * 1024,
				timeout: LISTING_TIMEOUT,
				windowsHide: true,
			},
		)
		if (
			args.includes('--project') &&
			result.status === 1 &&
			(result.stderr.includes('No projects matched the filter "') ||
				result.stderr.includes('The filter matched no projects:'))
		) {
			const unmatched = { entries: [], matched: false }
			cache.set(key, unmatched)
			return unmatched
		}
		if (result.status !== 0 || !existsSync(listing)) {
			const diagnostic = result.stderr || result.error?.message || result.stdout
			console.error(
				diagnostic
					.split(/\r\n|\n/u)
					.filter((line) => line.trim() !== '')
					.slice(0, 12)
					.join('\n'),
			)
			return undefined
		}
		const parsed: unknown = JSON.parse(readFileSync(listing, 'utf8'))
		if (!Array.isArray(parsed)) return undefined
		const collected = parsed.flatMap((entry): Collected[] => {
			if (typeof entry !== 'object' || entry === null) return []
			const record = Object.fromEntries(Object.entries(entry))
			const location =
				typeof record.location === 'object' && record.location !== null
					? Object.fromEntries(Object.entries(record.location))
					: {}
			if (
				typeof record.file !== 'string' ||
				(record.projectName !== undefined && typeof record.projectName !== 'string') ||
				(full && typeof record.name !== 'string')
			) {
				return []
			}
			return [
				{
					file: normalizeSlashes(relative(process.cwd(), record.file)),
					projectName: record.projectName ?? '',
					name: typeof record.name === 'string' ? record.name : undefined,
					line: typeof location.line === 'number' ? location.line : undefined,
					column: typeof location.column === 'number' ? location.column : undefined,
				},
			]
		})
		const listed = { entries: collected, matched: true }
		cache.set(key, listed)
		return listed
	} catch (error) {
		console.error(error instanceof Error ? error.message : String(error))
		return undefined
	} finally {
		rmSync(directory, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 })
	}
}

/**
 * Lists the test and spec files beneath a directory.
 *
 * @param directory - The directory to walk; a missing directory holds none.
 * @returns The forward-slash paths of every test or spec file, skipping only `node_modules` and `.git`.
 */
export function listTestFiles(directory: string): readonly string[] {
	if (!existsSync(directory)) return []
	return listFiles(directory, UNDISCOVERED_SKIPS)
		.map((file) => file.path)
		.filter((path) => DISCOVERABLE_PATTERN.test(path))
}

/**
 * Scans source text into tokens that tell code from comments and strings.
 *
 * @remarks
 * Comments are dropped. A string, a template (whole, with its expressions), and a regular expression
 * literal each become one token. A slash opens a regular expression after an operator, an opening
 * bracket, or a keyword, and divides after a word, a literal, or a closing bracket. The scanner
 * pairs each opening bracket with its closing bracket as it reads.
 */
export class CodeScanner {
	readonly #text: string
	readonly #tokens: CodeToken[] = []
	readonly #closes = new Map<number, number>()
	readonly #opened: number[] = []
	#position = 0
	#last: CodeToken | undefined = undefined

	constructor(text: string) {
		this.#text = text
	}

	scan(): CodeScan {
		while (this.#position < this.#text.length) {
			const token = this.#read()
			if (token === undefined) continue
			if (token.kind === 'punct' && OPENERS.includes(token.text)) {
				this.#opened.push(this.#tokens.length)
			}
			if (token.kind === 'punct' && CLOSERS.includes(token.text)) {
				const open = this.#opened.pop()
				if (open !== undefined) this.#closes.set(open, this.#tokens.length)
			}
			this.#tokens.push(token)
		}
		return { tokens: this.#tokens, closes: this.#closes }
	}

	#read(): CodeToken | undefined {
		const rest = this.#text.slice(this.#position)
		const skipped = /^(?:\s+|\/\/[^\r\n]*|\/\*[\s\S]*?(?:\*\/|$))/u.exec(rest)
		if (skipped !== null) {
			this.#position += skipped[0].length
			return undefined
		}
		if (rest.startsWith('`')) return this.#take('template', this.#readTemplate())
		const quoted = STRING_PATTERN.exec(rest)
		if (quoted !== null) return this.#take('string', quoted[0])
		if (rest.startsWith('/') && this.#expectsRegex()) {
			const regex = REGEX_PATTERN.exec(rest)
			if (regex !== null) return this.#take('regex', regex[0])
		}
		const word = WORD_PATTERN.exec(rest)
		if (word !== null) return this.#take('word', word[0])
		return this.#take('punct', rest.slice(0, 1))
	}

	#take(kind: CodeToken['kind'], text: string): CodeToken {
		if (kind !== 'template') this.#position += text.length
		const token = { kind, text }
		this.#last = token
		return token
	}

	#expectsRegex(): boolean {
		const last = this.#last
		if (last === undefined) return true
		if (last.kind === 'punct') return !CLOSERS.includes(last.text)
		if (last.kind === 'word') return REGEX_KEYWORDS.has(last.text)
		return false
	}

	#readTemplate(): string {
		const start = this.#position
		this.#position += 1
		while (this.#position < this.#text.length) {
			const character = this.#text[this.#position]
			if (character === '\\') {
				this.#position += 2
			} else if (character === '`') {
				this.#position += 1
				return this.#text.slice(start, this.#position)
			} else if (this.#text.startsWith('${', this.#position)) {
				this.#position += 2
				this.#skipExpression()
			} else {
				this.#position += 1
			}
		}
		return this.#text.slice(start, this.#position)
	}

	#skipExpression(): void {
		while (this.#position < this.#text.length) {
			const token = this.#read()
			if (token?.kind !== 'punct') continue
			if (token.text === '}') return
			if (token.text === '{') this.#skipExpression()
		}
	}
}

/**
 * Checks whether a token is a punctuation mark with the given text.
 *
 * @param token - The token, or undefined past the end.
 * @param text - The punctuation text.
 * @returns True if the token is that punctuation mark.
 */
export function isPunct(token: CodeToken | undefined, text: string): boolean {
	return token?.kind === 'punct' && token.text === text
}

/**
 * Reads the modifier chain after a registrar, up to its registration call.
 *
 * @param scan - The scanned source.
 * @param at - The index after the registrar or the last chain element.
 * @param names - The modifier names read so far; an empty name marks a consumed argument group.
 * @returns The names and the index of the registration call's opening parenthesis, or undefined when
 * the tokens are no registration call.
 */
export function readChain(scan: CodeScan, at: number, names: readonly string[]): Chain | undefined {
	const token = scan.tokens[at]
	if (token === undefined) return undefined
	const last = names.at(-1) ?? ''
	if (isPunct(token, '.')) {
		const name = scan.tokens[at + 1]
		return name?.kind === 'word' ? readChain(scan, at + 2, [...names, name.text]) : undefined
	}
	if (token.kind === 'template' && ARGUMENT_MODIFIERS.has(last)) {
		return readChain(scan, at + 1, [...names, ''])
	}
	if (!isPunct(token, '(')) return undefined
	if (!ARGUMENT_MODIFIERS.has(last)) return { names, call: at }
	const close = scan.closes.get(at)
	return close === undefined ? undefined : readChain(scan, close + 1, [...names, ''])
}

/**
 * Splits a token range into its top-level arguments, jumping over bracket groups.
 *
 * @param scan - The scanned source.
 * @param start - The index the current argument starts at.
 * @param at - The index being read.
 * @param end - The index the range ends at, excluded.
 * @returns One span per non-empty argument.
 */
export function splitArguments(
	scan: CodeScan,
	start: number,
	at: number,
	end: number,
): readonly Span[] {
	if (at >= end) return start < end ? [{ start, end }] : []
	const token = scan.tokens[at]
	if (token?.kind === 'punct' && OPENERS.includes(token.text)) {
		return splitArguments(scan, start, (scan.closes.get(at) ?? at) + 1, end)
	}
	if (isPunct(token, ',')) {
		return [{ start, end: at }, ...splitArguments(scan, at + 1, at + 1, end)]
	}
	return splitArguments(scan, start, at + 1, end)
}

/**
 * Reads the property keys at the top level of an object literal's token range.
 *
 * @param scan - The scanned source.
 * @param at - The index being read.
 * @param end - The index the range ends at, excluded.
 * @returns Each key that follows `{` or `,` and precedes `:`, `,`, or `}`, quotes removed.
 */
export function readKeys(scan: CodeScan, at: number, end: number): readonly string[] {
	const token = scan.tokens[at]
	if (token === undefined || at >= end) return []
	if (token.kind === 'punct' && OPENERS.includes(token.text)) {
		return readKeys(scan, (scan.closes.get(at) ?? at) + 1, end)
	}
	const previous = scan.tokens[at - 1]
	const following = scan.tokens[at + 1]
	const spelled =
		token.kind === 'word'
			? token.text
			: token.kind === 'string'
				? token.text.slice(1, -1)
				: undefined
	const isKey =
		spelled !== undefined &&
		(isPunct(previous, '{') || isPunct(previous, ',')) &&
		(isPunct(following, ':') || isPunct(following, ',') || isPunct(following, '}'))
	return [...(isKey ? [spelled] : []), ...readKeys(scan, at + 1, end)]
}

/**
 * Reads the retry and timeout markers a registration's arguments carry.
 *
 * @param scan - The scanned source.
 * @param spans - The registration call's top-level arguments.
 * @returns A `timeout` entry for a numeric last argument after the title, and an entry for each
 * `retry` or `timeout` key of an object-literal argument.
 */
export function readArgumentMarkers(scan: CodeScan, spans: readonly Span[]): readonly string[] {
	const last = spans.at(-1)
	const lastToken = last === undefined ? undefined : scan.tokens[last.start]
	const numeric =
		spans.length >= 2 &&
		last !== undefined &&
		last.end - last.start === 1 &&
		lastToken?.kind === 'word' &&
		NUMBER_PATTERN.test(lastToken.text)
	const keys = spans.flatMap((span) =>
		isPunct(scan.tokens[span.start], '{') && scan.closes.get(span.start) === span.end - 1
			? readKeys(scan, span.start + 1, span.end - 1)
			: [],
	)
	return [
		...(numeric ? ['timeout'] : []),
		...keys.filter((key) => key === 'retry' || key === 'timeout'),
	]
}

/**
 * Reads the markers one registration carries.
 *
 * @param scan - The scanned source.
 * @param index - The index of the registrar identifier.
 * @returns The chain markers (`.todo`, `.skipIf`, `.runIf`, `.fails`) and the argument markers.
 */
export function readHits(scan: CodeScan, index: number): readonly string[] {
	const chain = readChain(scan, index + 1, [])
	if (chain === undefined) return []
	const close = scan.closes.get(chain.call)
	const spans =
		close === undefined ? [] : splitArguments(scan, chain.call + 1, chain.call + 1, close)
	return [
		...chain.names.filter((name) => CHAIN_MARKERS.has(name)).map((name) => `.${name}`),
		...readArgumentMarkers(scan, spans),
	]
}

/**
 * Counts the markers a scanned test file carries, as call forms outside comments and strings.
 *
 * @param scan - The scanned source.
 * @returns Each marker with a nonzero count, in marker order.
 */
export function readMarkers(scan: CodeScan): Readonly<Record<string, number>> {
	const hits = scan.tokens.flatMap((token, index) =>
		token.kind === 'word' && REGISTRARS.has(token.text) && !isPunct(scan.tokens[index - 1], '.')
			? readHits(scan, index)
			: [],
	)
	return Object.fromEntries(
		MARKERS.map((marker) => [marker, hits.filter((hit) => hit === marker).length] as const).filter(
			([, count]) => count > 0,
		),
	)
}

/**
 * Counts the markers of a test file on disk.
 *
 * @param file - The test file path.
 * @returns Each marker with a nonzero count.
 */
export function countMarkers(file: string): Readonly<Record<string, number>> {
	return readMarkers(new CodeScanner(readFileSync(file, 'utf8')).scan())
}

/**
 * Runs one read per item in order and stops at the first refusal, so no later read spawns.
 *
 * @param items - The items to read.
 * @param read - The read for one item; undefined refuses.
 * @returns The readings in order, or undefined once any read refuses.
 */
export function collectResults<Item, Value>(
	items: readonly Item[],
	read: (item: Item) => Value | undefined,
): readonly Value[] | undefined {
	return items.reduce<readonly Value[] | undefined>((results, item) => {
		if (results === undefined) return undefined
		const result = read(item)
		return result === undefined ? undefined : [...results, result]
	}, [])
}

/**
 * Checks whether two units run under the same config, mode, root, and dir.
 *
 * @param left - The first unit.
 * @param right - The second unit.
 * @returns True if every field is equal.
 */
export function isSameUnit(left: Unit, right: Unit): boolean {
	return (
		left.config === right.config &&
		left.mode === right.mode &&
		left.root === right.root &&
		left.dir === right.dir
	)
}

/**
 * Builds the arguments that select a unit's config, mode, root, and dir.
 *
 * @param unit - The unit.
 * @returns The arguments to pass to `vitest list`.
 */
export function readUnitArguments(unit: Unit): readonly string[] {
	return [
		...(unit.config === undefined ? [] : ['--config', unit.config]),
		...(unit.mode === undefined ? [] : ['--mode', unit.mode]),
		...(unit.root === undefined ? [] : ['--root', unit.root]),
		...(unit.dir === undefined ? [] : ['--dir', unit.dir]),
	]
}

/**
 * Reads one unit's universe, gate selections, and project readings.
 *
 * @param unit - The unit to read.
 * @param named - The `--projects` names; the universe and every listing carry them when present.
 * @param gates - The narrowed gates.
 * @param cache - The listings already read.
 * @returns The unit's reading, or undefined when a listing refuses.
 */
export function readUnit(
	unit: Unit,
	named: readonly string[],
	gates: Gates,
	cache: Map<string, Listed>,
): UnitResult | undefined {
	const reached = gates.units.filter((gate) => isSameUnit(gate, unit))
	const parameters = readUnitArguments(unit)
	const universeArguments = [...parameters, ...named.flatMap((name) => ['--project', name])]
	const universe = listCollected(universeArguments, true, cache)
	if (universe === undefined) return undefined
	const collected = universe.entries
	const selected = collectResults(reached, (gate) => {
		const selection =
			JSON.stringify(gate.args) === JSON.stringify(universeArguments)
				? collected
				: listCollected(gate.args, gate.full, cache)?.entries
		if (selection === undefined) {
			console.error(`discovery: gate ${gate.chain}: vitest list refused ${gate.args.join(' ')}`)
			return undefined
		}
		return {
			gate,
			identities: new Set(
				selection.map((entry) =>
					JSON.stringify([
						entry.file,
						entry.projectName,
						...(gate.full ? [entry.name, entry.line, entry.column] : []),
					]),
				),
			),
		}
	})
	if (selected === undefined) return undefined
	const candidates = named.length === 0 ? reached.flatMap((gate) => gate.projects) : named
	const projects = collectResults(
		[...new Set(candidates)].filter(isConcreteName),
		(project): ProjectResult | undefined => {
			if (
				selected.some(
					({ gate, identities }) =>
						gate.projects.length === 1 && gate.projects[0] === project && identities.size > 0,
				)
			) {
				return { project, populated: true, empty: false }
			}
			const selection = listCollected([...parameters, '--project', project], false, cache)
			if (selection === undefined) return undefined
			return {
				project,
				populated: selection.entries.length > 0,
				empty:
					selection.entries.length === 0 &&
					(reached.some((gate) => gate.projects.includes(project)) || named.includes(project)) &&
					(named.length === 0 || named.includes(project)),
			}
		},
	)
	if (projects === undefined) return undefined
	return {
		listing: {
			...unit,
			collected: collected.map((entry) => ({
				...entry,
				gate: selected.find(({ gate, identities }) =>
					identities.has(
						JSON.stringify([
							entry.file,
							entry.projectName,
							...(gate.full ? [entry.name, entry.line, entry.column] : []),
						]),
					),
				)?.gate.chain,
			})),
			empty: projects.filter(({ empty }) => empty).map(({ project }) => project),
		},
		populated: projects.filter(({ populated }) => populated).map(({ project }) => project),
	}
}

/**
 * Reads the listing of every unit the narrowed gates reach.
 *
 * @param config - The base config path.
 * @param named - The `--projects` names.
 * @param gates - The narrowed gates.
 * @returns One listing per unit, or undefined when a listing refuses.
 */
export function collectListings(
	config: string,
	named: readonly string[],
	gates: Gates,
): readonly Listing[] | undefined {
	const base: Unit = { config, mode: undefined }
	// A gate joins the units unless the base unit or an earlier gate already names the same unit.
	const units: readonly Unit[] = [
		base,
		...gates.units
			.filter(
				(gate, index) =>
					![base, ...gates.units.slice(0, index)].some((unit) => isSameUnit(unit, gate)),
			)
			.map((gate) => ({
				config: gate.config,
				mode: gate.mode,
				...(gate.root === undefined ? {} : { root: gate.root }),
				...(gate.dir === undefined ? {} : { dir: gate.dir }),
			})),
	]
	// A listing is a memo keyed by its arguments: each key is written once, on its first miss.
	const cache = new Map<string, Listed>()
	const results = collectResults(units, (unit) => readUnit(unit, named, gates, cache))
	if (results === undefined) return undefined
	const listings = results.map(({ listing }) => listing)
	const populated = new Set(results.flatMap((result) => result.populated))
	// A project empty under one unit may still list tests under another, so each unit is asked for it.
	const rescans = collectResults(
		[...new Set(listings.flatMap((listing) => listing.empty))]
			.filter((name) => !populated.has(name))
			.flatMap((name) => units.map((unit) => ({ name, unit }))),
		({ name, unit }) => {
			const selection = listCollected([...readUnitArguments(unit), '--project', name], false, cache)
			return selection === undefined ? undefined : { name, listed: selection.entries.length > 0 }
		},
	)
	if (rescans === undefined) return undefined
	const resolved = new Set([
		...populated,
		...rescans.filter(({ listed }) => listed).map(({ name }) => name),
	])
	return listings.map((listing) => ({
		...listing,
		empty: listing.empty.filter((name) => !resolved.has(name)),
	}))
}

/**
 * Names the `--projects` entries the base config's projects do not match.
 *
 * @param unit - The base unit.
 * @param named - The `--projects` names.
 * @param cache - The listings already read.
 * @returns The names Vitest matched to no project, or undefined when a listing refuses.
 */
export function readUnmatched(
	unit: Unit,
	named: readonly string[],
	cache: Map<string, Listed>,
): readonly string[] | undefined {
	const matches = collectResults(named, (name) => {
		const listed = listCollected([...readUnitArguments(unit), '--project', name], false, cache)
		return listed === undefined ? undefined : { name, matched: listed.matched }
	})
	return matches?.filter(({ matched }) => !matched).map(({ name }) => name)
}

/**
 * Identifies a collected test by its file, project, name, and location.
 *
 * @param entry - The collected test.
 * @returns A key two listings share for the same test.
 */
export function identifyCollected(entry: Collected): string {
	return JSON.stringify([entry.file, entry.projectName, entry.name, entry.line, entry.column])
}

/**
 * Merges the tests of several listings into one list.
 *
 * @remarks
 * The same test listed twice in one listing is two occurrences, and the same occurrence listed by
 * two listings is one test: the last listing's fields win, and the gate is the last one any named.
 *
 * @param listings - The listings to merge.
 * @returns The merged tests.
 */
export function mergeCollected(listings: readonly Listing[]): readonly Collected[] {
	const keyed = listings.flatMap((listing) => {
		const positions = new Map(
			[...Map.groupBy(listing.collected, identifyCollected).values()].flatMap((group) =>
				group.map((entry, position) => [entry, position + 1] as const),
			),
		)
		return listing.collected.map((entry) => ({
			entry,
			key: JSON.stringify([identifyCollected(entry), positions.get(entry)]),
		}))
	})
	return [...Map.groupBy(keyed, ({ key }) => key).values()].flatMap((group) => {
		const last = group.at(-1)
		return last === undefined
			? []
			: [
					{
						...last.entry,
						gate: group.findLast(({ entry }) => entry.gate !== undefined)?.entry.gate,
					},
				]
	})
}

/**
 * Reads the modification times of every test file the census can collect.
 *
 * @param gates - The narrowed gates, whose roots and dirs add watched directories.
 * @returns A JSON text two reads share when no test file changed.
 */
export function readSnapshot(gates: Gates): string {
	const bases = [
		process.cwd(),
		...gates.units.flatMap((gate) =>
			[gate.root, gate.dir].filter((path) => path !== undefined).map((path) => resolve(path)),
		),
	]
	const roots = new Set(bases.flatMap((base) => [base, join(base, 'tmp/probes')]))
	// A later listing of the same path replaces the earlier modification time at the earlier position.
	const files = new Map(
		[...roots].flatMap((root) =>
			existsSync(root)
				? listFiles(root)
						.filter((file) => TEST_FILE_PATTERN.test(file.path))
						.map((file) => [file.path, file.modified] as const)
				: [],
		),
	)
	return JSON.stringify([...files].sort(([left], [right]) => left.localeCompare(right)))
}

/**
 * Reads the listings, repeating once when a test file changed during the first read.
 *
 * @param config - The base config path.
 * @param named - The `--projects` names.
 * @param gates - The narrowed gates.
 * @param attempt - The attempt number, zero for the first.
 * @returns One listing per unit, or undefined when a listing refuses.
 * @throws Thrown when test files changed during both attempts.
 */
export function collectStableListings(
	config: string,
	named: readonly string[],
	gates: Gates,
	attempt = 0,
): readonly Listing[] | undefined {
	const before = readSnapshot(gates)
	const listings = collectListings(config, named, gates)
	if (before === readSnapshot(gates)) return listings
	if (attempt === 1) throw new Error('Test files changed during both census attempts')
	return collectStableListings(config, named, gates, attempt + 1)
}

/**
 * Runs the census and prints its report.
 *
 * @param argv - The arguments after the script path.
 * @returns The exit code: 0 no flag, 3 a flag, 2 a tool failure, 64 usage.
 */
export function main(argv: readonly string[]): number {
	const unknown = readUnknownFlags(argv, FLAGS)
	if (unknown.length > 0) {
		console.error(
			`discovery: ${unknown.map(describeName).join(', ')} is not a flag this script reads; give each value as its own argument. ${USAGE}`,
		)
		return 64
	}
	const missing = readMissingFlags(argv, ['--config', '--projects'])
	if (missing.length > 0) {
		console.error(`discovery: ${missing.join(', ')} given with no value`)
		return 64
	}
	const config = readOption(argv, '--config') ?? 'vite.config.ts'
	if (!existsSync(config) || !existsSync('package.json')) {
		console.error(USAGE)
		return 64
	}
	if (!existsSync(VITEST)) {
		console.error(`discovery: ${VITEST} is missing; run npm ci first`)
		return 2
	}
	const canonical = normalizeSlashes(relative(process.cwd(), resolve(config)))
	const options = readCLIOptions()
	const absent = readMissingOptions(options)
	if (absent.length > 0) {
		console.error(
			`discovery: Vitest ${readVitestVersion()} lists no ${absent.join(', ')} option; the help layout this script reads has changed`,
		)
		return 2
	}
	const named = [
		...new Set((readOption(argv, '--projects') ?? '').split(',').filter((name) => name !== '')),
	]
	const read = readGates(readScripts(), canonical, options)
	if (named.length > 0) {
		const base: Unit = { config: canonical, mode: undefined }
		const cache = new Map<string, Listed>()
		const unmatched = readUnmatched(base, named, cache)
		if (unmatched === undefined) {
			console.error('discovery: vitest list failed')
			return 2
		}
		if (unmatched.length > 0) {
			console.error(
				`discovery: --projects ${unmatched.map(describeName).join(', ')} matches no project in ${describeName(canonical)}; run without --projects to list every project that collects tests, since naming them here would collect the projects outside the set`,
			)
			return 64
		}
	}
	const gates: Gates = { ...read, units: narrowGates(read.units, named) }
	const listings = collectStableListings(canonical, named, gates)
	if (listings === undefined) {
		console.error('discovery: vitest list failed')
		return 2
	}
	const collected = mergeCollected(listings)
	const known = listings.flatMap((listing) => listing.empty)
	const names = new Set<string>([...known, ...collected.map((entry) => entry.projectName)])
	const projects: Project[] = [...names].sort().map((name) => {
		const mine = collected.filter((entry) => entry.projectName === name)
		const units = listings.filter((listing) =>
			listing.collected.some((entry) => entry.projectName === name),
		)
		const chains = mine.map((entry) => entry.gate ?? gates.files.get(entry.file))
		const gate =
			mine.length === 0
				? (
						gates.units.find(
							(unit) => unit.projects.includes(name) && unit.chain.includes(' > '),
						) ?? gates.units.find((unit) => unit.projects.includes(name))
					)?.chain
				: chains.every((chain) => chain !== undefined)
					? chains[0]
					: undefined
		return {
			name,
			gate,
			files: new Set(mine.map((entry) => entry.file)).size,
			tests: mine.length,
			...(units.some(
				(unit) =>
					unit.config !== canonical ||
					unit.mode !== undefined ||
					unit.root !== undefined ||
					unit.dir !== undefined,
			)
				? {
						units: units.map((unit) => ({
							config: unit.config,
							mode: unit.mode,
							...(unit.root === undefined ? {} : { root: unit.root }),
							...(unit.dir === undefined ? {} : { dir: unit.dir }),
						})),
					}
				: {}),
		}
	})
	const collectedFiles = new Set(collected.map((entry) => entry.file))
	const undiscovered = (named.length === 0 ? listTestFiles('tests') : [])
		.filter((file) => !collectedFiles.has(file) && !gates.files.has(file))
		.sort()
	const ungated = projects
		.filter((project) => project.gate === undefined && project.tests > 0)
		.map((project) => project.name)
	// An empty project no chain containing ` > ` names is a workbench, reported without a flag.
	const empty = projects
		.filter((project) => project.tests === 0 && project.gate?.includes(' > ') === true)
		.map((project) => project.name)
	const workbenches = projects
		.filter((project) => project.tests === 0 && project.gate?.includes(' > ') !== true)
		.map((project) => project.name)
	const census: Census[] = [...collectedFiles].sort().map((file) => ({
		file,
		projects: [
			...new Set(
				collected.filter((entry) => entry.file === file).map((entry) => entry.projectName),
			),
		],
		markers: countMarkers(resolve(file)),
	}))
	const flagged = undiscovered.length + ungated.length + empty.length > 0
	if (argv.includes('--json')) {
		console.log(
			JSON.stringify({ config, projects, ungated, empty, workbenches, undiscovered, census }),
		)
	} else {
		for (const project of projects) {
			console.log(
				`discovery: ${project.name.padEnd(14)} ${String(project.files).padStart(3)} file(s) ${String(project.tests).padStart(5)} test(s) gate=${project.gate ?? 'none'}`,
			)
		}
		for (const name of ungated)
			console.log(`discovery: ${name} collects tests but no root script chain reaches it`)
		for (const name of empty) console.log(`discovery: ${name} collects nothing`)
		for (const name of workbenches)
			console.log(`discovery: ${name} is an empty workbench; no chain containing " > " names it`)
		for (const file of undiscovered) console.log(`discovery: ${file} is collected by no project`)
		for (const entry of census) {
			const marks = Object.entries(entry.markers)
			if (marks.length > 0) {
				console.log(
					`discovery: ${entry.file} ${marks.map(([marker, count]) => `${marker}×${count}`).join(' ')}`,
				)
			}
		}
	}
	return flagged ? 3 : 0
}

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === import.meta.filename) {
	try {
		process.exitCode = main(process.argv.slice(2))
	} catch (error) {
		console.error(`discovery: ${error instanceof Error ? error.message : String(error)}`)
		process.exitCode = 2
	}
}
