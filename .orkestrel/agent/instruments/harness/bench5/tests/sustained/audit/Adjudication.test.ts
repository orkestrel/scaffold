import assert from 'node:assert/strict'
import { test } from 'node:test'
import { writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { readOracle } from '../../../endurance/helpers.js'
import { hashFile } from '../../../refit/helpers.js'
import { Adjudication } from '../../../sustained/audit/Adjudication.js'
import { SUSTAINED_CONTROLS } from '../../../sustained/audit/constants.js'
import {
	computeAcceptability,
	verifyAuditIdentity,
	verifyOracleCustody,
} from '../../../sustained/audit/helpers.js'
import { isSustainedKeys, isSustainedLabels } from '../../../sustained/audit/validators.js'
import { buildAuditFixture, withAuditFiles } from './helpers.js'
import { AUDIT_REFERENCE } from './constants.js'

test('refuses a structurally valid same-ID edited oracle against frozen byte custody', () => {
	withAuditFiles((directory) => {
		const original = resolve(
			'.orkestrel/agent/instruments/units/aggregates/endurance/private/evaluation.json',
		)
		const oracle = readOracle(original)
		const edited = join(directory, 'edited-oracle.json')
		writeFileSync(
			edited,
			JSON.stringify({
				...oracle,
				facts: oracle.facts.map((fact, index) =>
					index === 0 ? { ...fact, value: 'A changed external obligation.' } : fact,
				),
			}),
		)
		assert.equal(readOracle(edited).runtime, oracle.runtime)
		assert.doesNotThrow(() => verifyOracleCustody(hashFile(original), [hashFile(original)]))
		assert.throws(
			() => verifyOracleCustody(hashFile(edited), [hashFile(original)]),
			/oracle bytes differ/,
		)
	})
})

test('refuses a different workload manifest even when packet and oracle references are unchanged', () => {
	const fixture = buildAuditFixture()
	assert.doesNotThrow(() =>
		verifyAuditIdentity(fixture.judgment.keys, fixture.input, AUDIT_REFERENCE, AUDIT_REFERENCE),
	)
	assert.throws(
		() =>
			verifyAuditIdentity(
				{ ...fixture.judgment.keys, manifest: { ...AUDIT_REFERENCE, hash: 'b'.repeat(64) } },
				fixture.input,
				AUDIT_REFERENCE,
				AUDIT_REFERENCE,
			),
		/another workload manifest/,
	)
})

test('requires exact packet and key hashes plus every atom, critical rule, and obligation', () => {
	const { judgment } = buildAuditFixture()
	assert.equal(
		new Adjudication().read(judgment).batches.every((batch) => batch.valid),
		true,
	)
	assert.throws(
		() =>
			new Adjudication().read({
				...judgment,
				hashes: { ...judgment.hashes, keys: 'c'.repeat(64) },
			}),
		/custody/,
	)
	assert.throws(
		() =>
			new Adjudication().read({
				...judgment,
				labels: { ...judgment.labels, labels: judgment.labels.labels.slice(1) },
			}),
		/missing, duplicate/,
	)
	assert.throws(
		() =>
			new Adjudication().read({
				...judgment,
				labels: {
					...judgment.labels,
					labels: [...judgment.labels.labels, ...judgment.labels.labels],
				},
			}),
		/missing, duplicate/,
	)
	for (const field of ['atoms', 'critical', 'obligations'] as const)
		assert.throws(
			() =>
				new Adjudication().read({
					...judgment,
					labels: {
						...judgment.labels,
						labels: judgment.labels.labels.map((label, index) =>
							index === 0 ? { ...label, [field]: [] } : label,
						),
					},
				}),
			/missing, duplicate/,
		)
})

test('missed stale and fabricated controls invalidate their batch independently of other batches', () => {
	const { judgment } = buildAuditFixture()
	const key = judgment.keys.keys.find((entry) => entry.control?.verdict === 'stale')
	assert.ok(key)
	const result = new Adjudication().read({
		...judgment,
		labels: {
			...judgment.labels,
			labels: judgment.labels.labels.map((label) =>
				label.id === key.id
					? {
							...label,
							critical: label.critical.map((critical) => ({ ...critical, violated: false })),
						}
					: label,
			),
		},
	})
	assert.equal(result.batches.find((batch) => batch.id === key.batch)?.valid, false)
	assert.equal(result.batches.filter((batch) => batch.valid).length, 1)
	assert.ok(
		result.batches.some((batch) =>
			batch.failures.some((failure) => failure.includes('missed stale control')),
		),
	)
})

test('missed ambiguous controls and identity leaks invalidate the affected audit batch', () => {
	const { judgment } = buildAuditFixture()
	const key = judgment.keys.keys.find((entry) => entry.control?.verdict === 'ambiguous')
	assert.ok(key)
	const result = new Adjudication().read({
		...judgment,
		labels: {
			...judgment.labels,
			labels: judgment.labels.labels.map((label) =>
				label.id === key.id
					? {
							...label,
							atoms: label.atoms.map((atom) => ({ ...atom, verdict: 'pass' })),
							ambiguous: [],
						}
					: label,
			),
		},
	})
	assert.equal(result.batches.find((batch) => batch.id === key.batch)?.valid, false)
	const leaked = new Adjudication().read({
		...judgment,
		labels: {
			...judgment.labels,
			labels: judgment.labels.labels.map((label) =>
				label.id === key.id ? { ...label, leaks: label.ambiguous } : label,
			),
		},
	})
	assert.ok(
		leaked.batches.some((batch) =>
			batch.failures.some((failure) => failure.includes('identity leak')),
		),
	)
})

test('refuses unrelated obligations and fabricated evidence citations', () => {
	const { judgment } = buildAuditFixture()
	assert.throws(
		() =>
			new Adjudication().read({
				...judgment,
				labels: {
					...judgment.labels,
					labels: judgment.labels.labels.map((label, index) =>
						index === 0
							? {
									...label,
									obligations: label.obligations.map((obligation) => ({
										...obligation,
										id: 'unrelated',
									})),
								}
							: label,
					),
				},
			}),
		/obligation/,
	)
	assert.throws(
		() =>
			new Adjudication().read({
				...judgment,
				labels: {
					...judgment.labels,
					labels: judgment.labels.labels.map((label, index) =>
						index === 0
							? {
									...label,
									critical: label.critical.map((critical) => ({
										...critical,
										evidence: ['product|words that were never written'],
									})),
								}
							: label,
					),
				},
			}),
		/unbound/,
	)
})

test('does not accept earlier work as factual support or as an external completion receipt', () => {
	const { judgment } = buildAuditFixture()
	const key = judgment.keys.keys.find(
		(entry) => entry.goal === 'goal-1' && entry.arm === 'aggregate' && entry.control === undefined,
	)
	const item = judgment.packet.items.find((entry) => entry.id === key?.id)
	assert.ok(item)
	const earlier = item.earlier[0]
	assert.ok(earlier)
	const evidence = [`product|${item.product}`, `product:${earlier.id}|${earlier.product}`]
	assert.throws(
		() =>
			new Adjudication().read({
				...judgment,
				labels: {
					...judgment.labels,
					labels: judgment.labels.labels.map((label) =>
						label.id === item.id
							? { ...label, atoms: label.atoms.map((atom) => ({ ...atom, evidence })) }
							: label,
					),
				},
			}),
		/factual credit/,
	)
	assert.throws(
		() =>
			new Adjudication().read({
				...judgment,
				labels: {
					...judgment.labels,
					labels: judgment.labels.labels.map((label) =>
						label.id === item.id
							? {
									...label,
									obligations: label.obligations.map((obligation) => ({ ...obligation, evidence })),
								}
							: label,
					),
				},
			}),
		/external evidence/,
	)
})

test('preserves ambiguity bounds and makes evidenced critical violations fully unacceptable', () => {
	const { judgment } = buildAuditFixture()
	const key = judgment.keys.keys.find(
		(entry) => entry.arm === 'aggregate' && entry.control === undefined,
	)
	const item = judgment.packet.items.find((entry) => entry.id === key?.id)
	const label = judgment.labels.labels.find((entry) => entry.id === key?.id)
	assert.ok(item && label)
	assert.deepEqual(computeAcceptability(item, label), { low: 1, high: 1 })
	assert.deepEqual(
		computeAcceptability(item, {
			...label,
			atoms: label.atoms.map((atom, index) =>
				index === 0 ? { ...atom, verdict: 'ambiguous' } : atom,
			),
			ambiguous: [`product|${item.product}`],
		}),
		{ low: 0, high: 1 },
	)
	assert.deepEqual(
		computeAcceptability(item, {
			...label,
			critical: label.critical.map((entry) =>
				entry.rule === SUSTAINED_CONTROLS.fabricated ? { ...entry, violated: true } : entry,
			),
		}),
		{ low: 0, high: 0 },
	)
})

test('closed guards reject coercible outcome arrays, missing limitation fields, and hostile getters', () => {
	const { judgment } = buildAuditFixture()
	assert.equal(isSustainedLabels(judgment.labels), true)
	assert.equal(isSustainedKeys(judgment.keys), true)
	assert.equal(
		isSustainedLabels({
			...judgment.labels,
			labels: judgment.labels.labels.map((label) => ({
				...label,
				atoms: label.atoms.map((atom) => ({ ...atom, verdict: ['pass'] })),
			})),
		}),
		false,
	)
	assert.equal(
		isSustainedLabels({
			...judgment.labels,
			labels: judgment.labels.labels.map(({ leaks: _leaks, ...label }) => label),
		}),
		false,
	)
	assert.equal(
		isSustainedLabels(
			Object.defineProperty({}, 'authority', {
				enumerable: true,
				get() {
					throw new Error('hostile getter')
				},
			}),
		),
		false,
	)
})
