// Render the audit verdict skeleton for one TSDoc voice unit from the saved workflow result.
// Usage: node mkverdict-voice.mjs <pkg> <tip> [landing note]
import { readFileSync, writeFileSync } from 'node:fs'
const [pkg, tip, note = ''] = process.argv.slice(2)
const r = JSON.parse(readFileSync(`/home/user/work/reports/voice-${pkg}.json`, 'utf8'))
const k = r.report.rewritten
const gates = r.report.gates.map((g) => `${g.command.replace('npm run ', '')} ${g.exit}`).join(', ')
const md = `# Audit verdict — unit voice-${pkg}

Bench: Sol dark; subjective lane on the writer's engine (Opus 5) in a clean context, told so;
\`checker\` on Sonnet; the objective lane ${r.objective ? 'ran on Opus 5 in a clean context' : 'did not run (the subjective lane held meaning and the checker found no code token moved)'}. Subject: the uncommitted tree audited in place, then landed at \`${tip}\`
(\`units/voice-${pkg}.diff\`, \`units/voice-${pkg}.status\`, \`units/voice-${pkg}-report.md\`).
Rewritten per the writer: imperative ${k.imperative}, verbless ${k.verbless}, name ${k.name}, returns ${k.returns}. Writer's gates: ${gates}.

## Subjective lane (${r.subjective.terminal}${r.subjective.failing.length ? ' ' + r.subjective.failing.join(', ') : ''})

${r.subjective.verdicts.trim()}

${r.subjective.findings.trim() ? 'Findings outside the claims:\n\n' + r.subjective.findings.trim() + '\n' : ''}
## Checker lane (${r.checker.terminal}${r.checker.failing.length ? ' ' + r.checker.failing.join(', ') : ''})

${r.checker.verdicts.trim()}

${r.checker.findings.trim() ? 'Findings outside the claims:\n\n' + r.checker.findings.trim() + '\n' : ''}
## Orchestrator

${note || 'RULINGS_PENDING'}
`
writeFileSync(`/home/user/scaffold/.orkestrel/campaign/voice/units/voice-${pkg}-audit-verdict.md`, md)
console.log(`voice-${pkg} verdict written (${r.subjective.terminal}/${r.checker.terminal})`)
