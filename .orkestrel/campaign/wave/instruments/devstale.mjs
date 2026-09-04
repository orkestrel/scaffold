// List every @orkestrel range in every checkout that does not name the caret of the registry's served version.
// Read-only: one `npm view` per distinct package name. Usage: node devstale.mjs
import { readFileSync, readdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
const dirs = { scaffold: '/home/user/scaffold' }
for (const n of readdirSync('/home/user/fleet')) dirs[n] = `/home/user/fleet/${n}`
const served = new Map()
function latest(name) {
	if (!served.has(name)) { try { served.set(name, execFileSync('npm', ['view', name, 'version'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()) } catch { served.set(name, undefined) } }
	return served.get(name)
}
const rows = []
for (const [n, d] of Object.entries(dirs).sort()) {
	const pkg = JSON.parse(readFileSync(`${d}/package.json`, 'utf8'))
	for (const field of ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']) {
		for (const [name, range] of Object.entries(pkg[field] ?? {})) {
			if (!name.startsWith('@orkestrel/')) continue
			const v = latest(name)
			if (v && range !== `^${v}`) rows.push(`${n} ${field} ${name} ${range} -> ^${v}`)
		}
	}
}
console.log(rows.length ? rows.join('\n') : 'every range names the registry caret')
console.log(`PACKAGES ${[...new Set(rows.map((r) => r.split(' ')[0]))].join(' ')}`)
