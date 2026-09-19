import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'

// Compare every guide mirror this target carries against the copy vendored
// inside the installed scaffold package, which is what `scaffold audit` reads.
const vendored = 'node_modules/@orkestrel/scaffold/dist/host/guides'
const declared = JSON.parse(readFileSync('package.json', 'utf8'))
const ranges = { ...declared.dependencies, ...declared.devDependencies }

const digest = (path) => createHash('sha256').update(readFileSync(path)).digest('hex').slice(0, 12)

const rows = []
for (const name of readdirSync('guides').sort()) {
	if (!name.endsWith('.md') || name === 'README.md') continue
	const mine = `guides/${name}`
	const theirs = `${vendored}/${name}`
	if (!existsSync(theirs)) {
		rows.push({ guide: name, state: 'not vendored', mine: readFileSync(mine).length, theirs: 0, pin: '' })
		continue
	}
	const a = readFileSync(mine)
	const b = readFileSync(theirs)
	const same = digest(mine) === digest(theirs)
	const pkg = `@orkestrel/${name.replace(/\.md$/u, '')}`
	rows.push({
		guide: name,
		state: same ? 'aligned' : 'DIFFERS',
		mine: a.length,
		theirs: b.length,
		delta: a.length - b.length,
		pin: ranges[pkg] ?? '(not a declared range)',
	})
}

console.log('guide'.padEnd(16), 'state'.padEnd(12), 'local'.padStart(8), 'vendored'.padStart(9), 'delta'.padStart(8), ' pin')
for (const r of rows) {
	console.log(
		r.guide.padEnd(16),
		r.state.padEnd(12),
		String(r.mine).padStart(8),
		String(r.theirs).padStart(9),
		String(r.delta ?? '').padStart(8),
		' ' + r.pin,
	)
}
const differing = rows.filter((r) => r.state === 'DIFFERS')
console.log(`\ndiffering mirrors: ${differing.map((r) => r.guide).join(', ') || 'none'}`)
