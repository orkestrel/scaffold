// Check that every `file:line` citation in a report, verdict, or distillate resolves. Run from the
// checkout root:
//   node .agents/skills/orkestrel-dispatch/scripts/cite.ts PATH [--root DIR] [--json]
// A citation resolves when its path exists under the root (a path relative to the root resolves
// first, and a backslash reads as a slash) and the line is within the file, where a trailing line
// break ends the last line. A citation naming a bare filename that no root-relative
// file matches resolves when exactly one file under the root carries that name, outside
// node_modules, dist, tmp, .git, .orkestrel, and .idea. The summary lists every citation that does
// not resolve, with the reason. Exit 0 when all resolve, 3 when any does not, 64 on usage.
import { existsSync, readFileSync, statSync } from 'node:fs'
import { basename, relative, resolve } from 'node:path'
import { listFiles, normalizeSlashes, readMissingFlags, readOption } from './helpers.ts'

const CITATION =
	/(?<![\w/\\.-])((?:\.{1,2}[/\\])?\.?[A-Za-z0-9_@][A-Za-z0-9_./\\@-]*\.[a-z]{1,5}):(\d+)(?:[-–](\d+))?(?![\w:])/gu

interface Unresolved {
	readonly citation: string
	readonly reason: string
}

interface Resolution {
	readonly path: string | undefined
	readonly reason: string | undefined
}

function indexBasenames(root: string): ReadonlyMap<string, readonly string[]> {
	const index = new Map<string, string[]>()
	for (const file of listFiles(root)) {
		const name = basename(file.path)
		const paths = index.get(name) ?? []
		paths.push(normalizeSlashes(relative(root, file.path)))
		index.set(name, paths)
	}
	return index
}

function countLines(path: string): number {
	const text = readFileSync(path, 'utf8')
	if (text === '') return 0
	const lines = text.split(/\r\n|\n/)
	// A trailing line break ends the last line rather than opening a phantom one.
	return lines.at(-1) === '' ? lines.length - 1 : lines.length
}

function resolveFile(
	root: string,
	file: string,
	index: () => ReadonlyMap<string, readonly string[]>,
): Resolution {
	const direct = resolve(root, normalizeSlashes(file))
	if (existsSync(direct) && statSync(direct).isFile()) return { path: direct, reason: undefined }
	if (/[/\\]/u.test(file)) return { path: undefined, reason: 'file does not exist' }
	const candidates = index().get(basename(file)) ?? []
	const only = candidates.length === 1 ? candidates[0] : undefined
	if (only !== undefined) return { path: resolve(root, only), reason: undefined }
	if (candidates.length === 0) return { path: undefined, reason: 'file does not exist' }
	return { path: undefined, reason: `ambiguous basename: ${candidates.join(', ')}` }
}

function judgeLines(
	path: string,
	line: number,
	end: number | undefined,
	counts: Map<string, number>,
): string | undefined {
	const total = counts.get(path) ?? countLines(path)
	counts.set(path, total)
	if (line < 1 || line > total) return `line ${line} is outside 1-${total}`
	if (end !== undefined && (end < line || end > total))
		return `range end ${end} is outside ${line}-${total}`
	return undefined
}

function main(argv: readonly string[]): number {
	const missing = readMissingFlags(argv, ['--root'])
	if (missing.length > 0) {
		console.error(`cite: ${missing.join(', ')} given with no value`)
		return 64
	}
	const root = readOption(argv, '--root') ?? process.cwd()
	const path = argv.find(
		(argument, position) => !argument.startsWith('--') && argv[position - 1] !== '--root',
	)
	if (path === undefined || !existsSync(path)) {
		console.error('usage: cite.ts PATH [--root DIR] [--json]')
		return 64
	}
	let index: ReadonlyMap<string, readonly string[]> | undefined
	const counts = new Map<string, number>()
	const unresolved: Unresolved[] = []
	let citations = 0
	for (const match of readFileSync(path, 'utf8').matchAll(CITATION)) {
		const file = match[1]
		const line = Number(match[2])
		const end = match[3] === undefined ? undefined : Number(match[3])
		if (file === undefined) continue
		citations += 1
		const resolved = resolveFile(root, file, () => (index ??= indexBasenames(root)))
		const reason =
			resolved.path === undefined
				? (resolved.reason ?? 'file does not exist')
				: judgeLines(resolved.path, line, end, counts)
		if (reason !== undefined) unresolved.push({ citation: match[0], reason })
	}
	if (argv.includes('--json')) {
		console.log(JSON.stringify({ path, root, citations, unresolved }))
	} else {
		console.log(`cite: ${citations} citation(s) in ${path}, ${unresolved.length} unresolved`)
		for (const entry of unresolved) console.log(`cite: ${entry.citation} — ${entry.reason}`)
	}
	return unresolved.length === 0 ? 0 : 3
}

process.exitCode = main(process.argv.slice(2))
