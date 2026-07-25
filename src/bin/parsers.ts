import { parseArgs } from 'node:util'
import type { CLIArguments } from './types.js'

/** Parse a strict command-line argument vector. */
export function parseArguments(argv: readonly string[]): CLIArguments {
	const args = argv[0] === '--' ? argv.slice(1) : [...argv]
	return parseArgs({
		args,
		allowPositionals: true,
		options: {
			surfaces: { type: 'string' },
			deps: { type: 'string' },
			groups: { type: 'string' },
			target: { type: 'string' },
			from: { type: 'string', multiple: true },
			apply: { type: 'boolean', default: false },
			yes: { type: 'boolean', default: false },
			json: { type: 'boolean', default: false },
			prune: { type: 'boolean', default: false },
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
