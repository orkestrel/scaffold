// Derive the publish cascade from runtime dependencies AND peerDependencies, then verify
// alignment so no consumer can end up installing two copies of one package.
//
// The law: a runtime `dependencies` bump reaches every consumer of the published package,
// and every package downstream re-pins, re-runs its gates, bumps, and republishes, in layer
// order. Layers exist for a reason a flat pass cannot fix: two ranges that disagree install
// two copies of the same package, and the compiler reads them as two distinct types.
//
// A peerDependency range is the same hazard by a different door. A peer names a version the
// CONSUMER installs, so a peer range left naming the previous release while the runtime graph
// has moved is exactly the disagreement that duplicates a package. Peers are therefore cascade
// edges too, and every peer range naming a bumped package must be re-pinned in the same wave.
//
// A devDependency bump reaches nobody and cascades to no one, but its range is still re-pinned
// so the fleet reads one version everywhere.
'use strict'
const { readFileSync, existsSync, readdirSync } = require('node:fs')
const { join } = require('node:path')

const ROOT = '/workspace'
const SEEDS = process.argv.slice(2)
if (SEEDS.length === 0) {
	console.error('usage: node publish-cascade.cjs <seed> [seed...]')
	process.exit(2)
}

const manifests = new Map()
for (const entry of readdirSync(ROOT)) {
	const path = join(ROOT, entry, 'package.json')
	if (!existsSync(path)) continue
	const m = JSON.parse(readFileSync(path, 'utf8'))
	if (m.private === true) continue
	manifests.set(m.name, { repo: entry, manifest: m })
}
const scaffoldManifest = JSON.parse(readFileSync('/home/user/scaffold/package.json', 'utf8'))
manifests.set(scaffoldManifest.name, { repo: 'scaffold', manifest: scaffoldManifest })

const runtimeConsumers = new Map()
const peerConsumers = new Map()
function addEdge(map, dep, consumer) {
	if (!map.has(dep)) map.set(dep, new Set())
	map.get(dep).add(consumer)
}
for (const [name, { manifest }] of manifests) {
	for (const dep of Object.keys(manifest.dependencies ?? {})) addEdge(runtimeConsumers, dep, name)
	for (const dep of Object.keys(manifest.peerDependencies ?? {})) addEdge(peerConsumers, dep, name)
}

const seedNames = SEEDS.map((s) => (s.startsWith('@orkestrel/') ? s : `@orkestrel/${s}`))
const obliged = new Map()
for (const s of seedNames) obliged.set(s, 'seed')

let changed = true
while (changed) {
	changed = false
	for (const name of [...obliged.keys()]) {
		for (const c of runtimeConsumers.get(name) ?? []) {
			if (!obliged.has(c)) { obliged.set(c, 'cascade:runtime'); changed = true }
		}
		for (const c of peerConsumers.get(name) ?? []) {
			if (!obliged.has(c)) { obliged.set(c, 'cascade:peer'); changed = true }
		}
	}
}

const depth = new Map()
function layerOf(name, seen = new Set()) {
	if (depth.has(name)) return depth.get(name)
	if (seen.has(name)) return 0
	seen.add(name)
	const entry = manifests.get(name)
	const deps = Object.keys(entry?.manifest.dependencies ?? {}).filter((d) => manifests.has(d))
	const d = deps.length === 0 ? 0 : 1 + Math.max(...deps.map((x) => layerOf(x, seen)))
	depth.set(name, d)
	return d
}
for (const name of manifests.keys()) layerOf(name)

function nextVersion(v) { return v.replace(/(\d+)$/, (n) => String(Number(n) + 1)) }

const planned = new Map()
for (const [name] of obliged) {
	const cur = manifests.get(name)?.manifest.version
	if (cur) planned.set(name, nextVersion(cur))
}

const rows = [...obliged.entries()].map(([name, why]) => ({
	name, why,
	repo: manifests.get(name)?.repo ?? '(unknown)',
	version: manifests.get(name)?.manifest.version ?? '?',
	layer: name === '@orkestrel/scaffold' ? 'outside' : `L${depth.get(name) ?? 0}`,
	runtime: [...(runtimeConsumers.get(name) ?? [])].sort(),
	peers: [...(peerConsumers.get(name) ?? [])].sort(),
}))
rows.sort((a, b) => {
	const la = a.layer === 'outside' ? 99 : Number(a.layer.slice(1))
	const lb = b.layer === 'outside' ? 99 : Number(b.layer.slice(1))
	return la === lb ? a.name.localeCompare(b.name) : la - lb
})

console.log('=== publish cascade, in layer order ===')
let current = null
for (const r of rows) {
	if (r.layer !== current) { current = r.layer; console.log(`\n-- ${current} --`) }
	console.log(`  ${r.name}  ${r.version} -> ${planned.get(r.name)}  [${r.why}]`)
	if (r.runtime.length) console.log(`      runtime consumers: ${r.runtime.join(', ')}`)
	if (r.peers.length) console.log(`      PEER consumers:    ${r.peers.join(', ')}`)
}
console.log(`\ntotal obliged: ${rows.length}  (seeds ${rows.filter((r) => r.why === 'seed').length}, cascade ${rows.filter((r) => r.why !== 'seed').length})`)

console.log('\n=== re-pin obligations: every range naming a bumped package ===')
let repins = 0
for (const [name, { repo, manifest }] of [...manifests].sort((a, b) => a[0].localeCompare(b[0]))) {
	const lines = []
	for (const section of ['dependencies', 'peerDependencies', 'devDependencies']) {
		for (const [dep, range] of Object.entries(manifest[section] ?? {})) {
			if (!planned.has(dep)) continue
			const want = `^${planned.get(dep)}`
			if (range !== want) { lines.push(`      ${section}: ${dep} ${range} -> ${want}`); repins++ }
		}
	}
	if (lines.length) { console.log(`  ${repo} (${name})`); for (const l of lines) console.log(l) }
}
console.log(`  total re-pins required: ${repins}`)

console.log('\n=== peer/runtime alignment check ===')
let conflicts = 0
for (const [name, { repo, manifest }] of manifests) {
	const deps = manifest.dependencies ?? {}
	const peers = manifest.peerDependencies ?? {}
	for (const [dep, prange] of Object.entries(peers)) {
		if (deps[dep] !== undefined && deps[dep] !== prange) {
			console.log(`  CONFLICT ${repo}: ${dep} runtime ${deps[dep]} vs peer ${prange}`)
			conflicts++
		}
	}
}
// Across the fleet: every range naming one package must agree once the wave lands.
const byDep = new Map()
for (const [, { repo, manifest }] of manifests) {
	for (const section of ['dependencies', 'peerDependencies']) {
		for (const [dep, range] of Object.entries(manifest[section] ?? {})) {
			if (!manifests.has(dep)) continue
			const want = planned.has(dep) ? `^${planned.get(dep)}` : range
			if (!byDep.has(dep)) byDep.set(dep, new Map())
			byDep.get(dep).set(`${repo}:${section}`, planned.has(dep) ? want : range)
		}
	}
}
for (const [dep, holders] of [...byDep].sort((a, b) => a[0].localeCompare(b[0]))) {
	const distinct = new Set(holders.values())
	if (distinct.size > 1) {
		console.log(`  DIVERGENT ${dep}: ${[...distinct].join(' | ')}`)
		for (const [who, range] of holders) console.log(`      ${who} = ${range}`)
		conflicts++
	}
}
console.log(`  conflicts: ${conflicts}`)
