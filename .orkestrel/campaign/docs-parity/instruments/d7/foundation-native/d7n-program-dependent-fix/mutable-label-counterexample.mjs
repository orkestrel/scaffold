import assert from 'node:assert/strict'

import { createQualificationDefinition } from '@orkestrel/qualifier'
import { createAtom, createLogicalDefinition, createRule } from '@orkestrel/reason'

import { buildProgramDefinition, createProgram } from '../../dist/src/core/index.js'

const labels = { 'outcome.status': 'Initial status' }
const qualification = createQualificationDefinition('qualification', 'Qualification', [])
const authority = createLogicalDefinition('authority', 'Authority', [
	createRule(
		'eligible-limit',
		[createAtom(['outcome', 'status'], 'equals', 'eligible')],
		createAtom('limited', 'equals', true),
	),
])
const definition = buildProgramDefinition(
	'mutable-label',
	'Mutable label',
	qualification,
	undefined,
	{ authority },
)
const subject = { id: 'subject' }
const program = createProgram(definition, { labels })

try {
	const initial = program.execute(subject)
	labels['outcome.status'] = 'Changed status'
	const changed = program.execute(subject)
	const initialLabel = initial.determinations[0]?.premises[0]?.label
	const changedLabel = changed.determinations[0]?.premises[0]?.label

	assert.equal(initialLabel, 'Initial status')
	assert.equal(changedLabel, 'Changed status')
	console.log(
		JSON.stringify({
			definition: definition.id,
			subject: subject.id,
			initial: initialLabel,
			changed: changedLabel,
		}),
	)
} finally {
	program.destroy()
}
