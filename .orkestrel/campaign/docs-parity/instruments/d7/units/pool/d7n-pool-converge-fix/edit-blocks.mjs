import { readFileSync, writeFileSync } from 'node:fs'

const edits = [
	{
		path: 'src/core/types.ts',
		from: ' * Names the machine-readable failure codes produced by {@link PoolError}: `invalid`, `destroyed`,\n * `create`, and `cleanup`.\n',
		to: ' * Names the machine-readable failure codes produced by {@link PoolError}.\n',
	},
	{
		path: 'src/core/types.ts',
		from: ' * Represents the observable resource lifecycle events emitted by a {@link PoolInterface}:\n * `create`, `acquire`, `release`, and `destroy`.\n',
		to: ' * Represents the observable resource lifecycle events emitted by a {@link PoolInterface}.\n',
	},
	{
		path: 'src/core/validators.ts',
		from: ' * Tests whether a value is a native `AbortSignal`, returning `false` for hostile proxies.\n',
		to: ' * Tests whether a value is a native `AbortSignal` for the acquire boundary, returning `false`\n * for hostile proxies.\n',
	},
]

for (const edit of edits) {
	const text = readFileSync(edit.path, 'utf8')
	const at = text.indexOf(edit.from)
	if (at === -1) throw new Error(`no match in ${edit.path}: ${edit.from}`)
	if (text.indexOf(edit.from, at + 1) !== -1) throw new Error(`ambiguous match in ${edit.path}`)
	writeFileSync(edit.path, text.slice(0, at) + edit.to + text.slice(at + edit.from.length))
}
