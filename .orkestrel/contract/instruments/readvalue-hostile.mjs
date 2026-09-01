// Evidence instrument for the readValue change: hostile and honest option
// records through readValue and a compiled auditor; prints one line per vector
// (refusal message, code, context keys in order, cause). Two dists must print
// identical lines. Run: node readvalue-hostile.mjs </abs/dist/index.js>
/* eslint-disable */
const lib = await import(process.argv[2])
const { readValue, createContract, objectShape, stringShape, ContractError } = lib
function line(name, run) {
	try {
		const out = run()
		console.log(`${name}: returned ${JSON.stringify(out)}`)
	} catch (error) {
		const isContract = error instanceof ContractError
		const context = error && error.context
		const keys = context === undefined ? '-' : Object.keys(context).join(',')
		const cause = error && error.cause instanceof Error ? error.cause.message : error && error.cause
		console.log(`${name}: THREW ${isContract ? 'ContractError' : (error && error.constructor && error.constructor.name)} code=${error && error.code} msg=${JSON.stringify(error && error.message)} contextKeys=${keys} context=${JSON.stringify(context)} cause=${JSON.stringify(cause)}`)
	}
}
const boom = () => { throw new Error('boom') }
line('success plain', () => readValue(() => 7, 'door'))
line('success full context', () => readValue(() => 'v', 'door', { subject: 'thing', code: 'bound', context: { path: ['a', 'b'], shape: 'string', limit: 3, received: '"x"' } }))
line('failure full context', () => readValue(boom, 'door', { subject: 'thing', code: 'bound', context: { path: ['a', 'b'], shape: 'string', limit: 3, received: '"x"' } }))
line('failure partial context', () => readValue(boom, 'door', { subject: 'thing', context: { shape: 'object' } }))
line('failure no context', () => readValue(boom, 'door', { subject: 'thing' }))
line('failure no options', () => readValue(boom, 'door'))
line('failure unknown code', () => readValue(boom, 'door', { code: 'nonsense', context: { path: [] } }))
line('failure non-string reader/subject', () => readValue(boom, 42, { subject: 9 }))
line('advertised getter throws on success', () => readValue(() => 1, 'door', { context: { get path() { throw new Error('path-getter') } } }))
line('unadvertised getter throws on success', () => readValue(() => 1, 'door', { context: { shape: 's', get extra() { throw new Error('extra-getter') } } }))
line('unadvertised getter throws on failure', () => readValue(boom, 'door', { context: { shape: 's', get extra() { throw new Error('extra-getter') } } }))
line('non-enumerable unadvertised getter', () => readValue(() => 1, 'door', { context: Object.defineProperty({ shape: 's' }, 'hidden', { get() { throw new Error('hidden') }, enumerable: false }) }))
line('code getter throws', () => readValue(() => 1, 'door', { get code() { throw new Error('code-getter') } }))
line('subject getter throws', () => readValue(() => 1, 'door', { get subject() { throw new Error('subject-getter') } }))
line('context getter throws', () => readValue(() => 1, 'door', { get context() { throw new Error('context-getter') } }))
line('inherited field via prototype', () => readValue(boom, 'door', { context: Object.assign(Object.create({ limit: 99 }), { shape: 's' }) }))
for (const key of ['path', 'shape', 'limit', 'received']) {
	Object.defineProperty(Object.prototype, key, { value: `polluted-${key}`, configurable: true, writable: true, enumerable: false })
	line(`Object.prototype.${key} polluted, failure with other fields`, () => readValue(boom, 'door', { context: { shape: key === 'shape' ? 'own' : 's' } }))
	delete Object.prototype[key]
}
line('context is null', () => readValue(boom, 'door', { context: null }))
line('subject accessor alternating string then hostile object', () => { let reads = 0; return readValue(boom, 'door', { get subject() { reads += 1; return reads === 1 ? 'thing' : { toString() { throw new Error('hostile toString') } } } }) })
line('options is a string', () => readValue(boom, 'door', 'nope'))
const contract = createContract(objectShape({ a: stringShape() }))
line('auditor prototype-trap refusal', () => contract.audit(new Proxy({ a: 'x' }, { getPrototypeOf: () => { throw new Error('proto') } }), ['root']))
line('auditor ownKeys-trap refusal', () => contract.audit(new Proxy({ a: 'x' }, { ownKeys: () => { throw new Error('keys') } })))
