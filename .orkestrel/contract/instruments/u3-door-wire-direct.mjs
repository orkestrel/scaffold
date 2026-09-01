// Companion to u3-door-wire.mjs: the direct compile doors and ownShape on a
// hand-rolled string shape whose `pattern` is a counting accessor, plus the
// observable outputs of the compiled doors on a data-property shape.
// Run: node u3-door-wire-direct.mjs </abs/dist/index.js>
/* eslint-disable */
const lib = await import(process.argv[2])
const { createContract, compileAuditor, compileReporter, ownShape, ContractError } = lib
function line(name, run) {
	try { console.log(`${name}: ${JSON.stringify(run())}`) }
	catch (error) { console.log(`${name}: THREW ${error instanceof ContractError ? 'ContractError' : error && error.constructor && error.constructor.name} code=${error && error.code} msg=${JSON.stringify(error && error.message)} context=${JSON.stringify(error && error.context)}`) }
}
let reads = 0
const accessor = { type: 'string', min: 1, get pattern() { reads += 1; return /^[a-z]+$/ } }
line('ownShape(accessor shape)', () => { ownShape(accessor); return reads })
line('compileAuditor(accessor shape)', () => { const out = compileAuditor(accessor, 'abc', []); return { out, reads } })
line('compileReporter(accessor shape)', () => { const out = compileReporter(accessor, 'ABC', []); return { out, reads } })
const data = { type: 'string', min: 1, pattern: /^[a-z]+$/ }
const owned = ownShape(data)
line('owned clone pattern descriptor', () => { const d = Object.getOwnPropertyDescriptor(owned, 'pattern'); return { accessor: typeof d.get === 'function', distinct: owned.pattern !== owned.pattern, frozen: Object.isFrozen(owned.pattern) } })
const contract = createContract(data)
line('compiled answers on data shape', () => ['abc', 'ABC', '', 'x1'].map((v) => [contract.audit(v), contract.explain(v)]))
