// Registry evidence for one checkout: every @orkestrel range in its manifest against what the
// registry serves, plus the package's own published version. Read-only.
import { readFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

const root = process.argv[2]
const manifest = JSON.parse(readFileSync(`${root}/package.json`, 'utf8'))
const groups = ['dependencies', 'peerDependencies', 'devDependencies']
function view(name) {
	const result = spawnSync('npm.cmd', ['view', name, 'version'], { encoding: 'utf8', shell: true, windowsHide: true })
	return result.status === 0 ? result.stdout.trim().split('\n').pop().trim() : `unreadable (${result.stderr.trim().split('\n').pop()})`
}
console.log(`${manifest.name} local ${manifest.version} registry ${view(manifest.name)}`)
for (const group of groups) {
	for (const [name, range] of Object.entries(manifest[group] ?? {})) {
		if (!name.startsWith('@orkestrel/')) continue
		const served = view(name)
		const caret = `^${served}`
		console.log(`${group.padEnd(16)} ${name.padEnd(24)} ${String(range).padEnd(12)} registry ${served}${range === caret ? '' : '  <- differs'}`)
	}
}
