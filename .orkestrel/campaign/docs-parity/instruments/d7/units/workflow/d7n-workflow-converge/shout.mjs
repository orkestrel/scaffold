// Lowers every all-caps emphasis word in the guide's own prose and fence comments,
// leaving code spans, table rows, acronyms, and literal identifiers alone.
import { readFileSync, writeFileSync } from 'node:fs'

const WORDS = new Set([
	'ADDITIVE',
	'AFTER',
	'ALL',
	'ALSO',
	'AND',
	'ANY',
	'BOTH',
	'BOXES',
	'BUILT',
	'BUT',
	'BY',
	'COMPOSES',
	'COMPOSING',
	'CONCURRENTLY',
	'DATA',
	'DEFAULT',
	'DEFAULTS',
	'DERIVED',
	'DIFFERENT',
	'DIRECTLY',
	'DISPATCH',
	'DOC',
	'DRIVES',
	'DUAL',
	'EFFECTIVE',
	'EVENT-FREE',
	'EXACT',
	'FAILURE',
	'FORCE',
	'FORCES',
	'FRESH',
	'GRACEFUL',
	'GUARDED',
	'HALTS',
	'HYDRATED',
	'IDENTICAL',
	'IMMEDIATELY',
	'IS',
	'ITS',
	'LATER',
	'MINT',
	'MINTED',
	'NAME',
	'NEVER',
	'NO',
	'NOT',
	'ONCE',
	'ONE',
	'ONLY',
	'OPAQUE',
	'OVERRIDE',
	'OWN',
	'PENDING',
	'PERSIST',
	'PERSISTED',
	'PLAIN',
	'PURE',
	'PURELY',
	'REAL',
	'REGISTRY',
	'RESOLVES',
	'RETRYABLE',
	'RUNNABLE',
	'RUNTIME-ONLY',
	'SAME',
	'SEQUENTIALLY',
	'SETTLED',
	'SINGLE',
	'SOURCE',
	'STRING',
	'STRONGER',
	'STRUCTURALLY',
	'SUFFIX',
	'TERMINAL',
	'THIS',
	'THROTTLE',
	'UP',
	'VALUES',
	'WHAT',
	'WHEN',
	'WITHOUT',
])

/** Lowers the emphasis words of one prose segment. */
function lower(segment) {
	return segment.replace(/\b[A-Z][A-Z][A-Z-]*\b/g, (word) =>
		WORDS.has(word) ? word.toLowerCase() : word,
	)
}

const path = process.argv[2]
const lines = readFileSync(path, 'utf8').split('\n')
const changed = []
const next = lines.map((line, index) => {
	if (line.startsWith('| ')) return line
	const parts = line.split('`')
	const rebuilt = parts.map((part, at) => (at % 2 === 0 ? lower(part) : part)).join('`')
	if (rebuilt !== line) changed.push(index + 1)
	return rebuilt
})
writeFileSync(path, next.join('\n'))
process.stdout.write(`${path}: lines changed ${changed.join(',')}\n`)
