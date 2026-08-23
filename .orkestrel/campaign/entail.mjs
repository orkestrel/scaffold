// Entailment probe: for every @orkestrel package, does the tarball npm would pack carry a
// file for each target its exports map names? --ignore-scripts so prepack never rebuilds:
// this measures the dist already on disk, which is what a publish with --ignore-scripts ships.
// Writes nothing into any subject repository; --dry-run produces no artifact.
import { execFileSync } from 'node:child_process'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const rows = JSON.parse(readFileSync(process.argv[2], 'utf8'))
const results = []
for (const row of rows) {
	const root = join('/home/user', row.repo)
	const wanted = [...new Set(row.subpaths.flatMap((s) => s.targets))].sort()
	const distBuilt = existsSync(join(root, 'dist'))
	let packed = null
	let error = null
	try {
		const out = execFileSync('npm', ['pack', '--dry-run', '--json', '--ignore-scripts'], {
			cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 120000,
		})
		const parsed = JSON.parse(out)
		const entries = Array.isArray(parsed) ? parsed : Object.values(parsed)
		const first = entries[0]
		packed = (first?.files ?? []).map((f) => f.path)
	} catch (cause) {
		error = String(cause?.stderr ?? cause?.message ?? cause).slice(0, 300)
	}
	const missing = packed === null ? null : wanted.filter((t) => !packed.includes(t))
	results.push({ repo: row.repo, name: row.name, distBuilt, wanted: wanted.length, missing, error })
	const verdict = error !== null ? `ERROR ${error.replace(/\s+/gu, ' ').slice(0, 120)}`
		: missing.length === 0 ? 'RESOLVES'
		: `MISSING ${missing.join(' ')}`
	console.log(`${row.repo}\tdist=${distBuilt}\t${verdict}`)
}
console.log('---JSON---')
console.log(JSON.stringify(results))
