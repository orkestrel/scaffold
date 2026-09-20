// Orchestrator-run PLANT-PEER control (the bench sandbox refused to write package.json): plant a
// `peerDependencies.vue` entry, run the conformance project expecting red, restore the manifest
// byte for byte, run it again expecting green. Log beside this file as u1-plant-peer.log.txt.
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'

const root = 'C:/Users/mikes/WebstormProjects/veneer'
const path = root + '/package.json'
const original = readFileSync(path)
const digest = (bytes) => createHash('sha256').update(bytes).digest('hex')
const before = digest(original)
const manifest = JSON.parse(original.toString('utf8'))
manifest.peerDependencies = { vue: '^3.5.43' }
writeFileSync(path, JSON.stringify(manifest, null, '\t') + '\n')
const run = (label) => {
	let output = ''
	let code = 0
	try {
		output = execSync('npm run test:conformance', { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
	} catch (error) {
		code = typeof error.status === 'number' ? error.status : 1
		output = String(error.stdout ?? '') + String(error.stderr ?? '')
	}
	const tail = output.split(/\r?\n/).filter((line) => /Tests |Test Files|forbidden|peer|AssertionError|FAIL/.test(line)).slice(-8).join('\n')
	console.log(`--- ${label}: exit=${code} ---\n${tail}`)
	return code
}
const red = run('planted peerDependencies.vue')
writeFileSync(path, original)
const after = digest(readFileSync(path))
console.log(`restored: ${before === after ? 'byte-identical' : 'DIFFERS'} (${before.slice(0, 16)})`)
const green = run('restored manifest')
console.log(`PLANT-PEER: red=${red !== 0} green=${green === 0}`)
process.exit(red !== 0 && green === 0 && before === after ? 0 : 2)
