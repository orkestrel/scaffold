// Weaker law: every value exported by a setup module is referenced SOMEWHERE else under
// tests/, other setup modules included. A miss here is a real miss under either reading.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
const EXPORT = /^export (?:async function|function|class|const|let) (\w+)/gm
const walk = (dir, out = []) => {
	for (const entry of readdirSync(dir)) {
		const path = join(dir, entry)
		if (statSync(path).isDirectory()) walk(path, out)
		else if (path.endsWith('.ts')) out.push(path)
	}
	return out
}
for (const repo of process.argv.slice(2)) {
	let files
	try { files = walk(join(repo, 'tests')) } catch { continue }
	const setups = files.filter((f) => /[/\\]setup[^/\\]*\.ts$/.test(f) && !f.endsWith('.test.ts'))
	const missed = []
	let total = 0
	for (const file of setups) {
		const text = readFileSync(file, 'utf8')
		const elsewhere = files.filter((f) => f !== file).map((f) => readFileSync(f, 'utf8')).join('\n')
		for (const m of text.matchAll(EXPORT)) {
			total += 1
			if (!new RegExp(`\\b${m[1]}\\b`).test(elsewhere)) missed.push(`${file.slice(repo.length + 1)}:${m[1]}`)
		}
	}
	const vendored = missed.filter((n) => n.startsWith('tests/setupPolicy.ts:'))
	const owned = missed.filter((n) => !n.startsWith('tests/setupPolicy.ts:'))
	console.log(`${repo.split('/').pop().padEnd(11)} exports ${String(total).padStart(3)} | unreferenced anywhere: ${String(missed.length).padStart(3)} (vendored setupPolicy ${vendored.length}, package-owned ${owned.length})`)
	if (owned.length) console.log('   package-owned misses: ' + owned.join(', '))
}
