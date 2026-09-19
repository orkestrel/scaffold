import { readFileSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'

// Re-pin from what the registry serves rather than from a remembered number.
// A bare `.cmd` spawn returns EINVAL on this host, so the read takes a shell.
const served = execFileSync('npm.cmd', ['view', '@orkestrel/scaffold', 'version'], {
	encoding: 'utf8',
	shell: true,
	windowsHide: true,
}).trim()

const want = `^${served}`
const manifest = JSON.parse(readFileSync('package.json', 'utf8'))
let moved = 0

for (const field of ['dependencies', 'devDependencies', 'peerDependencies']) {
	const block = manifest[field]
	if (block === undefined) continue
	const current = block['@orkestrel/scaffold']
	if (current === undefined || current === want) continue
	console.log(`repin ${field} @orkestrel/scaffold ${current} -> ${want}`)
	block['@orkestrel/scaffold'] = want
	moved += 1
}

if (moved > 0) writeFileSync('package.json', `${JSON.stringify(manifest, undefined, '\t')}\n`)
console.log(`registry serves ${served}; ranges moved: ${moved}`)
