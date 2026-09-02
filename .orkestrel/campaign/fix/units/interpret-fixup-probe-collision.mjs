import { createClarifier } from '/home/user/fleet/interpret/dist/src/core/index.js'
import { createVariable } from '/home/user/fleet/interpret/node_modules/@orkestrel/reason/dist/src/core/index.js'

const clarifier = createClarifier({ floor: 0.3 })
const template = (entities) => ({
	id: 't4',
	name: 'Collision',
	domain: 'arithmetic',
	intents: ['calculate'],
	mappings: [
		{ entity: 'value', aliases: [], field: 'value' },
		{ entity: 'first', aliases: [], field: ['value', '0'] },
	],
	defaults: [],
	computations: [{ field: 'echo', expression: createVariable('value.0') }],
	definition: { reasoning: 'symbolic', id: 't4', name: 'Collision', equations: [], variables: {} },
})
const arrayEntity = { name: 'value', value: [2, 3], provenance: { category: 'extracted' }, confidence: 1 }
const scalarEntity = { name: 'first', value: 9, provenance: { category: 'extracted' }, confidence: 1 }
const intent = { action: 'calculate', domain: 'arithmetic', confidence: 1 }

for (const [label, entities] of [
	['array then scalar', [arrayEntity, scalarEntity]],
	['scalar then array', [scalarEntity, arrayEntity]],
]) {
	const out = clarifier.clarify(entities, template(), undefined, intent)
	const echo = out.entities.find((entity) => entity.name === 'echo')
	console.log(label, '-> echo =', echo === undefined ? 'absent' : echo.value)
}
