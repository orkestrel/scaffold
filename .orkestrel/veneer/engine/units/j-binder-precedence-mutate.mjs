// The Orchestrator's mutation instrument for J-BINDER-PRECEDENCE (the unit retained none): applies one
// mutation (one or more exact edits) at a time in the veneer-precedence worktree, runs the named proof
// file, records the failing case titles and the tally, and restores every edited source byte for
// byte before the next mutation. Usage: node precedence-mutate.mjs <mutations.json>
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'

const root = 'C:/Users/mikes/WebstormProjects/veneer-precedence'
const mutations = JSON.parse(readFileSync(process.argv[2], 'utf8'))
const results = []
for (const mutation of mutations) {
	const originals = new Map()
	let missing
	for (const edit of mutation.edits) {
		const path = `${root}/${edit.file}`
		const text = originals.get(path) ?? readFileSync(path, 'utf8')
		if (!originals.has(path)) originals.set(path, text)
		const current = readFileSync(path, 'utf8')
		if (current.split(edit.find).length !== 2) {
			missing = edit.find
			break
		}
		writeFileSync(path, current.replace(edit.find, edit.replace))
	}
	let output = ''
	if (missing === undefined) {
		try {
			output = execSync(`npm run test:src:browser -- ${mutation.proof} --testTimeout=3000`, {
				cwd: root,
				encoding: 'utf8',
				stdio: ['ignore', 'pipe', 'pipe'],
			})
		} catch (error) {
			output = `${error.stdout ?? ''}${error.stderr ?? ''}`
		}
	}
	for (const [path, text] of originals) writeFileSync(path, text)
	const plain = output.replace(/\x1b\[[0-9;]*m/g, '')
	const tally = plain.match(/Tests\s+(.*)/)?.[1]?.trim() ?? (missing === undefined ? 'no tally' : `pattern not found: ${missing.slice(0, 60)}`)
	const failed = [...plain.matchAll(/FAIL\s+\|[^|]*\|\s+\S+\s+>\s+(.*)/g)].map((m) => m[1].trim())
	results.push({ name: mutation.name, proof: mutation.proof, tally, failed })
	console.log(JSON.stringify({ name: mutation.name, tally, failed }, null, 1))
}
writeFileSync(`${process.argv[2]}.results.json`, JSON.stringify(results, null, 1))
