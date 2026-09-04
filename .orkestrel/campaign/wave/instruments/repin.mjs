// Re-pin every @orkestrel range in a manifest to the caret of the version the registry serves, and set the
// package's own version to the registry's next patch. Usage: node repin.mjs <package dir> [--no-bump]
// Prints one line per change. Reads the registry through `npm view`; never installs.
import { readFileSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join } from 'node:path'
const dir = process.argv[2]
const bump = !process.argv.includes('--no-bump')
const path = join(dir, 'package.json')
const text = readFileSync(path, 'utf8')
const pkg = JSON.parse(text)
function served(name) {
	try { return execFileSync('npm', ['view', name, 'version'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim() } catch { return undefined }
}
const changes = []
for (const field of ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']) {
	const o = pkg[field]
	if (!o) continue
	for (const name of Object.keys(o)) {
		if (!name.startsWith('@orkestrel/')) continue
		const v = served(name)
		if (!v) { changes.push(`${field} ${name}: registry serves nothing; range ${o[name]} kept`); continue }
		const range = `^${v}`
		if (o[name] !== range) { changes.push(`${field} ${name}: ${o[name]} -> ${range}`); o[name] = range }
	}
}
if (bump) {
	const v = served(pkg.name)
	if (!v) changes.push(`version: registry serves nothing for ${pkg.name}; ${pkg.version} kept`)
	else {
		const [a, b, c] = v.split('.').map(Number)
		const next = `${a}.${b}.${c + 1}`
		changes.push(`version: registry ${v}, manifest ${pkg.version} -> ${next}`)
		pkg.version = next
	}
}
const indent = text.match(/^(\t| +)"name"/m)?.[1] ?? '\t'
writeFileSync(path, JSON.stringify(pkg, null, indent) + '\n')
console.log(changes.length ? changes.join('\n') : 'no change')
