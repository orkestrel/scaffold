// Land an accepted conformance unit in one or more fleet checkouts: run the gate chain, render the
// diff and status evidence, retain them, stage by path (never `git add -A`), commit with the named
// message, push with retry. Usage: node land-conform.mjs <pkg>:<msgfile> ...
// Env: RETAIN_DIR (default /home/user/scaffold/.orkestrel/campaign/conform/units), ALLOW_RED_TEST=<pkg> for a
// package whose test gate is red on a standing failure the Orchestrator has ruled.
import { execFileSync, spawnSync } from 'node:child_process'
import { appendFileSync, writeFileSync, copyFileSync, mkdirSync } from 'node:fs'
const BRANCH = 'claude/orkestrel-npm-audit-deps-14ibta'
const LOG = '/home/user/work/logs/land-conform.log'
const EVIDENCE = '/home/user/work/evidence'
const RETAIN = process.env.RETAIN_DIR || '/home/user/scaffold/.orkestrel/campaign/conform/units'
mkdirSync(EVIDENCE, { recursive: true })
mkdirSync(RETAIN, { recursive: true })
const say = (line) => { appendFileSync(LOG, `${line}\n`); console.log(line) }
for (const arg of process.argv.slice(2)) {
	const [pkg, msg] = arg.split(':')
	const dir = pkg === 'scaffold' ? '/home/user/scaffold' : `/home/user/fleet/${pkg}`
	let red = false
	for (const script of ['format:check', 'lint:check', 'check', 'build']) {
		const run = spawnSync('npm', ['run', script], { cwd: dir, encoding: 'utf8' })
		say(`${pkg} ${script} exit=${run.status}`)
		if (run.status !== 0) { say(run.stdout.slice(-1500) + run.stderr.slice(-1500)); red = true; break }
	}
	if (!red) {
		const run = spawnSync('npm', ['test'], { cwd: dir, encoding: 'utf8' })
		say(`${pkg} test exit=${run.status}`)
		if (run.status !== 0) {
			say(run.stdout.slice(-3000) + run.stderr.slice(-1500))
			if ((process.env.ALLOW_RED_TEST || '').split(',').includes(pkg)) say(`${pkg} test red accepted as the standing failure (ALLOW_RED_TEST)`)
			else red = true
		}
	}
	if (red) { say(`${pkg} RED - not committed`); continue }
	// Stage by path: every changed or untracked path outside .orkestrel/ and tmp/.
	const status = execFileSync('git', ['-C', dir, 'status', '--short']).toString()
	const paths = status.split('\n').filter(Boolean).map((l) => l.slice(3).trim()).map((p) => (p.includes(' -> ') ? p.split(' -> ')[1] : p)).filter((p) => !p.startsWith('.orkestrel/') && !p.startsWith('tmp/'))
	if (paths.length === 0) { say(`${pkg} nothing to commit`); continue }
	for (const p of paths) execFileSync('git', ['-C', dir, 'add', '-N', '--', p], { stdio: 'ignore' })
	const diff = execFileSync('git', ['-C', dir, 'diff', 'HEAD', '--', ...paths]).toString()
	writeFileSync(`${EVIDENCE}/conform-${pkg}.diff`, diff)
	writeFileSync(`${EVIDENCE}/conform-${pkg}.status`, status)
	copyFileSync(`${EVIDENCE}/conform-${pkg}.diff`, `${RETAIN}/conform-${pkg}.diff.txt`)
	copyFileSync(`${EVIDENCE}/conform-${pkg}.status`, `${RETAIN}/conform-${pkg}.status.txt`)
	execFileSync('git', ['-C', dir, 'add', '--', ...paths])
	execFileSync('git', ['-C', dir, '-c', 'user.name=Claude', '-c', 'user.email=noreply@anthropic.com', 'commit', '-q', '-F', msg])
	let pushed = false
	for (const delay of [0, 2, 4, 8, 16]) {
		if (delay) spawnSync('sleep', [String(delay)])
		if (spawnSync('git', ['-C', dir, 'push', '-q', '-u', 'origin', BRANCH]).status === 0) { pushed = true; break }
	}
	const sha = execFileSync('git', ['-C', dir, 'rev-parse', '--short', 'HEAD']).toString().trim()
	say(`${pkg} committed ${sha} pushed=${pushed} paths=${paths.length}`)
}
