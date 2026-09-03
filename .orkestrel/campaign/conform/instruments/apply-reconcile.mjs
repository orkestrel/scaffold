// Apply the Orchestrator's reconciliation marks to a package's rulings file, append the reconcile
// section, generate the briefs, and write the marker — the mechanical half of the reconcile lane.
// Usage: node apply-reconcile.mjs <pkg> <marks.json>
// marks.json: { "folded": [{ "id", "carrier" }], "orchestrator": [{ "id", "reason" }],
//              "breaking": [{ "id", "consumers": ["checkout path:line", ...] }], "note": "..." }
import { readFileSync, writeFileSync, appendFileSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
const [pkg, marksPath] = process.argv.slice(2)
if (!pkg || !marksPath) { console.error('usage: node apply-reconcile.mjs <pkg> <marks.json>'); process.exit(2) }
const REPORTS = '/home/user/work/reports'
const SCRATCH = '/home/user/scaffold/tmp/work'
const file = `${REPORTS}/conform-${pkg}.json`
const report = JSON.parse(readFileSync(file, 'utf8'))
const marks = JSON.parse(readFileSync(marksPath, 'utf8'))
const rulings = report.refuter?.rulings || []
const byId = new Map(rulings.map((r) => [r.id, r]))
const missing = [...(marks.folded || []), ...(marks.orchestrator || []), ...(marks.breaking || [])].map((m) => m.id).filter((id) => !byId.has(id))
if (missing.length > 0) { console.error(`unknown ruling ids: ${missing.join(', ')}`); process.exit(2) }
for (const m of marks.folded || []) { const r = byId.get(m.id); r.verdict = 'FOLDED'; r.orchestrator = `folded into ${m.carrier}` }
for (const m of marks.orchestrator || []) { const r = byId.get(m.id); r.verdict = 'ORCHESTRATOR'; r.orchestrator = m.reason }
writeFileSync(file, JSON.stringify(report, null, 1))
const lines = [`\n## ${pkg} (${new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC)\n`]
for (const m of marks.folded || []) lines.push(`- ${m.id}: FOLDED into ${m.carrier}`)
for (const m of marks.orchestrator || []) lines.push(`- ${m.id}: ORCHESTRATOR — ${m.reason}`)
for (const m of marks.breaking || []) lines.push(`- ${m.id} (breaking): ${m.consumers && m.consumers.length ? m.consumers.join(', ') : 'no source consumer'}`)
if (marks.note) lines.push(`- note: ${marks.note}`)
appendFileSync(`${SCRATCH}/reconcile.md`, lines.join('\n') + '\n')
console.log(execFileSync('node', [`${SCRATCH}/mkimplement.mjs`, pkg], { encoding: 'utf8' }).trim())
writeFileSync(`${REPORTS}/conform-${pkg}.reconciled`, `${new Date().toISOString()}\n`)
const confirmed = rulings.filter((r) => r.verdict === 'CONFIRMED').length
console.log(`${pkg}: reconciled — confirmed=${confirmed} folded=${(marks.folded || []).length} orchestrator=${(marks.orchestrator || []).length} marker=${existsSync(`${REPORTS}/conform-${pkg}.reconciled`)}`)
