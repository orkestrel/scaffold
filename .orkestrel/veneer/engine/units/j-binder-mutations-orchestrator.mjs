// The Orchestrator's own settling runs for J-BINDER audit claims 3 and 10: the observer-removed
// source mutation (the unit's first mutation) and the proof's three awaited microtasks removed.
// Each run restores the file byte for byte before the next.
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
const root = 'C:/Users/mikes/WebstormProjects/veneer-binder'
const unitMutations = JSON.parse(readFileSync(process.argv[2], 'utf8'))
const observer = unitMutations.find((mutation) => mutation.name === 'delegate: observer removed')
const runs = [
	{ name: observer.name, file: observer.file, find: observer.find, replace: observer.replace, all: false },
	{ name: 'proof: the three awaited microtasks removed', file: 'tests/src/browser/Delegate.test.ts', find: 'await Promise.resolve()', replace: '/* await removed */', all: true },
]
const results = []
for (const run of runs) {
	const path = `${root}/${run.file}`
	const original = readFileSync(path, 'utf8')
	if (!original.includes(run.find)) { results.push({ name: run.name, error: 'pattern not found' }); continue }
	writeFileSync(path, run.all ? original.replaceAll(run.find, run.replace) : original.replace(run.find, run.replace))
	let output = ''
	try {
		output = execSync('npm run test:src:browser -- tests/src/browser/Delegate.test.ts --testTimeout=3000', { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
	} catch (error) {
		output = `${error.stdout ?? ''}${error.stderr ?? ''}`
	} finally {
		writeFileSync(path, original)
	}
	const failed = [...output.matchAll(/FAIL .*?> (.*)$/gm)].map((match) => match[1].trim())
	const tally = output.replace(/\x1b\[[0-9;]*m/g, '').match(/Tests\s+(.*)$/m)?.[1]?.trim()
	results.push({ name: run.name, occurrences: run.all ? original.split(run.find).length - 1 : 1, tally, failed })
}
console.log(JSON.stringify(results, null, 1))
