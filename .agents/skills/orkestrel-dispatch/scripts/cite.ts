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

interface Citation {
	readonly citation: string
	readonly file: string
	readonly line: number
	readonly end: number | undefined
}

function indexBasenames(root: string): ReadonlyMap<string, readonly string[]> {
	return new Map(
		[...Map.groupBy(listFiles(root), (file) => basename(file.path))].map(([name, files]) => [
			name,
			files.map((file) => normalizeSlashes(relative(root, file.path))),
		]),
	)
}

function countLines(path: string): number {
	const text = readFileSync(path, 'utf8')
	if (text === '') return 0
	const lines = text.split(/\r\n|\n/)
	// A trailing line break ends the last line rather than opening a phantom one.
	return lines.at(-1) === '' ? lines.length - 1 : lines.length
}

function resolveDirect(root: string, file: string): string | undefined {
	const direct = resolve(root, normalizeSlashes(file))
	return existsSync(direct) && statSync(direct).isFile() ? direct : undefined
}

// A bare filename that no root-relative file matches is the one citation the basename index serves.
function needsIndex(root: string, file: string): boolean {
	return resolveDirect(root, file) === undefined && !/[/\\]/u.test(file)
}

function resolveFile(
	root: string,
	file: string,
	index: ReadonlyMap<string, readonly string[]> | undefined,
): Resolution {
	const direct = resolveDirect(root, file)
	if (direct !== undefined) return { path: direct, reason: undefined }
	if (/[/\\]/u.test(file)) return { path: undefined, reason: 'file does not exist' }
	const candidates = index?.get(basename(file)) ?? []
	const only = candidates.length === 1 ? candidates[0] : undefined
	if (only !== undefined) return { path: resolve(root, only), reason: undefined }
	if (candidates.length === 0) return { path: undefined, reason: 'file does not exist' }
	return { path: undefined, reason: `ambiguous basename: ${candidates.join(', ')}` }
}

function judgeLines(
	path: string,
	line: number,
	end: number | undefined,
	counts: ReadonlyMap<string, number>,
): string | undefined {
	const total = counts.get(path) ?? countLines(path)
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
	const named = [...readFileSync(path, 'utf8').matchAll(CITATION)].flatMap((match): Citation[] =>
		match[1] === undefined
			? []
			: [
					{
						citation: match[0],
						file: match[1],
						line: Number(match[2]),
						end: match[3] === undefined ? undefined : Number(match[3]),
					},
				],
	)
	const citations = named.length
	// The basename index walks the root, so it is built once and only when a citation needs it.
	const index = named.some(({ file }) => needsIndex(root, file)) ? indexBasenames(root) : undefined
	const resolutions = named.map((entry) => ({
		entry,
		resolved: resolveFile(root, entry.file, index),
	}))
	// Each resolved file is counted once, however many citations name it.
	const counts = new Map(
		[...new Set(resolutions.flatMap(({ resolved }) => resolved.path ?? []))].map((file) => [
			file,
			countLines(file),
		]),
	)
	const unresolved = resolutions.flatMap(({ entry, resolved }): Unresolved[] => {
		const reason =
			resolved.path === undefined
				? (resolved.reason ?? 'file does not exist')
				: judgeLines(resolved.path, entry.line, entry.end, counts)
		return reason === undefined ? [] : [{ citation: entry.citation, reason }]
	})
	if (argv.includes('--json')) {
		console.log(JSON.stringify({ path, root, citations, unresolved }))
	} else {
		console.log(`cite: ${citations} citation(s) in ${path}, ${unresolved.length} unresolved`)
		for (const entry of unresolved) console.log(`cite: ${entry.citation} — ${entry.reason}`)
	}
	return unresolved.length === 0 ? 0 : 3
}

process.exitCode = main(process.argv.slice(2))
