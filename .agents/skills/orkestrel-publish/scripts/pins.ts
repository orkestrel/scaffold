// Sweep source and tests for a prior version or range literal after a bump or a re-pin. Run from
// the publishing package's root:
//   node .agents/skills/orkestrel-publish/scripts/pins.ts --version 0.0.76 [--range ^0.0.16 ...] [--paths src,tests] [--json]
// A version hit is the literal bounded by characters other than digits and dots, so `~0.0.76` and
// `"0.0.76"` both hit and `0.0.760` does not; a range hit is the literal bounded the same way and not
// preceded by another range operator. Each hit prints as path:line: text so the operator rules on
// it. Exit 0 with no hits, 3 with hits, 64 on usage.
import { readFileSync, statSync } from 'node:fs'
import {
	listFiles,
	readMissingFlags,
	readOptions,
} from '../../orkestrel-dispatch/scripts/helpers.ts'

const BINARY = /\.(png|jpg|jpeg|gif|webp|ico|woff2?|ttf|otf|eot|zip|tgz|gz|pdf|wasm)$/u

interface Literal {
	readonly literal: string
	readonly pattern: RegExp
}

interface Hit {
	readonly path: string
	readonly line: number
	readonly literal: string
	readonly text: string
}

function escapePattern(literal: string): string {
	return literal.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')
}

function buildVersionLiteral(literal: string): Literal {
	return { literal, pattern: new RegExp(`(?<![0-9.])${escapePattern(literal)}(?![0-9.])`, 'u') }
}

function buildRangeLiteral(literal: string): Literal {
	return {
		literal,
		pattern: new RegExp(`(?<![0-9.^~<>=])${escapePattern(literal)}(?![0-9.])`, 'u'),
	}
}

function sweepFile(path: string, literals: readonly Literal[]): readonly Hit[] {
	const content = readFileSync(path)
	if (content.includes(0)) return []
	const hits: Hit[] = []
	content
		.toString('utf8')
		.split(/\r\n|\n/)
		.forEach((text, index) => {
			for (const { literal, pattern } of literals) {
				if (pattern.test(text)) hits.push({ path, line: index + 1, literal, text: text.trim() })
			}
		})
	return hits
}

function main(argv: readonly string[]): number {
	const missing = readMissingFlags(argv, ['--version', '--range', '--paths'])
	if (missing.length > 0) {
		console.error(`pins: ${missing.join(', ')} given with no value`)
		return 64
	}
	const version = readOptions(argv, '--version')[0]
	const ranges = readOptions(argv, '--range')
	const paths = (readOptions(argv, '--paths')[0] ?? 'src,tests').split(',')
	if (version === undefined && ranges.length === 0) {
		console.error(
			'usage: pins.ts --version PRIOR [--range PRIOR_RANGE ...] [--paths src,tests] [--json]',
		)
		return 64
	}
	const literals = [
		...(version === undefined ? [] : [buildVersionLiteral(version)]),
		...ranges.map(buildRangeLiteral),
	]
	const present = paths.filter((path) => {
		try {
			return statSync(path).isDirectory()
		} catch {
			return false
		}
	})
	const skipped = paths.filter((path) => !present.includes(path))
	for (const path of skipped) console.error(`pins: ${path} is not a directory; skipped`)
	const hits = present
		.flatMap((directory) => listFiles(directory).map((file) => file.path))
		.filter((file) => !BINARY.test(file))
		.flatMap((file) => sweepFile(file, literals))
	const names = literals.map((entry) => entry.literal)
	if (argv.includes('--json')) {
		console.log(JSON.stringify({ literals: names, paths: present, skipped, hits }))
	} else {
		for (const hit of hits) console.log(`${hit.path}:${hit.line}: ${hit.text}`)
		console.log(`pins: ${hits.length} hit(s) for ${names.join(', ')} under ${present.join(', ')}`)
	}
	return hits.length === 0 ? 0 : 3
}

process.exitCode = main(process.argv.slice(2))
