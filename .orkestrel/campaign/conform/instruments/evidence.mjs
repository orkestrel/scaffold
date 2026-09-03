// Write a unit's review evidence: `git diff HEAD` (after `git add -N` on every untracked file) and
// `git status --short`, to /home/user/work/evidence/conform-<pkg>.diff and .status.
// Usage: node /home/user/scaffold/tmp/work/evidence.mjs <pkg> [<base>]
// One plain command with no shell redirect, so a unit can run it under the shell discipline.
import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'

const pkg = process.argv[2]
const base = process.argv[3] ?? 'HEAD'
if (!pkg || !/^[a-z]+$/.test(pkg)) {
	console.error('usage: node evidence.mjs <pkg> [<base>]')
	process.exit(2)
}
const repo = pkg === 'scaffold' ? '/home/user/scaffold' : `/home/user/fleet/${pkg}`
const dir = '/home/user/work/evidence'
const git = (...args) => execFileSync('git', ['-C', repo, ...args], { encoding: 'utf8', maxBuffer: 1 << 28 })

mkdirSync(dir, { recursive: true })
const untracked = git('ls-files', '--others', '--exclude-standard').split('\n').filter(Boolean)
if (untracked.length > 0) git('add', '-N', '--', ...untracked)
const diff = git('diff', base)
const status = git('status', '--short')
writeFileSync(`${dir}/conform-${pkg}.diff`, diff)
writeFileSync(`${dir}/conform-${pkg}.status`, status)
console.log(`${dir}/conform-${pkg}.diff ${diff.split('\n').length} lines`)
console.log(`${dir}/conform-${pkg}.status ${status.split('\n').filter(Boolean).length} entries`)
if (untracked.length > 0) console.log(`git add -N: ${untracked.join(' ')}`)
