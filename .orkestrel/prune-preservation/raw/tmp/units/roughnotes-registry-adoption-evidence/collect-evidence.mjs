import { createHash } from 'node:crypto'
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import { readIdentity, readManifests, readSnapshot, requireSnapshot } from '../../release/adopt-roughnotes-registry.mjs'

const evidence = dirname(fileURLToPath(import.meta.url))
const root = resolve(evidence, '..', '..', '..')
const baseline = JSON.parse(readFileSync(join(evidence, 'baseline.json'), 'utf8'))
requireSnapshot(baseline.source, readSnapshot())
requireSnapshot(baseline.identity, readIdentity())
writeFileSync(join(evidence, 'empty.txt'), '', { flag: 'wx' })
const subjects = ['tmp/release/adopt-roughnotes-registry.mjs', 'tmp/release/launch-roughnotes-registry.ps1', ...readdirSync(evidence).filter((name) => name.endsWith('.mjs') || name.endsWith('.ps1')).map((name) => `tmp/units/roughnotes-registry-adoption-evidence/${name}`)]
let patch = ''
let stat = ''
for (const subject of subjects) {
	const diff = spawnSync('git', ['diff', '--no-index', '--', join(evidence, 'empty.txt'), join(root, subject)], { encoding: 'utf8', windowsHide: true, timeout: 30000, maxBuffer: 4 * 1024 * 1024 })
	if (diff.error || diff.status !== 1) throw new Error(`Owned diff failed for ${subject}`)
	patch += diff.stdout
	const measured = spawnSync('git', ['diff', '--no-index', '--stat', '--', join(evidence, 'empty.txt'), join(root, subject)], { encoding: 'utf8', windowsHide: true, timeout: 30000 })
	if (measured.error || measured.status !== 1) throw new Error(`Owned diffstat failed for ${subject}`)
	stat += measured.stdout
}
writeFileSync(join(evidence, 'owned.diff.patch'), patch, { flag: 'wx' })
writeFileSync(join(evidence, 'owned.diffstat.txt'), stat, { flag: 'wx' })
const status = spawnSync('git', ['status', '--short'], { cwd: root, encoding: 'utf8', windowsHide: true, timeout: 30000, maxBuffer: 4 * 1024 * 1024 })
if (status.error || status.status !== 0) throw new Error('Actual canonical status reading failed')
writeFileSync(join(evidence, 'canonical.status.txt'), status.stdout, { flag: 'wx' })
const hashes = subjects.map((path) => ({ path, sha256: createHash('sha256').update(readFileSync(join(root, path))).digest('hex') }))
writeFileSync(join(evidence, 'instrument-hashes.json'), `${JSON.stringify(hashes, undefined, 2)}\n`, { flag: 'wx' })
writeFileSync(join(evidence, 'recovery-after-authorship.json'), `${JSON.stringify({ time: new Date().toISOString(), identity: readIdentity(), source: readSnapshot(), manifests: readManifests() }, undefined, 2)}\n`, { flag: 'wx' })
console.log(stat)
console.log(JSON.stringify(hashes, undefined, 2))
console.log('Recovery identity, Git status, and protected source remain equal to the authoring baseline')
