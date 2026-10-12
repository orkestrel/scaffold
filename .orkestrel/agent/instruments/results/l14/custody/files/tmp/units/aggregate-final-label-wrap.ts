import { createHash } from 'node:crypto'
import { lstatSync, readFileSync, realpathSync, writeFileSync } from 'node:fs'
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { hashFile, verifyLabels } from '../../.orkestrel/agent/instruments/harness/.build/bench5/refit/helpers.js'
import { isRefitItem, isRefitLabels } from '../../.orkestrel/agent/instruments/harness/.build/bench5/refit/validators.js'

const [directory, approved, expected, ...extra] = process.argv.slice(2)
if (
	directory === undefined || directory.length === 0 ||
	approved === undefined || approved.length === 0 ||
	expected === undefined || !/^[a-f0-9]{64}$/.test(expected) || extra.length !== 0
) throw new Error('Usage: node tmp/units/aggregate-final-label-wrap.ts CALIBRATION APPROVED_ARRAY SHA256')

const scaffold = realpathSync(resolve(dirname(fileURLToPath(import.meta.url)), '../..'))
const root = resolve(scaffold, '.orkestrel/agent/instruments/results/l14/calibration')
const calibration = resolve(directory)
const child = relative(root, calibration)
if (!['q2', 'g2', 'g4', 'q4'].includes(child))
	throw new Error('Calibration must be an exact q2, g2, g4, or q4 child of the l14 calibration root')

// Refuse redirected directory components before reading an artifact.
for (const target of [root, calibration]) {
	const canonical = realpathSync(target)
	const distance = relative(scaffold, canonical)
	if (canonical !== target || distance === '..' || distance.startsWith(`..${sep}`) || isAbsolute(distance))
		throw new Error(`Redirected calibration path: ${target}`)
}
if (!lstatSync(calibration).isDirectory()) throw new Error('Calibration directory required')

const output = resolve(calibration, 'labels.json')
const approval = hashFile(realpathSync(resolve(approved)))
if (approval.hash !== expected) throw new Error('Approved label-array SHA256 mismatch')
const approvalBytes = readFileSync(approval.path)
if (createHash('sha256').update(approvalBytes).digest('hex') !== expected)
	throw new Error('Approved label-array changed while reading')
const labelArray: unknown = JSON.parse(approvalBytes.toString('utf8'))

const paths = [
	resolve(calibration, 'corpus/corpus.json'),
	resolve(calibration, 'generation/attempts.jsonl'),
	resolve(calibration, 'generation/packet.jsonl'),
	resolve(calibration, 'generation/manifest.json'),
]
for (const path of paths) {
	if (realpathSync(path) !== path || !lstatSync(path).isFile())
		throw new Error(`Regular unredirected calibration input required: ${path}`)
}
const files = paths.map((path) => hashFile(path))
const [corpus, attempts, packet, manifest] = files
if (corpus === undefined || attempts === undefined || packet === undefined || manifest === undefined)
	throw new Error('Missing calibration input reference')

const packetBytes = readFileSync(packet.path)
if (createHash('sha256').update(packetBytes).digest('hex') !== packet.hash)
	throw new Error('Packet changed while reading')
const rows: unknown[] = packetBytes.toString('utf8').split(/\r\n|\n/)
	.filter((line) => line.trim().length !== 0)
	.map((line) => JSON.parse(line))
if (!rows.every(isRefitItem)) throw new Error('Invalid packet item')

const wrapper = {
	authority: 'root-adjudicated',
	corpus: corpus.hash,
	attempts: attempts.hash,
	packet: packet.hash,
	manifest: manifest.hash,
	labels: labelArray,
}
if (!isRefitLabels(wrapper)) throw new Error('Invalid approved label-array or labels wrapper')
verifyLabels(rows, wrapper)

for (const file of [...files, approval]) {
	if (realpathSync(file.path) !== file.path || hashFile(file.path).hash !== file.hash)
		throw new Error(`Input changed before serialization: ${file.path}`)
}
if (realpathSync(calibration) !== calibration) throw new Error('Calibration directory changed')
const serialized = `${JSON.stringify(wrapper, undefined, 2)}\n`
writeFileSync(output, serialized, { flag: 'wx' })

for (const file of [...files, approval]) {
	if (realpathSync(file.path) !== file.path || hashFile(file.path).hash !== file.hash)
		throw new Error(`Input changed after serialization; output requires root review: ${file.path}`)
}
if (realpathSync(calibration) !== calibration || realpathSync(output) !== output)
	throw new Error('Output path changed after serialization; output requires root review')
const result = hashFile(output)
if (result.hash !== createHash('sha256').update(serialized).digest('hex'))
	throw new Error('Output bytes changed after serialization; output requires root review')
console.log(JSON.stringify({ path: result.path, hash: result.hash, count: wrapper.labels.length }))
