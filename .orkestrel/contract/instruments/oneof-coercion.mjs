// Probe: does the reporter's oneOf tally (compiled guards) disagree with parse
// (coercing) on a numeric string? Law under test: explain(v).length === 0 <=> parse(v) !== undefined.
/* eslint-disable */
const lib = await import(process.argv[2])
const { createContract, oneOfShape, stringShape, numberShape, integerShape, booleanShape, objectShape, literalShape } = lib
const cases = [
	['oneOf(string, number) on "42"', oneOfShape(stringShape(), numberShape()), '42'],
	['oneOf(number, boolean) on "42"', oneOfShape(numberShape(), booleanShape()), '42'],
	['oneOf(integer, boolean) on 7', oneOfShape(integerShape(), booleanShape()), 7],
	['oneOf(number, boolean) on "true"', oneOfShape(numberShape(), booleanShape()), 'true'],
	['oneOf(obj{a:number}, obj{b:string}) on {a:"1"}', oneOfShape(objectShape({ a: numberShape() }), objectShape({ b: stringShape() })), { a: '1' }],
	['oneOf(literal a, literal b) on "a"', oneOfShape(literalShape(['a']), literalShape(['b'])), 'a'],
]
let disagreements = 0
for (const [name, shape, value] of cases) {
	const c = createContract(shape)
	const parsed = c.parse(value)
	const report = c.explain(value)
	const audit = c.audit(value)
	const isValue = c.is(value)
	const agree = (report.length === 0) === (parsed !== undefined)
	if (!agree) disagreements++
	console.log(`${agree ? 'OK  ' : 'DIFF'} ${name}: parse=${JSON.stringify(parsed)} explain=${JSON.stringify(report).slice(0, 140)} is=${isValue} audit.length=${audit.length}`)
}
console.log(`oneOf explain/parse law: ${disagreements === 0 ? 'HOLDS' : disagreements + ' DISAGREEMENTS'}`)
