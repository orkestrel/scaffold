// Run from the checkout root:
//   node .agents/skills/orkestrel-harden/scripts/titles.ts --base REV [--root DIR] [--json] [--out FILE]
// Each value is a separate argument: `--flag=value` and any flag the script does not read exit 64,
// and so does a REV that opens with `-`. The baseline is read from the tree REV names, resolved
// once with `--end-of-options`, with paths relative to --root, so a --root below the repository top
// works.
// Compare exact decoded describe/it/test/suite title counts in tests/**/*.test.ts against REV. A
// baseline title with a deficit is moved when another tests/**/*.ts string literal spells it, and
// missing otherwise. A moved row is a claim to rule, not proof: a literal that only spells the
// title (an assertion value, a data table) also holds it, so the reader rules each moved row by
// reading its holder, as it rules each missing row. Read a registration at any token position, with
// its modifiers: `.each` tables (call or tagged template) and `.skipIf(...)` and `.runIf(...)` read
// the title of the call that follows. A title that is no string or template literal is a dynamic
// row, named per tree with its source spelling: the comparison cannot follow it, and a removed
// `.each` table row leaves its one registered title in place. A file with fewer dynamic
// registrations than at REV is a lost-dynamic row, which the comparison cannot rule on, so it
// exits 3 as a missing row does. A title registered through an alias (a `test.extend` result bound
// to another name, or `const spec = it`) is not read, and a `test.extend({...})` call itself reads
// as one dynamic registration. Decode quote and backslash escapes only.
// Balance each-table parentheses over code tokens, skipping lexical regions. Print text by default
// or one JSON line with --json; --out writes .json or .txt independently. Text rows escape tab and
// newline. Compare interpolated templates by full raw spelling. Refuse unclosed lexical tokens.
// Track lexical brace context without a syntax tree. Function-expression and arrow bodies cannot
// establish a following slash's grammar; refuse that detectable ambiguity instead of claiming a move.
// Only .test.ts files register titles; a .test.tsx or .test.mts file is invisible to it.
// Exit 0 with no missing or moved titles and no lost-dynamic file, 3 with any, 2 on git, filesystem
// or token refusal, 64 on usage.
import { spawnSync } from 'node:child_process'
import {
	existsSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	realpathSync,
	statSync,
	writeFileSync,
} from 'node:fs'
import { dirname, extname, join, relative, resolve } from 'node:path'

/** Lists the flags this script reads, value flags and switches alike. */
export const FLAGS: readonly string[] = ['--base', '--root', '--json', '--out']

/** Holds the usage line printed on a usage refusal. */
export const USAGE = 'usage: titles.ts --base REV [--root DIR] [--json] [--out FILE.json|FILE.txt]'

/** Caps the characters of a name an error message echoes. */
export const NAME_LIMIT = 80

/** Names the directories a tree walk skips, so build output and notes stay unread. */
export const SKIPPED_DIRECTORIES: ReadonlySet<string> = new Set([
	'node_modules',
	'.git',
	'dist',
	'tmp',
	'.orkestrel',
	'.idea',
])

/** Matches the keywords after which a slash opens a regular expression. */
export const REGEX_PREFIX =
	/^(?:return|throw|case|delete|void|typeof|instanceof|in|of|yield|await|else|do)$/u

/** Matches an identifier as one word. */
export const IDENTIFIER_PATTERN = /^[\p{ID_Start}_$][\p{ID_Continue}$]*$/u

/** Names the identifiers that open a test registration. */
export const REGISTRARS: ReadonlySet<string> = new Set(['it', 'test', 'describe', 'suite'])

/** Names the calls whose argument list or table precedes the registration call. */
export const ARGUMENT_MODIFIERS: ReadonlySet<string> = new Set(['each', 'skipIf', 'runIf', 'for'])

/** Lists the tokens that open a bracket group. */
export const OPENERS: readonly string[] = ['(', '[', '{']

/** Lists the tokens that close a bracket group. */
export const CLOSERS: readonly string[] = [')', ']', '}']

/** Describes one registered title and the file that registers it. */
export interface Title {
	readonly file: string
	readonly title: string
}

/** Describes a baseline title that has fewer registrations than before. */
export interface Missing extends Title {
	readonly deficit: number
}

/** Describes a lost title that another string literal still spells. */
export interface Moved extends Title {
	readonly holder: string
}

/** Describes a registration whose title is no string or template literal. */
export interface Dynamic {
	readonly file: string
	readonly spelling: string
	readonly tree: 'baseline' | 'working'
}

/** Describes a file that registers fewer non-literal titles than it did at the baseline. */
export interface LostDynamic {
	readonly file: string
	readonly deficit: number
}

/** Holds the comparison of the working tree with the baseline. */
export interface Report {
	readonly base: string
	readonly root: string
	readonly count: number
	readonly missing: readonly Missing[]
	readonly moved: readonly Moved[]
	readonly dynamic: readonly Dynamic[]
	readonly lostDynamic: readonly LostDynamic[]
}

/** Describes one lexical token, with the tokens nested in its template expressions. */
export interface Token {
	readonly category: 'code' | 'line' | 'block' | 'string' | 'template' | 'regex'
	readonly start: number
	readonly end: number
	readonly children: readonly Token[]
	readonly prefix?: boolean
	readonly ambiguous?: boolean
}

/** Describes an open brace and what the scanner knows of its context. */
export interface Brace {
	readonly category: 'block' | 'expression' | 'template'
	readonly ambiguous: boolean
}

/** Describes an open parenthesis and what the scanner knows of its context. */
export interface Parenthesis {
	readonly prefix: boolean
	readonly ambiguous: boolean
}

/** Describes one test registration: its literal title token, or its spelling when none is literal. */
export interface Registration {
	readonly token: Token | undefined
	readonly spelling: string
}

/** Describes one file a tree walk found. */
export interface WalkedFile {
	readonly path: string
	readonly modified: number
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
 * @param name - The flag, such as `--base`.
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
 * Decodes the title a string or template token spells.
 *
 * @param text - The source text.
 * @param token - A string or template token.
 * @returns The raw spelling of an interpolated template, otherwise the text with quote and
 * backslash escapes decoded.
 */
export function decodeTitle(text: string, token: Token): string {
	const raw = text.slice(token.start + 1, token.end - 1)
	return token.category === 'template' && token.children.length > 0
		? raw
		: raw.replace(/\\(['"`\\])/gu, '$1')
}

/**
 * Scans JavaScript or TypeScript source into lexical tokens without a syntax tree.
 *
 * @remarks
 * Keeps its position and its brace and parenthesis context in `#` fields, one scanner per scan.
 */
export class TokenScanner {
	readonly #text: string
	readonly #file: string
	readonly #parentheses: Parenthesis[] = []
	readonly #braces: Brace[] = []
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
			const previous = tokens.findLast(
				(token) =>
					token.category !== 'line' &&
					token.category !== 'block' &&
					this.#text.slice(token.start, token.end).trim().length > 0,
			)
			const spelling = previous === undefined ? '' : this.#text.slice(previous.start, previous.end)
			if (character === '}' && expression) {
				this.#position += 1
				return tokens
			}
			if (character === '{') {
				const block =
					previous === undefined
						? this.#braces.at(-1)?.category !== 'template'
						: previous.category === 'code' &&
							/^(?:\)|=>|;|\{|\}|else|try|finally|do)$/u.test(spelling)
				this.#braces.push({
					category: block ? 'block' : 'expression',
					ambiguous: block && (spelling === '=>' || previous?.ambiguous === true),
				})
				this.#position += 1
				tokens.push({ category: 'code', start, end: this.#position, children: [] })
				tokens.push(...this.#readCode(true, depth + 1))
				const brace = this.#braces.pop()
				tokens.push({
					category: 'code',
					start: this.#position - 1,
					end: this.#position,
					children: [],
					prefix: brace?.category === 'block',
					ambiguous: brace?.ambiguous === true,
				})
				continue
			}
			if (character === '`') {
				tokens.push(this.#readTemplate(depth + 1))
				continue
			}
			if (
				character === '/' &&
				!rest.startsWith('//') &&
				!rest.startsWith('/*') &&
				previous?.ambiguous === true
			)
				throw new Error(`${this.#file}:${start}: Ambiguous brace before slash`)
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
									? /^'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n\u2028\u2029])*'/u
									: /^"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n\u2028\u2029])*"/u
								).exec(rest)
							: category === 'regex'
								? /^\/(?:\\[^\r\n]|\[(?:\\[^\r\n]|[^\]\\\r\n])*\]|[^/\\[\r\n])*\/[a-z]*/iu.exec(
										rest,
									)
								: /^(?:[\p{ID_Start}_$][\p{ID_Continue}$]*|\d[\w.]*|\s+|\+\+|--|=>|.)/u.exec(rest)
			if (match === null) throw new Error(`${this.#file}:${start}: Unclosed ${category} token`)
			this.#position += match[0].length
			if (category === 'code' && character === '(') {
				const words = tokens
					.filter((token) => token.category === 'code')
					.map((token) => this.#text.slice(token.start, token.end))
					.filter((word) => word.trim().length > 0)
				const keyword = words.findLastIndex((word) => word === 'function')
				const callable =
					keyword >= 0 &&
					words
						.slice(keyword + 1)
						.every((word) => word === '*' || /^[\p{ID_Start}_$][\p{ID_Continue}$]*$/u.test(word))
				const before = words[words[keyword - 1] === 'async' ? keyword - 2 : keyword - 1]
				this.#parentheses.push({
					prefix: /^(?:if|while|for|with|switch|catch)$/u.test(spelling),
					ambiguous:
						callable &&
						(before === undefined
							? this.#braces.at(-1)?.category === 'template'
							: /^(?:[=(,:[?+\-*/%&|^!~<>]|=>|return|throw|yield|await|case|new|void|typeof|delete|instanceof|in|of)$/u.test(
									before,
								)),
				})
			}
			const parenthesis =
				category === 'code' && character === ')' ? this.#parentheses.pop() : undefined
			tokens.push({
				category,
				start,
				end: this.#position,
				children: [],
				prefix: parenthesis?.prefix === true,
				ambiguous: parenthesis?.ambiguous === true,
			})
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
				const offset = this.#position
				this.#position += 2
				this.#braces.push({ category: 'template', ambiguous: false })
				const expression = this.#readCode(true, depth)
				this.#braces.pop()
				children.push({
					category: 'code',
					start: offset,
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

/**
 * Reads the source text a token spans.
 *
 * @param text - The source text.
 * @param token - The token.
 * @returns The token's spelling.
 */
export function spell(text: string, token: Token): string {
	return text.slice(token.start, token.end)
}

/**
 * Checks whether a token is a comment or whitespace.
 *
 * @param text - The source text.
 * @param token - The token.
 * @returns True if the token carries no code.
 */
export function isTrivia(text: string, token: Token): boolean {
	return (
		token.category === 'line' ||
		token.category === 'block' ||
		(token.category === 'code' && spell(text, token).trim() === '')
	)
}

/**
 * Reads the line number of a token's start.
 *
 * @param text - The source text.
 * @param token - The token, or undefined for the start of the text.
 * @returns The one-based line number.
 */
export function readLine(text: string, token: Token | undefined): number {
	return text.slice(0, token?.start ?? 0).split(/\r\n|\n/u).length
}

/**
 * Finds the parenthesis that closes a modifier's argument group.
 *
 * @param text - The source text.
 * @param code - The code tokens, without comments and whitespace.
 * @param open - The index of the opening parenthesis.
 * @param name - The modifier name, for the refusal.
 * @param file - The file label, for the refusal.
 * @returns The index of the matching closing parenthesis.
 * @throws Thrown when the group never closes.
 */
export function findGroupEnd(
	text: string,
	code: readonly Token[],
	open: number,
	name: string,
	file: string,
): number {
	const found = code.slice(open).reduce<{ readonly depth: number; readonly end: number }>(
		(state, token, offset) => {
			if (state.end >= 0 || token.category !== 'code') return state
			const word = spell(text, token)
			const depth = state.depth + (word === '(' ? 1 : word === ')' ? -1 : 0)
			return { depth, end: word === ')' && depth === 0 ? open + offset : -1 }
		},
		{ depth: 0, end: -1 },
	)
	if (found.end < 0) {
		throw new Error(`${file}:${readLine(text, code[open])}: Unbalanced ${name} arguments`)
	}
	return found.end
}

/**
 * Finds where a registration call's first argument ends.
 *
 * @param text - The source text.
 * @param code - The code tokens, without comments and whitespace.
 * @param from - The index of the first argument's first token.
 * @param file - The file label, for the refusal.
 * @returns The index of the first top-level comma or closing parenthesis.
 * @throws Thrown when the call never closes.
 */
export function findArgumentEnd(
	text: string,
	code: readonly Token[],
	from: number,
	file: string,
): number {
	const found = code.slice(from).reduce<{ readonly depth: number; readonly end: number }>(
		(state, token, offset) => {
			if (state.end >= 0 || token.category !== 'code') return state
			const word = spell(text, token)
			if (state.depth === 0 && (word === ',' || word === ')')) {
				return { depth: 0, end: from + offset }
			}
			return {
				depth: state.depth + (OPENERS.includes(word) ? 1 : CLOSERS.includes(word) ? -1 : 0),
				end: -1,
			}
		},
		{ depth: 0, end: -1 },
	)
	if (found.end < 0) {
		throw new Error(`${file}:${readLine(text, code[from - 1])}: Unbalanced call arguments`)
	}
	return found.end
}

/**
 * Reads the modifier chain after a registrar, up to its registration call.
 *
 * @remarks
 * `.each` and its tagged-template form, `.skipIf(...)`, `.runIf(...)`, and `.for(...)` are followed
 * by a second call that registers the title, so the first group or template is skipped.
 *
 * @param text - The source text.
 * @param code - The code tokens, without comments and whitespace.
 * @param at - The index after the registrar or the last chain element.
 * @param last - The last modifier name read; empty after a skipped group or at the start.
 * @param file - The file label, for a refusal.
 * @returns The index of the registration call's opening parenthesis, or -1 when the tokens are no
 * registration call.
 */
export function readCall(
	text: string,
	code: readonly Token[],
	at: number,
	last: string,
	file: string,
): number {
	const token = code[at]
	if (token === undefined) return -1
	const word = token.category === 'code' ? spell(text, token) : ''
	if (word === '.') {
		const name = code[at + 1]
		const spelled = name?.category === 'code' ? spell(text, name) : ''
		return IDENTIFIER_PATTERN.test(spelled) ? readCall(text, code, at + 2, spelled, file) : -1
	}
	if (token.category === 'template' && ARGUMENT_MODIFIERS.has(last)) {
		return readCall(text, code, at + 1, '', file)
	}
	if (word !== '(') return -1
	if (!ARGUMENT_MODIFIERS.has(last)) return at
	return readCall(text, code, findGroupEnd(text, code, at, last, file) + 1, '', file)
}

/**
 * Checks whether the code token at an index opens a test registration.
 *
 * @param text - The source text.
 * @param code - The code tokens, without comments and whitespace.
 * @param index - The token index.
 * @returns True if the token is a registrar word that no member access precedes.
 */
export function isRegistrar(text: string, code: readonly Token[], index: number): boolean {
	const token = code[index]
	if (token?.category !== 'code' || !REGISTRARS.has(spell(text, token))) return false
	const previous = code[index - 1]
	return !(previous?.category === 'code' && spell(text, previous) === '.')
}

/**
 * Reads the registration a registrar token starts.
 *
 * @param text - The source text.
 * @param code - The code tokens, without comments and whitespace.
 * @param index - The registrar's index.
 * @param file - The file label, for a refusal.
 * @returns One registration, or none when the registrar starts no call.
 */
export function readRegistration(
	text: string,
	code: readonly Token[],
	index: number,
	file: string,
): readonly Registration[] {
	const call = readCall(text, code, index + 1, '', file)
	if (call < 0) return []
	const first = code.slice(call + 1, findArgumentEnd(text, code, call + 1, file))
	const only = first.length === 1 ? first[0] : undefined
	if (only !== undefined && (only.category === 'string' || only.category === 'template')) {
		return [{ token: only, spelling: spell(text, only) }]
	}
	const head = first[0]
	const tail = first.at(-1)
	return [
		{
			token: undefined,
			spelling:
				head === undefined || tail === undefined
					? ''
					: text.slice(head.start, tail.end).replace(/\s+/gu, ' '),
		},
	]
}

/**
 * Reads every test registration in a token list and in the template expressions nested in it.
 *
 * @param text - The source text.
 * @param tokens - The scanned tokens.
 * @param file - The file label, for a refusal.
 * @returns The registrations in token order, then those nested in template expressions.
 */
export function readRegistrations(
	text: string,
	tokens: readonly Token[],
	file: string,
): readonly Registration[] {
	const code = tokens.filter((token) => !isTrivia(text, token))
	const here = code.flatMap((_token, index) =>
		isRegistrar(text, code, index) ? readRegistration(text, code, index, file) : [],
	)
	return [...here, ...tokens.flatMap((token) => readRegistrations(text, token.children, file))]
}

/**
 * Collects the string and template tokens of a token tree.
 *
 * @param tokens - The scanned tokens.
 * @returns Every string or template token, nested ones included.
 */
export function collectLiterals(tokens: readonly Token[]): readonly Token[] {
	return tokens.flatMap((token) => [
		...(token.category === 'string' || token.category === 'template' ? [token] : []),
		...collectLiterals(token.children),
	])
}

/**
 * Lists the registrations of a tree that have no literal title.
 *
 * @param file - The file the registrations came from.
 * @param registrations - The file's registrations.
 * @param tree - The tree the file was read from.
 * @returns One dynamic row per registration without a title token.
 */
export function readDynamic(
	file: string,
	registrations: readonly Registration[],
	tree: Dynamic['tree'],
): readonly Dynamic[] {
	return registrations
		.filter((registration) => registration.token === undefined)
		.map((registration) => ({ file, spelling: registration.spelling, tree }))
}

/**
 * Counts the registrations that have no literal title.
 *
 * @param registrations - A file's registrations.
 * @returns How many have no title token.
 */
export function countDynamic(registrations: readonly Registration[]): number {
	return registrations.filter((registration) => registration.token === undefined).length
}

/**
 * Lists the files that register fewer non-literal titles than the baseline did.
 *
 * @param baseline - Each baseline test file with its registrations.
 * @param current - Each working test file with its registrations.
 * @returns One row per baseline file whose count of non-literal registrations dropped, with the
 * drop; a file absent from the working tree counts none.
 */
export function readLostDynamic(
	baseline: ReadonlyArray<{
		readonly file: string
		readonly registrations: readonly Registration[]
	}>,
	current: ReadonlyArray<{
		readonly file: string
		readonly registrations: readonly Registration[]
	}>,
): readonly LostDynamic[] {
	return baseline.flatMap(({ file, registrations }) => {
		const before = countDynamic(registrations)
		const now = current.find((entry) => entry.file === file)
		const after = now === undefined ? 0 : countDynamic(now.registrations)
		return before > after ? [{ file, deficit: before - after }] : []
	})
}

/**
 * Runs git in a directory and returns its output.
 *
 * @param root - The directory to run in.
 * @param args - The git arguments.
 * @returns The standard output.
 * @throws Thrown when git cannot run or exits nonzero.
 */
export function readGit(root: string, args: readonly string[]): string {
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

/**
 * Compares the titles of the working tree with the baseline revision.
 *
 * @param base - The revision to compare against.
 * @param root - The directory whose `tests/` tree is compared; it may sit below the repository top.
 * @returns The missing, moved, and dynamic rows with the baseline title count.
 * @throws Thrown when git refuses, a file cannot be read, or a token cannot be classified.
 */
export function readReport(base: string, root: string): Report {
	const tree = readGit(root, ['rev-parse', '--verify', '--end-of-options', `${base}^{tree}`]).trim()
	const baselineFiles = readGit(root, ['ls-tree', '-r', '-z', '--name-only', tree, '--', 'tests'])
		.split('\0')
		.filter((file) => file.endsWith('.test.ts'))
		.map((file) => {
			const text = readGit(root, ['show', `${tree}:./${file}`])
			const label = `${base}:${file}`
			return {
				file,
				text,
				registrations: readRegistrations(text, new TokenScanner(text, label).scan(), label),
			}
		})
	const baseline = baselineFiles.flatMap(({ file, text, registrations }) =>
		registrations.flatMap(({ token }) =>
			token === undefined ? [] : [{ file, title: decodeTitle(text, token) }],
		),
	)
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
				registrations: file.endsWith('.test.ts') ? readRegistrations(text, tokens, file) : [],
			}
		})
		.sort((left, right) => left.file.localeCompare(right.file))
	const titles = files
		.filter(({ file }) => file.endsWith('.test.ts'))
		.flatMap(({ file, text, registrations }) =>
			registrations.flatMap(({ token }) =>
				token === undefined ? [] : [{ file, title: decodeTitle(text, token) }],
			),
		)
	// A surviving registration supplies its title count, never evidence that a lost duplicate moved.
	const holders = files.flatMap(({ file, text, tokens, registrations }) => {
		const registered = new Set(
			registrations.flatMap(({ token }) => (token === undefined ? [] : [token])),
		)
		return collectLiterals(tokens)
			.filter((token) => !registered.has(token))
			.map((token) => ({ file, title: decodeTitle(text, token) }))
	})
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
		dynamic: [
			...baselineFiles.flatMap(({ file, registrations }) =>
				readDynamic(file, registrations, 'baseline'),
			),
			...files.flatMap(({ file, registrations }) => readDynamic(file, registrations, 'working')),
		],
		lostDynamic: readLostDynamic(baselineFiles, files),
	}
}

/**
 * Escapes the tab, carriage return, and newline characters of a text-row cell.
 *
 * @param cell - The cell text.
 * @returns The cell with each of those characters written as a backslash sequence.
 */
export function escapeCell(cell: string): string {
	return cell.replace(/\t/gu, '\\t').replace(/\r/gu, '\\r').replace(/\n/gu, '\\n')
}

/**
 * Renders a report as a header line and one tab-separated row per finding.
 *
 * @param report - The report to render.
 * @returns The text, without a trailing line feed.
 */
export function renderReport(report: Report): string {
	return [
		`titles: ${report.count} baseline title(s) at ${report.base}, ${report.missing.length} missing, ${report.moved.length} moved, ${report.dynamic.length} dynamic, ${report.lostDynamic.length} lost dynamic`,
		...report.missing.map(({ file, title, deficit }) =>
			['missing', file, title, String(deficit)].map(escapeCell).join('\t'),
		),
		...report.moved.map(({ file, title, holder }) =>
			['moved', file, title, holder].map(escapeCell).join('\t'),
		),
		...report.dynamic.map(({ file, spelling, tree }) =>
			['dynamic', file, tree, spelling].map(escapeCell).join('\t'),
		),
		...report.lostDynamic.map(({ file, deficit }) =>
			['lost-dynamic', file, String(deficit)].map(escapeCell).join('\t'),
		),
	].join('\n')
}

/**
 * Runs the comparison and prints its report.
 *
 * @param argv - The arguments after the script path.
 * @returns The exit code: 0 clean, 3 a missing or moved title or a lost-dynamic file, 2 a tool
 * failure, 64 usage.
 */
export function main(argv: readonly string[]): number {
	const unknown = readUnknownFlags(argv, FLAGS)
	if (unknown.length > 0) {
		console.error(
			`titles: ${unknown.map(describeName).join(', ')} is not a flag this script reads; give each value as its own argument. ${USAGE}`,
		)
		return 64
	}
	const missing = readMissingFlags(argv, ['--base', '--root', '--out'])
	if (missing.length > 0) {
		console.error(`titles: ${missing.join(', ')} given with no value`)
		return 64
	}
	const base = readOption(argv, '--base')
	const out = readOption(argv, '--out')
	if (base === undefined || (out !== undefined && !['.json', '.txt'].includes(extname(out)))) {
		console.error(USAGE)
		return 64
	}
	if (base.startsWith('-')) {
		console.error(
			`titles: --base ${describeName(base)} opens with "-"; give a revision name or hash`,
		)
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
		return report.missing.length + report.moved.length + report.lostDynamic.length > 0 ? 3 : 0
	} catch (error) {
		console.error(`titles: ${error instanceof Error ? error.message : String(error)}`)
		return 2
	}
}

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === import.meta.filename) {
	process.exitCode = main(process.argv.slice(2))
}
