import assert from 'node:assert/strict'
import { mkdtemp, mkdir, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { evaluateCompleteness, projectTree, sleepResult, validateOutput } from './layer-inventory.mjs'

const VALID = {
	local: { valid: true },
	git: { valid: true },
	npm: { valid: true },
	attestations: { valid: true },
	registry: { valid: true },
	changed: false,
}

test('accepts a complete reading', () => {
	assert.deepEqual(evaluateCompleteness(VALID), { complete: true, reasons: [] })
})

test('rejects absent registry latest tag and malformed npm root', () => {
	assert.deepEqual(evaluateCompleteness({ ...VALID, registry: { valid: false, reasons: ['registry latest tag is absent'] } }).complete, false)
	assert.deepEqual(projectTree([], '@orkestrel/contract').valid, false)
})

test('retains keyed dependencies and rejects failed attestation, identity mismatch, git failure', () => {
	const tree = projectTree({ name: 'root', dependencies: { '@orkestrel/contract': { version: '0.0.1', path: '/tmp/contract' } } })
	assert.equal(tree.projection.dependencies['@orkestrel/contract'].name, '@orkestrel/contract')
	assert.equal(evaluateCompleteness({ ...VALID, attestations: { valid: false, reasons: ['identity mismatch'] } }).complete, false)
	assert.equal(evaluateCompleteness({ ...VALID, git: { valid: false, reasons: ['git head failed'] } }).complete, false)
	assert.equal(evaluateCompleteness({ ...VALID, git: { valid: true, ancestor: false } }).complete, true)
})

test('rejects an occupied output path', async () => {
	const root = await mkdtemp(join(tmpdir(), 'layer-inventory-'))
	const output = join(root, 'occupied')
	await mkdir(output)
	await assert.rejects(validateOutput(output))
	await rm(root, { recursive: true, force: true })
})

test('captures a real short-lived Node child', async () => {
	const result = await sleepResult(process.execPath, ['-e', "process.stdout.write('inventory')"], { timeout: 1_000 })
	assert.equal(result.stdout, 'inventory')
	assert.equal(result.exit, 0)
	assert.equal(result.signal, null)
})
