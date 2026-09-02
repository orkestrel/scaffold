import { createClarifier } from '/home/user/fleet/interpret/dist/src/core/index.js'
import { createOperation, createVariable } from '/home/user/fleet/interpret/node_modules/@orkestrel/reason/dist/src/core/index.js'

const clarifier = createClarifier({ floor: 0.3 })
const result = clarifier.clarify(
	[{ name: 'value', value: [2, 3], provenance: { category: 'extracted' }, confidence: 1 }],
	{
		id: 't2',
		name: 'Total',
		domain: 'arithmetic',
		intents: ['calculate'],
		mappings: [{ entity: 'value', aliases: [], field: 'value' }],
		defaults: [],
		computations: [
			{
				field: 'total',
				expression: createOperation('add', createVariable('value.0'), createVariable('value.1')),
			},
		],
		definition: { reasoning: 'symbolic', id: 't2', name: 'Total', equations: [], variables: {} },
	},
	undefined,
	{ action: 'calculate', domain: 'arithmetic', confidence: 1 },
)
console.log(JSON.stringify(result, null, '\t'))

// The variable-length limit: value.2 is unbound, so the whole computation is abandoned.
const short = clarifier.clarify(
	[{ name: 'value', value: [2, 3], provenance: { category: 'extracted' }, confidence: 1 }],
	{
		id: 't3',
		name: 'Total',
		domain: 'arithmetic',
		intents: ['calculate'],
		mappings: [{ entity: 'value', aliases: [], field: 'value' }],
		defaults: [],
		computations: [
			{
				field: 'total',
				expression: createOperation('add', createVariable('value.0'), createVariable('value.2')),
			},
		],
		definition: { reasoning: 'symbolic', id: 't3', name: 'Total', equations: [], variables: {} },
	},
	undefined,
	{ action: 'calculate', domain: 'arithmetic', confidence: 1 },
)
console.log('unbound element ->', JSON.stringify(short.entities.map((e) => e.name)))
