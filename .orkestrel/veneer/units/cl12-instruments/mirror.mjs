// CL12: does one proof under tests/src/styles mirror each partial under src/styles?
import { readdirSync, statSync } from 'node:fs'
import { resolve, join } from 'node:path'

const root = process.cwd()

function walk(directory) {
	const entries = []
	for (const name of readdirSync(directory)) {
		const full = join(directory, name)
		if (statSync(full).isDirectory()) entries.push(...walk(full))
		else entries.push(full)
	}
	return entries
}

const partials = walk(resolve(root, 'src/styles'))
	.map((path) => path.replaceAll('\\', '/').split('src/styles/')[1])
	.filter((path) => path.endsWith('.scss'))
	.map((path) => path.replace(/_?([\w-]+)\.scss$/, '$1'))
	.sort()

const proofs = walk(resolve(root, 'tests/src/styles'))
	.map((path) => path.replaceAll('\\', '/').split('tests/src/styles/')[1])
	.filter((path) => path.endsWith('.test.ts'))
	.map((path) => path.replace(/\.test\.ts$/, ''))
	.sort()

const partialSet = new Set(partials)
const proofSet = new Set(proofs)
console.log(
	JSON.stringify(
		{
			partials: partials.length,
			proofs: proofs.length,
			partialsWithoutProof: partials.filter((name) => !proofSet.has(name)),
			proofsWithoutPartial: proofs.filter((name) => !partialSet.has(name)),
		},
		null,
		'\t',
	),
)
