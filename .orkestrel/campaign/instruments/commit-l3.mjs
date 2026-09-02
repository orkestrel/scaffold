// Write one commit message per landed L3 unit from its returned JSON report, then commit, push,
// and re-stage each checkout serially. Usage: node commit-l3.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { execFileSync, spawnSync } from 'node:child_process'
const SUBJECTS = {
	server: 'Give the SSE stream a class, type the server refusal, and name the helpers by what they compute',
	browser: 'Rename the browser readers to parsers and reshape the frame, writer, and input surfaces',
	interpret: 'Reshape the interpret registry verbs and drop the template and generator options',
	terminal: 'Name the terminal renderers and return prompts from the manager',
	sea: 'Name the SEA readers, shell executor, and compression handler',
	qualifier: "Return reason's validation result and declare the qualifier error context",
	rater: "Name the rater builders and drop the line result's success flag",
	relation: "Name the relation manager's names and split the resolved relation union",
	workspace: 'Name the binary content member base64 and the decoded-size helper',
}
const TRAILER = '\n\nCo-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01Cb3GKyBNeLz88N7b4LPGYW\n'
const BRANCH = 'claude/orkestrel-npm-audit-deps-14ibta'
for (const pkg of Object.keys(SUBJECTS)) {
	const report = JSON.parse(readFileSync(`/home/user/work/reports/${pkg}-report.json`, 'utf8'))
	const refused = report.rows.filter((row) => row.state === 'refused').map((row) => row.id)
	const gates = report.gates.filter((gate) => gate.command.startsWith('npm run') || gate.command === 'npm test').map((gate) => `${gate.command.replace('npm run ', '')} ${gate.exit}`).join(', ')
	const body = `${SUBJECTS[pkg]}\n\nSymbols moved (from the unit's returned report):\n${report.symbols.map((symbol) => `- ${symbol}`).join('\n')}${refused.length ? `\n\nRefused with the rule text quoted in the report: ${refused.join('; ')}.` : ''}\n\nGates: ${gates}.${TRAILER}`
	writeFileSync(`/home/user/work/msg-${pkg}.txt`, body)
	const dir = `/home/user/fleet/${pkg}`
	execFileSync('git', ['-C', dir, 'add', '-A'])
	execFileSync('git', ['-C', dir, '-c', 'user.name=Claude', '-c', 'user.email=noreply@anthropic.com', 'commit', '-q', '-F', `/home/user/work/msg-${pkg}.txt`])
	let pushed = false
	for (const delay of [0, 2, 4, 8, 16]) {
		if (delay) spawnSync('sleep', [String(delay)])
		const push = spawnSync('git', ['-C', dir, 'push', '-q', '-u', 'origin', BRANCH])
		if (push.status === 0) { pushed = true; break }
	}
	const sha = execFileSync('git', ['-C', dir, 'rev-parse', '--short', 'HEAD']).toString().trim()
	console.log(`${pkg} committed ${sha} pushed=${pushed}`)
	const stage = spawnSync('/home/user/work/stage-closure.sh', [pkg], { encoding: 'utf8' })
	const ok = (stage.stdout.match(/ OK /g) || []).length
	console.log(`${pkg} restage exit=${stage.status} ${ok} OK rows`)
}
console.log('COMMIT-L3-DONE')
