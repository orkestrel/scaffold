// Map terrain before a brief, an absorption lane, or a rename. Run from the checkout root:
//   node .agents/skills/orkestrel-scout/scripts/map.ts --tree PATH... [--headings PATH...] [--frontmatter PATH...] [--exports PATH...] [--census TERM...] [--refs PATH] [--anchors PATH...] [--paths a,b] [--ignore-case] [--json] [--out FILE]
// --tree lists every file under each path with its line count and size. --headings lists every
// Markdown heading with its line; a heading inside a fenced block is no heading, where a fence
// opens with a run of three or more backticks or tildes indented up to three spaces and closes with
// a run of the same character at least as long. --frontmatter lists every key of a Markdown
// frontmatter block, a TOML file, or a YAML file with its whole value, a nested key dotted under its
// parents (`interface.default_prompt`) and a TOML key under its table. --exports lists every
// `export` declaration line in a TypeScript file (a text reading, not the compiler's). --census
// lists every line carrying a term. --refs lists
// every line naming a path or its basename. --anchors lists every `§ Heading` reference whose
// heading the named file, or the same file, does not carry. Walks skip node_modules, .git, dist,
// tmp, .orkestrel, .idea, and host.json; --paths narrows a census or refs walk. Modes combine, each
// printing its section; --json prints one object; --out writes the output to FILE instead of the
// terminal. Give each flag once; a later duplicate is not read. A value that opens with `--` is a
// missing value, so census a custom property without its leading dashes. The script refuses a flag
// it does not read, the `--flag=value` form included, and names every unknown flag and every flag
// given with no value in one refusal. Exit 0, or 64 when no mode is given, a flag is given with no
// value, or a flag is unknown.
import {
	existsSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	realpathSync,
	statSync,
	writeFileSync,
} from 'node:fs'
import { basename, dirname, join } from 'node:path'

/** Matches an `export` declaration line and captures its kind and name. */
export const EXPORT =
	/^export\s+(?:default\s+)?(?:async\s+)?(?:abstract\s+)?(function\*?|const|let|class|interface|type|enum|namespace)\s+([A-Za-z_$][\w$]*)/u

/** Matches a Markdown heading line and captures its marker and text. */
export const HEADING = /^(#{1,6})\s+(.+?)\s*#*\s*$/u

/** Matches a `§ Heading` reference, with the backticked Markdown path that may precede it. */
export const ANCHOR =
	/(?:`([^`\n]+\.md)`\s*)?§\s*"?([^"`\n|;,.)]+?)"?(?=\s*(?:[,.;)|]|\s(?:and|or|names|fixes|owns|states|binds|governs|decides|before|after)\b|$))/gu

/** Matches the extensions of the binary files a walk reads as no text. */
export const BINARY = /\.(png|jpg|jpeg|gif|webp|ico|woff2?|ttf|otf|eot|zip|tgz|gz|pdf|wasm)$/u

/** Matches a line that can open or close a code fence and captures its run of backticks or tildes. */
export const FENCE = /^ {0,3}(`{3,}|~{3,})/u

/** Names the directories a tree walk skips. */
export const SKIPPED_DIRECTORIES: ReadonlySet<string> = new Set([
	'node_modules',
	'.git',
	'dist',
	'tmp',
	'.orkestrel',
	'.idea',
])

/** Lists the flags that take a value. */
export const VALUE_FLAGS: readonly string[] = [
	'--tree',
	'--headings',
	'--frontmatter',
	'--exports',
	'--census',
	'--refs',
	'--anchors',
	'--paths',
	'--out',
]

/** Lists every flag the script reads, value flags and switches alike. */
export const FLAGS: readonly string[] = [...VALUE_FLAGS, '--ignore-case', '--json']

/** Holds the usage line printed when a call names no mode. */
export const USAGE =
	'usage: map.ts [--tree PATH...] [--headings PATH...] [--frontmatter PATH...] [--exports PATH...] [--census TERM...] [--refs PATH] [--anchors PATH...] [--paths a,b] [--ignore-case] [--json] [--out FILE]'

/** Describes one file a tree walk found, with the modification time it carries. */
export interface WalkedFile {
	readonly path: string
	readonly modified: number
}

/** Describes one file in a tree map: its path, its line count, and its size in bytes. */
export interface TreeRow {
	readonly path: string
	readonly lines: number
	readonly bytes: number
}

/** Describes one matched line: its file, its line number, and its text. */
export interface LineRow {
	readonly path: string
	readonly line: number
	readonly text: string
}

/** Describes the lines that carry one census term. */
export interface TermRows {
	readonly term: string
	readonly rows: readonly LineRow[]
}

/** Describes one `§` reference whose heading its target does not carry. */
export interface AnchorRow {
	readonly path: string
	readonly line: number
	readonly target: string
	readonly heading: string
}

/** Describes a line that can open or close a fence: its index and its run of fence characters. */
export interface FenceLine {
	readonly index: number
	readonly run: string
}

/** Describes the fence scan: the span of every closed fence and the fence still open, if any. */
export interface FenceState {
	readonly open: FenceLine | undefined
	readonly spans: ReadonlyArray<readonly [number, number]>
}

/** Describes the TOML reader's state: the current table, an open multi-line string, and the rows read. */
export interface TomlState {
	readonly table: string
	readonly fence: string | undefined
	readonly rows: readonly LineRow[]
}

/** Describes one classified YAML line: its number, indent, content, key, and inline value. */
export interface YamlLine {
	readonly line: number
	readonly indent: number
	readonly content: string
	readonly key: string | undefined
	readonly value: string
}

/** Describes a YAML key line: its position among the classified lines, the line, and its dotted key. */
export interface YamlHead {
	readonly position: number
	readonly line: YamlLine
	readonly key: string
}

/** Describes the YAML reader's state: the stack of parent keys and the key lines read. */
export interface YamlState {
	readonly stack: ReadonlyArray<{ readonly indent: number; readonly key: string }>
	readonly heads: readonly YamlHead[]
}

/** Describes the whole map: one optional section per mode. */
export interface Report {
	readonly tree?: readonly TreeRow[]
	readonly headings?: readonly LineRow[]
	readonly frontmatter?: readonly LineRow[]
	readonly exports?: readonly LineRow[]
	readonly census?: readonly TermRows[]
	readonly refs?: readonly LineRow[]
	readonly anchors?: readonly AnchorRow[]
}

/**
 * Reads the value that follows a flag.
 *
 * @remarks
 * The first occurrence of a flag wins, a following value that opens with `--` is a missing value,
 * and the `--flag=value` form is not read.
 *
 * @param argv - The arguments after the script path.
 * @param name - The flag, such as `--paths`.
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
 * Reads the values that follow a flag up to the next flag.
 *
 * @param argv - The arguments after the script path.
 * @param name - The flag, such as `--tree`.
 * @returns The values between the flag and the next `--` argument, empty when the flag is absent.
 */
export function readList(argv: readonly string[], name: string): readonly string[] {
	const index = argv.indexOf(name)
	if (index === -1) return []
	const rest = argv.slice(index + 1)
	const end = rest.findIndex((argument) => argument.startsWith('--'))
	return end === -1 ? rest : rest.slice(0, end)
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
 * Lists every regular file beneath a directory, skipping the directories the script never reads.
 *
 * @remarks
 * A skipped name matches a directory at any depth, exactly and case-sensitively.
 *
 * @param directory - The directory to walk.
 * @param skipped - The directory names to skip. Default: the skipped directories.
 * @returns Each file's forward-slash path and modification time, in walk order.
 * @throws Thrown when `directory` does not exist or cannot be read.
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
 * Checks whether a walk reads a file as text.
 *
 * @param path - The file path.
 * @returns True if the path carries no binary extension and is not `host.json`; false otherwise.
 */
export function isText(path: string): boolean {
	return !BINARY.test(path) && basename(path) !== 'host.json'
}

/**
 * Expands paths into the files they name.
 *
 * @param paths - Files and directories; an absent path names nothing.
 * @returns Each file, a directory expanded to the files beneath it.
 */
export function expandPaths(paths: readonly string[]): readonly string[] {
	return paths.flatMap((path) => {
		if (!existsSync(path)) return []
		if (statSync(path).isDirectory()) return listFiles(path).map((file) => file.path)
		return [normalizeSlashes(path)]
	})
}

/**
 * Reads a file as lines.
 *
 * @param path - The file to read.
 * @returns The lines, split on either line ending.
 */
export function readLines(path: string): readonly string[] {
	return readFileSync(path, 'utf8').split(/\r\n|\n/)
}

/**
 * Maps the files beneath paths with their line counts and sizes.
 *
 * @param paths - Files and directories.
 * @returns A row per text file, sorted by path.
 */
export function mapTree(paths: readonly string[]): readonly TreeRow[] {
	return expandPaths(paths)
		.filter(isText)
		.map((path) => {
			const text = readFileSync(path, 'utf8')
			return {
				path,
				lines: text === '' ? 0 : text.split(/\r\n|\n/).length,
				bytes: Buffer.byteLength(text),
			}
		})
		.sort((left, right) => left.path.localeCompare(right.path))
}

/**
 * Finds the lines that can open or close a code fence.
 *
 * @param lines - The lines of a Markdown file.
 * @returns Each line that opens with up to three spaces and a run of three or more backticks or tildes.
 */
export function findFenceLines(lines: readonly string[]): readonly FenceLine[] {
	return lines.flatMap((text, index) => {
		const run = text.match(FENCE)?.[1]
		return run === undefined ? [] : [{ index, run }]
	})
}

/**
 * Marks the lines that sit inside a code fence.
 *
 * @remarks
 * A fence opens on a run of three or more backticks or tildes, indented up to three spaces, and
 * closes on a run of the same character at least as long; a fence-like line inside an open fence
 * that does not close it is content, and a fence the file never closes runs to its end.
 *
 * @param lines - The lines of a Markdown file.
 * @returns One flag per line: true for the fence lines and the lines between them.
 */
export function scanFences(lines: readonly string[]): readonly boolean[] {
	const { open, spans } = findFenceLines(lines).reduce<FenceState>(
		(state, fence) => {
			if (state.open === undefined) return { open: fence, spans: state.spans }
			const closes =
				fence.run.startsWith(state.open.run.charAt(0)) && fence.run.length >= state.open.run.length
			return closes
				? { open: undefined, spans: [...state.spans, [state.open.index, fence.index]] }
				: state
		},
		{ open: undefined, spans: [] },
	)
	const all = open === undefined ? spans : [...spans, [open.index, lines.length - 1] as const]
	return [...lines.keys()].map((index) =>
		all.some(([first, last]) => index >= first && index <= last),
	)
}

/**
 * Maps the Markdown headings outside code fences.
 *
 * @param paths - Files and directories; only Markdown files are read.
 * @returns A row per heading, its text the marker and the heading text.
 */
export function mapHeadings(paths: readonly string[]): readonly LineRow[] {
	return expandPaths(paths)
		.filter((candidate) => candidate.endsWith('.md'))
		.flatMap((path) => {
			const lines = readLines(path)
			const fenced = scanFences(lines)
			return lines.flatMap((text, index) => {
				if (fenced[index] === true) return []
				const match = text.match(HEADING)
				return match?.[1] !== undefined && match[2] !== undefined
					? [{ path, line: index + 1, text: `${match[1]} ${match[2]}` }]
					: []
			})
		})
}

/**
 * Maps the `export` declaration lines of TypeScript files.
 *
 * @param paths - Files and directories; only TypeScript files are read.
 * @returns A row per declaration, its text the kind and name, or the whole `export * from` line.
 */
export function mapExports(paths: readonly string[]): readonly LineRow[] {
	return expandPaths(paths)
		.filter((candidate) => /\.[cm]?ts$/u.test(candidate))
		.flatMap((path) =>
			readLines(path).flatMap((text, index) => {
				const match = text.match(EXPORT)
				if (match?.[1] !== undefined && match[2] !== undefined) {
					return [{ path, line: index + 1, text: `${match[1]} ${match[2]}` }]
				}
				return /^export\s+\*\s+from\s+/u.test(text)
					? [{ path, line: index + 1, text: text.trim() }]
					: []
			}),
		)
}

/**
 * Builds the predicate a census applies to a line.
 *
 * @param term - The term to find.
 * @param ignoreCase - If true, compares without regard to letter case; if false, compares exactly.
 * @returns A predicate that is true for a line carrying the term.
 */
export function buildMatcher(term: string, ignoreCase: boolean): (text: string) => boolean {
	const needle = ignoreCase ? term.toLowerCase() : term
	return (text) => (ignoreCase ? text.toLowerCase() : text).includes(needle)
}

/**
 * Maps the lines that carry each census term.
 *
 * @param terms - The terms to find.
 * @param roots - The files and directories to read.
 * @param ignoreCase - If true, compares without regard to letter case; if false, compares exactly.
 * @returns The matching lines per term, each line's text trimmed and cut to its first 160 characters.
 */
export function mapCensus(
	terms: readonly string[],
	roots: readonly string[],
	ignoreCase: boolean,
): readonly TermRows[] {
	const files = expandPaths(roots).filter(isText)
	return terms.map((term) => {
		const matches = buildMatcher(term, ignoreCase)
		return {
			term,
			rows: files.flatMap((path) =>
				readLines(path).flatMap((text, index) =>
					matches(text) ? [{ path, line: index + 1, text: text.trim().slice(0, 160) }] : [],
				),
			),
		}
	})
}

/**
 * Maps the lines that name a path or its basename.
 *
 * @param target - The path to find.
 * @param roots - The files and directories to read; the target file itself is left out.
 * @returns The lines that carry the path or its basename.
 */
export function mapRefs(target: string, roots: readonly string[]): readonly LineRow[] {
	const needle = normalizeSlashes(target)
	const name = basename(needle)
	return expandPaths(roots)
		.filter(isText)
		.filter((path) => path !== needle)
		.flatMap((path) =>
			readLines(path).flatMap((text, index) =>
				text.includes(needle) || text.includes(name)
					? [{ path, line: index + 1, text: text.trim().slice(0, 160) }]
					: [],
			),
		)
}

/**
 * Classifies the lines of a YAML body.
 *
 * @param lines - The body lines.
 * @param offset - The line number of the first body line.
 * @returns Each non-blank, non-comment line with its indent, content, key, and inline value.
 */
export function classifyYamlLines(lines: readonly string[], offset: number): readonly YamlLine[] {
	return lines.flatMap((text, index): readonly YamlLine[] => {
		const content = text.trimStart()
		if (content === '' || content.startsWith('#')) return []
		const match = content.match(/^([A-Za-z_][\w-]*)\s*:(?:\s+(.*))?$/u)
		return [
			{
				line: index + offset,
				indent: text.length - content.length,
				content,
				key: match?.[1],
				value: (match?.[2] ?? '').trim(),
			},
		]
	})
}

/**
 * Steps the YAML reader over one classified line.
 *
 * @param state - The reader's state before the line.
 * @param line - The classified line.
 * @param position - The line's position among the classified lines.
 * @returns The state after the line; a line with no key leaves it unchanged.
 */
export function stepYamlState(state: YamlState, line: YamlLine, position: number): YamlState {
	if (line.key === undefined) return state
	// Indents strictly increase along the stack, so the entries at or past this indent are the tail.
	const stack = state.stack.filter((entry) => entry.indent < line.indent)
	const key = [...stack.map((entry) => entry.key), line.key].join('.')
	return {
		stack: [...stack, { indent: line.indent, key: line.key }],
		heads: [...state.heads, { position, line, key }],
	}
}

/**
 * Reads every key of a YAML body with its whole value.
 *
 * @param path - The file the body came from.
 * @param lines - The body lines.
 * @param offset - The line number of the first body line.
 * @returns A row per key, a nested key dotted under its parents and its value extended by the
 * list items and wrapped lines indented under it.
 */
export function readYamlKeys(
	path: string,
	lines: readonly string[],
	offset: number,
): readonly LineRow[] {
	const classified = classifyYamlLines(lines, offset)
	const { heads } = classified.reduce<YamlState>(
		(state, line, position) => stepYamlState(state, line, position),
		{ stack: [], heads: [] },
	)
	// A list item, a block scalar line, or a wrapped value extends the key line before it when it is
	// indented at least as far; between two key lines every classified line is a non-key line.
	return heads.map((head, rank) => ({
		path,
		line: head.line.line,
		text: [
			`${head.key}: ${head.line.value}`.trimEnd(),
			...classified
				.slice(head.position + 1, heads[rank + 1]?.position ?? classified.length)
				.filter((line) => line.indent >= head.line.indent)
				.map((line) => line.content.trim()),
		]
			.join(' ')
			.trimEnd(),
	}))
}

/**
 * Steps the TOML reader over one line.
 *
 * @param state - The reader's state before the line.
 * @param text - The line.
 * @param path - The file the line came from.
 * @param line - The line's number.
 * @returns The state after the line, with a row added for a key and the table set for a header.
 */
export function stepTomlState(
	state: TomlState,
	text: string,
	path: string,
	line: number,
): TomlState {
	if (state.fence !== undefined) {
		// The body of a multi-line string carries no key.
		return text.includes(state.fence) ? { ...state, fence: undefined } : state
	}
	const header = text.match(/^\s*\[\[?([^\]]+)\]\]?\s*$/u)
	if (header?.[1] !== undefined) return { ...state, table: header[1].trim() }
	const match = text.match(/^\s*([A-Za-z0-9_.-]+|"[^"]+")\s*=\s*(.*)$/u)
	if (match?.[1] === undefined) return state
	const value = (match[2] ?? '').trim()
	const opening = value.match(/^("""|''')/u)?.[1]
	return {
		table: state.table,
		fence: opening !== undefined && value.indexOf(opening, 3) === -1 ? opening : undefined,
		rows: [
			...state.rows,
			{
				path,
				line,
				text: `${state.table === '' ? '' : `${state.table}.`}${match[1]}: ${value}`.trimEnd(),
			},
		],
	}
}

/**
 * Reads every key of a TOML body with its value.
 *
 * @param path - The file the body came from.
 * @param lines - The body lines.
 * @param offset - The line number of the first body line.
 * @returns A row per key, a key under a table dotted beneath it; a multi-line string's body is no key.
 */
export function readTomlKeys(
	path: string,
	lines: readonly string[],
	offset: number,
): readonly LineRow[] {
	return lines.reduce<TomlState>(
		(state, text, index) => stepTomlState(state, text, path, index + offset),
		{ table: '', fence: undefined, rows: [] },
	).rows
}

/**
 * Maps the keys of Markdown frontmatter, TOML, and YAML files.
 *
 * @param paths - Files and directories; only Markdown, MDC, TOML, and YAML files are read.
 * @returns A row per key; a Markdown file without a closed frontmatter block gives none.
 */
export function mapFrontmatter(paths: readonly string[]): readonly LineRow[] {
	return expandPaths(paths)
		.filter((candidate) => /\.(md|mdc|toml|ya?ml)$/u.test(candidate))
		.flatMap((path) => {
			const lines = readLines(path)
			const markdown = /\.mdc?$/u.test(path)
			const end = markdown ? lines.indexOf('---', 1) : lines.length
			if (markdown && (lines[0] !== '---' || end === -1)) return []
			const body = lines.slice(markdown ? 1 : 0, end)
			const offset = markdown ? 2 : 1
			return path.endsWith('.toml')
				? readTomlKeys(path, body, offset)
				: readYamlKeys(path, body, offset)
		})
}

/**
 * Reads the heading texts of a Markdown file.
 *
 * @param path - The Markdown file.
 * @returns Each heading's text without its marker, lowercased.
 */
export function readHeadingTexts(path: string): ReadonlySet<string> {
	return new Set(mapHeadings([path]).map((row) => row.text.replace(/^#+\s+/u, '').toLowerCase()))
}

/**
 * Maps the `§ Heading` references whose heading their target does not carry.
 *
 * @param paths - Files and directories; only Markdown files are read.
 * @returns A row per unresolved reference. A reference with no backticked path before it targets
 * the file that carries it, and a reference whose target file is absent is unresolved.
 */
export function mapAnchors(paths: readonly string[]): readonly AnchorRow[] {
	const citations = expandPaths(paths)
		.filter((candidate) => candidate.endsWith('.md'))
		.flatMap((path) =>
			readLines(path).flatMap((text, index) =>
				[...text.matchAll(ANCHOR)].flatMap((match) => {
					const target = match[1] === undefined ? path : normalizeSlashes(match[1])
					const heading = (match[2] ?? '').trim()
					return heading === '' ? [] : [{ path, line: index + 1, target, heading }]
				}),
			),
		)
	// Each existing target is read once, in the order its first citation names it.
	const headings = new Map(
		[...new Set(citations.map(({ target }) => target).filter((target) => existsSync(target)))].map(
			(target) => [target, readHeadingTexts(target)],
		),
	)
	return citations.filter(
		({ target, heading }) => headings.get(target)?.has(heading.toLowerCase()) !== true,
	)
}

/**
 * Renders a map as text.
 *
 * @param report - The map.
 * @returns One section per mode the map carries, each opened by a `##` heading, ending in a line feed.
 */
export function renderReport(report: Report): string {
	const { tree, headings, frontmatter, exports, census, refs, anchors } = report
	const lines = [
		...(tree === undefined
			? []
			: [
					'## Tree',
					...tree.map((row) => `${row.path}\t${row.lines} lines\t${row.bytes} bytes`),
					`total\t${tree.length} files\t${tree.reduce((sum, row) => sum + row.lines, 0)} lines`,
				]),
		...(headings === undefined
			? []
			: ['## Headings', ...headings.map((row) => `${row.path}:${row.line}\t${row.text}`)]),
		...(frontmatter === undefined
			? []
			: ['## Frontmatter', ...frontmatter.map((row) => `${row.path}:${row.line}\t${row.text}`)]),
		...(exports === undefined
			? []
			: [
					'## Exports (text reading)',
					...exports.map((row) => `${row.path}:${row.line}\t${row.text}`),
				]),
		...(census ?? []).flatMap((entry) => [
			`## Census: ${entry.term} (${entry.rows.length})`,
			...entry.rows.map((row) => `${row.path}:${row.line}\t${row.text}`),
		]),
		...(refs === undefined
			? []
			: [`## Refs (${refs.length})`, ...refs.map((row) => `${row.path}:${row.line}\t${row.text}`)]),
		...(anchors === undefined
			? []
			: [
					`## Unresolved anchors (${anchors.length})`,
					...anchors.map((row) => `${row.path}:${row.line}\t${row.target} § ${row.heading}`),
				]),
	]
	return `${lines.join('\n')}\n`
}

/**
 * Runs the script on its arguments.
 *
 * @param argv - The arguments after the script path.
 * @returns The exit code: 0 on success, 64 on usage.
 */
export function main(argv: readonly string[]): number {
	const unknown = readUnknownFlags(argv, FLAGS)
	const missing = readMissingFlags(argv, VALUE_FLAGS)
	if (unknown.length > 0 || missing.length > 0) {
		console.error(
			`map: ${[
				...(unknown.length > 0 ? [`${unknown.join(', ')} is not a flag this script reads`] : []),
				...(missing.length > 0 ? [`${missing.join(', ')} given with no value`] : []),
			].join('; ')}; ${USAGE}`,
		)
		return 64
	}
	const roots = (readOption(argv, '--paths') ?? '.').split(',')
	const ignoreCase = argv.includes('--ignore-case')
	const tree = readList(argv, '--tree')
	const headings = readList(argv, '--headings')
	const frontmatter = readList(argv, '--frontmatter')
	const exports = readList(argv, '--exports')
	const census = readList(argv, '--census')
	const refs = readOption(argv, '--refs')
	const anchors = readList(argv, '--anchors')
	if (
		tree.length +
			headings.length +
			frontmatter.length +
			exports.length +
			census.length +
			anchors.length ===
			0 &&
		refs === undefined
	) {
		console.error(USAGE)
		return 64
	}
	const report: Report = {
		...(tree.length > 0 ? { tree: mapTree(tree) } : {}),
		...(headings.length > 0 ? { headings: mapHeadings(headings) } : {}),
		...(frontmatter.length > 0 ? { frontmatter: mapFrontmatter(frontmatter) } : {}),
		...(exports.length > 0 ? { exports: mapExports(exports) } : {}),
		...(census.length > 0 ? { census: mapCensus(census, roots, ignoreCase) } : {}),
		...(refs === undefined ? {} : { refs: mapRefs(refs, roots) }),
		...(anchors.length > 0 ? { anchors: mapAnchors(anchors) } : {}),
	}
	const output = argv.includes('--json') ? `${JSON.stringify(report)}\n` : renderReport(report)
	const out = readOption(argv, '--out')
	if (out === undefined) process.stdout.write(output)
	else {
		mkdirSync(dirname(out), { recursive: true })
		writeFileSync(out, output)
		console.log(`map: wrote ${out}`)
	}
	return 0
}

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === import.meta.filename) {
	process.exitCode = main(process.argv.slice(2))
}
