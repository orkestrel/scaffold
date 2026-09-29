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
// exist; a bare filename is outside the check. Exit 3 when any is missing, 64 on usage.
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readMissingFlags, readOption } from './helpers.ts'

const TEMPLATE = resolve(
	dirname(fileURLToPath(import.meta.url)),
	'..',
	'..',
	'..',
	'templates',
	'brief.md',
)
const LANES: Readonly<Record<string, string>> = Object.freeze({
	units: 'tmp/units',
	cursor: 'tmp/cursor',
	codex: 'tmp/codex',
	claude: 'tmp/claude',
})

function readsAsPath(token: string): boolean {
	if (token.includes('://') || /[<>*{}\s]/u.test(token)) return false
	if (/[A-Z]{2,}_[A-Z]/u.test(token)) return false
	if (token.startsWith('@') || token.startsWith('-') || token.startsWith('$')) return false
	if (!/^[A-Za-z0-9_.~/-]+$/u.test(token)) return false
	return token.includes('/')
}

function extractPaths(content: string): readonly string[] {
	const found = new Set<string>()
	for (const match of content.matchAll(/`([^`\n]+)`/gu)) {
		const token = (match[1] ?? '').replace(/\\/gu, '/').replace(/:\d+(?:[-–]\d+)?$/u, '')
		if (readsAsPath(token)) found.add(token)
	}
	return [...found].sort()
}

function resolveBriefPath(directory: string, unit: string): string {
	const base = join(directory, `${unit}-brief.md`)
	if (!existsSync(base)) return base
	let n = 2
	while (existsSync(join(directory, `${unit}-brief-${n}.md`))) n += 1
	return join(directory, `${unit}-brief-${n}.md`)
}

function writeBrief(argv: readonly string[]): number {
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

function checkBrief(path: string): number {
	if (!existsSync(path) || !statSync(path).isFile()) {
		console.error(`brief: ${path} is not a file`)
		return 64
	}
	const paths = extractPaths(readFileSync(path, 'utf8'))
	const missing = paths.filter((candidate) => !existsSync(resolve(candidate)))
	console.log(JSON.stringify({ brief: path, checked: paths.length, missing }))
	return missing.length === 0 ? 0 : 3
}

function main(argv: readonly string[]): number {
	const missing = readMissingFlags(argv, ['--unit', '--lane', '--subject', '--check'])
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
	console.error(
		'usage: brief.ts --unit UNIT --lane units|cursor|codex|claude [--subject TEXT] | --check PATH',
	)
	return 64
}

process.exitCode = main(process.argv.slice(2))
