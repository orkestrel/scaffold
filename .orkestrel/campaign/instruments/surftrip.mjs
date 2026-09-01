// Surface tripwire: names removed from an `export` declaration line in the diff
// that no longer appear as an export anywhere in the repo's src/ after the change.
import { execFileSync } from 'node:child_process'

const repos = process.argv.slice(2)
const DECL = /^-\s*export\s+(?:async\s+)?(?:function\*?|const|let|class|abstract class|interface|type|enum)\s+([A-Za-z_$][\w$]*)/
for (const repo of repos) {
	const dir = repo === 'scaffold' ? '/home/user/scaffold' : `/home/user/fleet/${repo}`
	const diff = execFileSync('git', ['-C', dir, 'diff'], { maxBuffer: 64 * 1024 * 1024 }).toString()
	const removed = new Set()
	for (const line of diff.split('\n')) {
		const m = line.match(DECL)
		if (m) removed.add(m[1])
	}
	const missing = []
	for (const name of removed) {
		let hit = ''
		try {
			hit = execFileSync('grep', ['-rlE', `export\\s+(async\\s+)?(function\\*?|const|let|class|abstract class|interface|type|enum)\\s+${name}\\b`, `${dir}/src`], { maxBuffer: 8 * 1024 * 1024 }).toString().trim()
		} catch { /* no match */ }
		if (!hit) missing.push(name)
	}
	console.log(`${repo}: removed-export names ${removed.size}, MISSING after change: ${missing.length}${missing.length ? ' -> ' + missing.join(', ') : ''}`)
}
