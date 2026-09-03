// Land an accepted conformance unit in one or more fleet checkouts: run the gate chain, render the
// diff and status evidence, retain them, stage by path (never `git add -A`), commit with the named
// message, push with retry. Usage: node land-conform.mjs <pkg>:<msgfile> ...
// Env: RETAIN_DIR (default /home/user/scaffold/.orkestrel/campaign/conform/units), ALLOW_RED_TEST=<pkg> for a
// package whose test gate is red on a standing failure the Orchestrator has ruled.
import { execFileSync, spawnSync } from 'node:child_process'
import { appendFileSync, writeFileSync, copyFileSync, mkdirSync, readFileSync } from 'node:fs'
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
	if (!red) {
		// The blueprint gate: `scaffold audit --offline` reads the vendored file set and the setup proofs, which no
		// audit lane runs. Clean output is the single summary line with a zero drift count; anything else is red.
		const audit = () => {
			const run = spawnSync('npx', ['scaffold', 'audit', '--offline'], { cwd: dir, encoding: 'utf8' })
			const out = `${run.stdout || ''}${run.stderr || ''}`
			const lines = out.split('\n').map((l) => l.trim()).filter(Boolean)
			// Drift rows are the table's `│ path │ group │ drift │` lines; an advisory such as the integration seed's
			// "composes nothing" note (websocket, 17:33 UTC) is neither drift nor the summary and does not redden.
			const rows = lines.filter((l) => l.startsWith('│') && !l.includes(' path '))
			const summary = lines.some((l) => /^0 of \d+ planned paths drifted from the plan\./.test(l))
			const clean = run.status === 0 && summary && rows.length === 0
			return { status: run.status, out, lines, rows, clean }
		}
		let result = audit()
		// A browser-environment target on scaffold 0.0.60 carries a vendored `configs/browsers.ts` behind the plan's
		// bytes (database 16:19, console 16:45 UTC). The sanctioned fix is `scaffold repair`, which also rewrites the
		// manifest's devDependency floors without the lockfile; the manifest is restored from the pre-repair bytes
		// and the floors wait for the fleet-wide manifest unit. Any other drift stays red.
		const onlyBrowsers = !result.clean && result.rows.length > 0 && result.rows.every((l) => l.includes('configs/browsers.ts') && l.includes('stale'))
		if (!result.clean && onlyBrowsers) {
			const manifest = readFileSync(`${dir}/package.json`, 'utf8')
			const repair = spawnSync('npx', ['scaffold', 'repair'], { cwd: dir, encoding: 'utf8' })
			say(`${pkg} scaffold repair exit=${repair.status} (configs/browsers.ts stale): ${(repair.stdout || '').trim().split('\n').slice(-2).join(' | ')}`)
			if (readFileSync(`${dir}/package.json`, 'utf8') !== manifest) { writeFileSync(`${dir}/package.json`, manifest); say(`${pkg} package.json restored to its pre-repair bytes (the repair's floor bumps wait for the manifest unit)`) }
			result = audit()
		}
		writeFileSync(`${RETAIN}/conform-${pkg}.audit.txt`, result.out)
		say(`${pkg} scaffold audit --offline exit=${result.status} ${result.clean ? 'clean' : 'FINDINGS'}`)
		// The canon checkout is the source the audit compares a target against, never a target: its full AGENTS.md
		// and CLAUDE.md read as stale against the pointer templates and its .codex and .cursor files as foreign
		// (scaffold, 22:12 UTC). ALLOW_CANON_AUDIT=<pkg> records that reading instead of reddening the landing.
		if (!result.clean && process.env.ALLOW_CANON_AUDIT === pkg) { say(`${pkg} audit reading recorded, not a gate for the canon checkout`) }
		else if (!result.clean) { say(result.out.slice(-2000)); red = true }
	}
	if (red) { say(`${pkg} RED - not committed`); continue }
	// Stage by path: every changed or untracked path outside .orkestrel/ and tmp/.
	const status = execFileSync('git', ['-C', dir, 'status', '--short']).toString()
	// A rename row (`R old -> new`, staged by `git mv` or detected in the work tree from a deletion beside an
	// intent-to-add) names two paths, and both are staged: console's landing (cac35cd) took the new path alone
	// and left the old paths tracked at the commit while the work tree had them deleted.
	const entries = status.split('\n').filter(Boolean).map((l) => ({ index: l[0], work: l[1], path: l.slice(3).trim() })).flatMap((e) => (e.path.includes(' -> ') ? e.path.split(' -> ').map((p, i) => ({ ...e, path: p.trim(), old: i === 0 })) : [e])).filter((e) => !e.path.startsWith('.orkestrel/') && !e.path.startsWith('tmp/'))
	const paths = entries.map((e) => e.path)
	if (paths.length === 0) { say(`${pkg} nothing to commit`); continue }
	// Intent-to-add only the untracked paths; a deletion already staged (`D `) is in the index and `git add` on its
	// path fails with "pathspec did not match", so it is left as it is and the commit carries it.
	for (const e of entries) if (e.index === '?') execFileSync('git', ['-C', dir, 'add', '-N', '--', e.path], { stdio: 'ignore' })
	// The old half of a rename the index already carries (`RM old -> new`, sea's `seals/` → `seas/` at 19:49 UTC)
	// is gone from the index and the work tree, so `git add` on it fails with "pathspec did not match".
	const addable = entries.filter((e) => !(e.index === 'D' && e.work === ' ') && !(e.old && e.index === 'R')).map((e) => e.path)
	const diff = execFileSync('git', ['-C', dir, 'diff', 'HEAD', '--', ...paths]).toString()
	writeFileSync(`${EVIDENCE}/conform-${pkg}.diff`, diff)
	writeFileSync(`${EVIDENCE}/conform-${pkg}.status`, status)
	copyFileSync(`${EVIDENCE}/conform-${pkg}.diff`, `${RETAIN}/conform-${pkg}.diff.txt`)
	copyFileSync(`${EVIDENCE}/conform-${pkg}.status`, `${RETAIN}/conform-${pkg}.status.txt`)
	if (addable.length > 0) execFileSync('git', ['-C', dir, 'add', '--', ...addable])
	execFileSync('git', ['-C', dir, '-c', 'user.name=Claude', '-c', 'user.email=noreply@anthropic.com', 'commit', '-q', '-F', msg])
	let pushed = false
	for (const delay of [0, 2, 4, 8, 16]) {
		if (delay) spawnSync('sleep', [String(delay)])
		if (spawnSync('git', ['-C', dir, 'push', '-q', '-u', 'origin', BRANCH]).status === 0) { pushed = true; break }
	}
	const sha = execFileSync('git', ['-C', dir, 'rev-parse', '--short', 'HEAD']).toString().trim()
	say(`${pkg} committed ${sha} pushed=${pushed} paths=${paths.length}`)
}
