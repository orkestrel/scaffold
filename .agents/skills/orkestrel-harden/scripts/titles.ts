// Run from the checkout root:
//   node .agents/skills/orkestrel-harden/scripts/titles.ts --base REV [--root DIR] [--json] [--out FILE]
// Compare exact decoded describe/it/test title counts in tests/**/*.test.ts against REV. Report
// deficits with their baseline files, or as moved when another tests/**/*.ts string literal holds
// the title. Confirm moved registrations by reading their holder. Decode quote and backslash
// escapes only. An each table whose arguments contain ) is not read.
// Print text by default or one JSON line with --json; --out writes .json or .txt independently.
// Compare interpolated templates by full raw spelling. Refuse unclosed lexical tokens.
// Exit 0 with no missing titles, 3 with missing titles, 2 on git, filesystem or token refusal, 64 on usage.
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

interface Token {
	readonly category: 'code' | 'line' | 'block' | 'string' | 'template' | 'regex'
	readonly start: number
	readonly end: number
	readonly children: readonly Token[]
	readonly prefix?: boolean
}

const TITLE_PATTERN = /^\s*(?:it|test|describe)(?:\.\w+)*(?:\([^)]*\))?\(\s*\0/gmu
const REGEX_PREFIX =
	/^(?:return|throw|case|delete|void|typeof|instanceof|in|of|yield|await|else|do)$/u

function decodeTitle(text: string, token: Token): string {
	const raw = text.slice(token.start + 1, token.end - 1)
	return token.category === 'template' && token.children.length > 0
		? raw
		: raw.replace(/\\(['"`\\])/gu, '$1')
}

class TokenScanner {
	readonly #text: string
	readonly #file: string
	readonly #parentheses: boolean[] = []
	#position = 0

	constructor(text: string, file: string) {
		this.#text = text
		this.#file = file
	}

	scan(): readonly Token[] {
		return this.#readCode(false, 0)
	}

	#readCode(expression: boolean, depth: number): readonly Token[] {
		if (depth > 256) throw new Error(`${this.#file}: token nesting exceeds 256`)
		const tokens: Token[] = []
		while (this.#position < this.#text.length) {
			const start = this.#position
			const rest = this.#text.slice(start)
			const character = this.#text[start]
			if (character === '}' && expression) {
				this.#position += 1
				return tokens
			}
			if (character === '{') {
				this.#position += 1
				tokens.push({ category: 'code', start, end: this.#position, children: [] })
				tokens.push(...this.#readCode(true, depth + 1))
				tokens.push({
					category: 'code',
					start: this.#position - 1,
					end: this.#position,
					children: [],
				})
				continue
			}
			if (character === '`') {
				tokens.push(this.#readTemplate(depth + 1))
				continue
			}
			const previous = tokens.findLast(
				(token) =>
					token.category !== 'line' &&
					token.category !== 'block' &&
					this.#text.slice(token.start, token.end).trim().length > 0,
			)
			const spelling = previous === undefined ? '' : this.#text.slice(previous.start, previous.end)
			const regex =
				character === '/' &&
				!rest.startsWith('//') &&
				!rest.startsWith('/*') &&
				(previous === undefined ||
					previous.prefix === true ||
					(previous.category === 'code' &&
						(REGEX_PREFIX.test(spelling) ||
							!/^(?:[\p{ID_Continue}$]+|[\])}]|\+\+|--)$/u.test(spelling))))
			const category = rest.startsWith('//')
				? 'line'
				: rest.startsWith('/*')
					? 'block'
					: character === "'" || character === '"'
						? 'string'
						: regex
							? 'regex'
							: 'code'
			const match =
				category === 'line'
					? /^\/\/[^\r\n]*/u.exec(rest)
					: category === 'block'
						? /^\/\*[\s\S]*?\*\//u.exec(rest)
						: category === 'string'
							? (character === "'"
									? /^'(?:\\[\s\S]|[^'\\\r\n])*'/u
									: /^"(?:\\[\s\S]|[^"\\\r\n])*"/u
								).exec(rest)
							: category === 'regex'
								? /^\/(?:\\[^\r\n]|\[(?:\\[^\r\n]|[^\]\\\r\n])*\]|[^/\\[\r\n])*\/[a-z]*/iu.exec(
										rest,
									)
								: /^(?:[\p{ID_Start}_$][\p{ID_Continue}$]*|\d[\w.]*|\s+|\+\+|--|=>|.)/u.exec(rest)
			if (match === null) throw new Error(`${this.#file}:${start}: Unclosed ${category} token`)
			this.#position += match[0].length
			if (category === 'code' && character === '(') {
				this.#parentheses.push(/^(?:if|while|for|with|switch|catch)$/u.test(spelling))
			}
			const prefix = category === 'code' && character === ')' ? this.#parentheses.pop() : undefined
			tokens.push({ category, start, end: this.#position, children: [], prefix: prefix === true })
		}
		if (expression)
			throw new Error(`${this.#file}:${this.#position}: Unclosed template expression or brace`)
		return tokens
	}

	#readTemplate(depth: number): Token {
		const start = this.#position
		const children: Token[] = []
		this.#position += 1
		while (this.#position < this.#text.length) {
			if (this.#text[this.#position] === '\\') {
				this.#position += 2
			} else if (this.#text[this.#position] === '`') {
				this.#position += 1
				return { category: 'template', start, end: this.#position, children }
			} else if (this.#text.startsWith('${', this.#position)) {
				const opening = this.#position
				this.#position += 2
				const expression = this.#readCode(true, depth)
				children.push({
					category: 'code',
					start: opening,
					end: this.#position,
					children: expression,
				})
			} else {
				this.#position += 1
			}
		}
		throw new Error(`${this.#file}:${start}: Unclosed template token`)
	}
}

function readRegistrations(text: string, tokens: readonly Token[]): readonly Token[] {
	const code = tokens
		.map((token) => {
			const raw = text.slice(token.start, token.end)
			if (token.category === 'code') return raw
			const blank = raw
				.split('')
				.map((character) => (/[\r\n]/u.test(character) ? character : ' '))
				.join('')
			return token.category === 'string' || token.category === 'template'
				? `\0${blank.slice(1)}`
				: blank
		})
		.join('')
	const offset = tokens[0]?.start ?? 0
	const starts = new Set(
		Array.from(code.matchAll(TITLE_PATTERN), (match) => offset + match.index + match[0].length - 1),
	)
	return [
		...tokens.filter((token) => starts.has(token.start)),
		...tokens.flatMap((token) => readRegistrations(text, token.children)),
	]
}

function collectLiterals(tokens: readonly Token[]): readonly Token[] {
	return tokens.flatMap((token) => [
		...(token.category === 'string' || token.category === 'template' ? [token] : []),
		...collectLiterals(token.children),
	])
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
		.flatMap((file) => {
			const text = readGit(root, ['show', `${base}:${file}`])
			return readRegistrations(text, new TokenScanner(text, `${base}:${file}`).scan()).map(
				(token) => ({
					file,
					title: decodeTitle(text, token),
				}),
			)
		})
	const directory = join(root, 'tests')
	const files = (existsSync(directory) ? listFiles(directory) : [])
		.filter(({ path }) => path.endsWith('.ts'))
		.map(({ path }) => {
			const file = normalizeSlashes(relative(root, path))
			const text = readFileSync(path, 'utf8')
			const tokens = new TokenScanner(text, file).scan()
			return {
				file,
				text,
				tokens,
				registrations: file.endsWith('.test.ts') ? readRegistrations(text, tokens) : [],
			}
		})
		.sort((left, right) => left.file.localeCompare(right.file))
	const titles = files
		.filter(({ file }) => file.endsWith('.test.ts'))
		.flatMap(({ file, text, registrations }) =>
			registrations.map((token) => ({ file, title: decodeTitle(text, token) })),
		)
	// A surviving registration supplies its title count, never evidence that a lost duplicate moved.
	const holders = files.flatMap(({ file, text, tokens, registrations }) =>
		collectLiterals(tokens)
			.filter((token) => !registrations.includes(token))
			.map((token) => ({ file, title: decodeTitle(text, token) })),
	)
	const deficits = [...Map.groupBy(baseline, ({ title }) => title)].flatMap(([title, entries]) => {
		const survivors = titles.filter((candidate) => candidate.title === title)
		const unmatched = [...Map.groupBy(entries, ({ file }) => file)].flatMap(([file, local]) =>
			local.slice(survivors.filter((candidate) => candidate.file === file).length),
		)
		const surplus = [...Map.groupBy(survivors, ({ file }) => file)].flatMap(([file, local]) =>
			local.slice(entries.filter((candidate) => candidate.file === file).length),
		)
		return [...Map.groupBy(unmatched.slice(surplus.length), ({ file }) => file)].map(
			([file, lost]) => ({
				file,
				title,
				deficit: lost.length,
			}),
		)
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
