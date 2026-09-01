// Reconcile the fix-round audit lanes: parse both audit workflows' journals into per-package lane
// verdicts and draft fix/audit-1-verdict.md with every REFUTED claim and misapplied finding listed
// for the Orchestrator's ruling. Usage: node auditverdicts.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
const W = '/root/.claude/projects/-home-user-scaffold/249f2596-6386-5f66-868c-31383bbd6eeb/subagents/workflows'
const RUNS = ['wf_fb4a8aaa-e90', 'wf_e17268d6-07a']
const lanes = {} // pkg -> { reviewer, checker }
for (const run of RUNS) {
	const p = `${W}/${run}/journal.jsonl`
	if (!existsSync(p)) continue
	for (const line of readFileSync(p, 'utf8').split('\n')) {
		if (!line.trim()) continue
		let e; try { e = JSON.parse(line) } catch { continue }
		if (e.type !== 'result' || !e.result || typeof e.result !== 'object' || !e.result.claims) continue
		const metaPath = `${W}/${run}/agent-${e.agentId}.meta.json`
		if (!existsSync(metaPath)) continue
		const meta = JSON.parse(readFileSync(metaPath, 'utf8'))
		const lane = meta.agentType === 'reviewer' ? 'reviewer' : meta.agentType === 'checker' ? 'checker' : null
		const pkg = e.result.package
		if (!lane || !pkg) continue
		;(lanes[pkg] ||= {})[lane] = e.result
	}
}
const pkgs = Object.keys(lanes).sort()
let md = `# Fix round 1 audit verdict (draft from the lane journals)\n\nRounds: workflows ${RUNS.join(', ')}. Lanes: reviewer (Claude Opus 5, read-only) and checker (Claude Sonnet, read-only), blind, on \`fix/audit-brief.md\`. Sol bench dark; substitution recorded. This draft lists every REFUTED claim and misapplied finding for reconciliation; the Orchestrator's ruling follows each package.\n\n`
const summary = []
for (const pkg of pkgs) {
	const l = lanes[pkg]
	const refuted = []
	for (const lane of ['reviewer', 'checker']) {
		const v = l[lane]; if (!v) { refuted.push({ lane, claim: '-', evidence: 'LANE DID NOT RETURN' }); continue }
		for (const c of v.claims) if (c.verdict === 'REFUTED') refuted.push({ lane, claim: c.claim, evidence: c.evidence })
		for (const m of v.misapplied || []) refuted.push({ lane, claim: `misapplied ${m.id}`, evidence: `${m.problem} — correct: ${m.correct}` })
	}
	const terminal = `reviewer ${l.reviewer ? l.reviewer.terminal : 'MISSING'}, checker ${l.checker ? l.checker.terminal : 'MISSING'}`
	summary.push(`${pkg}: ${terminal}, refutations ${refuted.length}`)
	md += `## ${pkg} — ${terminal}\n\n`
	if (!refuted.length) md += `Both lanes confirmed every claim.\n\n`
	for (const r of refuted) md += `- **${r.lane}, claim ${r.claim}:** ${r.evidence}\n`
	if (refuted.length) md += `\n**Ruling:** _pending_\n\n`
}
writeFileSync('/home/user/scaffold/.orkestrel/campaign/fix/audit-1-verdict.md', md)
console.log(summary.join('\n'))
console.log('packages with lane results:', pkgs.length)
