// Assemble the breaking work order from the landed writer reports, grouped by publish layer.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
const LAYER = { codec: 'L0', contract: 'L0', msg: 'L0', sse: 'L0', test: 'L0',
	abort: 'L1', budget: 'L1', csv: 'L1', emitter: 'L1', html: 'L1', indexeddb: 'L1', ndjson: 'L1', sqlite: 'L1', timeout: 'L1', tool: 'L1',
	console: 'L2', database: 'L2', form: 'L2', markdown: 'L2', middleware: 'L2', pool: 'L2', process: 'L2', reason: 'L2', router: 'L2', table: 'L2', template: 'L2', websocket: 'L2',
	browser: 'L3', guide: 'L3', interpret: 'L3', lsp: 'L3', mcp: 'L3', qualifier: 'L3', queue: 'L3', rater: 'L3', relation: 'L3', scaffold: 'L3', sea: 'L3', server: 'L3', terminal: 'L3', workspace: 'L3',
	brief: 'L4', probe: 'L4', program: 'L4', worker: 'L4', workflow: 'L4', agent: 'L5', ollama: 'L6', toolbox: 'L6' }
const dir = '/home/user/scaffold/.orkestrel/campaign/fix/reports'
const rows = []
const counts = {}
for (const f of readdirSync(dir).filter(f => f.endsWith('.md'))) {
	const pkg = f.replace('.md', '')
	for (const line of readFileSync(`${dir}/${f}`, 'utf8').split('\n')) {
		const m = line.match(/^- \*\*(\S+)\*\* (\w+)(?: \(([^)]*)\))?: (.*)$/)
		if (!m) continue
		counts[m[2]] = (counts[m[2]] || 0) + 1
		if (m[2] === 'deferred_breaking') rows.push({ pkg, id: m[1], note: m[4] })
	}
}
try {
	for (const x of JSON.parse(readFileSync('/home/user/scaffold/.orkestrel/campaign/fix/work-order-extra.json', 'utf8'))) rows.push(x)
} catch {}
rows.sort((a, b) => (LAYER[a.pkg] || 'L9').localeCompare(LAYER[b.pkg] || 'L9') || a.pkg.localeCompare(b.pkg) || a.id.localeCompare(b.id, undefined, { numeric: true }))
const landed = readdirSync(dir).filter(f => f.endsWith('.md')).length
let md = `# Breaking-change work order (deferred from fix round 1)\n\nEach row is a verified DRIFT or DRIFT-RESHAPE repair the fix round deferred because applying it\nmoves the published surface: a renamed or removed export, member, event, option key, or union\nmember, a non-additive signature change, or an unpinned behavior change. The finding text and\nthe corrected repair live in the package dossier under \`fix/<package>.md\`; the writer's reason\nfor deferring is quoted from \`fix/reports/<package>.md\`.\n\nRows are grouped by publish layer from the catalog. Applying a layer's rows obliges every runtime\ndependent of that package to re-pin and republish in layer order, so a wave that takes this work\norder runs L0 first and L6 last. Nothing here is applied; each row awaits the user's approval.\n\n`
let cur = ''
for (const r of rows) {
	const l = LAYER[r.pkg] || 'L?'
	if (l !== cur) { md += `\n## ${l}\n\n`; cur = l }
	md += `- **${r.pkg} ${r.id}** — ${r.note}\n`
}
writeFileSync('/home/user/scaffold/.orkestrel/campaign/fix/work-order.md', md)
console.log('reports read:', landed, '| dispositions:', JSON.stringify(counts), '| work-order rows:', rows.length)
