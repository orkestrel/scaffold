// Writes a blind audit set from the passed or failed rows of the named runs, and a key that maps each
// opaque id back to its run and goal:
//   node items.ts --dir RESULTS_DIR --rows passes|failures --items ITEMS_OUT --key KEY_OUT RUN...
// A control or compaction run (a name holding `control` or `compaction`) reads variants/vN.json; every other
// run reads variants/ledger/vN.json. Rescored rows under RESULTS_DIR/rescored/RUN win over the run's own.
// Items sort by goal, then id, so no arm's rows sit together.
// Exit: 0 written; 1 when a run has no 10-row file; 64 on usage.
import { createHash } from 'node:crypto'
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const VARIANTS = '/home/user/agent/tmp/bench/variants'
const SEED = '/home/user/agent/tmp/bench/scenario.json'

interface Key {
	readonly id: string
	readonly run: string
	readonly goal: string
	readonly passed: boolean
}

function readFlag(argv: readonly string[], name: string): string | undefined {
	const at = argv.indexOf(name)
	if (at < 0) return undefined
	const value = argv[at + 1]
	return value === undefined || value.startsWith('--') ? undefined : value
}

function readRows(dir: string, run: string): readonly Record<string, unknown>[] {
	for (const base of [join(dir, 'rescored', run), join(dir, run)]) {
		if (!existsSync(base)) continue
		const file = readdirSync(base).find((name) => name.endsWith('.jsonl') && !name.startsWith('memory'))
		if (file === undefined) continue
		const rows = readFileSync(join(base, file), 'utf8')
			.split(/\r\n|\n/)
			.filter((line) => line.trim() !== '')
			.map((line): Record<string, unknown> => JSON.parse(line))
			.filter((row) => typeof row.goal === 'string')
		if (rows.length === 10) return rows
	}
	return []
}

function main(): number {
	const argv = process.argv.slice(2)
	const dir = readFlag(argv, '--dir')
	const which = readFlag(argv, '--rows')
	const itemsOut = readFlag(argv, '--items')
	const keyOut = readFlag(argv, '--key')
	const flags = new Set(['--dir', '--rows', '--items', '--key'])
	const runs = argv.filter((arg, at) => !arg.startsWith('--') && !flags.has(argv[at - 1] ?? ''))
	if (dir === undefined || (which !== 'passes' && which !== 'failures') || itemsOut === undefined || keyOut === undefined || runs.length === 0) {
		process.stderr.write('usage: node items.ts --dir RESULTS_DIR --rows passes|failures --items ITEMS_OUT --key KEY_OUT RUN...\n')
		return 64
	}
	const seed = JSON.parse(readFileSync(SEED, 'utf8')).seed
	const items: Record<string, unknown>[] = []
	const keys: Key[] = []
	for (const run of runs) {
		const copy = /-v(\d+)$/.exec(run)?.[1]
		const rows = readRows(dir, run)
		if (copy === undefined || rows.length === 0) {
			process.stderr.write(`${run}: no 10-row file\n`)
			return 1
		}
		const plain = /control|compaction/.test(run)
		const scenario = JSON.parse(readFileSync(plain ? join(VARIANTS, `v${copy}.json`) : join(VARIANTS, 'ledger', `v${copy}.json`), 'utf8'))
		for (const row of rows) {
			const passed = row.success === true
			if (passed !== (which === 'passes')) continue
			const goal = scenario.goals.find((entry: { id: string }) => entry.id === row.goal)
			const id = createHash('sha256').update(`${run}${row.goal}`).digest('hex').slice(0, 8)
			items.push({
				id,
				goal: row.goal,
				request: goal.request,
				facts: (goal.facts ?? []).map((index: number) => seed[index].content),
				scoring: { expected: goal.expected, expectedAny: goal.expectedAny, forbidden: goal.forbidden, forbiddenPatterns: goal.forbiddenPatterns, tools: goal.tools },
				...(passed ? {} : { failure: { missing: row.missing, forbiddenHit: row.violations, patternsHit: row.patternViolations, toolsOk: row.toolsOk, replyVia: row.replyVia } }),
				reply: typeof row.reply === 'string' ? row.reply : '',
			})
			keys.push({ id, run, goal: String(row.goal), passed })
		}
	}
	const order = (left: Record<string, unknown>, right: Record<string, unknown>): number => String(left.goal).localeCompare(String(right.goal)) || String(left.id).localeCompare(String(right.id))
	items.sort(order)
	writeFileSync(itemsOut, `${JSON.stringify(items, null, 1)}\n`)
	writeFileSync(keyOut, `${JSON.stringify(keys, null, 1)}\n`)
	process.stdout.write(`items ${items.length}\n`)
	return 0
}

process.exit(main())
