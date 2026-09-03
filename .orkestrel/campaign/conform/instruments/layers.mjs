// Derive the publish layer order from runtime `dependencies` alone, across the fleet.
import { readFileSync, readdirSync } from 'node:fs'
const dirs = { scaffold: '/home/user/scaffold' }
for (const n of readdirSync('/home/user/fleet')) dirs[n] = `/home/user/fleet/${n}`
const deps = new Map()
for (const [n, d] of Object.entries(dirs)) {
	const pkg = JSON.parse(readFileSync(`${d}/package.json`, 'utf8'))
	const runtime = Object.keys(pkg.dependencies ?? {})
		.filter((k) => k.startsWith('@orkestrel/'))
		.map((k) => k.slice('@orkestrel/'.length))
		.filter((k) => k in dirs)
	deps.set(n, runtime)
}
// `scaffold` is a development dependency of every package including its own dependencies, so it
// carries no runtime edge here and publishes on its own account.
const layer = new Map()
let changed = true
while (changed) {
	changed = false
	for (const [n, ds] of deps) {
		const known = ds.map((d) => layer.get(d)).filter((v) => v !== undefined)
		const value = ds.length === 0 ? 0 : known.length === ds.length ? Math.max(...known) + 1 : undefined
		if (value !== undefined && layer.get(n) !== value) {
			layer.set(n, value)
			changed = true
		}
	}
}
const byLayer = new Map()
for (const [n, l] of [...layer].sort()) byLayer.set(l, [...(byLayer.get(l) ?? []), n])
for (const l of [...byLayer.keys()].sort((a, b) => a - b)) {
	console.log(`L${l}: ${byLayer.get(l).sort().join(' ')}`)
}
const unplaced = [...deps.keys()].filter((n) => !layer.has(n))
if (unplaced.length > 0) console.log('UNPLACED (cycle):', unplaced.join(' '))
