import type { RefitLabel, RefitProposition } from '../../.orkestrel/agent/instruments/harness/bench5/refit/types.js'
import { strict as assert } from 'node:assert'
import { readFileSync, writeFileSync } from 'node:fs'
import { hashFile, verifyLabels } from '../../.orkestrel/agent/instruments/harness/.build/bench5/refit/helpers.js'
import { isRefitItem, isRefitLabels } from '../../.orkestrel/agent/instruments/harness/.build/bench5/refit/validators.js'

// Applies only the root's explicit, completed semantic rulings; no scores are read.
const seals = [
	['a', 'd261b832f1574c64add6c602a42a3af8fa35b6d41e41ceb8e8906c2047286124', '3d069191d08f43c35f02674d11f7d33569dbad3f094bef67d22cdf870592e580'],
	['b', '1e198b860a4a0b8c5933a2cafccc0b4dca3a1a75b0bbbc959008fb5d894ca672', 'b125a0ba9b90b4731a8a569f4a8e0c8432b61e47bc00c68500f031b02a531092'],
	['c', '9c7632d7224759d227d119d5609e5280cf8a2ad480a842df2bfcdeb4d29488c3', 'cca2b9e61bf3a678cf18b31c3b9cd04cb1ffa6410d676aa8953b5a28990e4d91'],
	['d', '8a80bfbce51cb4040aedad1dfd834351d821c37506a08218a70ef3a2a5e7e4aa', '8cd6f70f4beeb47171a0379a2b7b7178f8f586968cf23f15385e309ffd819130'],
]
const decisionsPath = 'tmp/units/aggregate-final-adjudication-decisions.json'
const decisions: unknown = JSON.parse(readFileSync(decisionsPath, 'utf8'))
assert(Array.isArray(decisions))
const receipt: unknown[] = []
const applied = new Set<string>()
for (const [alias, packetHash, labelHash] of seals) {
	assert(alias !== undefined && packetHash !== undefined && labelHash !== undefined)
	const packetPath = `tmp/units/aggregate-final-label-${alias}-packet.jsonl`
	const labelsPath = `tmp/units/aggregate-final-label-${alias}.json`
	assert.equal(hashFile(packetPath).hash, packetHash)
	assert.equal(hashFile(labelsPath).hash, labelHash)
	const items: unknown[] = readFileSync(packetPath, 'utf8').split(/\r\n|\n/).filter((line) => line.trim() !== '').map((line) => JSON.parse(line))
	assert(items.every(isRefitItem))
	const labels: unknown = JSON.parse(readFileSync(labelsPath, 'utf8'))
	const shape = { authority: 'root-adjudicated', corpus: '0'.repeat(64), attempts: '0'.repeat(64), packet: '0'.repeat(64), manifest: '0'.repeat(64), labels }
	assert(isRefitLabels(shape))
	verifyLabels(items, shape)
	const approved = new Map<string, RefitLabel>(shape.labels.map((label) => [label.id, label]))
	const changes: unknown[] = []
	for (const raw of decisions) {
		const decision: unknown = raw
		assert(typeof decision === 'object' && decision !== null && 'alias' in decision)
		if (decision.alias !== alias) continue
		assert('representative' in decision && typeof decision.representative === 'string')
		assert('verdict' in decision && ['supported', 'contradicted', 'unsupported', 'ambiguous'].some((value) => value === decision.verdict))
		assert('propositions' in decision && Array.isArray(decision.propositions))
		const representative = items.find((item) => item.id === decision.representative)
		assert(representative !== undefined)
		const key = JSON.stringify([representative.revision, representative.candidate, representative.question, representative.state, representative.sources, representative.components])
		const matches = items.filter((item) => JSON.stringify([item.revision, item.candidate, item.question, item.state, item.sources, item.components]) === key)
		for (const item of matches) {
			const original = approved.get(item.id)
			assert(original !== undefined)
			const propositions: RefitProposition[] = [...original.propositions]
			for (const rawChange of decision.propositions) {
				const change: unknown = rawChange
				assert(typeof change === 'object' && change !== null && 'index' in change && typeof change.index === 'number' && Number.isSafeInteger(change.index))
				assert('verdict' in change)
				const old = propositions[change.index]
				assert(old !== undefined)
				const candidate = { ...old, verdict: change.verdict, ...('text' in change ? { text: change.text } : {}), ...('evidence' in change ? { evidence: change.evidence } : {}) }
				const check = { ...shape, labels: [{ ...original, verdict: decision.verdict, propositions: [candidate] }] }
				assert(isRefitLabels(check))
				const replacement = check.labels[0]?.propositions[0]
				assert(replacement !== undefined)
				propositions[change.index] = replacement
			}
			const check = { ...shape, labels: [{ ...original, verdict: decision.verdict, propositions }] }
			assert(isRefitLabels(check))
			const replacement = check.labels[0]
			assert(replacement !== undefined)
			assert.equal(original.verdict === 'supported', replacement.verdict === 'supported', 'Root rulings must preserve this reviewed positive boundary')
			approved.set(item.id, replacement)
			changes.push({ id: item.id, original, approved: replacement })
		}
		applied.add(decision.representative)
	}
	const final = shape.labels.map((label) => {
		const result = approved.get(label.id)
		assert(result !== undefined)
		return result
	})
	verifyLabels(items, { ...shape, labels: final })
	assert.equal(hashFile(packetPath).hash, packetHash)
	assert.equal(hashFile(labelsPath).hash, labelHash)
	const output = `tmp/units/aggregate-final-approved-${alias}.json`
	writeFileSync(output, `${JSON.stringify(final, undefined, 2)}\n`, { flag: 'wx' })
	const census = Object.fromEntries(['supported', 'contradicted', 'unsupported', 'ambiguous'].map((verdict) => [verdict, final.filter((label) => label.verdict === verdict).length]))
	receipt.push({ alias, packet: hashFile(packetPath), independent: hashFile(labelsPath), approved: hashFile(output), census, changes })
	console.log(JSON.stringify({ alias, output: hashFile(output), census, changed: changes.length }))
}
assert.equal(applied.size, decisions.length)
writeFileSync('tmp/units/aggregate-final-adjudication-receipt.json', `${JSON.stringify({ decisions: hashFile(decisionsPath), boundary: 'unchanged', packets: receipt }, undefined, 2)}\n`, { flag: 'wx' })
