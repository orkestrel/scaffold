// Assemble each package's implementer report and lane verdicts from a voice-slice workflow journal.
// Usage: node assemble-voice.mjs <runId>   → writes /home/user/work/reports/voice-<pkg>.json, prints terminals, deviations, broken claims.
import { readFileSync, writeFileSync } from 'node:fs'
const D = `/root/.claude/projects/-home-user-scaffold/249f2596-6386-5f66-868c-31383bbd6eeb/subagents/workflows/${process.argv[2]}`
const lines = readFileSync(`${D}/journal.jsonl`, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l)).filter((l) => l.type === 'result')
const out = {}
for (const r of lines) {
	const first = readFileSync(`${D}/agent-${r.agentId}.jsonl`, 'utf8').slice(0, 4000)
	const meta = JSON.parse(readFileSync(`${D}/agent-${r.agentId}.meta.json`, 'utf8'))
	const m = first.match(/voice-(\w+)-audit-(subjective|checker)-brief/) || first.match(/voice-(\w+)-brief/)
	const pkg = m[1]; const lane = meta.agentType === 'implementer' ? 'report' : meta.agentType === 'reviewer' ? 'subjective' : 'checker'
	out[pkg] ??= { package: pkg }; out[pkg][lane] = r.result
}
for (const [pkg, r] of Object.entries(out)) {
	writeFileSync(`/home/user/work/reports/voice-${pkg}.json`, JSON.stringify(r, null, 1))
	console.log(`\n===== ${pkg} rewritten=${JSON.stringify(r.report?.rewritten)} gates=${r.report?.gates.map((g) => g.exit).join('')} subj=${r.subjective?.terminal} ${r.subjective?.failing} chk=${r.checker?.terminal} ${r.checker?.failing}`)
	if (r.report?.deviations.length) console.log('DEVIATIONS:\n' + r.report.deviations.map((d) => ' - ' + d.slice(0, 600)).join('\n'))
	for (const lane of ['subjective', 'checker']) {
		const v = r[lane]; if (!v || v.terminal !== 'FAIL') continue
		const text = v.verdicts + '\n' + v.findings
		const paras = text.split(/\n(?=\s*(?:#+\s*)?(?:Claim\s*)?\d+[.)\s—-])/).filter((p) => /BROKEN/.test(p))
		console.log(`${lane.toUpperCase()} BROKEN:\n` + (paras.length ? paras : [text.slice(text.search(/BROKEN/) - 300, text.search(/BROKEN/) + 1500)]).map((p) => p.trim().slice(0, 1600)).join('\n---\n'))
	}
}
