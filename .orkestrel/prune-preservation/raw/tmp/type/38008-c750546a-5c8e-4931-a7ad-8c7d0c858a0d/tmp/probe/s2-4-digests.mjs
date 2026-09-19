// Probe: compares the committed host.json digests with the working-tree bytes for the paths this
// unit edited, so a stale-inventory failure can be read as staleness rather than as damage.
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

const manifest = JSON.parse(readFileSync('host.json', 'utf8'))
const edited = ['guides/scaffold.md', 'tests/setupPolicy.ts', 'tests/policy.test.ts']
for (const entry of manifest.entries) {
	if (!edited.includes(entry.destination)) continue
	const digest = createHash('sha256').update(readFileSync(entry.destination)).digest('hex')
	console.log(`${entry.destination}: ${digest === entry.digest ? 'matches' : 'stale'} in host.json`)
}
