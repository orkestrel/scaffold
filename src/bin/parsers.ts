import { parseArgs } from 'node:util'
import type { Dependency } from '@src/core'
import { isTerminalText } from '@src/server'
import { DEPENDENCY_NAME_PATTERN, ScaffoldError } from '@src/core'
import type { CLIArguments } from './types.js'

/** Parse a strict command-line argument vector. */
export function parseArguments(argv: readonly string[]): CLIArguments {
	if (argv.some((argument) => !isTerminalText(argument))) {
		throw new ScaffoldError('INVALID', 'Command arguments must not contain control characters')
	}
	const args = argv[0] === '--' ? argv.slice(1) : [...argv]
	return parseArgs({
		args,
		allowPositionals: true,
		options: {
			src: { type: 'string' },
			app: { type: 'string' },
			deps: { type: 'string' },
			groups: { type: 'string' },
			target: { type: 'string' },
			from: { type: 'string', multiple: true },
			apply: { type: 'boolean', default: false },
			yes: { type: 'boolean', default: false },
			json: { type: 'boolean', default: false },
			prune: { type: 'boolean', default: false },
			computed: { type: 'boolean', default: false },
			strict: { type: 'boolean', default: false },
			live: { type: 'boolean', default: false },
			offline: { type: 'boolean', default: false },
			help: { type: 'boolean', default: false, short: 'h' },
		},
	})
}

/** Split a comma-separated token list, trimming and dropping empty entries. */
export function splitTokens(raw: string): readonly string[] {
	return raw
		.split(',')
		.map((token) => token.trim())
		.filter((token) => token.length > 0)
}

/** Normalize an Orkestrel dependency token to its full package name. */
export function normalizeOrkestrelToken(token: string): string {
	return token.startsWith('@orkestrel/') ? token : `@orkestrel/${token}`
}

/**
 * Parse and resolve a pull dependency selection against the target manifest.
 *
 * @param raw - The comma-separated full package names, or `undefined` for all.
 * @param declared - The target's declared Orkestrel dependencies.
 * @returns `undefined` for all dependencies, otherwise the exact selected records.
 * @throws `ScaffoldError('INVALID')` for empty, malformed, repeated, or undeclared names.
 */
export function parsePullDependencies(
	raw: string | undefined,
	declared: readonly Dependency[],
): readonly Dependency[] | undefined {
	if (raw === undefined) return undefined
	const names = raw.split(',').map((name) => name.trim())
	if (
		names.length === 0 ||
		names.some((name) => !DEPENDENCY_NAME_PATTERN.test(name)) ||
		new Set(names).size !== names.length
	) {
		throw new ScaffoldError(
			'INVALID',
			'Pull dependencies must be unique, comma-separated @orkestrel/* package names',
		)
	}
	const selected = declared.filter((dependency) => names.includes(dependency.name))
	const found = new Set(selected.map((dependency) => dependency.name))
	const missing = names.filter((name) => !found.has(name))
	if (missing.length > 0) {
		throw new ScaffoldError(
			'INVALID',
			`Pull dependencies are not declared by the target: ${missing.join(', ')}`,
			{ dependencies: missing },
		)
	}
	return selected
}
