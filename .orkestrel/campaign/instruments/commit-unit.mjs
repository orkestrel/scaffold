// Commit, push, and re-stage one landed breaking unit from its returned JSON report.
// Usage: node commit-unit.mjs <pkg> "<subject line>"
import { readFileSync, writeFileSync } from 'node:fs'
import { execFileSync, spawnSync } from 'node:child_process'
const [pkg, subject] = process.argv.slice(2)
if (!pkg || !subject) throw new Error('usage: commit-unit.mjs <pkg> "<subject>"')
const TRAILER = '\n\nCo-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01Cb3GKyBNeLz88N7b4LPGYW\n'
const BRANCH = 'claude/orkestrel-npm-audit-deps-14ibta'
const report = JSON.parse(readFileSync(`/home/user/work/reports/${pkg}-report.json`, 'utf8'))
const refused = report.rows.filter((row) => row.state === 'refused').map((row) => row.id)
const gates = report.gates.filter((gate) => gate.command.startsWith('npm run') || gate.command === 'npm test').map((gate) => `${gate.command.replace('npm run ', '')} ${gate.exit}`).join(', ')
const body = `${subject}\n\nSymbols moved (from the unit's returned report):\n${report.symbols.map((symbol) => `- ${symbol}`).join('\n')}${refused.length ? `\n\nRefused with the rule text quoted in the report: ${refused.join('; ')}.` : ''}\n\nGates: ${gates}.${TRAILER}`
writeFileSync(`/home/user/work/msg-${pkg}.txt`, body)
const dir = `/home/user/fleet/${pkg}`
execFileSync('git', ['-C', dir, 'add', '-A'])
execFileSync('git', ['-C', dir, '-c', 'user.name=Claude', '-c', 'user.email=noreply@anthropic.com', 'commit', '-q', '-F', `/home/user/work/msg-${pkg}.txt`])
let pushed = false
for (const delay of [0, 2, 4, 8, 16]) {
	if (delay) spawnSync('sleep', [String(delay)])
	if (spawnSync('git', ['-C', dir, 'push', '-q', '-u', 'origin', BRANCH]).status === 0) { pushed = true; break }
}
const sha = execFileSync('git', ['-C', dir, 'rev-parse', '--short', 'HEAD']).toString().trim()
console.log(`${pkg} committed ${sha} pushed=${pushed}`)
const stage = spawnSync('/home/user/work/stage-closure.sh', [pkg], { encoding: 'utf8' })
console.log(`${pkg} restage exit=${stage.status} ${(stage.stdout.match(/ OK /g) || []).length} OK rows`)
