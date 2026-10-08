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

function mapHeadings(paths: readonly string[]): readonly LineRow[] {
	const rows: LineRow[] = []
	for (const path of expandPaths(paths).filter((candidate) => candidate.endsWith('.md'))) {
		let fenced = false
		readLines(path).forEach((text, index) => {
			if (text.startsWith('```')) fenced = !fenced
			if (fenced) return
			const match = text.match(HEADING)
			if (match?.[1] !== undefined && match[2] !== undefined) {
				rows.push({ path, line: index + 1, text: `${match[1]} ${match[2]}` })
			}
		})
	}
	return rows
}

function mapExports(paths: readonly string[]): readonly LineRow[] {
	const rows: LineRow[] = []
	for (const path of expandPaths(paths).filter((candidate) => /\.[cm]?ts$/u.test(candidate))) {
		readLines(path).forEach((text, index) => {
			const match = text.match(EXPORT)
			if (match?.[1] !== undefined && match[2] !== undefined) {
				rows.push({ path, line: index + 1, text: `${match[1]} ${match[2]}` })
			} else if (/^export\s+\*\s+from\s+/u.test(text)) {
				rows.push({ path, line: index + 1, text: text.trim() })
			}
		})
	}
	return rows
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
		const rows: LineRow[] = []
		for (const path of files) {
			readLines(path).forEach((text, index) => {
				if (matches(text)) rows.push({ path, line: index + 1, text: text.trim().slice(0, 160) })
			})
		}
		return { term, rows }
	})
}

function mapRefs(target: string, roots: readonly string[]): readonly LineRow[] {
	const needle = normalizeSlashes(target)
	const name = basename(needle)
	const rows: LineRow[] = []
	for (const path of expandPaths(roots).filter(isText)) {
		if (path === needle) continue
		readLines(path).forEach((text, index) => {
			if (text.includes(needle) || text.includes(name)) {
				rows.push({ path, line: index + 1, text: text.trim().slice(0, 160) })
			}
		})
	}
	return rows
}

function readYamlKeys(path: string, lines: readonly string[], offset: number): readonly LineRow[] {
	const rows: LineRow[] = []
	const stack: Array<{ readonly indent: number; readonly key: string }> = []
	lines.forEach((text, index) => {
		const content = text.trimStart()
		if (content === '' || content.startsWith('#')) return
		const indent = text.length - content.length
		const match = content.match(/^([A-Za-z_][\w-]*)\s*:(?:\s+(.*))?$/u)
		if (match?.[1] === undefined) {
			// A list item, a block scalar line, or a wrapped value extends the key before it.
			const last = rows.at(-1)
			if (last !== undefined && indent >= (stack.at(-1)?.indent ?? 0)) {
				rows[rows.length - 1] = { ...last, text: `${last.text} ${content.trim()}`.trimEnd() }
			}
			return
		}
		while (stack.length > 0 && (stack.at(-1)?.indent ?? 0) >= indent) stack.pop()
		const key = [...stack.map((entry) => entry.key), match[1]].join('.')
		stack.push({ indent, key: match[1] })
		rows.push({ path, line: index + offset, text: `${key}: ${(match[2] ?? '').trim()}`.trimEnd() })
	})
	return rows
}

function readTomlKeys(path: string, lines: readonly string[], offset: number): readonly LineRow[] {
	const rows: LineRow[] = []
	let table = ''
	let fence: string | undefined
	lines.forEach((text, index) => {
		if (fence !== undefined) {
			// The body of a multi-line string carries no key.
			if (text.includes(fence)) fence = undefined
			return
		}
		const header = text.match(/^\s*\[\[?([^\]]+)\]\]?\s*$/u)
		if (header?.[1] !== undefined) {
			table = header[1].trim()
			return
		}
		const match = text.match(/^\s*([A-Za-z0-9_.-]+|"[^"]+")\s*=\s*(.*)$/u)
		if (match?.[1] === undefined) return
		const value = (match[2] ?? '').trim()
		const opening = value.match(/^("""|''')/u)?.[1]
		if (opening !== undefined && value.indexOf(opening, 3) === -1) fence = opening
		rows.push({
			path,
			line: index + offset,
			text: `${table === '' ? '' : `${table}.`}${match[1]}: ${value}`.trimEnd(),
		})
	})
	return rows
}

function mapFrontmatter(paths: readonly string[]): readonly LineRow[] {
	const rows: LineRow[] = []
	for (const path of expandPaths(paths).filter((candidate) =>
		/\.(md|mdc|toml|ya?ml)$/u.test(candidate),
	)) {
		const lines = readLines(path)
		const markdown = /\.mdc?$/u.test(path)
		const end = markdown ? lines.indexOf('---', 1) : lines.length
		if (markdown && (lines[0] !== '---' || end === -1)) continue
		const body = lines.slice(markdown ? 1 : 0, end)
		const offset = markdown ? 2 : 1
		rows.push(
			...(path.endsWith('.toml')
				? readTomlKeys(path, body, offset)
				: readYamlKeys(path, body, offset)),
		)
	}
	return rows
}

function readHeadingTexts(path: string): ReadonlySet<string> {
	return new Set(mapHeadings([path]).map((row) => row.text.replace(/^#+\s+/u, '').toLowerCase()))
}

function mapAnchors(paths: readonly string[]): readonly AnchorRow[] {
	const headings = new Map<string, ReadonlySet<string>>()
	const rows: AnchorRow[] = []
	for (const path of expandPaths(paths).filter((candidate) => candidate.endsWith('.md'))) {
		readLines(path).forEach((text, index) => {
			for (const match of text.matchAll(ANCHOR)) {
				const target = match[1] === undefined ? path : normalizeSlashes(match[1])
				const heading = (match[2] ?? '').trim()
				if (heading === '') continue
				if (!existsSync(target)) {
					rows.push({ path, line: index + 1, target, heading })
					continue
				}
				const known = headings.get(target) ?? readHeadingTexts(target)
				headings.set(target, known)
				if (!known.has(heading.toLowerCase())) rows.push({ path, line: index + 1, target, heading })
			}
		})
	}
	return rows
}

function renderReport(report: Report): string {
	const lines: string[] = []
	if (report.tree !== undefined) {
		lines.push('## Tree')
		for (const row of report.tree) lines.push(`${row.path}\t${row.lines} lines\t${row.bytes} bytes`)
		lines.push(
			`total\t${report.tree.length} files\t${report.tree.reduce((sum, row) => sum + row.lines, 0)} lines`,
		)
	}
	if (report.headings !== undefined) {
		lines.push('## Headings')
		for (const row of report.headings) lines.push(`${row.path}:${row.line}\t${row.text}`)
	}
	if (report.frontmatter !== undefined) {
		lines.push('## Frontmatter')
		for (const row of report.frontmatter) lines.push(`${row.path}:${row.line}	${row.text}`)
	}
	if (report.exports !== undefined) {
		lines.push('## Exports (text reading)')
		for (const row of report.exports) lines.push(`${row.path}:${row.line}\t${row.text}`)
	}
	if (report.census !== undefined) {
		for (const entry of report.census) {
			lines.push(`## Census: ${entry.term} (${entry.rows.length})`)
			for (const row of entry.rows) lines.push(`${row.path}:${row.line}\t${row.text}`)
		}
	}
	if (report.refs !== undefined) {
		lines.push(`## Refs (${report.refs.length})`)
		for (const row of report.refs) lines.push(`${row.path}:${row.line}\t${row.text}`)
	}
	if (report.anchors !== undefined) {
		lines.push(`## Unresolved anchors (${report.anchors.length})`)
		for (const row of report.anchors)
			lines.push(`${row.path}:${row.line}\t${row.target} § ${row.heading}`)
	}
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
