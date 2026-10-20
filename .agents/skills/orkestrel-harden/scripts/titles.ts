// Run from the checkout root:
//   node .agents/skills/orkestrel-harden/scripts/titles.ts --base REV [--root DIR] [--json] [--out FILE]
// Compare exact decoded describe/it/test title counts in tests/**/*.test.ts against REV. Report
// deficits with their baseline files, or as moved when another tests/**/*.ts string literal holds
// the title. Confirm moved registrations by reading their holder. Decode quote and backslash
// escapes only. An each table whose arguments contain ) is not read.
// Print text by default or one JSON line with --json; --out writes .json or .txt independently.
// Exit 0 with no missing titles, 3 with missing titles, 2 on git or filesystem refusal, 64 on usage.
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, extname, join, relative, resolve } from 'node:path'
import {
	listFiles,
	normalizeSlashes,
	readMissingFlags,
	readOption,
} from '../../orkestrel-dispatch/scripts/helpers.ts'

interface Title {
	readonly file: string
	readonly title: string
}

interface Missing extends Title {
	readonly deficit: number
}

interface Moved extends Title {
	readonly holder: string
}

interface Report {
	readonly base: string
	readonly root: string
	readonly count: number
	readonly missing: readonly Missing[]
	readonly moved: readonly Moved[]
}

const TITLE_PATTERN =
	/^\s*(?:it|test|describe)(?:\.\w+)*(?:\([^)]*\))?\(\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"|`((?:[^`\\]|\\.)*)`)/gmu
const LITERAL_PATTERN =
	/\/\/[^\r\n]*|\/\*[\s\S]*?\*\/|'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"|`((?:[^`\\]|\\.)*)`/gu

function decodeTitle(match: RegExpMatchArray): string {
	return (match[1] ?? match[2] ?? match[3] ?? '').replace(/\\(['"`\\])/gu, '$1')
}

function readGit(root: string, args: readonly string[]): string {
	const result = spawnSync('git', ['-C', root, ...args], {
		encoding: 'utf8',
		windowsHide: true,
		maxBuffer: 256 * 1024 * 1024,
	})
	if (result.error !== undefined || result.status !== 0) {
		throw new Error(`git: ${result.error?.message ?? result.stderr.trim()}`)
	}
	return result.stdout
}

function readReport(base: string, root: string): Report {
	const baseline = readGit(root, ['ls-tree', '-r', '-z', '--name-only', base, '--', 'tests'])
		.split('\0')
		.filter((file) => file.endsWith('.test.ts'))
		.flatMap((file) =>
			Array.from(readGit(root, ['show', `${base}:${file}`]).matchAll(TITLE_PATTERN), (match) => ({
				file,
				title: decodeTitle(match),
			})),
		)
	const directory = join(root, 'tests')
	const files = (existsSync(directory) ? listFiles(directory) : [])
		.filter(({ path }) => path.endsWith('.ts'))
		.map(({ path }) => ({
			file: normalizeSlashes(relative(root, path)),
			text: readFileSync(path, 'utf8'),
		}))
		.sort((left, right) => left.file.localeCompare(right.file))
	const titles = files
		.filter(({ file }) => file.endsWith('.test.ts'))
		.flatMap(({ text }) => Array.from(text.matchAll(TITLE_PATTERN), decodeTitle))
	// A surviving registration supplies its title count, never evidence that a lost duplicate moved.
	const holders = files.flatMap(({ file, text }) =>
		Array.from(
			(file.endsWith('.test.ts')
				? text.replace(
						TITLE_PATTERN,
						(
							match: string,
							single: string | undefined,
							double: string | undefined,
							template: string | undefined,
						) => match.slice(0, -((single ?? double ?? template ?? '').length + 2)),
					)
				: text
			).matchAll(LITERAL_PATTERN),
		)
			.filter((match) => match[1] !== undefined || match[2] !== undefined || match[3] !== undefined)
			.map((match) => ({ file, title: decodeTitle(match) })),
	)
	const deficits = [...Map.groupBy(baseline, ({ title }) => title)].flatMap(([title, entries]) => {
		const count = titles.filter((candidate) => candidate === title).length
		return [...Map.groupBy(entries.slice(count), ({ file }) => file)].map(([file, lost]) => ({
			file,
			title,
			deficit: lost.length,
		}))
	})
	const classified = deficits.map((entry) => ({
		entry,
		holder: holders.find(({ title }) => title === entry.title)?.file,
	}))
	return {
		base,
		root: normalizeSlashes(root),
		count: baseline.length,
		missing: classified.flatMap(({ entry, holder }) => (holder === undefined ? [entry] : [])),
		moved: classified.flatMap(({ entry, holder }) =>
			holder === undefined ? [] : [{ file: entry.file, title: entry.title, holder }],
		),
	}
}

function renderReport(report: Report): string {
	return [
		`titles: ${report.count} baseline title(s) at ${report.base}, ${report.missing.length} missing, ${report.moved.length} moved`,
		...report.missing.map(({ file, title, deficit }) => `missing\t${file}\t${title}\t${deficit}`),
		...report.moved.map(({ file, title, holder }) => `moved\t${file}\t${title}\t${holder}`),
	].join('\n')
}

function main(argv: readonly string[]): number {
	const missing = readMissingFlags(argv, ['--base', '--root', '--out'])
	if (missing.length > 0) {
		console.error(`titles: ${missing.join(', ')} given with no value`)
		return 64
	}
	const base = readOption(argv, '--base')
	const out = readOption(argv, '--out')
	if (base === undefined || (out !== undefined && !['.json', '.txt'].includes(extname(out)))) {
		console.error('usage: titles.ts --base REV [--root DIR] [--json] [--out FILE.json|FILE.txt]')
		return 64
	}
	try {
		const report = readReport(base, resolve(readOption(argv, '--root') ?? process.cwd()))
		const json = JSON.stringify(report)
		const text = renderReport(report)
		if (out !== undefined) {
			const target = resolve(out)
			mkdirSync(dirname(target), { recursive: true })
			writeFileSync(target, `${extname(target) === '.json' ? json : text}\n`)
		}
		console.log(argv.includes('--json') ? json : text)
		return report.missing.length > 0 ? 3 : 0
	} catch (error) {
		console.error(`titles: ${error instanceof Error ? error.message : String(error)}`)
		return 2
	}
}

process.exitCode = main(process.argv.slice(2))
