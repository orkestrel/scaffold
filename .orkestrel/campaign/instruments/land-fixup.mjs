// Land a fix-up in one or more fleet checkouts: run the gate chain, commit with the named
// message, push with retry, pack the tip. Usage: node land-fixup.mjs <pkg>:<msgfile> ...
import { execFileSync, spawnSync } from 'node:child_process'
import { appendFileSync } from 'node:fs'
const BRANCH = 'claude/orkestrel-npm-audit-deps-14ibta'
const LOG = '/home/user/work/logs/land-fixup.log'
const say = (line) => { appendFileSync(LOG, `${line}\n`); console.log(line) }
for (const arg of process.argv.slice(2)) {
	const [pkg, msg] = arg.split(':')
	const dir = `/home/user/fleet/${pkg}`
	let red = false
	for (const script of ['format:check', 'lint:check', 'check', 'build']) {
		const run = spawnSync('npm', ['run', script], { cwd: dir, encoding: 'utf8' })
		say(`${pkg} ${script} exit=${run.status}`)
		if (run.status !== 0) { say(run.stdout.slice(-1500) + run.stderr.slice(-1500)); red = true; break }
	}
	if (!red) {
		const run = spawnSync('npm', ['test'], { cwd: dir, encoding: 'utf8' })
		say(`${pkg} test exit=${run.status}`)
		if (run.status !== 0) { say(run.stdout.slice(-3000) + run.stderr.slice(-1500)); red = true }
	}
	if (red) { say(`${pkg} RED - not committed`); continue }
	execFileSync('git', ['-C', dir, 'add', '-A'])
	execFileSync('git', ['-C', dir, '-c', 'user.name=Claude', '-c', 'user.email=noreply@anthropic.com', 'commit', '-q', '-F', msg])
	let pushed = false
	for (const delay of [0, 2, 4, 8, 16]) {
		if (delay) spawnSync('sleep', [String(delay)])
		if (spawnSync('git', ['-C', dir, 'push', '-q', '-u', 'origin', BRANCH]).status === 0) { pushed = true; break }
	}
	const sha = execFileSync('git', ['-C', dir, 'rev-parse', '--short', 'HEAD']).toString().trim()
	say(`${pkg} committed ${sha} pushed=${pushed}`)
	const pack = spawnSync('/home/user/work/pack-dep.sh', [pkg], { encoding: 'utf8' })
	say(`${pkg} pack exit=${pack.status} ${pack.stdout.trim()} ${pack.stderr.trim()}`)
}
say('LAND-FIXUP-DONE')
