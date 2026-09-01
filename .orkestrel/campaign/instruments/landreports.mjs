// Extract completed writer reports from the workflow journal, write report files,
// and print a per-repo review summary. Idempotent; skips repos already landed.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'

const J = '/root/.claude/projects/-home-user-scaffold/249f2596-6386-5f66-868c-31383bbd6eeb/subagents/workflows/wf_a88c02f6-538/journal.jsonl'
const dir = '/home/user/scaffold/.orkestrel/campaign/fix/reports'
mkdirSync(dir, { recursive: true })

const lines = readFileSync(J, 'utf8').trim().split('\n')
const reports = new Map()
for (const l of lines) {
	if (!l.includes('"package":')) continue
	let j; try { j = JSON.parse(l) } catch { continue }
	const r = j.result ?? j.value ?? j
	const rep = typeof r === 'string' ? (() => { try { return JSON.parse(r) } catch { return undefined } })() : r
	const p = rep && rep.package ? rep : (rep && rep.result && rep.result.package ? rep.result : undefined)
	if (p && p.package) reports.set(p.package, p)
}

for (const [pkg, r] of reports) {
	let md = `# Fix report: ${pkg}\n\n## Dispositions\n\n`
	for (const d of r.dispositions) md += `- **${d.id}** ${d.action}${d.files ? ` (${d.files})` : ''}: ${d.note}\n`
	md += `\n## Gates\n\n`
	for (const g of r.gates) md += `- ${g.gate}: ${g.result}${g.excerpt ? ` — ${g.excerpt}` : ''}\n`
	md += `\n## Diffstat\n\n\`\`\`text\n${r.diffstat}\n\`\`\`\n\n- dist moves: ${r.dist_moves}\n`
	if (r.deviations) md += `\n## Deviations\n\n${r.deviations}\n`
	if (!existsSync(`${dir}/${pkg}.md`)) writeFileSync(`${dir}/${pkg}.md`, md)
	const gateBad = r.gates.filter(g => g.result !== 'pass').map(g => `${g.gate}=${g.result}`)
	const acts = {}
	for (const d of r.dispositions) acts[d.action] = (acts[d.action] || 0) + 1
	console.log(`${pkg}: gates ${gateBad.length ? 'RED [' + gateBad.join(', ') + ']' : 'green'} | ${JSON.stringify(acts)} | dist:${r.dist_moves}${r.deviations ? ' | DEVIATION: ' + r.deviations.slice(0, 160).replace(/\n/g, ' ') : ''}`)
}
console.log('reports landed:', reports.size)
