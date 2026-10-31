// Write a unit brief from the template, or check that every path a brief names resolves. Run from
// the checkout root:
//   node .agents/skills/orkestrel-dispatch/scripts/brief.ts --unit UNIT --lane units|cursor|codex|claude [--subject TEXT]
//   node .agents/skills/orkestrel-dispatch/scripts/brief.ts --check tmp/codex/UNIT-brief.md
// The first form copies the brief template beside this skill (`../../../templates/brief.md`, so a
// target's installed copy finds it too) to tmp/<lane>/<unit>-brief.md with UNIT_ID and SHORT_SUBJECT
// filled, and writes <unit>-brief-<n>.md when a brief already exists, so a launched brief is never
// edited. The second form reads every backticked token carrying a slash (a backslash counts and is
// read as a slash), strips a `:line` or
// `:line-line` suffix, resolves it from the working directory, and prints the ones that do not
// exist; a bare filename is outside the check. It also names each template section the brief omits:
// the `## Role and engine` section, and the `## Execution` section with its spawn-nothing sentence.
// The two forms are two modes; name one. The script refuses a flag it does not read, the
// `--flag=value` form included. Exit 3 when a path or a section is missing, 64 on usage.
import { existsSync, mkdirSync, readFileSync, realpathSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

/** Names the brief template, found from this script's own location. */
export const TEMPLATE = resolve(
	dirname(fileURLToPath(import.meta.url)),
	'..',
	'..',
	'..',
	'templates',
	'brief.md',
)

/** Maps each lane name to the directory its briefs are written under. */
export const LANES: Readonly<Record<string, string>> = Object.freeze({
	units: 'tmp/units',
	cursor: 'tmp/cursor',
	codex: 'tmp/codex',
	claude: 'tmp/claude',
})

/** Describes a template section a brief must keep: its heading and the sentence it must carry. */
export interface Requirement {
	readonly heading: string
	readonly sentence: string | undefined
}

/** Lists the template sections every brief must keep, in template order. */
export const REQUIREMENTS: readonly Requirement[] = [
	{ heading: '## Role and engine', sentence: undefined },
	{ heading: '## Execution', sentence: 'Perform the assignment yourself and spawn nothing.' },
]

/** Lists the flags that take a value. */
export const VALUE_FLAGS: readonly string[] = ['--unit', '--lane', '--subject', '--check']

/** Lists every flag the script reads, value flags and switches alike. */
export const FLAGS: readonly string[] = VALUE_FLAGS

/** Holds the usage line printed when a call names no mode. */
export const USAGE =
	'usage: brief.ts --unit UNIT --lane units|cursor|codex|claude [--subject TEXT] | --check PATH'

/**
 * Reads the value that follows a flag.
 *
 * @remarks
 * The first occurrence of a flag wins, a following value that opens with `--` is a missing value,
 * and the `--flag=value` form is not read.
 *
 * @param argv - The arguments after the script path.
 * @param name - The flag, such as `--unit`.
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
 * Checks whether a backticked token reads as a repository path.
 *
 * @param token - The text between two backticks, with its line suffix already removed.
 * @returns True if the token carries a slash and no URL, placeholder, glob, or flag form; false otherwise.
 */
export function readsAsPath(token: string): boolean {
	if (token.includes('://') || /[<>*{}\s]/u.test(token)) return false
	if (/[A-Z]{2,}_[A-Z]/u.test(token)) return false
	if (token.startsWith('@') || token.startsWith('-') || token.startsWith('$')) return false
	if (!/^[A-Za-z0-9_.~/-]+$/u.test(token)) return false
	return token.includes('/')
}

/**
 * Extracts the slash-bearing paths a brief names.
 *
 * @param content - The brief text.
 * @returns Each distinct path in sorted order, a backslash read as a slash and a line suffix removed.
 */
export function extractPaths(content: string): readonly string[] {
	const found = new Set(
		[...content.matchAll(/`([^`\n]+)`/gu)]
			.map((match) => (match[1] ?? '').replace(/\\/gu, '/').replace(/:\d+(?:[-–]\d+)?$/u, ''))
			.filter(readsAsPath),
	)
	return [...found].sort()
}

/**
 * Reads the body of a level-two section.
 *
 * @param content - The brief text.
 * @param heading - The heading line, such as `## Execution`.
 * @returns The text between the heading line and the next level-two heading or the end, or
 * undefined when no line equals the heading.
 */
export function extractSection(content: string, heading: string): string | undefined {
	const lines = content.split(/\r\n|\n/u)
	const start = lines.findIndex((line) => line.trimEnd() === heading)
	if (start === -1) return undefined
	const rest = lines.slice(start + 1)
	const end = rest.findIndex((line) => line.startsWith('## '))
	return (end === -1 ? rest : rest.slice(0, end)).join('\n')
}

/**
 * Names each required template section a brief omits.
 *
 * @param content - The brief text.
 * @param requirements - The sections the brief must keep.
 * @returns One description per omission, in requirement order: the heading when its section is
 * absent, and the sentence with its heading when the section is present without it.
 */
export function scanOmissions(
	content: string,
	requirements: readonly Requirement[],
): readonly string[] {
	return requirements.flatMap(({ heading, sentence }) => {
		const body = extractSection(content, heading)
		const named = sentence === undefined ? '' : ` with the sentence ${JSON.stringify(sentence)}`
		if (body === undefined) return [`the ${JSON.stringify(heading)} section${named}`]
		if (sentence === undefined || body.replace(/\s+/gu, ' ').includes(sentence)) return []
		return [`the sentence ${JSON.stringify(sentence)} under ${JSON.stringify(heading)}`]
	})
}

/**
 * Resolves the first brief path for a unit that no file occupies.
 *
 * @param directory - The lane directory.
 * @param unit - The unit name.
 * @param count - The brief number to try first. Default: 1.
 * @returns `<unit>-brief.md` for the first brief and `<unit>-brief-<n>.md` for a successor.
 */
export function resolveBriefPath(directory: string, unit: string, count = 1): string {
	const path = join(directory, count === 1 ? `${unit}-brief.md` : `${unit}-brief-${count}.md`)
	return existsSync(path) ? resolveBriefPath(directory, unit, count + 1) : path
}

/**
 * Writes a brief from the template.
 *
 * @param argv - The arguments after the script path.
 * @returns The exit code: 0 on success, 64 on usage or a missing template.
 */
export function writeBrief(argv: readonly string[]): number {
	const unit = readOption(argv, '--unit')
	const lane = readOption(argv, '--lane')
	const directory = lane === undefined ? undefined : LANES[lane]
	if (unit === undefined || directory === undefined || !/^[A-Za-z0-9._-]+$/u.test(unit)) {
		console.error('usage: brief.ts --unit UNIT --lane units|cursor|codex|claude [--subject TEXT]')
		return 64
	}
	if (!existsSync(TEMPLATE)) {
		console.error(`brief: the template is missing at ${TEMPLATE}`)
		return 64
	}
	mkdirSync(directory, { recursive: true })
	const path = resolveBriefPath(directory, unit)
	const subject = readOption(argv, '--subject') ?? 'SHORT_SUBJECT'
	const content = readFileSync(TEMPLATE, 'utf8')
		.replace(/UNIT_ID/gu, unit)
		.replace(/SHORT_SUBJECT/gu, subject)
	writeFileSync(path, content)
	console.log(JSON.stringify({ brief: path, template: TEMPLATE }))
	return 0
}

/**
 * Checks that every path a brief names exists and that the brief keeps every required section.
 *
 * @param path - The brief file.
 * @returns The exit code: 0 when every path exists and no section is omitted, 3 when a path is
 * missing or a section is omitted, 64 when the brief is not a file.
 */
export function checkBrief(path: string): number {
	if (!existsSync(path) || !statSync(path).isFile()) {
		console.error(`brief: ${path} is not a file`)
		return 64
	}
	const content = readFileSync(path, 'utf8')
	const paths = extractPaths(content)
	const missing = paths.filter((candidate) => !existsSync(resolve(candidate)))
	const omitted = scanOmissions(content, REQUIREMENTS)
	console.log(JSON.stringify({ brief: path, checked: paths.length, missing, omitted }))
	if (omitted.length > 0) console.error(`brief: ${path} omits ${omitted.join('; ')}`)
	return missing.length === 0 && omitted.length === 0 ? 0 : 3
}

/**
 * Runs the script on its arguments.
 *
 * @param argv - The arguments after the script path.
 * @returns The exit code: 0 on success, 3 when a named path or a required section is missing, 64 on
 * usage.
 */
export function main(argv: readonly string[]): number {
	const unknown = readUnknownFlags(argv, FLAGS)
	if (unknown.length > 0) {
		console.error(`brief: ${unknown.join(', ')} is not a flag this script reads; ${USAGE}`)
		return 64
	}
	const missing = readMissingFlags(argv, VALUE_FLAGS)
	if (missing.length > 0) {
		console.error(`brief: ${missing.join(', ')} given with no value`)
		return 64
	}
	const check = readOption(argv, '--check')
	if (check !== undefined && argv.includes('--unit')) {
		console.error('brief: --check and --unit are two modes; name one')
		return 64
	}
	if (check !== undefined) return checkBrief(check)
	if (argv.includes('--unit')) return writeBrief(argv)
	console.error(USAGE)
	return 64
}

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === import.meta.filename) {
	process.exitCode = main(process.argv.slice(2))
}
