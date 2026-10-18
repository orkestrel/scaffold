// Map terrain before a brief, an absorption lane, or a rename. Run from the checkout root:
//   node .agents/skills/orkestrel-scout/scripts/map.ts --tree PATH... [--headings PATH...] [--frontmatter PATH...] [--exports PATH...] [--census TERM...] [--refs PATH] [--anchors PATH...] [--paths a,b] [--ignore-case] [--json] [--out FILE]
// --tree lists every file under each path with its line count and size. --headings lists every
// Markdown heading with its line. --frontmatter lists every key of a Markdown frontmatter block, a
// TOML file, or a YAML file with its whole value, a nested key dotted under its parents
// (`interface.default_prompt`) and a TOML key under its table. --exports lists every `export`
// declaration line in a TypeScript file (a text reading, not the compiler's). --census lists every line carrying a term. --refs lists
// every line naming a path or its basename. --anchors lists every `§ Heading` reference whose
// heading the named file, or the same file, does not carry. Walks skip node_modules, .git, dist,
// tmp, .orkestrel, .idea, and host.json; --paths narrows a census or refs walk. Modes combine, each
// printing its section; --json prints one object; --out writes the output to FILE instead of the
// terminal. Give each flag once; a later duplicate is not read. A value that opens with `--` is a
// missing value, so census a custom property without its leading dashes. Exit 0, or 64 when no
// mode is given or a flag is given with no value.
import { existsSync, readFileSync, statSync, mkdirSync, writeFileSync } from 'node:fs'
import { basename, dirname } from 'node:path'
import {
	listFiles,
	normalizeSlashes,
	readList,
	readMissingFlags,
	readOption,
} from '../../orkestrel-dispatch/scripts/helpers.ts'

const EXPORT =
	/^export\s+(?:default\s+)?(?:async\s+)?(?:abstract\s+)?(function\*?|const|let|class|interface|type|enum|namespace)\s+([A-Za-z_$][\w$]*)/u
const HEADING = /^(#{1,6})\s+(.+?)\s*#*\s*$/u
const ANCHOR =
	/(?:`([^`\n]+\.md)`\s*)?§\s*"?([^"`\n|;,.)]+?)"?(?=\s*(?:[,.;)|]|\s(?:and|or|names|fixes|owns|states|binds|governs|decides|before|after)\b|$))/gu
const BINARY = /\.(png|jpg|jpeg|gif|webp|ico|woff2?|ttf|otf|eot|zip|tgz|gz|pdf|wasm)$/u

interface TreeRow {
	readonly path: string
	readonly lines: number
	readonly bytes: number
}

interface LineRow {
	readonly path: string
	readonly line: number
	readonly text: string
}

interface TermRows {
	readonly term: string
	readonly rows: readonly LineRow[]
}

interface AnchorRow {
	readonly path: string
	readonly line: number
	readonly target: string
	readonly heading: string
}

interface TomlState {
	readonly table: string
	readonly fence: string | undefined
	readonly rows: readonly LineRow[]
}

interface YamlLine {
	readonly line: number
	readonly indent: number
	readonly content: string
	readonly key: string | undefined
	readonly value: string
}

interface YamlHead {
	readonly position: number
	readonly line: YamlLine
	readonly key: string
}

interface YamlState {
	readonly stack: ReadonlyArray<{ readonly indent: number; readonly key: string }>
	readonly heads: readonly YamlHead[]
}

interface Report {
	readonly tree?: readonly TreeRow[]
	readonly headings?: readonly LineRow[]
	readonly frontmatter?: readonly LineRow[]
	readonly exports?: readonly LineRow[]
	readonly census?: readonly TermRows[]
	readonly refs?: readonly LineRow[]
	readonly anchors?: readonly AnchorRow[]
}

function isText(path: string): boolean {
	return !BINARY.test(path) && basename(path) !== 'host.json'
}

function expandPaths(paths: readonly string[]): readonly string[] {
	return paths.flatMap((path) => {
		if (!existsSync(path)) return []
		if (statSync(path).isDirectory()) return listFiles(path).map((file) => file.path)
		return [normalizeSlashes(path)]
	})
}

function readLines(path: string): readonly string[] {
	return readFileSync(path, 'utf8').split(/\r\n|\n/)
}

function mapTree(paths: readonly string[]): readonly TreeRow[] {
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

function scanFences(lines: readonly string[]): readonly boolean[] {
	const fenced: boolean[] = []
	for (const text of lines) fenced.push((fenced.at(-1) ?? false) !== text.startsWith('```'))
	return fenced
}

function mapHeadings(paths: readonly string[]): readonly LineRow[] {
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

function mapExports(paths: readonly string[]): readonly LineRow[] {
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

function buildMatcher(term: string, ignoreCase: boolean): (text: string) => boolean {
	const needle = ignoreCase ? term.toLowerCase() : term
	return (text) => (ignoreCase ? text.toLowerCase() : text).includes(needle)
}

function mapCensus(
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

function mapRefs(target: string, roots: readonly string[]): readonly LineRow[] {
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

function classifyYamlLines(lines: readonly string[], offset: number): readonly YamlLine[] {
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

function stepYamlState(state: YamlState, line: YamlLine, position: number): YamlState {
	if (line.key === undefined) return state
	// Indents strictly increase along the stack, so the entries at or past this indent are the tail.
	const stack = state.stack.filter((entry) => entry.indent < line.indent)
	const key = [...stack.map((entry) => entry.key), line.key].join('.')
	return {
		stack: [...stack, { indent: line.indent, key: line.key }],
		heads: [...state.heads, { position, line, key }],
	}
}

function readYamlKeys(path: string, lines: readonly string[], offset: number): readonly LineRow[] {
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

function stepTomlState(state: TomlState, text: string, path: string, line: number): TomlState {
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

function readTomlKeys(path: string, lines: readonly string[], offset: number): readonly LineRow[] {
	return lines.reduce<TomlState>(
		(state, text, index) => stepTomlState(state, text, path, index + offset),
		{ table: '', fence: undefined, rows: [] },
	).rows
}

function mapFrontmatter(paths: readonly string[]): readonly LineRow[] {
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

function readHeadingTexts(path: string): ReadonlySet<string> {
	return new Set(mapHeadings([path]).map((row) => row.text.replace(/^#+\s+/u, '').toLowerCase()))
}

function mapAnchors(paths: readonly string[]): readonly AnchorRow[] {
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

function renderReport(report: Report): string {
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

function main(argv: readonly string[]): number {
	const missing = readMissingFlags(argv, [
		'--tree',
		'--headings',
		'--frontmatter',
		'--exports',
		'--census',
		'--refs',
		'--anchors',
		'--paths',
		'--out',
	])
	if (missing.length > 0) {
		console.error(`map: ${missing.join(', ')} given with no value`)
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
		console.error(
			'usage: map.ts [--tree PATH...] [--headings PATH...] [--frontmatter PATH...] [--exports PATH...] [--census TERM...] [--refs PATH] [--anchors PATH...] [--paths a,b] [--ignore-case] [--json] [--out FILE]',
		)
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

process.exitCode = main(process.argv.slice(2))
