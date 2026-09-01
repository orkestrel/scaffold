// Parses a .cpuprofile: aggregates self time per (functionName, url:line), prints top frames.
// Run: node parse-cpuprofile.mjs <file.cpuprofile>
/* eslint-disable */
import { readFileSync } from 'node:fs'

const profile = JSON.parse(readFileSync(process.argv[2], 'utf8'))
const nodes = new Map(profile.nodes.map(n => [n.id, n]))
const self = new Map()
let total = 0
for (let i = 0; i < profile.samples.length; i++) {
	const dt = profile.timeDeltas[i] ?? 0
	if (dt <= 0) continue
	total += dt
	const node = nodes.get(profile.samples[i])
	if (!node) continue
	const f = node.callFrame
	const key = `${f.functionName || '(anonymous)'} @ ${(f.url || '').split('/').slice(-1)[0]}:${f.lineNumber + 1}`
	self.set(key, (self.get(key) ?? 0) + dt)
}
const rows = [...self.entries()].sort((a, b) => b[1] - a[1])
console.log(`total sampled ${(total / 1000).toFixed(0)} ms; frames ${rows.length}`)
let captured = 0
for (const [key, dt] of rows.slice(0, 22)) {
	const pct = (dt / total) * 100
	captured += pct
	console.log(`${pct.toFixed(1).padStart(5)}%  ${key}`)
}
console.log(`top-22 capture: ${captured.toFixed(1)}% of samples`)
