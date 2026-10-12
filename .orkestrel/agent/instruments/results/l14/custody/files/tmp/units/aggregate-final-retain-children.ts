import { strict as assert } from 'node:assert'
import { constants, copyFileSync, mkdirSync, readFileSync, realpathSync, statSync, writeFileSync } from 'node:fs'
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path'
import { isRecord } from '@orkestrel/contract'
import { hashFile } from '../../.orkestrel/agent/instruments/harness/.build/bench5/refit/helpers.js'

const root = realpathSync(resolve())
assert.equal(root, realpathSync(resolve(import.meta.dirname, '../..')))
const destination = resolve(root, '.orkestrel/agent/instruments/results/l14/custody')
const inventoryPath = 'tmp/units/aggregate-final-custody-retention-inventory-2.json'
assert.equal(hashFile(inventoryPath).hash, 'e1514076de889bd39483ff06dccb4d68d75d37a740f51d8ef15a9a755a3b6f5b')
const inventory: unknown = JSON.parse(readFileSync(inventoryPath, 'utf8'))
assert(isRecord(inventory) && inventory.result === 'complete' && Array.isArray(inventory.entries))
const entries: { readonly original: string; readonly retained: string; readonly hash: string; readonly bytes: number }[] = []
for (const value of inventory.entries) {
	assert(isRecord(value) && typeof value.path === 'string' && typeof value.sha256 === 'string')
	assert.equal(hashFile(value.path).hash, value.sha256)
	if (!value.path.startsWith('tmp/units/')) continue
	const source = resolve(root, value.path)
	assert.equal(realpathSync(source), source)
	assert(!/(?:^|[/\\])(?:\.env[^/\\]*|\.npmrc|auth\.json|[^/\\]*\.(?:pem|key))$/i.test(value.path))
	const target = resolve(destination, 'files', value.path)
	const distance = relative(destination, target)
	assert(distance !== '..' && !distance.startsWith(`..${sep}`) && !isAbsolute(distance))
	entries.push({ original: value.path, retained: relative(root, target).replaceAll('\\', '/'), hash: value.sha256, bytes: statSync(source).size })
}
for (const original of [inventoryPath, 'tmp/units/aggregate-final-custody-retention-report-2.md', 'tmp/units/aggregate-final-retain.ts', 'tmp/units/aggregate-final-retain-children.ts']) {
	entries.push({ original, retained: relative(root, resolve(destination, 'files', original)).replaceAll('\\', '/'), hash: hashFile(original).hash, bytes: statSync(original).size })
}
let copied = 0
for (const entry of entries) {
	const existing = statSync(entry.retained, { throwIfNoEntry: false })
	if (existing === undefined) {
		mkdirSync(dirname(entry.retained), { recursive: true })
		copyFileSync(entry.original, entry.retained, constants.COPYFILE_EXCL)
		copied += 1
	}
	assert.equal(hashFile(entry.original).hash, entry.hash)
	assert.equal(hashFile(entry.retained).hash, entry.hash)
}
const index = resolve(destination, 'restoration-children.json')
writeFileSync(index, `${JSON.stringify({ captured: new Date().toISOString(), root, inventory: hashFile(inventoryPath), instruction: 'This exact-reference supplement extends restoration.json. It preserves the capacity-control request/response evidence named by the frozen deployment. Restore only to matching original paths and verify hashes. Historical manifests remain unchanged.', entries }, undefined, 2)}\n`, { flag: 'wx' })
console.log(JSON.stringify({ entries: entries.length, copied, bytes: entries.reduce((sum, entry) => sum + entry.bytes, 0), index: hashFile(index) }))
