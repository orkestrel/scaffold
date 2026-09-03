// Assemble each package's conformance lanes and refuter rulings from a conform-slice workflow journal.
// Usage: node assemble-conform.mjs <runId> → writes /home/user/work/reports/conform-<pkg>.json, prints a summary.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
const D = `/root/.claude/projects/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/subagents/workflows/${process.argv[2]}`
mkdirSync('/home/user/work/reports', { recursive: true })
const lines = readFileSync(`${D}/journal.jsonl`, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l)).filter((l) => l.type === 'result')
const out = {}
for (const r of lines) {
	const head = readFileSync(`${D}/agent-${r.agentId}.jsonl`, 'utf8').slice(0, 6000)
	const m = head.match(/conform\/([\w-]+)-brief\.md/)
	if (!m) continue
	const pkg = m[1]
	const lane = /REFUTER lane/.test(head) ? 'refuter' : /OBJECTIVE lane/.test(head) ? 'objective' : /SUBJECTIVE lane/.test(head) ? 'subjective' : 'unknown'
	out[pkg] ??= { package: pkg }
	out[pkg][lane] = r.result
}
for (const [pkg, r] of Object.entries(out)) {
	const path = `/home/user/work/reports/conform-${pkg}.json`
	const prior = existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : {}
	writeFileSync(path, JSON.stringify({ ...prior, ...r }, null, 1))
	const o = r.objective, s = r.subjective, f = r.refuter
	const confirmed = (f?.rulings || []).filter((x) => x.verdict === 'CONFIRMED')
	console.log(`${pkg}: obj=${o ? (o.findings || []).length : '-'} subj=${s ? (s.findings || []).length : '-'} refuter=${f ? `${confirmed.length} confirmed / ${(f.rulings || []).length - confirmed.length} refuted` : '-'} breaking=${confirmed.filter((x) => x.breaking).length}`)
}
