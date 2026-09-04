// Compare a built dist/ against the published tarball of the same declared version, over every non-.map
// file, by file set and by whitespace-normalized content. Usage: node distdiff.mjs <package dir>
// Prints JSON { moved, added, removed, changed } or { moved: 'ERR', error } when no published copy exists
// under /home/user/work/published/<slug>-<version>/package (published.sh fetches them).
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join, relative } from 'node:path'
const dir = process.argv[2]
const pkg = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8'))
const slug = pkg.name.replace('@', '').replace('/', '-')
const pub = join('/home/user/work/published', `${slug}-${pkg.version}`, 'package', 'dist')
const local = join(dir, 'dist')
function walk(root) {
	const out = new Map()
	if (!existsSync(root)) return out
	const stack = [root]
	while (stack.length) {
		const d = stack.pop()
		for (const e of readdirSync(d, { withFileTypes: true })) {
			const p = join(d, e.name)
			if (e.isDirectory()) stack.push(p)
			else if (!e.name.endsWith('.map')) out.set(relative(root, p), readFileSync(p, 'utf8').replace(/\s+/g, ''))
		}
	}
	return out
}
if (!existsSync(pub)) { console.log(JSON.stringify({ moved: 'ERR', error: `no published copy at ${pub}` })); process.exit(0) }
if (!existsSync(local)) { console.log(JSON.stringify({ moved: 'ERR', error: `no built dist at ${local}` })); process.exit(0) }
const a = walk(local)
const b = walk(pub)
const added = [...a.keys()].filter((k) => !b.has(k)).sort()
const removed = [...b.keys()].filter((k) => !a.has(k)).sort()
const changed = [...a.keys()].filter((k) => b.has(k) && a.get(k) !== b.get(k)).sort()
console.log(JSON.stringify({ moved: added.length + removed.length + changed.length > 0, added, removed, changed }))
