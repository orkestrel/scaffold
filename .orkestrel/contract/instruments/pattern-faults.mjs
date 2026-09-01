// Evidence instrument for the pattern-capture change: string shapes with and
// without refinements through createStringFaults, a compiled auditor, and a
// compiled reporter; prints one line per vector (exact report JSON, accessor
// freshness, caller lastIndex). Two dists must print identical lines.
// Run: node pattern-faults.mjs </abs/dist/index.js>
/* eslint-disable */
const lib = await import(process.argv[2])
const { createStringFaults, compileAuditor, compileReporter, createContract, stringShape, objectShape, ContractError } = lib
function line(name, run) {
	try { console.log(`${name}: ${JSON.stringify(run())}`) }
	catch (error) { console.log(`${name}: THREW ${error instanceof ContractError ? 'ContractError' : error && error.constructor && error.constructor.name} code=${error && error.code} msg=${JSON.stringify(error && error.message)}`) }
}
const shapes = {
	bare: stringShape(),
	min: stringShape({ min: 3 }),
	minMax: stringShape({ min: 2, max: 4 }),
	pattern: stringShape({ pattern: /^\d{5}$/ }),
	patternFlags: { type: 'string', pattern: /^ab$/imsu },
	patternGlobal: { type: 'string', pattern: /a/g },
	patternSticky: { type: 'string', pattern: /a/y },
	all: stringShape({ min: 2, max: 4, pattern: /^[a-z]+$/ }),
	escaped: stringShape({ pattern: /^\/\\"$/ }),
}
const values = ['', 'a', 'ab', 'AB', 'abcde', '12345', '1234', 'aaa', '/\\"', 'x'.repeat(70)]
for (const [shapeName, shape] of Object.entries(shapes)) {
	let contract
	line(`compile ${shapeName}`, () => { contract = createContract(shape); return Object.keys(contract) })
	for (const value of values) {
		line(`helper ${shapeName} ${JSON.stringify(value)}`, () => createStringFaults(shape, value, ['p']))
		if (contract !== undefined) line(`audit  ${shapeName} ${JSON.stringify(value)}`, () => contract.audit(value, ['q']))
		if (contract !== undefined) line(`report ${shapeName} ${JSON.stringify(value)}`, () => contract.explain(value))
		line(`door   ${shapeName} ${JSON.stringify(value)}`, () => compileAuditor(shape, value, ['d']))
	}
	if (contract !== undefined) line(`report ${shapeName} coerced 12345`, () => contract.explain(12345))
}
line('accessor freshness', () => { const s = shapes.pattern; const a = s.pattern; const b = s.pattern; return { distinct: a !== b, frozen: Object.isFrozen(a), source: a.source, flags: a.flags } })
line('caller lastIndex untouched by audit door', () => { const caller = /a/g; caller.lastIndex = 0; try { compileAuditor({ type: 'string', pattern: caller }, 'aaa', []) } catch {} try { compileAuditor({ type: 'string', pattern: caller }, 'aaa', []) } catch {} return caller.lastIndex })
line('caller lastIndex untouched by helper', () => { const caller = /a/g; const shape = { type: 'string', pattern: caller }; createStringFaults(shape, 'aaa', []); createStringFaults(shape, 'aaa', []); return caller.lastIndex })
line('deep object pattern fault', () => createContract(objectShape({ zip: stringShape({ pattern: /^\d{5}$/ }), name: stringShape({ min: 1 }) })).audit({ zip: '12', name: '' }, ['root']))
line('helper hostile shape: pattern getter throws', () => createStringFaults({ type: 'string', get pattern() { throw new Error('pat') } }, 'x', []))
line('helper hostile shape: pattern not a RegExp', () => createStringFaults({ type: 'string', pattern: 'abc' }, 'x', []))
line('helper hostile shape: min getter throws', () => createStringFaults({ type: 'string', get min() { throw new Error('min') } }, 'x', []))
line('auditor hand-rolled shape with RegExp literal', () => compileAuditor({ type: 'string', pattern: /^q$/ }, 'q', []))
line('reporter hand-rolled shape with RegExp literal', () => compileReporter({ type: 'string', pattern: /^q$/ }, 'z', []))
