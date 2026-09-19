import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import { readIdentity, readRegistry, readSnapshot, requireRegistry, requireSnapshot, requireTarget } from '../../release/adopt-roughnotes-registry.mjs'

const evidence = dirname(fileURLToPath(import.meta.url))
requireTarget()
const baseline = { time: new Date().toISOString(), identity: readIdentity(), source: readSnapshot() }
writeFileSync(join(evidence, 'baseline.json'), `${JSON.stringify(baseline, undefined, 2)}\n`, { flag: 'wx' })
const registry = await readRegistry()
writeFileSync(join(evidence, 'registry-observed.json'), `${JSON.stringify(registry, undefined, 2)}\n`, { flag: 'wx' })
const canonical = spawnSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8', windowsHide: true, timeout: 30000 })
console.log(JSON.stringify({ canonical: canonical.stdout.trim(), manifest: baseline.identity.manifest, lock: baseline.identity.lock, installed: baseline.identity.installed, registry: { name: registry.name, version: registry.version, integrity: registry.dist?.integrity } }, undefined, 2))
requireRegistry(registry, '0.0.75', registry.dist.integrity)
writeFileSync(join(evidence, 'registry-mismatch.json'), `${JSON.stringify({ ...registry, name: '@orkestrel/unrelated' })}\n`, { flag: 'wx' })
let identityRefused = false
try {
	requireRegistry(JSON.parse(readFileSync(join(evidence, 'registry-mismatch.json'), 'utf8')), '0.0.75', registry.dist.integrity)
} catch (error) {
	identityRefused = true
	console.log(`Registry identity mismatch refused: ${error.message}`)
}
if (!identityRefused) throw new Error('Registry identity control failed to refuse')
requireSnapshot(baseline.source, JSON.parse(JSON.stringify(baseline.source)))
const drift = baseline.source.map((entry) => entry.path === 'app/browser/App.vue' ? { ...entry, sha256: createHash('sha256').update('inert source drift').digest('hex') } : entry)
writeFileSync(join(evidence, 'source-drift.json'), `${JSON.stringify(drift, undefined, 2)}\n`, { flag: 'wx' })
let sourceRefused = false
try {
	requireSnapshot(baseline.source, JSON.parse(readFileSync(join(evidence, 'source-drift.json'), 'utf8')))
} catch (error) {
	sourceRefused = true
	console.log(`Protected source drift refused: ${error.message}`)
}
if (!sourceRefused) throw new Error('Source drift control failed to refuse')
requireSnapshot(baseline.source, readSnapshot())
console.log('Authoring controls passed; live recovery source unchanged; no installation executed')
